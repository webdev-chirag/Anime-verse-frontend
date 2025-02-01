"use client";
import BrowseByGenreSection from "@/components/BrowseByGenreSection";
import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { getTrending } from "@/services/ApiServices";
import { useEffect, useState } from "react";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const getTrendingList = async () => {
    const response = await getTrending({
      limit: 20,
      p: 1,
    });
    if (response.code == 200) {
      setTrending(response.results);
    }
  };
  useEffect(() => {
    getTrendingList();
  }, []);
  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedSection trending={trending} />
      <BrowseByGenreSection />
      <Footer />
    </div>
  );
}
