import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { Inter, Archivo, Space_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resumate — Career Tools That Actually Help",
  description:
    "Free, privacy-first career tools. Build stunning resumes, track job applications, and secure your digital footprint.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#10b981", // Emerald 500
          colorBackground: "#09090b", // Zinc 950
          colorText: "#e4e4e7", // Zinc 200
          colorInputBackground: "#18181b", // Zinc 900
          colorInputText: "#e4e4e7",
          borderRadius: "0.5rem",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${archivo.variable} ${spaceMono.variable} bg-background text-foreground antialiased min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200`}>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </body>
      </html>
    </ClerkProvider>
  );
}
