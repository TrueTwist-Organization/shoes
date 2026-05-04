import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PerformanceShowcase = ({ currentTheme }) => {
  const sectionRef = useRef(null);
  const shoeRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1,
      }
    });

    // Shoe flies in from "above" (previous section)
    tl.fromTo(shoeRef.current,
      { y: -500, x: 200, rotation: -40, scale: 0.5, opacity: 0 },
      { y: 0, x: 0, rotation: 10, scale: 1, opacity: 1, duration: 1 }
    );

    gsap.from(contentRef.current.children, {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        toggleActions: "play none none reverse"
      }
    });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className={`snap-section relative w-full min-h-screen md:h-screen ${currentTheme?.sectionBg || 'bg-black'} flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-20 py-8 sm:py-20 transition-colors duration-700`}
    >
      {/* Dynamic Background Circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[600px] md:h-[600px] rounded-full blur-[80px] md:blur-[120px] opacity-20"
        style={{ backgroundColor: currentTheme?.name === 'white' ? '#006437' : '#fff' }}
      ></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 md:gap-20 items-center z-10">

        {/* Shoe Image (The one that "sets" into place) */}
        <div className="relative flex justify-center order-1 lg:order-1">
          <img
            ref={shoeRef}
            src={currentTheme?.image || "/images/tempo.png"}
            alt="Nike Performance"
            className="w-full max-w-[200px] sm:max-w-[400px] md:max-w-[500px] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          />

          {/* Speed Lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none hidden sm:block">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`absolute h-[1px] ${currentTheme?.name === 'white' ? 'bg-black/10' : 'bg-white/10'}`}
                style={{
                  width: Math.random() * 200 + 100,
                  top: `${20 * i + 10}%`,
                  left: '-20%',
                  transform: 'rotate(-20deg)',
                  opacity: 0.2
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex flex-col gap-4 sm:gap-6 md:gap-8 order-2 lg:order-2 text-center lg:text-left items-center lg:items-start px-4 md:px-0">
          <h2 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black ${currentTheme?.primaryText || 'text-white'} uppercase leading-none tracking-tight break-words max-w-full`}>
            Peak <br />
            <span className="text-transparent" style={{ WebkitTextStroke: `1px ${currentTheme?.name === 'white' ? '#006437' : '#fff'}`, paintOrder: "stroke fill" }}>Performance</span>
          </h2>

          <div className="flex flex-col gap-2 sm:gap-4 max-w-md">
            <p className={`${currentTheme?.secondaryText || 'text-gray-400'} text-[10px] sm:text-lg md:text-xl font-medium leading-relaxed`}>
              Engineered for the fastest athletes. Every gram counts.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-2 md:mt-4">
              <div className="flex flex-col">
                <span className={`text-xl sm:text-3xl font-black ${currentTheme?.primaryText || 'text-white'}`}>240g</span>
                <span className={`text-[8px] sm:text-xs uppercase tracking-widest ${currentTheme?.secondaryText || 'text-white/40'} font-bold`}>Ultra Light</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl sm:text-3xl font-black ${currentTheme?.primaryText || 'text-white'}`}>React+</span>
                <span className={`text-[8px] sm:text-xs uppercase tracking-widest ${currentTheme?.secondaryText || 'text-white/40'} font-bold`}>Energy Return</span>
              </div>
            </div>
          </div>

          <button className={`w-full sm:w-fit px-6 sm:px-12 py-3 sm:py-5 ${currentTheme?.buttonBg || 'bg-white'} ${currentTheme?.buttonText || 'text-black'} ${currentTheme?.buttonHover || 'hover:bg-gray-200'} font-black uppercase tracking-widest text-[10px] sm:text-sm rounded-full transition-all duration-300 shadow-2xl active:scale-95`}>
            Experience Speed
          </button>
        </div>

      </div>
    </section>




  );
};

export default PerformanceShowcase;
