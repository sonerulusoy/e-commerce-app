import Container from "@/app/components/Container";
import getProducts from "@/actions/getProducts";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import dynamic from "next/dynamic";
import { Product } from "@prisma/client";

const ManageProductsClient = dynamic(
  () => import("./ManageProductsClient"),
  {
    ssr: false,
  }
);

const ManageProducts = async () => {
  // Tüm ürünleri çek (reviews ve user bilgileri dahil)
  const productsData = await getProducts({ category: null, page: 1, pageSize: 100 });
  const products = productsData.products;

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Access denied" />;
  }

  // products verisini ManageProductsClient'ın beklediği formata dönüştür
  const extractedProductData = products.map((product) => ({
    id: product.id,
    name: product.name,
    author: product.author,
    description: product.description,
    price: product.price,
    category: product.category,
    language: product.language,
    inStock: product.inStock,
    image: product.image,
    stock: product.stock,
  }));

  return (
    <div className="pt-8 ">
      <Container>
        <ManageProductsClient products={extractedProductData} />
      </Container>
    </div>
  );
};

export default ManageProducts;