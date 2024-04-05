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
import { loginValidation } from "@/lib/validation/login"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter,useSearchParams } from "next/navigation"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
export default  function LoginForm() {
    const [errorE,setErrorE] = useState<string>("")
    const [errorP,setErrorP] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    const form = useForm({
        resolver:zodResolver(loginValidation),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const { executeRecaptcha } = useGoogleReCaptcha();

    const onSubmit = async (values:z.infer<typeof loginValidation>) => {
      if(loading) return
      setLoading(true)
      try {
        if(!executeRecaptcha) {
            setLoading(false)
            throw {
              title:"reCaptcha not available at the moment",
              decription:"Please try again",
            }
          }
          const reCaptchaToken = await executeRecaptcha("login")
          const resp = await signIn("credentials",{
            redirect:false,
            email:values.email,
            password:values.password,
            token:reCaptchaToken
          })
          if(resp?.error) {
            setLoading(false)
            if(resp.error.includes('password')) {
                return setErrorP(resp?.error?.split(": ")[1])
            } else {
    
                return setErrorE(resp?.error?.split(": ")[1])
            }
          }
          if(searchParams?.get("next")) {
            router.push(searchParams?.get("next") as string)
          } else {
            router.push('/chat')
          }
          
      } catch (error) {
        console.error("An error occurred:", error);
      }
      
    }
    const handeGoogleClick = async() => {
        if(!executeRecaptcha) {
            setLoading(false)
            throw {
              title:"reCaptcha not available at the moment",
              decription:"Please try again",
            }
          }
          const reCaptchaToken = await executeRecaptcha("login")
          if(!reCaptchaToken) return setLoading(false)
          const resp = await signIn("google",{
            callbackUrl:"/chat"
          })
          
          
    }   
    
  return (
    <Form {...form}>
    
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-4 sm:w-[400px] h-full rounded-lg flex flex-col relative">
        <div onClick={() => router.push('/')} className="absolute top-[2.5rem] left-3 text-2xl cursor-pointer rounded-full hover:bg-black/20 p-2 transition-all duration-300 active:opacity-60">
          <FaArrowLeft />
        </div>
        <h1 className=" self-center text-xl underline">Login</h1>
        <div className="flex items-center text-sm gap-4 self-center bg-gray-200 p-2 w-full  rounded-full justify-center cursor-pointer hover:opacity-60" onClick={handeGoogleClick}>
            <FcGoogle className="text-2xl"/>
            <p className="cursor-pointer"><span className="hidden sm:inline">Login with</span> google</p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input  onChangeCapture={() => setErrorE("")} type={"email"} placeholder="Email" {...field} />
              </FormControl>
              {errorE&&<p className="text-accent text-sm font-medium ">{errorE}</p>}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input onChangeCapture={() => setErrorP('')} type={"password"} placeholder="Password" {...field} />
              </FormControl>
              {errorP&&<p className="text-accent text-sm font-medium ">{errorP}</p>}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
            {!loading&&<p className="cursor-pointer">Login</p>}
            {loading&&
            <LoadingAnimation />}
          
        </Button>
        <Button type="button" onClick={() => router.push('/signup')}>
            <p className="cursor-pointer">Sign up</p>
            
          
        </Button>
      </form>
    </Form>
  )
}
