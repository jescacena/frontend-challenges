import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

type HomeLayoutProps = {
  children: ReactNode;
};

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="app-shell">
      <Header />
      <div className="site-content">{children}</div>
      <Footer />
    </div>
  );
}
