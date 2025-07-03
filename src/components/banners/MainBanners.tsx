import React from "react";
import BannerCarocel from "./BannerCarocel";
import api from "@/lib/api";

export default async function MainBanners() {
  const {data} = await api.get("/ManagePages/GetBanners")

  return (
    <div>
      <BannerCarocel banners={data}/>
    </div>
  );
}
