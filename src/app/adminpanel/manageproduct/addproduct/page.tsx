import AddProductForm from "@/components/product/AddProductForm";
import BodyPrvider from "@/components/ui-providers/BodyProvider";

export default function page() {
  return (
    <BodyPrvider>
        <div className="mt-[-80px]">
          <AddProductForm />
        </div>
    </BodyPrvider>
  )
}
