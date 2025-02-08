"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import EpisodeCard from "@/components/EpisodeCard";
import { Episode } from "@/utils/Interfaces";
import Footer from "@/components/Footer";
import PaginationControls from "@/components/PaginationControls";
import { getEpisodes } from "@/services/ApiServices";
import Loader from "@/components/Loader";
import { useSearchParams, useParams } from "next/navigation"; // Import useSearchParams

export default function EpisodeListPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const animeId = searchParams.get("code");
  const anime = params.anime;

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(episodes.length / itemsPerPage);
  const paginatedEpisodes = episodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const getEpisodesList = async () => {
    const episodesResponse = await getEpisodes(animeId);
    if (episodesResponse?.code == 200) {
      setEpisodes(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        episodesResponse?.results?.map((episode: any) => {
          return {
            id: episode?.id,
            number: episode?.number,
            title: episode?.title,
            thumbnail: episode?.image,
          };
        })
      );
      setLoading(false);
    }
  };
  useEffect(() => {
    getEpisodesList();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      {/* Page Content */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-6">Episodes</h2>

        {/* Episode Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {paginatedEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              id={episode.id}
              title={episode.title}
              thumbnail={episode.thumbnail}
              number={episode.number}
              animeId={animeId}
              anime={anime}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <PaginationControls
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </section>
      <Footer />
    </div>
  );
}
