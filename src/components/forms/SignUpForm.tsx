"use client"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { signUpValidation } from "@/lib/validation/signUp"
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import LoadingAnimation from "@/assets/other/spinner"
export default  function SignUpForm() {
    const [errorN,setErrorN] = useState<boolean>(false)
    const [errorE,setErrorE] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const router = useRouter()
  
    const form = useForm({
        resolver:zodResolver(signUpValidation),
        defaultValues:{
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
        }
    })

    const { executeRecaptcha } = useGoogleReCaptcha();

    const onSubmit = async (values:z.infer<typeof signUpValidation>) => {
      if(loading) return
      setLoading(true)
      if(!executeRecaptcha) {
        setLoading(false)
        throw {
          title:"reCaptcha not available at the moment",
          decription:"Please try again",
        }
      }
      const reCaptchaToken = await executeRecaptcha("signup")
     
      const response = await fetch('/api/signup',{
        method:"POST" ,
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:values.name,
          email:values.email.toLowerCase(),
          password:values.password,
          token:reCaptchaToken
        })
      })
      const responseData = await response.json();
      if(!response.ok) {
        setLoading(false)
        if(responseData.error.startsWith('E')) return setErrorE(true)
        if(responseData.error.startsWith('N')) return setErrorN(true)
        throw new Error(responseData.error ||"Can't sign up rign now,try again later")
      }
      if(responseData.message) router.push('/login')
    }
    
    
  return (
    <Form {...form}>
    
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-4 sm:w-[400px] h-full rounded-lg flex flex-col relative">
        <div onClick={() => router.push('/')} className="absolute top-[2.5rem] left-3 text-2xl cursor-pointer rounded-full hover:bg-black/20 p-2 transition-all duration-300 active:opacity-60">
          <FaArrowLeft />
        </div>
        <h1 className=" self-center text-xl underline">Sign up</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input onChangeCapture={() =>setErrorN(false)} placeholder="Name" {...field} />
              </FormControl>
              {errorN&&<p className="text-accent text-sm font-medium ">Name already exsist</p>}
              <FormMessage className="h-1"/>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input  onChangeCapture={() => setErrorE(false)} type={"email"} placeholder="Email" {...field} />
              </FormControl>
              {errorE&&<p className="text-accent text-sm font-medium ">Email already exsist</p>}
              <FormMessage className="h-1"/>
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
                <Input  type={"password"}  placeholder="Confirm password" {...field} />
              </FormControl>
              <FormMessage className="h-1"/>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {!loading&&<p className="cursor-pointer">Sign up</p>}
          {loading&&<LoadingAnimation />}
        </Button>
        <Link href={"/login"} className="w-full">
          <Button className="w-full bg-gradient-to-r from-black  to-gray-600  hover:opacity-70 hover:text-opacity-100 transition-all duration-200">
            Login
          </Button>
        </Link>
      </form>
    </Form>
  )
}
