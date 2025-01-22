import Container from "@/app/components/Container";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";
import dynamic from "next/dynamic";

interface IParams {
  orderId?: string;
}

const OrderDetails = dynamic(() => import("./OrderDetails"), { ssr: false });
const OrderItem = dynamic(() => import("./OrderItem"), { ssr: false });

const Order = async ({ params }: { params: IParams }) => {
  const order = await getOrderById(params);

  if (!order) return <NullData title="No order"></NullData>;

  return (
    <div className="p-8 ">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
