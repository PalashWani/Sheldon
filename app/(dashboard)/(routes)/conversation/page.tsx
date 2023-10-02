"use client";

import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import axios from "axios";
//Zod can be used to define our form schema for the form below
import { useRouter } from "next/navigation";
//it is used in constants.ts
import * as z from "zod";
import { Heading } from "@/components/heading";
// This also from Shad cn
import { FormField, FormItem, FormControl, Form } from "@/components/ui/form";
import { MessageSquare } from "lucide-react";
//We added this react-hook-form pakage from shadcn
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
//ZodResolver is basically used to control the calidation for this form
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { log } from "console";
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-model";
import toast from "react-hot-toast";
const ConversationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  //We are giving  a type to the useState
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  //Instead of using useState to check if loading or not loading useForm has inbuilt functionality
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if(error?.response?.status === 403)
      {
        proModal.onOpen();
      }
      else
      {
        toast.error("Something went wrong!")
      }
    } finally {
      router.refresh(); //Refetches the server components which helps us update the api req counter 
    }
  };

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
        <div>
          {/* Passing all the functions of the useForm to this Form element */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                            rounded-lg
                            border w-full p-4 px-3 md:px-6 focus-within:shadow-sm
                            grid grid-cols-2 gap-2
                        "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        //As we are spreading field we dont have to write the onChange onBlur etc if you go to field by ctrl + click then you can find thhese attributes there
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="No Conversation Started!" />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
