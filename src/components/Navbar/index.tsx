export default function Navbar() {
  return (
    <header className="bg-black py-4 shadow-lg fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-3xl font-extrabold text-blue-500">AnimeVerce</h1>
        <nav className="space-x-8">
          <a href="#home" className="hover:text-blue-400">
            Home
          </a>
          <a href="#genres" className="hover:text-blue-400">
            Genres
          </a>
          <a href="#featured" className="hover:text-blue-400">
            Trending
          </a>
          <a href="#contact" className="hover:text-blue-400">
            Contact
          </a>
        </nav>
      </div>
    </header>

  );
}
