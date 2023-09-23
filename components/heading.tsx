// This heading component can be used for every AI functions like image generateKey, video gen
// as it is getting all its diff properties in form of props which makes it reusable
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// This interface is like a template which the heading must follow it is usually used for type checking
interface HeadingProps {
  title: String;
  description: String;
  //If ahaving problems replace this below lucide icon with any
  icon: LucideIcon;
  //? means if present then
  iconColor?: String;
  bgColor?: String;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={cn("p-2 w-fit rounded-md", bgColor)}>
          {/* got this icon in the props from page.tsx in conversation where we had to map icon:Icon as components cannot have smaller case names */}
          <Icon className={cn("w-10 h-10", iconColor)} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
  );
};
