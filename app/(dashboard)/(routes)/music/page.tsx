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
import {  Music } from "lucide-react";
//We added this react-hook-form pakage from shadcn
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
//ZodResolver is basically used to control the calidation for this form
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
const MusicPage = () => {
  const router = useRouter();
  //We are giving  a type to the useState
  const [music, setMusic] = useState<string>();

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
      setMusic(undefined);

      const response = await axios.post('/api/music', values);
      console.log(response)

      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      console.log(error);
      
    } finally {
      router.refresh();
    }
  }
  return (
    <div>
      {/* Just passing props to the heading component */}
      <Heading
        title="Music"
        description="Hear Melody with just a few keys tap!"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
                        placeholder="Piano Solo"
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
          {!music && !isLoading && (
            <div>
              <Empty label="No Music Generated!" />
            </div>
          )}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music}/>
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;