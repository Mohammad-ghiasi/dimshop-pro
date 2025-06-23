import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import MegaMenuContent from "./MegaMenuContent";

export default function MainChart() {
  return (
    <div className="relative group cursor-pointer inline-block">
      <span>
        <Link href="/chart">
          <ShoppingCart />
        </Link>
      </span>
      <div className="hidden lg:block">
        <MegaMenuContent />
      </div>
    </div>
  );
}
