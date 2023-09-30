"use client";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNT } from "@/constants";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@//components/ui/button";
import { Zap } from "lucide-react";

interface FreeCounterProps{
    apiLimitCount: number
}
const FreeCounter = ({
    apiLimitCount=0
}: FreeCounterProps) => {
    //THIS BELOW MOUNTED IS TO PREVENT HYDRATION ERRORS
    const[mounted, setMounted] = useState(false);
    useEffect(()=> {
        setMounted(true);
    },[])
    return ( 
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-sm text-white mb-4 text-center space-y-2">
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNT} Free Generations
                        </p>
                        <Progress
                            className="h-3"
                            value={(apiLimitCount/MAX_FREE_COUNT)*100}
                        />
                    </div>
                    <Button className="w-full" variant={"premium"}>
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default FreeCounter;