import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "../styles/toast.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fleepr Challenge",
  description: "A content review dashboard built with Next.js, Tailwind CSS, and Supabase. Submit videos for review and manage approvals seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <ToastContainer />
        <main className="flex flex-col w-full bg-gray-100 min-h-screen px-10 lg:px-30 py-20 xl:pl-84 xl:py-20 xl:pr-20">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
