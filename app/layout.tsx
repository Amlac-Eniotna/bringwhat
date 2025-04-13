import { ThemeProvider } from "@/components/theme/theme-provider";
import ThemeSwitch from "@/components/theme/theme-switch";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
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
      <body className={`${nunitoSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            {/* Votre en-tête ici */}
            <nav>
              {/* Navigation */}
              <ThemeSwitch /> {/* Bouton pour changer de thème */}
            </nav>
          </header>
          <div className="animate-pan">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
