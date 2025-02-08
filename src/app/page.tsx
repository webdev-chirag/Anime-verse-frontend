"use client";
import BrowseByGenreSection from "@/components/BrowseByGenreSection";
import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { getPopuler, getTrending } from "@/services/ApiServices";
import { useEffect, useState } from "react";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [trending, setTrending] = useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [populars, setPopulars] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const getTrendingList = async () => {
    const response = await getTrending({
      limit: 20,
      p: 1,
    });
    if (response?.code == 200) {
      setTrending(response?.results);
    }
    setLoading(false);
  };
  const getPopularList = async () => {
    const response = await getPopuler({
      limit: 20,
      p: 1,
    });
    if (response?.code == 200) {
      setPopulars(response?.results);
    }
    setLoading(false);
  };
  useEffect(() => {
    getTrendingList();
    getPopularList();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-900 text-white font-sans min-h-screen">
      <Navbar />
      <HeroSection trending={trending ?? []} />
      {trending.length > 0 && (
        <FeaturedSection list={trending ?? []} title="Trending Anime" />
      )}
      {populars.length > 0 && (
        <FeaturedSection list={populars ?? []} title="Popular Anime" />
      )}
      <BrowseByGenreSection />
      <Footer />
    </div>
  );
}
