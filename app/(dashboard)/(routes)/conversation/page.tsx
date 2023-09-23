"use client"

//Zod can be used to define our form schema for the form below
//it is used in constants.ts
import * as z from "zod"
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
//We added this react-hook-form pakage from shadcn
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
//ZodResolver is basically used to control the calidation for this form
import {zodResolver} from "@hookform/resolvers/zod"
const ConversationPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    })
    return ( 
        <div>
            {/* Just passing props to the heading component */}
            <Heading 
                title="Conversation"
                description="Next Gen Conversational AI Model."
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">

            </div>
        </div>
     );
}
 
export default ConversationPage;