import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const UserAvatar = () => {
    const {user} = useUser();

    return (
        <Avatar>
            <AvatarImage src={user?.imageUrl}/>
            {/* If image does not load then the first letter of first name and last name is displayed */}
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
    )
};