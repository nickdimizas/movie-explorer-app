interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  label: string;
  className?: string;
}

export const FavoriteButton = ({
  isFavorite,
  onToggle,
  label,
  className = "",
}: FavoriteButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={`Favorite ${label}`}
      aria-pressed={isFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 transition cursor-pointer ${
        isFavorite ? "text-rose-500" : "text-white"
      } ${className}`}
    >
      <svg
        className="w-5 h-5"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};
