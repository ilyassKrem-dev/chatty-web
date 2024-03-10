import type { Metadata } from "next";
import { Sora } from "next/font/google";
import AuthProvider from "@/assets/other/Wrappers/NextAuthWrapper";
import "../globals.css";

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
    <html lang="en">
      <body className={sora.className}>
        <AuthProvider >
          <main>
            {children}
          </main>
          
        </AuthProvider>
      </body>
    </html>
  );
}
