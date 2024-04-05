
import { Sora } from "next/font/google";

import "../globals.css";

const sora = Sora({ subsets: ["latin"] });

import AuthProvider from "@/assets/other/Wrappers/NextAuthWrapper";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`bg-black  items-center sm:flex flex-col justify-center w-full `+sora.className}>
        <AuthProvider>
          <main className="sm:mt-32 mt-10 max-w-[400px] m-auto">
          {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
