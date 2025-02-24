import Container from "@/app/components/Container";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import dynamic from "next/dynamic";

const OrdersClient = dynamic(() => import("./OrdersClient"), { ssr: false });

const Orders = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <NullData title="Access denied" />;
  }
  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No orders yet..." />;
  }

  return (
    <div className="pt-8 ">
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
