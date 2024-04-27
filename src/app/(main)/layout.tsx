import type { Metadata } from "next";
import { Sora } from "next/font/google";
import AuthProvider from "@/assets/other/Wrappers/NextAuthWrapper";
import "../globals.css";
import SessionCheck from "@/assets/other/Wrappers/SessionCheck";
import RightNav from "@/components/Navs/RightNav";
import BottomNav from "@/components/Navs/BottomNav";
import Theme from "@/assets/Theme/Theme";
import ChangedBar from "@/components/shared/ChangedBar";
import { SocketProvider } from "@/assets/other/providers/socket-provider";

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
      <body className={` ${sora.className}`}>
        <AuthProvider >
          <SessionCheck>
            
              <Theme>
                <SocketProvider>
                  <main className="flex flex-row ">
                    <RightNav />
                    <ChangedBar />
                    <section className="flex min-h-screen flex-1 flex-col items-center">
                      <div className="w-full">
                        {children}
                      </div>
                    </section>
                  </main>
                  <BottomNav />
                </SocketProvider>
              </Theme>
            
          </SessionCheck>
        </AuthProvider>
      </body>
    </html>
  );
}
