import {z} from "zod"


export const signUpValidation = z.object({
    name:z.string().min(3,{message:"Provide a name"}).max(15,{message:"Max 15 characters "}),
    email:z.string().email({ message: "Invalid email address" }).min(1),
    password:z.string().min(6,{message:"Must be 6 or more characters long"}),
    confirmPassword: z.string()

}).refine(data => data.password === data.confirmPassword, {
    message:"Passwords don't match",
    path:["confirmPassword"]
})