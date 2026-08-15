import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

// Plus Jakarta Sans is a professional geometric sans-serif — the closest
// freely-available proxy for Google Sans on Google Fonts.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ceepii - Rent a car for any trip",
  description:
    "Find and book the perfect rental car for any journey. Trusted by renters and hosts worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-white text-slate-900">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
