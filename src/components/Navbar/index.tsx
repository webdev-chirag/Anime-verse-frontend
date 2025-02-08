"use client";
import { getSearch } from "@/services/ApiServices";
import { debounce } from "@/utils/CommonServices";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredResults, setFilteredResults] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const searchTermRef = useRef(searchTerm);
  searchTermRef.current = searchTerm;
  const getSeachResults = async () => {
    const response = await getSearch({
      q: searchTermRef.current,
      p: 1,
      limit: 6,
    });
    if (response?.code == 200) {
      setFilteredResults(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response?.results?.map((anime: any) => {
          return {
            id: anime?.id,
            title: anime?.title?.english ?? anime?.title?.userPreferred,
          };
        })
      );
      setLoading(false);
    }
  };
  const debouncedGetResults = useCallback(
    debounce(() => {
      getSeachResults();
    }, 500),
    []
  );
  useEffect(() => {
    setLoading(true);
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
    } else {
      debouncedGetResults();
    }
  }, [searchTerm]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">AnimeVerce</h1>

      {/* Desktop Search Box */}
      <div className="hidden md:block relative w-64" ref={searchRef}>
        <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
          <input
            type="text"
            placeholder="Search Anime..."
            className="w-full bg-transparent text-white focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchOpen(true)}
          />
          {searchTerm ? (
            <FiX
              className="text-white cursor-pointer"
              onClick={() => {
                setSearchTerm("");
                setSearchOpen(false);
              }}
            />
          ) : (
            <FiSearch className="text-white cursor-pointer" />
          )}
        </div>

        {/* Dropdown for search suggestions */}
        {searchOpen && (
          <div className="absolute top-full mt-2 w-full bg-gray-800 text-white rounded-lg shadow-lg z-50">
            {filteredResults.length > 0 ? (
              <ul>
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  filteredResults.map((anime: any) => (
                    <Link href={`/anime/${anime.id}/info`} key={anime.id}>
                      <li
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                        // onClick={() => {
                        //   setSearchTerm(anime.title);
                        //   setSearchOpen(false);
                        // }}
                      >
                        {anime.title}
                      </li>
                    </Link>
                  ))
                }
                <Link href={`/anime/search?q=${searchTermRef.current}`}>
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-center">
                    View All
                  </li>
                </Link>
              </ul>
            ) : (
              !loading &&
              searchTerm.trim() !== "" && (
                <div className="p-4">No results found</div>
              )
            )}
            {loading && searchTerm.trim() !== "" && (
              <div className="p-4  text-center">loading</div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Search Icon */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
      >
        {mobileSearchOpen ? <FiX /> : <FiSearch />}
      </button>

      {/* Mobile Search Box Below Navbar */}
      {mobileSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900 px-4 py-3 shadow-md">
          <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
            <input
              type="text"
              placeholder="Search Anime..."
              className="w-full bg-transparent text-white focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm ? (
              <FiX
                className="text-white cursor-pointer"
                onClick={() => setSearchTerm("")}
              />
            ) : (
              <FiSearch className="text-white cursor-pointer" />
            )}
          </div>

          {/* Dropdown for search suggestions */}
          <div className="bg-gray-800 text-white rounded-lg shadow-lg mt-3">
            {filteredResults.length > 0 ? (
              <ul>
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  filteredResults.map((anime: any) => (
                    <Link href={`/anime/${anime.id}/info`} key={anime.id}>
                      <li
                        key={anime.id}
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                        // onClick={() => {
                        //   setSearchTerm(anime.title);
                        //   setMobileSearchOpen(false);
                        // }}
                      >
                        {anime.title}
                      </li>
                    </Link>
                  ))
                }
                <Link href={`/anime/search?q=${searchTermRef.current}`}>
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-center">
                    View All
                  </li>
                </Link>
              </ul>
            ) : (
              searchTerm.trim() !== "" && (
                <div className="p-4">No results found</div>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
