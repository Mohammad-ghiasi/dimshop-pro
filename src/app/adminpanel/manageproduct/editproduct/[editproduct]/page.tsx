"use client";
import BodyPrvider from "@/components/ui-providers/BodyProvider";
import AddProductForm from "@/components/product/AddProductForm";
import { useApiQuery } from "@/hooks/useQuery";
import { RootProduct } from "@/types/singlProduct";

export default function EditProductPage({
  params,
}: {
  params: { editproduct: string };
}) {

  const { data } = useApiQuery<RootProduct>({
    queryKey: ["singleproduct"],
    url: `/ManageProduct/GetProductById?id=${Number(params.editproduct)}`,
  });
  console.log("single data", data);

  return (
    <BodyPrvider>
      <div className="mt-[-80px]">
        <p>{params.editproduct}</p>
          <AddProductForm
            initialProductData={data}
          />
      </div>
    </BodyPrvider>
  );
}
