"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import LoadingAnimation from "@/assets/other/spinner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation"
import { passwordValidation } from "@/lib/validation/password"
import { addGoogleAccount } from "@/lib/actions/user.action"
interface Props {
  userData:{
      name:string| null | undefined,
      email:string| null | undefined,
      image:string| null | undefined
  };
  handlePassword:() => void;
}

export default  function PasswordForm({userData,handlePassword}:Props) {
    const [loading,setLoading] = useState<boolean>(false)
    const router = useRouter()
    const form = useForm({
        resolver:zodResolver(passwordValidation),
        defaultValues:{
            password:"",
            confirmPassword:""
        }
    })



    const onSubmit = async (values:z.infer<typeof passwordValidation>) => {
      setLoading(true)
      try {
        await addGoogleAccount({
          name:userData.name,
          image:userData.image,
          password:values.password,
          email:userData.email
        })
        handlePassword()  
      } catch (error) {
        console.error("An error occurred:", error);
      }
      
    }

    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-4 sm:w-[400px] h-full rounded-lg flex flex-col relative">
        <div onClick={() => router.back()} className="absolute top-[2.5rem] left-3 text-2xl cursor-pointer rounded-full hover:bg-black/20 p-2 transition-all duration-300 active:opacity-60">
          <FaArrowLeft />
        </div>
        <h1 className=" self-center text-xl underline">Password</h1>
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={"password"} placeholder="Password" {...field} />
              </FormControl>
             
              <FormMessage className="h-1"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input  type={"password"} placeholder="Confirm password" {...field} />
              </FormControl>
              <FormMessage className="h-1"/>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
            {!loading&&<p className="cursor-pointer">Continue</p>}
            {loading&&
            <LoadingAnimation />}
          
        </Button>
      </form>
    </Form>
  )
}
