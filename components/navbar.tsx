import MobileSidebar from "@/components/mobile-sidebar"
import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription";

//This userbutton is a clerk component which gives us signout functionality automatically we havent created it ourselves
import { UserButton } from "@clerk/nextjs"
const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <div className="flex flex-center p-4">
        <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
        <div className="w-full flex justify-end">
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  )
}

export default Navbar