import Link from "next/link";

export default function AnimeCard({
  id,
  title,
  genre,
  image,
  ratings,
  status,
  episodes,
  year,
  type, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <Link href={`/anime/${id}/info`}>
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-3 rounded-lg shadow-lg border border-white/20 hover:scale-105 transition relative group w-full sm:w-48 h-72 mx-auto mb-6">
        {/* Image with a fixed aspect ratio */}
        <img
          src={image}
          alt={title}
          width={200}
          height={270}
          className="rounded-lg w-full h-48 object-cover" // Ensures the image maintains the aspect ratio
        />

        {/* Title and genre */}
        <h4 className="text-sm font-semibold mt-3 overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </h4>
        {year && <p className="text-gray-300 text-xs">{year}</p>}

        {/* Tooltip (Glassmorphism Effect) */}
        <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 rounded-lg">
          <div className="text-white text-xs">
            <h5 className="text-sm font-semibold">{title}</h5>
            {type && (
              <p>
                <strong>Type:</strong> {type}
              </p>
            )}
            {ratings && (
              <p>
                <strong>Ratings:</strong> {ratings}
              </p>
            )}
            {genre && (
              <p>
                <strong>Genre:</strong> {genre.join(", ")}
              </p>
            )}
            {status && (
              <p>
                <strong>Status:</strong> {status}
              </p>
            )}
            {episodes && (
              <p>
                <strong>Total Episodes:</strong> {episodes}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
