"use client";

import Empty from "@/components/empty";
import Loader from "@/components/loader";
import axios from "axios";
//Zod can be used to define our form schema for the form below
import { useRouter } from "next/navigation";
//it is used in constants.ts
import * as z from "zod";
import { Heading } from "@/components/heading";
// This also from Shad cn
import { FormField, FormItem, FormControl, Form } from "@/components/ui/form";
import {  Music, VideoIcon } from "lucide-react";
//We added this react-hook-form pakage from shadcn
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
//ZodResolver is basically used to control the calidation for this form
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProModal } from "@/hooks/use-pro-model";

import { useState } from "react";
const VideoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  //We are giving  a type to the useState
  const [video, setVideo] = useState<string>();

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
      setVideo(undefined);

      const response = await axios.post('/api/video', values);
      console.log(response)

      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      if(error?.response?.status === 403)
      {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  }
  return (
    <div>
      {/* Just passing props to the heading component */}
      <Heading
        title="Video Generation"
        description="Turn your Prompt into Video!"
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                        placeholder="Horse Running"
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
          {!video && !isLoading && (
            <div>
              <Empty label="No video Generated!" />
            </div>
          )}
          {video && (
            <video controls className="w-full mt-8 aspect-video rounded-lg border bg-black">
              <source src={video}/>
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
