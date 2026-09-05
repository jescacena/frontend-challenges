import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Code_Pro } from "next/font/google";
import { HomeLayout } from "@/components/home-layout";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Challenges for Humans",
  description: "Static catalog of frontend markdown challenges",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${sourceCodePro.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <HomeLayout>{children}</HomeLayout>
      </body>
    </html>
  );
}
