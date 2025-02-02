"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AnimeListPage() {
  const animeList = [
    { id: 1, title: "Attack on Titan", image: "/aot.jpg" },
    { id: 2, title: "One Piece", image: "/one-piece.jpg" },
    { id: 3, title: "Naruto", image: "/naruto.jpg" },
    { id: 4, title: "Demon Slayer", image: "/demon-slayer.jpg" },
    { id: 5, title: "Jujutsu Kaisen", image: "/jujutsu-kaisen.jpg" },
    { id: 6, title: "Death Note", image: "/death-note.jpg" },
    { id: 7, title: "Fullmetal Alchemist", image: "/fma.jpg" },
    { id: 8, title: "My Hero Academia", image: "/mha.jpg" },
    { id: 9, title: "Tokyo Revengers", image: "/tokyo-revengers.jpg" },
    { id: 10, title: "Bleach", image: "/bleach.jpg" },
    { id: 11, title: "Chainsaw Man", image: "/chainsaw-man.jpg" },
    { id: 12, title: "Hunter x Hunter", image: "/hxh.jpg" },
  ];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(animeList.length / itemsPerPage);
  const paginatedAnime = animeList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-6">Anime List</h2>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {paginatedAnime.map((anime) => (
            <div
              key={anime.id}
              className="bg-white bg-opacity-10 p-4 rounded-lg shadow-lg hover:scale-105 transition"
            >
              <Image
                src={anime.image}
                alt={anime.title}
                width={220}
                height={320}
                className="rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2 text-center">
                {anime.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-2">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              currentPage === 1 ? "bg-gray-700" : "bg-red-600 hover:bg-red-700"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-red-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-4 py-2 rounded-r-lg ${
              currentPage === totalPages
                ? "bg-gray-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
