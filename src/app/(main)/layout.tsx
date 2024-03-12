import type { Metadata } from "next";
import { Sora } from "next/font/google";
import AuthProvider from "@/assets/other/Wrappers/NextAuthWrapper";
import "../globals.css";
import SessionCheck from "@/assets/other/Wrappers/SessionCheck";
import RightNav from "@/components/main/nav/RightNav";
import BottomNav from "@/components/main/nav/BottomNav";
import Theme from "@/assets/Theme/Theme";


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
          <SessionCheck>
            <Theme>
              <main className="flex flex-row">
                <RightNav />
                <section className="flex min-h-screen flex-1 flex-col items-center px-6 pt-28 pb-10 max-md:pb-32 sm:px-10">
                  <div className="w-full max-w-4xl">
                    {children}
                  </div>
                </section>
              </main>
              <BottomNav />
            </Theme>
          </SessionCheck>
        </AuthProvider>
      </body>
    </html>
  );
}
