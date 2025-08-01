import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Assets
import heroImage from "../assets/Blog.png";
import techImg from "../assets/tech.jpg";
import financeImg from "../assets/finance.jpg";
import travelImg from "../assets/travel.jpg";
import lifestyleImg from "../assets/lifestyle.jpg";
import movieImg from "../assets/movie.jpg";
import musicImg from "../assets/music.jpg";

const Header = () => {
  const navigate = useNavigate();

  // Typewriter setup
  const lines = [
    "Got a story?",
    "A lesson?",
    "A random midnight thought?",
    "This is your space — go write it.",
  ];

  const [displayedLines, setDisplayedLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < lines.length) {
      if (charIndex < lines[lineIndex].length) {
        const timeout = setTimeout(() => {
          const currentLine = displayedLines[lineIndex] || "";
          const updatedLines = [...displayedLines];
          updatedLines[lineIndex] = currentLine + lines[lineIndex][charIndex];
          setDisplayedLines(updatedLines);
          setCharIndex((prev) => prev + 1);
        }, 250);
        return () => clearTimeout(timeout);
      } else {
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }
    }
  }, [charIndex, lineIndex, displayedLines]);

  // Initialize empty lines
  useEffect(() => {
    if (displayedLines.length < lines.length) {
      setDisplayedLines((prev) => [...prev, ""]);
    }
  }, [displayedLines, lines]);

  return (
    <header className="w-full">
      {/* TOP HERO IMAGE SECTION */}
      <div className="relative w-full">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-56 md:h-[25rem] object-cover shadow-md"
        />
      </div>

      {/* BOTTOM 2-COLUMN SECTION */}
      <section className="flex flex-col md:flex-row justify-center items-center gap-8 p-6 md:p-10">
        {/* LEFT: Swiper Carousel */}
        <div className="w-full md:w-1/2 max-w-md rounded-xl overflow-hidden shadow-lg">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            grabCursor={false}
          >
            <SwiperSlide>
              <img src={techImg} alt="Tech" className="w-full object-cover" />
              <p className="text-center text-sm mt-2 font-medium">Tech</p>
            </SwiperSlide>
            <SwiperSlide>
              <img src={financeImg} alt="Finance" className="w-full object-cover" />
              <p className="text-center text-sm mt-2 font-medium">Finance</p>
            </SwiperSlide>
            <SwiperSlide>
              <img src={travelImg} alt="Travel" className="w-full object-cover" />
              <p className="text-center text-sm mt-2 font-medium">Travel</p>
            </SwiperSlide>
            <SwiperSlide>
              <img src={lifestyleImg} alt="Lifestyle" className="w-full object-cover" />
              <p className="text-center text-sm mt-2 font-medium">Lifestyle</p>
            </SwiperSlide>
            <SwiperSlide>
              <img src={movieImg} alt="Movie" className="w-full object-cover" />
              <p className="text-center text-sm mt-2 font-medium">Movie</p>
            </SwiperSlide>
            <SwiperSlide>
              <img src={musicImg} alt="Music" className="w-full object-cover" />
              <p className="text-center text-sm mt-2 font-medium">Music</p>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* RIGHT: Typewriter Text + Static Button */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4 font-['Space_Mono'] text-xl md:text-2xl leading-relaxed">
          {displayedLines.map((line, idx) => (
            <p key={idx}>
              {line}
              {idx === lineIndex && <span className="animate-pulse">|</span>}
            </p>
          ))}

          <button
            className="mt-4 px-6 py-3 text-lg font-bold rounded-full bg-orange-200 text-black border-2 border-white hover:scale-105 hover:bg-[#5d3f45] hover:text-white transition-all duration-300 ease-in-out 
  animate-bounce font-['Space_Mono']"
            onClick={() => navigate("/create")}
          >
            + Create your blog
          </button>
        </div>
      </section>
    </header>
  );
  
};

export default Header;
