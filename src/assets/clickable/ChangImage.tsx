

import { FaChevronDown,FaImage } from "react-icons/fa6";

export default function ChangeImage() {


    return (
        <button className="border-2 rounded-xl border-black p-2 flex gap-2 items-center hover:opacity-50 transition-all duration-300 dark:border-white">
            <FaImage />
            <p className=" cursor-pointer ">Change image</p>
            <FaChevronDown />
        </button>
    )
}