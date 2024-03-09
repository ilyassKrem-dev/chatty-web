"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {} from "next-auth"
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
import { signIn } from "next-auth/react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
export default  function SignUpForm() {
  
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
      
      if(!executeRecaptcha) {
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
          email:values.email,
          password:values.password,
          token:reCaptchaToken
        })
      })
      const responseData = await response.json();
      if(!response.ok) {
        throw new Error(responseData.message || "Failed to sign up");
      }
      if(responseData.message) router.push('/signin')
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
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input type={"email"} placeholder="Email" {...field} />
              </FormControl>
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
                <Input type={"password"} placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </Form>
  )
}
