export const Header = () => {
  return (
    <header
      role="banner"
      className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10 py-4 px-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-hidden="true">
            🎬
          </span>
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            MovieFinder
          </h1>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium"
          aria-label="Application version 1.0"
        >
          v1.0
        </span>
      </div>
    </header>
  );
};
