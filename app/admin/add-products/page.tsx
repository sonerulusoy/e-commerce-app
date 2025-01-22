import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import  getCurrentUser  from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import dynamic from "next/dynamic"

const AddProductForm = dynamic(() => import("./AddProductForm"), { ssr: false });

const AddProducts = async () => {
  const currentUser = await getCurrentUser()

  if(!currentUser ||currentUser.role !== 'ADMIN'){
    return <NullData title="Access denied" />
  }


  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm/>
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
