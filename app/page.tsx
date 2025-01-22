// app/page.tsx

export const revalidate = 0;

import Container from "./components/Container";
import getProducts, { IProductParams } from "../actions/getProducts";
import NullData from "./components/NullData";
import dynamic from "next/dynamic";
import Pagination from "./components/Pagination";
import { getTotalProductCount } from "../utils/getTotalProductCount";

const ProductCard = dynamic(() => import("./components/products/ProductCard"), {
  ssr: false,
});

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const productData = await getProducts(searchParams);
  const products = productData.products; // Tüm ürünleri productData'dan al

  const totalItems = await getTotalProductCount(searchParams);

  if (products.length === 0) {
    return (
      <NullData title="Oops! No products found. Click 'All' to clear filters" />
    );
  }

  const currentPage = searchParams.page ? Number(searchParams.page) : 1;
  const pageSize = searchParams.pageSize ? Number(searchParams.pageSize) : 50;

  return (
    <div className="p-8 bg-zinc-300">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {products.map((product) => {
            // ProductCard'a sadece ilgili veriyi gönder
            return (
              <ProductCard
                key={product.id}
                data={{
                  id: product.id,
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                  stock: product.stock
                }}
              />
            );
          })}
        </div>

        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </Container>
    </div>
  );
}