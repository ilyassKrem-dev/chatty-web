import { useEffect, useState } from "react"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { userDelete } from "@/lib/actions/user.action";

export default function DeleteTab() {
    const [show,setShow] = useState<boolean>(false)
    const {data:session} = useSession()

    const handleDelete = async() => {
        if(!session) return
        const res = await userDelete(session?.user?.email)
        if(res) signOut()
    }
    useEffect(() => {
        function handleOutsideClick(event: any) {
            const overlay = document.querySelector(".remove-btn");
            if (overlay && !overlay.contains(event.target)) {
              
              setShow(false)
            }
          }
      
          document.body.addEventListener("click", handleOutsideClick);
      
          return () => {
            document.body.removeEventListener("click", handleOutsideClick);
          };
    },[show])
    return (
        <div className="flex gap-5 flex-col w-full items-center">
            <h1 className="font-bold text-2xl">Account delete</h1>
            <div className="w-full max-w-[600px]">
                <div className="bg-gray-100 p-4 rounded-xl flex  gap-6 dark:bg-dark justify-between items-center">
                    <p className="font-semibold ">Delete account</p>
                    <button onClick={() => setShow(true)} className="border rounded-xl border-accent p-2 text-white bg-accent hover:opacity-50 transition-all duration-300 active:opacity-40">
                        Delete
                    </button>
                </div>
                {show&&
                <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50 ">
                    <div className="bg-white w-72 rounded-lg overflow-hidden shadow-xl dark:bg-dark remove-btn">
                        <div className="flex flex-col items-center p-8 space-y-6 remove-del">
                            <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full text-white text-2xl font-bold cursor-pointer hover:opacity-60 transition-all duration-300" onClick={() => setShow(false)}>
                                <span>X</span>
                            </div>
                            <div className="text-center text-gray-800 dark:text-white">
                                <p className="font-semibold">Delete Confirmation</p>
                                <p>Are you sure you want to delete?</p>
                            </div>
                        </div>
                        <div className="flex justify-center bg-red-500 text-white py-4 cursor-pointer hover:bg-red-600 transition-colors duration-300 hover:opacity-60">
                            <button className="focus:outline-none"
                            onClick={() => {
                                handleDelete();
                            }} >Delete</button>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}