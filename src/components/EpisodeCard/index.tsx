import Link from "next/link";

export default function EpisodeCard({
  id,
  thumbnail,
  title,
  number,
  animeId,
  anime, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <div
      key={id}
      className="bg-white bg-opacity-10 p-3 rounded-lg shadow-lg border border-white/20 hover:scale-105 transition"
    >
      <div className="w-full h-40 overflow-hidden rounded-lg">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="text-base font-semibold mt-2 truncate max-w-xs">
        {title}
      </h4>
      <p className="text-xs text-gray-300">Episode {number}</p>
      <Link href={`/anime/${anime}/episodes/${number}?code=${animeId}`}>
        <button className="mt-2 w-full bg-red-600 px-3 py-2 rounded text-sm">
          Watch
        </button>
      </Link>
    </div>
  );
}
