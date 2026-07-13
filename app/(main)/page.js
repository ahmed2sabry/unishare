import { cookies } from "next/headers";
import LandinPage from "../_components/LandingPage";
import BannerHome from "../_components/BannerHome";
import Filter from "../_components/Filter";
import RecentlyViewed from "../_components/RecentlyViewed";
import RecommendedSection from "../_components/RecommendedSection";

export default async function Page() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!refreshToken) return <LandinPage />;

  return (
    <div className="flex flex-col gap-8 md:gap-14 p-4 bg-[#fcfcfc]">
      <BannerHome />
      <Filter />
      <RecentlyViewed />
      <RecommendedSection />
    </div>
  );
}
