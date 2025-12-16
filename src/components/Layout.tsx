import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
