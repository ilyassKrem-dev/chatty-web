import Link from "next/link";
import { AiOutlineMessage } from "react-icons/ai";
export default function Logo() {
    return (
        <div className="pt-28 py-12 md:p-[2.30rem] text-lg w-full md:w-fit relative md:z-40">
            <Link href={'/'} className="flex items-center gap-1 text-3xl md:text-xl w-full md:w-fit hover:opacity-55 transition-all duration-300 group justify-center md:justify-start">
                Chatty
                <AiOutlineMessage className="text-3xl md:text-2xl text-blue-400 group-hover:animate-bounce"/>
            </Link>
      </div>
    )
}