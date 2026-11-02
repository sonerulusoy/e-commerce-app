const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

// Run the actual TypeScript entry points with isolated database/framework mocks.
function load(file, mocks = {}) {
  const source = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true, target: ts.ScriptTarget.ES2020,
    },
  });
  const exports = {};
  vm.runInNewContext(outputText, {
    exports,
    require(name) {
      if (Object.hasOwn(mocks, name)) return mocks[name];
      if (name === "react/jsx-runtime") return require(name);
      throw new Error(`Unexpected dependency: ${name}`);
    },
  }, { filename: file });
  return exports;
}

const { publicUserSelect } = load("libs/publicUser.ts");
const storedUser = {
  id: "user-1", name: "Test", email: "test@example.com", role: "USER",
  image: null, emailVerified: null,
  createdAt: new Date(), updatedAt: new Date(), hashedPassword: "secret-hash",
};

function projectUser(select) {
  assert.ok(select, "Database query must explicitly select public user fields");
  assert.equal(select.hashedPassword, undefined);
  return Object.fromEntries(Object.keys(select).map(key => [key, storedUser[key]]));
}

test("registration response excludes the password hash", async () => {
  const { POST } = load("app/api/register/route.ts", {
    "@/libs/publicUser": { publicUserSelect },
    bcrypt: { hash: async (password, cost) => {
      assert.equal(password, "test-password");
      assert.equal(cost, 10);
      return "secret-hash";
    } },
    "@/libs/prismadb": { user: { create: async ({ data, select }) => {
      assert.equal(data.hashedPassword, "secret-hash");
      assert.equal(data.password, undefined);
      return projectUser(select);
    } } },
    "next/server": { NextResponse: { json: value => value } },
  });
  const response = await POST({ json: async () => ({
    name: "Test", email: storedUser.email, password: "test-password",
  }) });
  assert.equal(response.email, storedUser.email);
  assert.equal(Object.hasOwn(response, "hashedPassword"), false);
});

test("current-user props exclude the password hash", async () => {
  const { default: getCurrentUser } = load("actions/getCurrentUser.ts", {
    "@/libs/publicUser": { publicUserSelect },
    "@/pages/api/auth/[...nextauth]": { authOptions: {} },
    "next-auth": { getServerSession: async () => ({ user: { email: storedUser.email } }) },
    "@/libs/prismadb": { user: { findUnique: async ({ select }) => projectUser(select) } },
  });
  const user = await getCurrentUser();
  assert.ok(user);
  assert.equal(user.email, storedUser.email);
  assert.equal(Object.hasOwn(user, "hashedPassword"), false);
});

for (const user of [null, { role: "USER" }, { role: "ADMIN" }]) {
  test(`admin layout enforces access for ${user?.role ?? "anonymous"}`, async () => {
    const NullData = () => null;
    const { default: Layout } = load("app/admin/layout.tsx", {
      "../components/admin/AdminNav": () => null,
      "@/actions/getCurrentUser": async () => user,
      "@/app/components/NullData": NullData,
      "next/navigation": { redirect: url => { throw new Error(`redirect:${url}`); } },
    });
    if (!user) {
      await assert.rejects(Layout({ children: "private-content" }), /redirect:\/login/);
    } else {
      const result = await Layout({ children: "private-content" });
      assert.equal(result.type === NullData, user.role !== "ADMIN");
      assert.equal(JSON.stringify(result).includes("private-content"), user.role === "ADMIN");
    }
  });
}

for (const [file, model, method, args, selectUser] of [
  ["getUsers", "user", "findMany", [], query => query.select],
  ["getOrders", "order", "findMany", [], query => query.include.user.select],
  ["getOrdersByUserId", "order", "findMany", ["user-1"], query => query.include.user.select],
  ["getProducts", "product", "findMany", [{ page: 1, pageSize: 10 }], query => query.include.reviews.include.user.select],
  ["getProductById", "product", "findUnique", [{ productId: "valid-id" }], query => query.include.reviews.include.user.select],
]) {
  test(`${file} excludes hashes from returned user records`, async () => {
    let queried = false;
    const { default: action } = load(`actions/${file}.ts`, {
      "@/libs/publicUser": { publicUserSelect },
      mongodb: { ObjectId: { isValid: () => true } },
      "@/libs/prismadb": { [model]: {
        [method]: async query => {
          queried = true;
          const user = projectUser(selectUser(query));
          return method === "findMany" ? [user] : user;
        },
        count: async () => 1,
      } },
    });
    const result = await action(...args);
    assert.ok(queried);
    assert.equal(JSON.stringify(result).includes("secret-hash"), false);
  });
}

for (const user of [null, { role: "USER" }]) {
  test(`dashboard does not query admin data for ${user?.role ?? "anonymous"}`, async () => {
    const unexpectedQuery = () => { throw new Error("Unauthorized data query"); };
    const { default: Page } = load("app/admin/page.tsx", {
      "@/actions/getCurrentUser": async () => user,
      "@/actions/getGraphData": unexpectedQuery,
      "@/actions/getOrders": unexpectedQuery,
      "@/actions/getProducts": unexpectedQuery,
      "@/actions/getUsers": unexpectedQuery,
      "@/utils/getTotalProductCount": { getTotalProductCount: unexpectedQuery },
      "@/app/components/NullData": () => null,
      "../components/Container": () => null,
      "next/dynamic": () => () => null,
    });
    await Page();
  });
}
