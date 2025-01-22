import getGraphData from "@/actions/getGraphData";
import getOrders from "@/actions/getOrders";
import getProducts, { IProductParams } from "@/actions/getProducts";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import dynamic from 'next/dynamic';
import { getTotalProductCount } from "@/utils/getTotalProductCount";

// Dynamically import Summary with SSR disabled
const Summary = dynamic(() => import("./Summary"), { ssr: false });

// Dynamically import BarGraph with SSR disabled
const BarGraph = dynamic(() => import("./BarGraph"), { ssr: false });

const Admin = async () => {
  const initialProductData = await getProducts({ page: 1, pageSize: 200 });
  const products = initialProductData.products
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();

  const totalProductsCount = await getTotalProductCount({}); // Filtre yoksa boş obje gönderin

  if (!products || !orders || !users || !graphData) {
    return <div>Loading...</div>;
  }

  // products verisini Summary componentinin beklediği formata dönüştür
  const summaryProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    author: product.author,
    description: product.description,
    category: product.category,
    language: product.language,
    image: product.image,
    price: product.price,
    inStock: product.inStock,
    stock: product.stock,
  }));

  return (
    <div className="pt-8 ">
      <Container>
        <Summary
          productsCount={totalProductsCount} // products yerine productsCount gönder
          orders={orders}
          users={users}
        />
        <div className="mt-4 mx-auto max-w-[1150px]">
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
};

export default Admin;