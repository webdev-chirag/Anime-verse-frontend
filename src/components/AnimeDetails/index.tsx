export default function AnimeDetails({
  cover,
  title,
  description,
  genres,
  tags,
  studio,
}: any) {
  return (
    <section className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-60">
          <img
            src={cover}
            alt={title}
            width={240}
            height={360}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p
            className="text-gray-300 mt-4"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>

          <div className="mt-4 flex flex-wrap gap-2">
            {genres.map((genre: any, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-600 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
            {tags.map((tag: any, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-4">
            <span className="text-gray-400">Studio:</span>{" "}
            <span className="font-semibold">{studio}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
