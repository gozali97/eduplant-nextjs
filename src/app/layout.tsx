import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AudioProvider } from "@/contexts/AudioContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Media Pembelajaran Interaktif - Bagian Tumbuhan",
  description: "Belajar bagian-bagian tumbuhan dengan cara yang menyenangkan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={outfit.className}>
        <AudioProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            {/* <Footer /> */}
          </div>
        </AudioProvider>
      </body>
    </html>
  );
}
