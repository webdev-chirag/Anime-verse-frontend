"use client";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">AnimeVerce</h1>

      {/* Mobile Menu Button */}
      <button
        className="text-white text-2xl md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Navigation Links */}
      <div
        className={`md:flex gap-6 ${
          isOpen ? "block" : "hidden"
        } absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent bg-opacity-80 md:bg-opacity-0 text-center md:text-left`}
      >
        <Link
          href="/"
          className="block md:inline-block py-2 md:py-0 text-white hover:text-red-500 transition"
        >
          Home
        </Link>
        <Link
          href="/anime/list"
          className="block md:inline-block py-2 md:py-0 text-white hover:text-red-500 transition"
        >
          Anime List
        </Link>
        <Link
          href="/about"
          className="block md:inline-block py-2 md:py-0 text-white hover:text-red-500 transition"
        >
          About
        </Link>
      </div>
    </nav>
  );
}
