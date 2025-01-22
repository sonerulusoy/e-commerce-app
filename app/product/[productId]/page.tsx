import Container from "@/app/components/Container";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import getCurrentUser from "@/actions/getCurrentUser";
import dynamic from "next/dynamic";
import { ObjectId } from "mongodb"; // ObjectId doğrulaması için ekledik

const AddRating = dynamic(() => import("./AddRating"), { ssr: false });
const ListRating = dynamic(() => import("./ListRating"), { ssr: false });
const ProductDetails = dynamic(() => import("./ProductDetails"), { ssr: false });

interface IParams {
  productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  // Eğer productId undefined veya geçersiz bir formattaysa hemen null döndür
  if (!params.productId || !ObjectId.isValid(params.productId)) {
    return <NullData title="Invalid product ID format" />;
  }

  const product = await getProductById(params);
  const user = await getCurrentUser();

  if (!product) {
    return <NullData title="Oops! Product with the given id does not exist" />;
  }

  return (
    <div className="p-8 ">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
