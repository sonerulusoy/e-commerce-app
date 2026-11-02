import AdminNav from "../components/admin/AdminNav";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import { redirect } from "next/navigation";

export const metadata = {
  title: "E-commerce Admin",
  description: "E-commerce Admin Dashboard",
};
const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/login");

  if (currentUser.role !== "ADMIN") {
    return <NullData title="Access denied" />;
  }

  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
