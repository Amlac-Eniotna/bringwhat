import { ThemeProvider } from "@/components/theme/theme-provider";
import { ModeToggle } from "@/components/theme/toggle-theme";
import type { Metadata } from "next";
import { Nunito, Nunito_Sans, Syne } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BringWhat",
  description: "Liste entre ami",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${nunitoSans.variable} ${nunito.variable} ${syne.variable} font-nunito-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="relative m-auto flex w-full max-w-3xl justify-between">
            <Link href={"/"}>
              <h1 className="font-syne p-4 text-3xl font-black">Bliag</h1>
            </Link>
            <div className="p-4">
              <ModeToggle />
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
