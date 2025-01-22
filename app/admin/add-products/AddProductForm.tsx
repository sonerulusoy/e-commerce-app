"use client";

import Heading from "@/app/components/Heading";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import { categories } from "@/utils/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      author: "",
      description: "",
      language: "",
      category: "",
      inStock: false,
      image: "", // Resim URL'si için
      price: "",
      stock: "", // Stok adedi için eklendi
    },
  });

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }

    if (!data.image) {
      setIsLoading(false);
      return toast.error("Image URL is required!");
    }

    try {
      // API'ye gönder
      await axios.post("/api/product", {
        ...data,
        price: parseFloat(data.price), // price'ı float'a çevir
        stock: parseInt(data.stock, 10), // stock'u integer'a çevir
        image: data.image, // Resim URL'si
      });

      toast.success("Product Created");
      setIsProductCreated(true);
      router.refresh();
    } catch (error) {
      toast.error(
        "Something went wrong when saving the product to the database"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading title="Add a Product" center />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="author"
        label="Author"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="language"
        label="Language"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox id="inStock" register={register} label="In Stock" />
      <Input
        id="stock"
        label="Stock"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 max-h-[51vh] overflow-y-auto gap-4">
          {categories.map(
            (item) =>
              item.label !== "All" && (
                <div key={item.label} className="col-span">
                  <CategoryInput
                    onClick={(category) => setValue("category", category)}
                    selected={watch("category") === item.label}
                    label={item.label}
                  />
                </div>
              )
          )}
        </div>
      </div>
      <Input
        id="image"
        label="Image URL"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;