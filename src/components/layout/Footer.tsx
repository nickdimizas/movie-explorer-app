export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/30 py-6 text-center text-xs text-slate-500 space-y-1">
      <p>Built with React, TypeScript, TanStack Query & Tailwind CSS</p>
      <p>
        Movie data from{" "}
        <a
          href="https://www.omdbapi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-300 transition"
        >
          OMDb API
        </a>
      </p>
    </footer>
  );
};
