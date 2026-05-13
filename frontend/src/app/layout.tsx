import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Indian Aura - Handcrafted Indian Artistry",
    template: "%s | Indian Aura",
  },
  description:
    "Indian Aura brings you exquisite handcrafted Indian decor. From diyas to puja thalis, discover premium festive essentials that turn your house into a home.",
  keywords: [
    "Indian decor",
    "handmade diya",
    "puja items",
    "festive decoration",
    "Indian artistry",
    "handcrafted decor",
    "toran",
    "puja thali",
    "Indian home decor",
    "traditional crafts",
  ],
  openGraph: {
    title: "Indian Aura - Handcrafted Indian Artistry",
    description:
      "Exquisite handcrafted Indian decor blending tradition with modern elegance.",
    type: "website",
    locale: "en_IN",
    siteName: "Indian Aura",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
