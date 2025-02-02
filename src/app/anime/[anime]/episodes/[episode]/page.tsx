"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Episode } from "@/utils/Interfaces";
import { getEpisode, getEpisodes } from "@/services/ApiServices";
import Loader from "@/components/Loader";
import PaginationControls from "@/components/PaginationControls";
import EpisodeCard from "@/components/EpisodeCardV2";

export default function EpisodePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const animeId = searchParams.get("code");
  const anime = params.anime;
  const episode = params.episode;
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState<Episode>({
    id: 1,
    title: "",
    video: "",
    number: 1,
  }); // Default to Episode 1

  const totalPages = Math.ceil(episodes.length / itemsPerPage);
  const paginatedEpisodes = episodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getEpisodesList = async () => {
    const response = await getEpisodes(animeId);
    if (response.code == 200) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fetchedEpisodes = response.results.map((episode: any) => ({
        id: episode?.id,
        number: episode?.number,
        title: episode?.title,
        thumbnail: episode?.image,
      }));
      setEpisodes(fetchedEpisodes);
      setLoading(false);
    }
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getEpisodeData = async (episodeNumber: any = episode) => {
    const response = await getEpisode(anime, episodeNumber);
    if (response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentEp = episodes.find((ep: any) => ep.number == episodeNumber);
      setCurrentEpisode({
        title: currentEp?.title,
        id: response?.info?.id,
        number: response?.info?.episode,
        video: response?.iframe[0]?.iframe,
      });
      setLoading(false);
    }
  };
  const changeEpisode = (number: number) => {
    getEpisodeData(number);
  };
  useEffect(() => {
    getEpisodesList();
    getEpisodeData();
  }, []);
  useEffect(() => {
  }, [currentEpisode]);
  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-6"> Episode {currentEpisode.number}</h2>

        {/* Video Player */}
        <div className="relative w-full max-w-3xl mx-auto">
          <iframe
            key={currentEpisode.video}
            className="w-full h-[500px] rounded-lg shadow-lg"
            src={currentEpisode.video}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Episode Video"
          ></iframe>
        </div>

        {/* Episode Grid */}
        <h3 className="text-2xl font-semibold mt-8 mb-4">Episodes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {paginatedEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              thumbnail={episode?.thumbnail}
              title={episode.title}
              number={episode.number}
              onClick={() => changeEpisode(episode.number)}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
