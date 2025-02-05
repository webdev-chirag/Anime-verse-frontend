import { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HeroSection({ trending }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const autoplayDelay = 5000; // 5 seconds

  // Track touch position
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const swipeThreshold = 50; // Minimum swipe distance to trigger a slide change

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide((currentIndex + 1) % trending.length);
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const changeSlide = (index: number) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(false);
    }, 500);
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  // Handle touch end and determine swipe direction
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const deltaX = touchStartX - touchEndX;
      if (deltaX > swipeThreshold) {
        // Swiped left → next slide
        changeSlide((currentIndex + 1) % trending.length);
      } else if (deltaX < -swipeThreshold) {
        // Swiped right → previous slide
        changeSlide((currentIndex - 1 + trending.length) % trending.length);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section
      id="home"
      className="relative w-full h-[650px] lg:h-[700px] flex items-center text-left overflow-hidden lg:flex-row"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Mobile Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out lg:hidden ${
          isFading ? "opacity-0 scale-150" : "opacity-100 scale-100"
        }`}
        style={{
          backgroundImage: `url('${trending[currentIndex]?.coverImage?.extraLarge}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          minHeight: "100%",
          width: "100%",
        }}
      ></div>

      {/* Dark Overlay (Mobile) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-gray-900 lg:hidden"></div>

      {/* Left Text Section (Mobile) */}
      <div className="absolute bottom-6 left-6 lg:bottom-20 lg:left-20 text-white w-full">
        <h3
          className={`text-lg sm:text-xl md:text-2xl font-bold leading-tight transition-all duration-700 ease-out max-w-xs lg:max-w-lg ${
            isFading ? "opacity-10" : "scale-100 opacity-100"
          }`}
        >
          {trending[currentIndex]?.title.english ??
            trending[currentIndex]?.title.userPreferred}
        </h3>

        <p
          className={`mt-2 text-sm md:text-base text-gray-300 max-w-xs lg:max-w-lg overflow-hidden line-clamp-2 max-h-[70px] transition-all duration-700 ease-in-out ${
            isFading ? "opacity-10" : "scale-100 opacity-100"
          }`}
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          dangerouslySetInnerHTML={{
            __html: trending[currentIndex]?.description ?? "",
          }}
        ></p>

        <Link href={`/anime/${trending[currentIndex]?.id}/info`}>
          <button
            type="button"
            className={`mt-4 bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition-all duration-700 ease-in-out shadow-md sm:px-4 sm:py-2 ${
              isFading ? "opacity-10" : "scale-100 opacity-100"
            }`}
          >
            Details
          </button>
        </Link>
      </div>

      {/* Large Screen Image Card */}
      <div className="hidden lg:flex flex-1 justify-end pr-40 mt-16">
        <div
          className={`relative w-[330px] h-[500px] bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg transition-all duration-700 ease-in-out ${
            isFading ? "opacity-10 scale-150" : "scale-100 opacity-100"
          }`}
        >
          <img
            src={trending[currentIndex]?.coverImage?.extraLarge}
            alt={trending[currentIndex]?.title.english}
            className="w-full h-full object-cover rounded-lg transition-all duration-700 ease-in-out"
          />
        </div>
      </div>

      {/* Dots Indicator (Mobile) */}
      <div className="absolute flex flex-col space-y-2 right-6 top-1/2 transform -translate-y-1/2 lg:hidden">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          trending.map((_: any, index: number) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-gray-400 scale-125" : "bg-gray-700"
              }`}
              onClick={() => changeSlide(index)}
            ></button>
          ))
        }
      </div>

      {/* Prev & Next Buttons (Large Screens) */}
      <div className="hidden lg:flex absolute inset-y-1/2 w-full justify-between items-center px-8 pointer-events-none">
        <button
          onClick={() =>
            changeSlide((currentIndex - 1 + trending.length) % trending.length)
          }
          className="p-4 bg-white/10 backdrop-blur-lg rounded-full shadow-md hover:bg-white/20 transition-all duration-500 pointer-events-auto"
        >
          <FaChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={() => changeSlide((currentIndex + 1) % trending.length)}
          className="p-4 bg-white/10 backdrop-blur-lg rounded-full shadow-md hover:bg-white/20 transition-all duration-500 pointer-events-auto"
        >
          <FaChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}
