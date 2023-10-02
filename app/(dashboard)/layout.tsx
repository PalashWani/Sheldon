import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <div className="h-full relative">
      {/* Hidden on Mobile devices but flex on modeium and above */}
      {/* inset-y-0 means top-0px bottom-0px */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0  bg-gray-900">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
        {/* we gave it a left padding of 72 coz it should not overlap with the sidebar as the sidebar has width 72px */}
      </div>
        <main className="md:pl-72">
            <Navbar/>
            {children}
        </main>
    </div>
  );
};

export default DashboardLayout;
