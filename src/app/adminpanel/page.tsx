"use client"
import ThemeToggleButton from "@/components/Toggle-mode";
import BodyPrvider from "@/components/ui-providers/BodyProvider";
import Link from "next/link";

export default function AdminPanel() {
  return (
    <BodyPrvider>
      <p>admin Page</p>
      <ThemeToggleButton />
      <div className="">
        <Link href="adminpanel/manageuser">Manage users</Link>
      </div>
      <div className="">
        <Link href="adminpanel/managecategory">Manage category</Link>
      </div>
      <div className="">
        <Link href="adminpanel/manageproduct">Manage products</Link>
      </div>
      <div className="">
        <Link href="adminpanel/manageuser">Manage orders</Link>
      </div>
      <div className="">
        <Link href="adminpanel/managebanner">Manage banner</Link>
      </div>
    </BodyPrvider>
  );
}
