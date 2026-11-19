import type { Metadata, Viewport } from "next";
import { inter, jetbrainsMono, spaceGrotesk } from "@/lib/fonts";
import { site } from "@/config/site";
import { AnchorScroll } from "@/components/layout/anchor-scroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#efeee9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        {children}
        <AnchorScroll />
      </body>
    </html>
  );
}
