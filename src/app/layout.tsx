import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Provider } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

const lexend = Lexend({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "AI Course Generator",
  description: "Create AI-powered courses in minutes, not hours",
  metadataBase: new URL("http://localhost:3000"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(lexend.className, "min-h-screen flex flex-col")}>
        <Provider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
