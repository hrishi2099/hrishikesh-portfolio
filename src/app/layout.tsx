import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hrishikesh — Software Engineer",
  description: "Full-stack software engineer crafting scalable systems and exceptional digital experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
