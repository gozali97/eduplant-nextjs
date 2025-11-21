import { getHomePageData, getAppInfo } from "@/lib/data";
import { HomePageContent } from "@/components/HomePageContent";

export default function Home() {
  const homeData = getHomePageData();
  const appInfo = getAppInfo();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <HomePageContent data={homeData} appInfo={appInfo} />
    </div>
  );
}
