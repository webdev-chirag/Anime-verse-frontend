"use client";

import AnimeDetails from "@/components/AnimeDetails";
import BannerSection from "@/components/BannerSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Recommendations from "@/components/Recommendations";
import RelatedContents from "@/components/RelatedContents";
import TrailerSection from "@/components/TrailerSection";
import { getInfo } from "@/services/ApiServices";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnimeDetailPage() {
  const params = useParams(); // Unwrap the params
  const animeId = params.animeId;
  const anime: any = {
    title: "Attack on Titan",
    description:
      "In a world where humanity resides within enormous walled cities to protect themselves from the Titans, Eren Yeager vows to eradicate them after witnessing the destruction of his home.",
    banner: "/attack-on-titan-banner.jpg",
    cover: "/attack-on-titan.jpg",
    genres: ["Action", "Fantasy", "Drama"],
    tags: ["Shonen", "Apocalyptic", "Revenge"],
    studio: "Wit Studio",
    trailer: "https://www.youtube.com/embed/-G9BqkgZXRA",
    relatedContent: [],
  };
  const [animeInfo, setAnimeInfo] = useState(anime);
  const getAnimeInfo = async () => {
    const response = await getInfo(animeId);
    if (response.code == 200) {
      setAnimeInfo({
        title: response?.title?.english ?? response?.title?.userPreferred,
        description: response?.description,
        cover: response?.coverImage?.large,
        banner: response?.bannerImage,
        genres: response?.genres,
        tags: response?.tags.map((tag: any) => tag.name),
        trailer:
          response?.trailer?.site == "youtube"
            ? `https://www.youtube.com/embed/${response?.trailer?.id}`
            : "",
        relatedContent: response?.relation.map((content: any) => {
          return {
            id: content?.id,
            title: content?.title?.english ?? content?.title?.userPreferred,
            image: content?.coverImage?.large,
            genres: content?.genres,
            year: content?.seasonYear,
            status: content?.status,
            episodes: content?.episodes,
            ratings: content?.averageScore,
            type: content?.type,
          };
        }),
        studio: response.studios[0].name,
      });
    }
    console.log(response);
  };
  useEffect(() => {
    getAnimeInfo();
  }, []);
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* <Navbar /> */}

      <BannerSection banner={animeInfo?.banner} />

      <AnimeDetails
        title={animeInfo?.title}
        description={animeInfo?.description}
        cover={animeInfo?.cover}
        genres={animeInfo?.genres}
        tags={animeInfo?.tags}
        studio={animeInfo?.studio}
      />

      {animeInfo?.trailer && <TrailerSection trailer={animeInfo?.trailer} />}

      {animeInfo?.relatedContent.length > 0 && (
        <RelatedContents relatedContentList={animeInfo?.relatedContent} />
      )}

      {/* <Recommendations recommendationsList={animeInfo?.recommendations} /> */}

      <Footer />
    </div>
  );
}
