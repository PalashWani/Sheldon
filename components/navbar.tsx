import MobileSidebar from "@/components/mobile-sidebar"
import { getApiLimitCount } from "@/lib/api-limit"

//This userbutton is a clerk component which gives us signout functionality automatically we havent created it ourselves
import { UserButton } from "@clerk/nextjs"
const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="flex flex-center p-4">
        <MobileSidebar apiLimitCount={apiLimitCount}/>
        <div className="w-full flex justify-end">
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  )
}

export default Navbar