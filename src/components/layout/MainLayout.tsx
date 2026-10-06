import type { PropsWithChildren } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Skip link για keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:p-3 focus:bg-indigo-600 focus:text-white focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Header Component */}
      <Header />

      {/* Main Content Area */}
      <main
        id="main-content"
        className="flex-1 max-w-7xl w-full mx-auto px-4 py-8"
      >
        {children}
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};
