import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ isLoaded, themeIndex, onThemeChange, isScrolled, movingShoeRef }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const shoeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const badgesRef = useRef(null);
  const dividerRef = useRef(null);
  const buttonRef = useRef(null);
  const platformRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const currentIndex = themeIndex;

  useGSAP(() => {
    if (!isLoaded) return;
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // --- ENTRANCE SEQUENCE ---
    tl.from(leftRef.current, { x: -80, opacity: 0, duration: 1 }, 0)
      .from(titleRef.current, { y: -50, opacity: 0, duration: 0.9, ease: "back.out(1.4)" }, 0.1)
      .from(subtitleRef.current, { y: 25, opacity: 0, duration: 0.7 }, 0.35)
      .from(dividerRef.current, { scaleX: 0, transformOrigin: "left center", duration: 0.8 }, 0.5)
      .fromTo(buttonRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.7);

    // Initial entrance for the LOCAL shoe
    if (shoeRef.current) {
      tl.fromTo(shoeRef.current,
        { x: 900, opacity: 0, scale: 0.75, rotation: 20 },
        { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 1.4, ease: "expo.out" },
        0.3
      );
    }

    tl.from(platformRef.current, { opacity: 0, scale: 0.5, duration: 0.6 }, 1.4);

    // --- CONTINUOUS FLOATING ---
    if (shoeRef.current) {
      gsap.to(shoeRef.current, {
        y: -18,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.8,
      });
    }

    gsap.to(platformRef.current, {
      scaleX: 0.85,
      opacity: 0.5,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.8,
    });

  }, [isLoaded]);

  const shoes = [
    {
      name: "Air More Uptempo",
      color: "Black",
      image: "/images/tempo.png",
      bg: "#000000",
      price: "₹18,999",
      rotate: "-20deg",
      scale: 0.95,
      title1: "Own the",
      strokeWord: "streets",
      title2: "with style.",
    },
    {
      name: "Air Jordan 18",
      color: "Green",
      image: "/images/jordan.png",
      bg: "#003311",
      price: "₹16,499",
      rotate: "20deg",
      translateY: "60px",
      scale: 1.1,
      title1: "Defy gravity,",
      strokeWord: "fly",
      title2: "higher.",
    },
    {
      name: "Air DT Max '96",
      color: "Red",
      image: "/images/dtmax.png",
      bg: "#4d0000",
      price: "₹17,999",
      rotate: "-20deg",
      scale: 0.85,
      title1: "Elevate every",
      strokeWord: "step",
      title2: "you take.",
    },
    {
      name: "Air Max Premium",
      color: "White",
      image: "/d69971809daa3242a4b6efc91e7a4d2a-removebg-preview.png",
      bg: "#ffffff",
      price: "₹19,499",
      rotate: "-10deg",
      scale: 1.0,
      title1: "Pure",
      strokeWord: "elegance",
      title2: "in motion.",
    }
  ];

  const animateShoeChange = (newIndex) => {
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;

    if (shoeRef.current) {
      gsap.to(shoeRef.current, {
        x: -300, opacity: 0, scale: 0.8, rotation: -10, duration: 0.15, ease: "power1.in",
        onComplete: () => {
          onThemeChange(newIndex);
          gsap.fromTo(shoeRef.current,
            { x: 400, opacity: 0, scale: 0.8, rotation: 15 },
            { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.2, ease: "expo.out" }
          );
        }
      });
    }

    gsap.to([titleEl, subtitleEl, buttonRef.current], {
      y: -20, opacity: 0, duration: 0.15, stagger: 0.05,
      onComplete: () => {
        gsap.fromTo([titleEl, subtitleEl, buttonRef.current],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.2, stagger: 0.05, ease: "power1.out" }
        );
      }
    });
  };

  useEffect(() => {
    if (!isLoaded || isScrolled) return;
    const timer = setInterval(() => {
      animateShoeChange((currentIndex + 1) % shoes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isLoaded, isScrolled, currentIndex, shoes.length]);

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: shoes[currentIndex].bg }}
      className={`w-full h-screen ${isLoaded ? "opacity-100" : "opacity-0"} relative flex flex-col md:flex-row items-center justify-start md:justify-between px-6 md:px-16 overflow-hidden transition-colors duration-700 pt-6 md:pt-28`}
    >
      {/* ================= LEFT CONTENT ================= */}
      <div ref={leftRef} className="w-full h-full md:h-auto md:w-[60%] md:max-w-[550px] z-30 flex flex-col items-center md:items-start text-center md:text-left relative justify-between md:justify-start py-4 md:py-0">
        <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
          <h1 ref={titleRef} className={`text-3xl sm:text-5xl md:text-[64px] font-black uppercase ${shoes[currentIndex].color === 'White' ? 'text-[#006437]' : 'text-white'} leading-[1.1] tracking-normal`}>
            {shoes[currentIndex].title1}<br />
            <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${shoes[currentIndex].color === 'White' ? 'rgba(0,100,55,1)' : 'rgba(255,255,255,1)'}` }}>
              {shoes[currentIndex].strokeWord}
            </span> {shoes[currentIndex].title2}
          </h1>

          <h2 ref={subtitleRef} className={`text-xs sm:text-base md:text-3xl font-bold tracking-[2px] md:tracking-[8px] uppercase ${shoes[currentIndex].color === 'White' ? 'text-[#006437]' : 'text-white'} mt-4 md:mt-10`}>
            {shoes[currentIndex].name}
          </h2>

          <div ref={dividerRef} className="h-1 w-20 md:w-32 mt-6 bg-white/30" />
        </div>

        <button
          ref={buttonRef}
          onClick={() => navigate('/collections')}
          className={`md:mt-12 px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs md:text-sm transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl hover:shadow-2xl flex items-center gap-3 group z-40 mb-14 md:mb-0 ${shoes[currentIndex].color === 'White'
              ? 'bg-[#006437] text-white'
              : 'bg-white text-black'
            }`}
        >
          Shop Now
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>


      {/* ================= LOCAL SHOE ================= */}
      <div
        className="absolute left-1/2 md:left-auto md:right-[5%] top-[54%] md:top-1/2 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 w-[240px] sm:w-[350px] md:w-[700px] h-[200px] md:h-[600px] flex items-center justify-center pointer-events-none z-10"
      >
        <img
          ref={shoeRef}
          src={shoes[currentIndex].image}
          alt="Featured Shoe"
          className="w-full h-auto object-contain drop-shadow-[0_40px_120px_rgba(0,0,0,0.9)] opacity-0"
          style={{
            transform: `translateY(${shoes[currentIndex].translateY || "0px"}) rotate(${shoes[currentIndex].rotate || "0deg"}) scale(${shoes[currentIndex].scale || 1})`,
            transformOrigin: 'center center',
          }}
        />

        {/* Platform ellipses */}
        <svg
          ref={platformRef}
          className="absolute bottom-1/4 md:bottom-12"
          width="100%"
          height="80"
          viewBox="0 0 500 80"
        >
          <ellipse cx="250" cy="40" rx="200" ry="35" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="5,5" />
          <ellipse cx="250" cy="40" rx="180" ry="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
