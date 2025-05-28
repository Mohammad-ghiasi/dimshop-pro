import BodyPrvider from "@/components/ui-providers/BodyProvider";
import Link from "next/link";

export default function AdminPanel() {
  return (
    <BodyPrvider>
      <p>admin Page</p>
      <div className="">
        <Link href="adminpanel/manageuser">Manage users</Link>
      </div>
      <div className="">
        <Link href="adminpanel/manageuser">Manage category</Link>
      </div>
      <div className="">
        <Link href="adminpanel/manageuser">Manage products</Link>
      </div>
      <div className="">
        <Link href="adminpanel/manageuser">Manage orders</Link>
      </div>
    </BodyPrvider>
  );
}
