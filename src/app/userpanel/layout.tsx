import { AuthProvider } from "@/components/AuthProvider";
import type { Metadata } from "next";
import { cookies } from "next/headers";
// import Test from "./@userinfo/Test";
import dynamic from "next/dynamic";
// import UserPanelNavigationBar from "@/components/navigation/UserPanelNavigationBar";
const UserPanelNavigationBar = dynamic(
  () => import("@/components/navigation/UserPanelNavigationBar"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Dimshop - userpanel",
  description: "Generated by create next app",
};

export default async function UserLayouLayout({
  children,
  userinfo,
  address,
  orders,
  likes,
  visited,
}: Readonly<{
  children: React.ReactNode;
  userinfo: React.ReactNode;
  address: React.ReactNode;
  orders: React.ReactNode;
  likes: React.ReactNode;
  visited: React.ReactNode;
}>) {
  const token: string | null = cookies().get("authToken")?.value ?? null;

  return (
    <>
      <div className="w-full h-full fixed ">
        <div className="w-full h-full flex flex-row">
          <UserPanelNavigationBar />
          <div className="w-full h-full flex-[13]">
            <div className="md:bg-cad w-full ">{children}</div>
            <div
              className="overflow-y-auto w-full h-full px-4 xl:px-7 2xl:px-48 pt-8 mb-28"
              id="scroll-container"
            >
              <AuthProvider initialToken={token}>
                {/* more commponents */}
                <div id="userinfo" className="flex flex-col lg:flex-row md:gap-x-5">
                  <div className="w-f md:flex-[10] lg:flex-[5]">{userinfo}</div>
                  <div className="w-ull flex-[4] ">{address}</div>
                </div>

                <div className="mb-20">
                  <div className="" id="orders">
                    {orders}
                  </div>
                  <div className="" id="likes">{likes}</div>
                  <div className="" id="visited">{visited}</div>
                </div>
              </AuthProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
