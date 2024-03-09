"use client"
import Link from "next/link";
import ToogleTheme from "@/assets/Theme/ToogleTheme";
import { useEffect, useState } from "react";

export default function Nav({className}:{
    className?:string
}) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={` p-3   w-full ${scrolled ? 'bg-blue-400 dark:bg-accent  z-10 shadow-md fixed top-0' : ''} ${className}`}>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Link href={"/"} className=" text-4xl font-bold text-white dark:text-blue-400 cursor-pointer hover:opacity-60 transition-all duration-200">
                        <span className=" font-mono dark:font-sans dark:text-white">C</span>
                        <span className="dark:text-blue-400 dark:font-mono">h</span>a
                        <span className="text-accent dark:text-white">tt</span>
                        <span className="dark:font-mono">y</span>
                    </Link>
                    <div className="h-1 w-[70px] bg-accent dark:bg-white"/>     
                </div>
                <ToogleTheme />
            </div>
            
        </nav>
    )
}