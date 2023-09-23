import MobileSidebar from "@/components/mobile-sidebar"

//This userbutton is a clerk component which gives us signout functionality automatically we havent created it ourselves
import { UserButton } from "@clerk/nextjs"
const Navbar = () => {
  return (
    <div className="flex flex-center p-4">
        <MobileSidebar/>
        <div className="w-full flex justify-end">
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  )
}

export default Navbar