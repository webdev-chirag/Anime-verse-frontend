export default function BrowseByGenreSection() {
  return (
    <section id="genres" className="bg-gray-800 py-16 px-6">
      <h3 className="text-3xl font-bold text-center mb-10">Browse by Genre</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {["Action", "Romance", "Adventure", "Fantasy", "Comedy", "Horror"].map(
          (genre, index) => (
            <button
              key={index}
              className="bg-white bg-opacity-20 backdrop-blur-lg text-white px-6 py-3 rounded-full hover:bg-opacity-30 transition shadow-lg border border-white/30"
            >
              {genre}
            </button>
          )
        )}
      </div>
    </section>
  );
}
