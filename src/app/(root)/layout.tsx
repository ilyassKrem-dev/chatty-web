import "../globals.css";
import type { Metadata } from "next";

import { Sora } from "next/font/google";
import Theme from "@/assets/Theme/Theme";

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
      <body className={sora.className}>
          <AuthProvider>
            
            <main className="bg-gradient-to-br from-blue-500 to-blue-800 min-h-screen flex flex-col justify-center items-center text-white">
              {children}
            </main>
            
          </AuthProvider>
      </body>
     
    </html>
  );
}
