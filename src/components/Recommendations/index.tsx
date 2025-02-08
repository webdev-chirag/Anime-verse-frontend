import AnimeCard from "../AnimeCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Recommendations({ recommendationsList }: any) {
  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-4">You May Also Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-6">
        {/* // eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {recommendationsList.map(
          (content: {
            id: number;
            title: string;
            image: string;
            genres: Array<string>;
            episodes: number;
            status: string;
            year: string;
            averageScore: number;
          }) => (
            <AnimeCard
              key={content?.id}
              id={content?.id}
              title={content?.title}
              image={content?.image}
              genre={content?.genres}
              year={content?.year}
              status={content?.status}
              episodes={content?.episodes}
              ratings={content?.averageScore}
            />
          )
        )}
      </div>
    </section>
  );
}
