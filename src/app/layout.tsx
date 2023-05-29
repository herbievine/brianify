import "@/styles/globals.css";
import { Inter } from "next/font/google";
import cn from "@/lib/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Brianify",
  description: "Brianify",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
