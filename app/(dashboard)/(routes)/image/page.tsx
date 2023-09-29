"use client";

import Empty from "@/components/empty";
import Image from "next/image";
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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { FormField, FormItem, FormControl, Form } from "@/components/ui/form";
import { ImageIcon, Download } from "lucide-react";
//We added this react-hook-form pakage from shadcn
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
//ZodResolver is basically used to control the calidation for this form
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardFooter } from "@/components/ui/card";
const ImagePage = () => {
  const router = useRouter();
  //We are giving  a type to the useState
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });
  //Instead of using useState to check if loading or not loading useForm has inbuilt functionality
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);

      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      {/* Just passing props to the heading component */}
      <Heading
        title="Image Generation"
        description="Generate Images as you imagine!"
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A picture of margot robbie dancing"
                        //As we are spreading field we dont have to write the onChange onBlur etc if you go to field by ctrl + click then you can find thhese attributes there
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <div>
              <Empty label="No images generated!" />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card key={src} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={src} alt="Image" fill />
                </div>
                <CardFooter>
                  <Button className="w-full" variant={"secondary"} onClick={()=> window.open(src)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
