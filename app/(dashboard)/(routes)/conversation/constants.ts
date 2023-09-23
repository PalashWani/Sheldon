import * as z from "zod"

//creating Schema for Form
export const formSchema = z.object({
    //Prompt should be of type string and minimum 1 character and if the validation fails the below message is displayed
    prompt:z.string().min(1, {
        message: "Prompt is required!"
    }),
});