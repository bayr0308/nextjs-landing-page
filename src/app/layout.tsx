import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/manrope/files/manrope-cyrillic-wght-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ГРАНЬ Девелопмент — новые точки притяжения",
  description:
    "Демонстрационный сайт вымышленного девелопера ГРАНЬ. Четыре жилых квартала, современная архитектура, зелёные дворы и продуманные пространства для жизни.",
  applicationName: "ГРАНЬ Девелопмент",
  robots: { index: false, follow: false },
  openGraph: {
    title: "ГРАНЬ — создаём новые точки притяжения",
    description:
      "Жилые кварталы, в которых архитектура, природа и город становятся частью вашей жизни. Демонстрационный проект.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
