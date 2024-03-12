import z from "zod"

export const passwordValidation = z.object({
    password:z.string().min(6,{message:"Must be 6 or more characters long"}),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message:"Passwords don't match",
    path:["confirmPassword"]
})