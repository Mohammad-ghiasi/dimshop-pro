import api from "@/lib/api";
import Image from "next/image";
import ShoppingChart from "../shoppingBag/ShoppingChart";

export default async function SimpleProduct() {
  const { data: products } = await api.get("/Home/NewProducts");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products?.map((product: any) => (
        <div
          key={product.id}
          className="rounded-2xl overflow-hidden shadow-md border bg-white hover:shadow-xl transition duration-300"
        >
          <div className="relative w-full h-52">
            <Image
              src={product.imagePath}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <ShoppingChart productId={product.id} price={product.price} />
            </div>
            <span className="text-sm text-gray-500">برند: {product.brand}</span>

            <div className="flex items-center justify-between mt-2">
              <span className="text-green-600 font-semibold">
                {(
                  product.price *
                  (1 - product.discount / 100)
                ).toLocaleString()}{" "}
                تومان
              </span>
              {product.discount > 0 && (
                <span className="text-xs line-through text-gray-400">
                  {product.price.toLocaleString()} تومان
                </span>
              )}
            </div>

            <button className="mt-4 bg-black text-white py-1.5 rounded-xl hover:bg-gray-800 transition">
              مشاهده محصول
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
