import BannerPage from "@/components/banner/BannerPage";
import BodyPrvider from "@/components/ui-providers/BodyProvider";

export default function page() {
  return (
    <BodyPrvider>
      <BannerPage />
    </BodyPrvider>
  );
}
