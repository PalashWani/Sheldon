"use client";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-model";
import { Code, ImageIcon, MessageSquare, Music, VideoIcon,ArrowRight, Check , Zap} from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      href: "/conversation",
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Music Generation",
      icon: Music,
      href: "/music",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
      href: "/image",
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      color: "text-orange-700",
      bgColor: "bg-orange-700/10",
      href: "/video",
    },
    {
      label: "Code Generation",
      icon: Code,
      color: "text-green-700",
      bgColor: "bg-green-700/10",
      href: "/code",
    },
  ];

const ProModal = () => {
  const proModal = useProModal();
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade Sheldon!
              <Badge className="uppercase text-sm py-1" variant={"premium"}>
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-zinc-900 text-center pt-2 space-y-2 font-medium">
            {tools.map((tool) => (
                <Card
                    key={tool.href}
                    className="p-3 border-black/5 flex items-center justify-between"
                >
                    <div className="flex items-center gap-x-4">
                        <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                            <tool.icon className={cn("w-6 h-6", tool.color)}/>
                        </div>
                        <div className="font-semibold text-sm">
                            {tool.label}
                        </div>
                    </div>
                    <Check className="text-primary w-5 h-5"/>
                </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button className="w-full" variant={"premium"} size={"lg"}>
                Upgrade
                <Zap className="w-4 h-4 ml-2 fill-white"/>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;