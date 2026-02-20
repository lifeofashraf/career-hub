import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { Inter, Archivo, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
  metadataBase: new URL("https://resumate.com"),
  title: "Resumate — Brutalist Resume Builder & Career Tools",
  description:
    "Free, privacy-first career tools. Build stunning ATS-friendly resumes, track job applications, and secure your digital footprint.",
  keywords: ["resume builder", "ATS resume", "career tools", "free resume maker", "job application tracker", "pdf merge", "split pdf", "compress pdf"],
  openGraph: {
    title: "Resumate — Brutalist Resume Builder & Career Tools",
    description: "Free, privacy-first career tools. Build stunning ATS-friendly resumes, track job applications, and secure your digital footprint.",
    url: "https://resumate.com",
    siteName: "Resumate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resumate — Brutalist Resume Builder & Career Tools",
    description: "Free, privacy-first career tools. Build stunning ATS-friendly resumes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${archivo.variable} ${spaceMono.variable} bg-background text-foreground antialiased min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
