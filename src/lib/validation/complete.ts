import z from "zod"


export const completeValidation = z.object({
    name:z.string().min(4,{message:"Minimun 4 character"}).max(15,{message:"Max 15 character"}),
    image:z.string(),
    bio:z.string().min(5,{message:"Minimun 5 character"}).max(80)

})