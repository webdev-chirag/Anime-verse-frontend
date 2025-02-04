import { useState, useEffect } from "react";
import AnimeCard from "../AnimeCard";

export default function FeaturedSection({ trending }: any) {
  return (
    <section id="featured" className="container mx-auto py-16 px-6">
      <h3 className="text-3xl font-bold text-center mb-10">Trending Anime</h3>

      <div className="relative">
        <div
          className="flex overflow-x-auto scroll-snap-x-mandatory gap-4 py-2"
          style={{
            scrollSnapType: "x mandatory", // Snap items horizontally
          }}
        >
          {trending.map((item: any, index: number) => (
            <div
              key={index.toString()}
              className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/6 px-2 scroll-snap-start"
            >
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
      </div>
    </section>
  );
}
