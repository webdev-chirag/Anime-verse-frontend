"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const genres = [
    "All",
    "Action",
    "Romance",
    "Adventure",
    "Fantasy",
    "Comedy",
    "Horror",
  ];
  const animeResults = [
    { title: "Naruto", genre: "Action", image: "/naruto.jpg" },
    { title: "Your Name", genre: "Romance", image: "/your-name.jpg" },
    { title: "One Piece", genre: "Adventure", image: "/one-piece.jpg" },
    {
      title: "Attack on Titan",
      genre: "Action",
      image: "/attack-on-titan.jpg",
    },
  ];

  // Filtered anime list based on search term and genre
  const filteredAnime = animeResults.filter(
    (anime) =>
      (selectedGenre === "All" ||
        selectedGenre === "" ||
        anime.genre === selectedGenre) &&
      anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen">
      {/* Header */}
      <header className="bg-black py-4 shadow-lg fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-extrabold text-red-500">AnimeStream</h1>
          <nav className="space-x-8">
            <Link href="/" className="hover:text-red-400">
              Home
            </Link>
            <Link href="#genres" className="hover:text-red-400">
              Genres
            </Link>
            <Link href="#featured" className="hover:text-red-400">
              Trending
            </Link>
            <Link href="#contact" className="hover:text-red-400">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Search Bar with Filters */}
      <section className="pt-24 pb-10 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Find Your Favorite Anime</h2>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center bg-white bg-opacity-20 backdrop-blur-lg p-3 rounded-full shadow-lg border border-white/30">
          <input
            type="text"
            placeholder="Search anime..."
            className="flex-grow p-3 text-white bg-transparent outline-none placeholder-gray-300 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="bg-transparent text-white outline-none p-3"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map((genre, index) => (
              <option
                key={index}
                value={genre}
                className="bg-gray-900 text-white"
              >
                {genre}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Search Results */}
      <section className="container mx-auto px-6 pb-16">
        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredAnime.map((anime, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/20 hover:scale-105 transition"
              >
                <Image
                  src={anime.image}
                  alt={anime.title}
                  width={300}
                  height={400}
                  className="rounded-lg"
                />
                <h4 className="text-xl font-semibold mt-4">{anime.title}</h4>
                <p className="text-gray-300">{anime.genre}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300 text-center">No anime found.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-black py-6 text-center">
        <p>&copy; 2025 AnimeStream. All Rights Reserved.</p>
        <div className="mt-4 space-x-6">
          <Link href="#" className="hover:text-red-400">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-red-400">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-red-400">
            Support
          </Link>
        </div>
      </footer>
    </div>
  );
}
