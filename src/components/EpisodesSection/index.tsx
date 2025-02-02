import Link from "next/link";
import EpisodeCard from "../EpisodeCard";

export default function EpisodesSection({
  episodes,
  selectedVersion,
  setSelectedVersion,
  animeInfo, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-4">Episodes</h2>

      {/* Sub/Dub Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            selectedVersion === "sub" ? "bg-red-600 text-white" : "bg-gray-700"
          }`}
          onClick={() => setSelectedVersion("sub")}
        >
          Subbed
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedVersion === "dub" ? "bg-red-600 text-white" : "bg-gray-700"
          }`}
          onClick={() => setSelectedVersion("dub")}
        >
          Dubbed
        </button>
      </div>

      {/* Episodes List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          episodes.slice(0, 5).map((ep: any) => (
            <EpisodeCard
              key={ep.id}
              id={ep.id}
              title={ep.title}
              thumbnail={ep.thumbnail}
              number={ep.number}
              animeId={animeInfo.id}
              anime={
                selectedVersion == "dub" ? animeInfo.dubId : animeInfo.subId
              }
            />
          ))
        }
      </div>

      {/* View All Episodes Button */}
      {episodes.length > 5 && (
        <div className="mt-6 text-center">
          <Link
            // href={`/anime/${
            //   selectedVersion == "dub" ? animeInfo.dubId : animeInfo.subId
            // }/episodes`}
            href={`/anime/${
              selectedVersion == "dub" ? animeInfo.dubId : animeInfo.subId
            }/episodes/1`}
            className="text-red-400 hover:underline"
          >
            View All Episodes →
          </Link>
        </div>
      )}
    </section>
  );
}
