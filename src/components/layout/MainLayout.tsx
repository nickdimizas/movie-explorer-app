import type { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              MovieFinder
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
            v1.0
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/30 py-6 text-center text-xs text-slate-500">
        <p>Built with React, TypeScript, TanStack Query & Tailwind CSS</p>
      </footer>
    </div>
  );
};
