"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs"; // React-icons'tan bir arama ikonu

const SearchBar = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push("/");

    const url = queryString.stringifyUrl(
      { url: "/", query: { searchTerm: data.searchTerm } },
      { skipNull: true }
    );

    router.push(url);
    reset();
  };

  return (
    <div className="w-full md:w-auto flex items-center justify-center">
      <div className="relative w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px] ">
        <input
          {...register("searchTerm")}
          autoComplete="off"
          type="text"
          placeholder="Search products..."
          className="
            block
            w-full
            px-4
            py-2.5
            text-gray-700
            bg-white
            border
            border-gray-300
            rounded-full
            focus:outline-none
            focus:ring-0
            focus:border-gray-500
            pl-10
            transition-all
            duration-300
          "
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 cursor-pointer">
          <BsSearch size={18} onClick={handleSubmit(onSubmit)}/>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;