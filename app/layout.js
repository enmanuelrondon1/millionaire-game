import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InstallPWA from "./components/InstallPWA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Juegos de Concurso",
  description: "Una colección de juegos de concurso para desafiar tus conocimientos.",
  manifest: "/manifest.json",
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
        <InstallPWA />
      </body>
    </html>
  );
}