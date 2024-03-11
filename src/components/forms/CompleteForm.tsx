"use client"
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
import { completeValidation } from "@/lib/validation/complete"
import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { FiUpload } from "react-icons/fi";
import { AddUser } from "@/lib/actions/user.action"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import LoadingAnimation from "@/assets/other/spinner"
interface Props {
    userData:{
        name:string| null | undefined,
        email:string| null | undefined,
        image:string| null | undefined
    }
    
}
export default  function CompleteForm({
    userData
}:Props) {
    const [errorN,setErrorN] = useState<boolean>(false)
    const [files,setFiles] = useState<File[]>([]) 
    const [loading,setLoading] = useState<boolean>(false)
    const {startUpload} = useUploadThing("media")
    const router = useRouter()
    
    const form = useForm({
        resolver:zodResolver(completeValidation),
        defaultValues:{
            name:userData?.name || "",
            image:userData?.image || "/user.png",
            bio:"",
        }
    })
    
    const handleImage = (e:ChangeEvent<HTMLInputElement>,fieldChange:(value:string) => void) => {
        e.preventDefault()
        const fileReader = new FileReader()
        if(e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setFiles(Array.from(e.target.files))
            if(!file.type.includes('image')) return;
            fileReader.onload = async (event) => {
                const imageData = event.target?.result?.toString() || "";
                fieldChange(imageData)
            }
            fileReader.readAsDataURL(file)
        }
    }

    const onSubmit = async (values:z.infer<typeof completeValidation>) => {
      setLoading(true)
      const blob = values.image
      const changed = isBase64Image(blob)
      if(changed) {
        const imgRes = await startUpload(files)
        if(imgRes && imgRes[0].url) {
            values.image = imgRes[0].url
        }
      }

      const added:any = await AddUser({
        name:values.name,
        email:userData.email,
        image:values.image,
        bio:values.bio
      })
      console.log(added)
      
      router.push('/chat')
    }
    
    
  return (
    <Form {...form}>
        
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-4 sm:w-[400px] h-full rounded-lg flex flex-col relative">
        
        <h1 className=" self-center text-xl underline">Complete profile</h1>
        <FormField
          control={form.control}
          name="image"
          
          render={({ field }) => (
            
            <FormItem className="flex gap-2 items-center justify-center sm:ml-2 sm:justify-start">
              <FormLabel className="flex h-24 w-24 sm:w-32 items-center justify-center rounded-full border-2 border-black">
                {
                    field.value ?
                    (
                        <div className="hover:bg-black/80 rounded-full relative group w-full">
                            <Image 
                                src={field.value}
                                priority
                                alt="profile photo"
                                width={96}
                                height={96}
                                className="cursor-pointer rounded-full  object-cover group-hover:opacity-40" />
                                <FiUpload  className="absolute top-[2rem] left-[2.05rem] hidden group-hover:block text-white text-2xl cursor-pointer"/>
                        </div>
                        
                        
                    )
                    :
                    (<div className="hover:bg-black/80 rounded-full relative group ">
                        <Image 
                        src={"/user.png"}
                        priority
                        alt="profile photo"
                        width={96}
                        height={96}
                        className=" cursor-pointer rounded-full   object-cover group-hover:opacity-40 " />
                        <FiUpload  className="absolute top-[2rem] left-[2.05rem] hidden group-hover:block text-white text-2xl sm:group-hover:hidden"/>
                    </div>)
                    
                }
              </FormLabel>
              <FormControl>
                <Input 
                type={"file"} 
                accept="image/*"  
                placeholder="Profile photo" 
                onChange={(e) => handleImage(e,field.onChange)} 
                className="border-none cursor-pointer bg-transparent outline-none file:text-blue-400 hidden sm:block file:cursor-pointer"/>
              </FormControl>
              {errorN&&<p className="text-accent text-sm font-medium ">Name already exsist</p>}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete={"off"}  placeholder="Name" {...field} />
              </FormControl>
              {errorN&&<p className="text-accent text-sm font-medium ">Name already exsist</p>}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea   
                rows={10}
                placeholder="Bio"
                className=" resize-none" 
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
       
       
        <Button type="submit">
          {!loading&&<p className="cursor-pointer">Complete</p>}
          {loading&&
          <LoadingAnimation />}
        </Button>
        
      </form>
    </Form>
  )
}
