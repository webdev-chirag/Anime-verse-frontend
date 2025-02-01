import Link from "next/link";

function AnimeCard1({ title, image, genre, year }: any) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/20 hover:scale-105 transition">
      <img
        src={image}
        alt="Anime"
        width={150}
        height={200}
        className="rounded-lg"
      />
      <h4 className="text-xl font-semibold mt-4">{title}</h4>
      <p className="text-gray-300">
        {genre} | {year}
      </p>
    </div>
  );
}

export default function AnimeCard({
  id,
  title,
  genre,
  image,
  ratings,
  status,
  episodes,
  year,
  type,
}: any) {
  return (
    <Link href={`/info/${id}`}>
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-3 rounded-lg shadow-lg border border-white/20 hover:scale-105 transition relative group w-48 h-72">
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
