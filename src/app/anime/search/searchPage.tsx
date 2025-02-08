"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import Navbar from "@/components/Navbar";
import AnimeCard from "@/components/AnimeCard";
import Footer from "@/components/Footer";
import { getSearch } from "@/services/ApiServices";
import Loader from "@/components/Loader";
import { PageData } from "@/utils/Interfaces";

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageData, setPageData] = useState<PageData>({
    rows: [],
    pageNumber: 1,
    perPage: 18,
    hasMore: true,
  });

  const getSearchResults = async (reset = false) => {
    if (reset) setLoading(true);
    else setLoadingMore(true);

    const pageNumber = reset ? 1 : pageData.pageNumber;
    const response = await getSearch({
      q: query,
      p: pageNumber,
      limit: 18,
    });

    if (response?.code === 200) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resultsArray = response?.results?.map((anime: any) => ({
        id: anime?.id,
        title: anime?.title?.english ?? anime?.title?.userPreferred,
        image: anime?.coverImage?.large,
        genres: anime?.genres,
        status: anime?.status,
        episodes: anime?.episodes,
        ratings: anime?.averageScore,
        type: anime?.type,
      }));

      const existingIds = new Set(pageData.rows.map((anime) => anime.id));
      const uniqueResults = resultsArray.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (anime: any) => !existingIds.has(anime.id)
      );
      setPageData({
        rows: reset ? uniqueResults : [...pageData.rows, ...uniqueResults],
        pageNumber: pageNumber + 1,
        hasMore: uniqueResults.length >= pageData.perPage,
        perPage: pageData.perPage,
      });
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    getSearchResults(true);
  }, [query]);

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-900 text-white font-sans min-h-screen">
      {/* Header */}
      <Navbar />

      {/* Search Bar with Filters */}
      <section className="pt-24 pb-10 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Search results for: {query}</h2>
      </section>

      {/* Search Results */}
      <section className="container mx-auto px-6 pb-16">
        {pageData.rows.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                pageData.rows.map((anime: any) => (
                  <AnimeCard
                    key={anime?.id}
                    id={anime?.id}
                    title={anime?.title}
                    image={anime?.image}
                    genre={anime?.genres}
                    year={anime?.year}
                    status={anime?.status}
                    episodes={anime?.episodes}
                    ratings={anime?.ratings}
                    type={anime?.type}
                  />
                ))
              }
            </div>

            {/* View More Button */}
            {pageData.hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => getSearchResults(false)}
                  disabled={loadingMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
                >
                  {loadingMore ? "Loading..." : "View More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-300 text-center">No anime found.</p>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
