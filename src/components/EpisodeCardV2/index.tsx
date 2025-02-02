export default function EpisodeCard({
  id,
  thumbnail,
  title,
  number,
  onClick, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <div
      key={id}
      className="bg-white bg-opacity-10 backdrop-blur-md p-3 rounded-lg shadow-lg border border-white/20 hover:scale-105 transition relative group cursor-pointer"
      onClick={onClick}
    >
      {/* Image with a fixed aspect ratio */}
      <img
        src={thumbnail}
        alt={title}
        width={180}
        height={100}
        className="rounded-lg w-full h-48 object-cover" // Ensures the image maintains the aspect ratio
      />


      <h3 className="text-md font-semibold mt-2 text-center overflow-hidden whitespace-nowrap text-ellipsis">
        {title}
      </h3>

      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 rounded-lg">
        <div className="text-white text-xs text-center">
          <h5 className="text-sm font-semibold">{title}</h5>
          {number && (
            <p className="text-sm">
              <strong>Episode:</strong> {number}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
