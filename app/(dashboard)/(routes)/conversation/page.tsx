"use client";

//Zod can be used to define our form schema for the form below
//it is used in constants.ts
import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
//We added this react-hook-form pakage from shadcn
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
//ZodResolver is basically used to control the calidation for this form
import { zodResolver } from "@hookform/resolvers/zod";
// This also from Shad cn
import { FormField, FormItem, FormControl, Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const ConversationPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  //Instead of using useState to check if loading or not loading useForm has inbuilt functionality
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
                    Messages Content
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
