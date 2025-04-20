
import localFont from "next/font/local";

export const danaExtraBold = localFont({
  src: [{  path: "../../../public/fonts/dana-extrabold.woff2", weight: "600", style: "normal" }],
  display: "swap",
});
export const danaBold = localFont({
  src: [{  path: "../../../public/fonts/dana-bold.woff2", weight: "600", style: "normal" }],
  display: "swap",
});
export const dana = localFont({
  src: [{  path: "../../../public/fonts/dana-demibold.woff2", weight: "600", style: "normal" }],
  display: "swap",
});

export const danaLight = localFont({
  src: [{ path: "../../../public/fonts/dana-medium.woff2", weight: "400", style: "normal" }],
  display: "swap",
});
