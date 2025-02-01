import { useState, useEffect } from "react";
import AnimeCard from "../AnimeCard";

export default function FeaturedSection({ trending }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerView = 7;
  const autoplayDelay = 3000;

  const handleNext = () => {
    if (currentSlide < trending.length - slidesPerView) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(trending.length - slidesPerView);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, autoplayDelay);
    return () => {
      clearInterval(interval);
    };
  }, [currentSlide]);

  useEffect(() => {
    handleNext();
  }, [trending]);
  return (
    <section id="featured" className="container mx-auto py-16 px-6">
      <h3 className="text-3xl font-bold text-center mb-10">Trending Anime</h3>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out sm:grid-cols-3 md:grid-cols-5"
          style={{
            transform: `translateX(-${(currentSlide / slidesPerView) * 100}%)`,
          }}
        >
          {trending.map((item: any, index: number) => (
            <div key={index.toString()} className="sm:w-1/2 md:w-1/5 px-2">
              <AnimeCard
                id={item?.id}
                title={item?.title.english ?? item?.title.userPreferred}
                image={item?.coverImage?.extraLarge}
                genre={item?.genres}
                year={item?.seasonYear}
                status={item?.status}
                episodes={item?.episodes}
                ratings={item?.averageScore}
              />
            </div>
          ))}
        </div>

        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100 transition"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100 transition"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
