import AnimeCard from "../AnimeCard";

export default function RelatedContents({ relatedContentList }: any) {
  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-4">Related Content</h2>
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-6">
        {relatedContentList.map((content: any, index: number) => (
          <div key={index.toString()} className="sm:w-1/2 md:w-1/5 px-2">
            <AnimeCard
              id={content?.id}
              title={content?.title}
              image={content?.image}
              genre={content?.genres}
              year={content?.year}
              status={content?.status}
              episodes={content?.episodes}
              ratings={content?.averageScore}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
