import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FUDMA ODL Applicant Portal - Sprint 1",
  description: "Application portal and Remita-ready payment handoff scaffold.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
