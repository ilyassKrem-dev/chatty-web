"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { data: session } = useSession();
  
  if (session) redirect('/chat');

  return (
    <div className="max-w-3xl text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to Chatty!</h1>
      <p className="text-lg mb-8">Connect with friends and people around the world.</p>
      <div className="flex justify-center mb-12">
        <Link href="/signup" className="bg-white text-blue-500 px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-400 hover:text-white transition duration-300">
          Get Started
        </Link>
      </div>
      <p className="text-sm">Already have an account? <br/> <Link href="/login" className="underline hover:opacity-50 transition-all duration-300">
        Log in here
      </Link>
      </p>
    </div>
    
  );
}
