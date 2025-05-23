import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/utils/providers/AuthProvider";
import { LoadingProvider } from "@/utils/providers/LoadingContext";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "./providers/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StayMi",
  description: "StayMi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mx-auto">
          <AuthProvider>
            <ReactQueryProvider>
              <LoadingProvider>{children}</LoadingProvider>
              <Toaster richColors position="top-right"></Toaster>
            </ReactQueryProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
