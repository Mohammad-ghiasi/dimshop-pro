import api from "@/lib/api";
import { cookies } from "next/headers";

export default async function UserServerTest() {
  const token = cookies().get("authToken")?.value;

  if (!token) {
    return null; // توکن نبود، هیچی نشون نده
  }

  try {
    const { data }: any = await api.get("/Account/GetProfile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!data) {
      return <p>hello this is server side user info (logout)</p>; // داده نبود
    }

    return (
      <div>
        <p>hello this is server side user info</p>
        <p>{data?.user.firstName}</p>
      </div>
    );
  } catch (error) {
    // خطا اومد، null برگردون
    return ( <p>hello this is server side user info (logout)</p>);
  }
}
