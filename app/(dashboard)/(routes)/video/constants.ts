import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
});

//creating Schema for Form
//Prompt should be of type string and minimum 1 character and if the validation fails the below message is displayed