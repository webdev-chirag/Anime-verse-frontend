export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full h-[600px] bg-cover bg-center flex items-center justify-center text-center"
      style={{ backgroundImage: "url('/images/banner.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-gray-900"></div>
      <div className="relative max-w-3xl mx-auto px-6">
        <h2 className="text-5xl font-bold drop-shadow-xl">
          Unlimited Anime Streaming
        </h2>
        <p className="text-lg text-gray-300 mt-4">
          Watch thousands of anime shows in HD quality, with no ads!
        </p>

        {/* Search Bar with Glassmorphism */}
        <div className="mt-6 flex items-center bg-white bg-opacity-20 backdrop-blur-lg p-3 rounded-full max-w-md mx-auto shadow-lg border border-white/30">
          <input
            type="text"
            placeholder="Search anime..."
            className="flex-grow p-3 text-white bg-transparent outline-none placeholder-gray-300 text-lg"
          />
          <button className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition shadow-md">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
