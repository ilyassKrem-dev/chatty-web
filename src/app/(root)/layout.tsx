import "../globals.css";
import type { Metadata } from "next";

import { Sora } from "next/font/google";
import Navbar from "@/components/root/Navbar";
import Logo from "@/components/root/Logo";
import AuthProvider from "@/assets/other/Wrappers/NextAuthWrapper";
const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatty",
  description: "Chat with your friend,or Ai in Chatty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`bg-light ${sora.className}`}>
          <AuthProvider>
            <Navbar />
            <Logo />
            <main>
              {children}
            </main>
            
          </AuthProvider>
      </body>
     
    </html>
  );
}
