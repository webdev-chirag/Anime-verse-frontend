import AnimeCard from "../AnimeCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FeaturedSection({ title, list }: any) {
  return (
    <section id="featured" className="container mx-auto py-8 sm:py-16 px-6">
      <h3 className="text-xl sm:text-2xl font-bold text-center mb-10">{title}</h3>

      <div className="relative">
        <div
          className="flex overflow-x-auto scroll-snap-x-mandatory gap-1 sm:gap-1 py-2"
          style={{
            scrollSnapType: "x mandatory",
          }}
        >
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            list.map((item: any, index: number) => (
              <div
                key={index.toString()}
                className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/6 px-4 scroll-snap-start"
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
            ))
          }
        </div>
      </div>
    </section>
  );
}
