"use client";
import AnimeDetails from "@/components/AnimeDetails";
import BannerSection from "@/components/BannerSection";
import EpisodesSection from "@/components/EpisodesSection";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
// import Recommendations from "@/components/Recommendations";
import RelatedContents from "@/components/RelatedContents";
import TrailerSection from "@/components/TrailerSection";
import {
  getEpisodes,
  getInfo,
  // getRecommendations,
} from "@/services/ApiServices";
import { Anime, Content } from "@/utils/Interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnimeDetailPage() {
  const params = useParams();
  const animeId = params.anime;
  const [selectedVersion, setSelectedVersion] = useState("sub");
  const [loading, setLoading] = useState(true);
  const [animeInfo, setAnimeInfo] = useState<Anime>({
    id: "",
    subId: "",
    dubId: "",
    isDubAvailable: false,
    title: "",
    description: "",
    banner: "",
    cover: "",
    genres: [],
    tags: [],
    studio: "",
    trailer: "",
    relatedContent: [],
  });
  const [episodes, setEpisodes] = useState([]);
  // const [recommendations, setRecommendations] = useState([]);

  const getAnimeInfo = async () => {
    const response = await getInfo(animeId);
    if (response?.code == 200) {
      setAnimeInfo({
        id: response?.id,
        subId: response?.id_provider?.idGogo,
        dubId: response?.id_provider?.idGogoDub,
        isDubAvailable: response?.dub,
        title: response?.title?.english ?? response?.title?.userPreferred,
        description: response?.description,
        cover: response?.coverImage?.large,
        banner: response?.bannerImage,
        genres: response?.genres,
        tags: response?.tags.map((tag: { name: string }) => tag.name),
        trailer:
          response?.trailer?.site == "youtube"
            ? `https://www.youtube.com/embed/${response?.trailer?.id}`
            : "",
        relatedContent: response?.relation.map((content: Content) => {
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
        studio: response?.studios[0]?.name,
      });
      setLoading(false);
      getEpisodesList();
      // getRecommendationsList();
    }
  };
  const getEpisodesList = async () => {
    const response = await getEpisodes(animeId);
    if (response?.code == 200) {
      setEpisodes(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response?.results?.map((episode: any) => {
          return {
            id: episode?.id,
            number: episode?.number,
            title: episode?.title,
            thumbnail: episode?.image,
          };
        })
      );
    }
  };
  // const getRecommendationsList = async () => {
  //   const response = await getRecommendations(animeId, {
  //     page: 1,
  //     limit: 10,
  //   });
  //   if (response?.code == 200) {
  //     setRecommendations(
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       response?.results?.map((recommendation: any) => {
  //         return {
  //           id: recommendation?.id,
  //           title:
  //             recommendation?.title?.english ??
  //             recommendation?.title?.userPreferred,
  //           image: recommendation?.coverImage?.large,
  //           genres: recommendation?.genres,
  //           status: recommendation?.status,
  //           episodes: recommendation?.episodes,
  //           ratings: recommendation?.averageScore,
  //           type: recommendation?.type,
  //         };
  //       })
  //     );
  //   }
  // };
  useEffect(() => {
    getAnimeInfo();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-900 text-white min-h-screen mt-14 sm:mt-0">
      <Navbar />
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

      {episodes.length > 0 && (
        <EpisodesSection
          episodes={episodes}
          animeInfo={animeInfo}
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
        />
      )}

      {animeInfo?.relatedContent.length > 0 && (
        <RelatedContents relatedContentList={animeInfo?.relatedContent} />
      )}
      {/* {recommendations.length > 0 && (
        <Recommendations recommendationsList={recommendations} />
      )} */}
      <Footer />
    </div>
  );
}
