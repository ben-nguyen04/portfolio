import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benjamin Nguyen | Portfolio",
  description:
    "Computer Systems Engineering student at ASU. Skilled in Java, C/C++, Python, JavaScript, and Linux/Unix environments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
