import localFont from "next/font/local";

export const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk-variable.woff2",
  weight: "300 700",
  variable: "--font-face-space-grotesk",
});

export const inter = localFont({
  src: "../fonts/inter-variable.woff2",
  weight: "300 700",
  variable: "--font-face-inter",
});

export const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-variable.woff2",
  weight: "100 800",
  variable: "--font-face-jetbrains-mono",
});
