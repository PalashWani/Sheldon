import Image from "next/image";

const Loader = () => {
    return ( 
        <div className="h-full flex flex-col items-center justify-center gap-y-4">
            <div className="relative h-10 w-10 animate-spin">
                <Image
                    alt="logo"
                    fill
                    src="/logo1.png"
                />
            </div>
            <p className="text-muted-foreground text-sm">Sheldon is Thinking and You are in His spot!</p>
        </div>
     );
}
 
export default Loader;