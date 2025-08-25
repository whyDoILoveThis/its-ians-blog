import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "@/styles/ItsBtn.css";
import "../styles/Quill.css";
import "../styles/Clerk.css";
import Nav from "@/components/main/Nav";
import "../middleware";
import { ThemeProvider } from "@/context/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ian's Blogs",
  description: "Ian Smith's personal blog platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <body className="min-h-screen bg-slate-200 dark:bg-gray-900 text-black dark:text-white">
            <Nav />
            <div className="mt-20 flex flex-col items-center">{children}</div>
          </body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
