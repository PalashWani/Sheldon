import Image from "next/image";

interface EmptyProps {
    label: String;
}

const Empty = ({
    label
}: EmptyProps) => {
    return ( 
        <div className="h-full p-20 flex items-center justify-center flex-col">
            <div className="relative w-72 h-72">
                <Image
                    alt="empty"
                    fill
                    src="/empty.png"
                />
            </div>
            <p className="text-muted-foreground text-sm text-center">
                {label}
            </p>
        </div>
     );
}
 
export default Empty;