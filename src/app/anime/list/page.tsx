"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";

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
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <section className="container mx-auto px-6 py-20 mt-0">
        <h2 className="text-3xl font-semibold mb-6">Anime List</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {animeList.map((anime) => (
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
      </section>
    </div>
  );
}
