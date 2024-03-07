import "../globals.css";
import type { Metadata } from "next";

import { Sora } from "next/font/google";
import Theme from "@/assets/Theme/Theme";
import NavHome from "@/components/Home/NavHome";

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
        
          <Theme>
            
              <main>
                {children}
              </main>

          </Theme>
        
      </body>
     
    </html>
  );
}
