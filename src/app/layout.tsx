import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "CareerForge — Career Tools That Actually Help",
  description:
    "Free, privacy-first career tools. Build stunning resumes, track job applications, and secure your digital footprint.",
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
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="bg-background text-foreground antialiased min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200">
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </body>
      </html>
    </ClerkProvider>
  );
}
