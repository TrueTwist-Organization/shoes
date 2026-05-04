import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Innovation3D = ({ currentTheme }) => {
  const sectionRef = useRef(null);
  const shoeContainerRef = useRef(null);
  const textRef = useRef(null);
  const bgTextRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial state
    gsap.set(".innovation-card", {
      opacity: 0
    });

    // Scroll Animation - Flying in and Setting
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1.5,
      }
    });

    tl.fromTo(".innovation-card", {
      y: -500,
      x: -400,
      rotationY: -60,
      rotationX: 30,
      scale: 0.5,
      opacity: 0
    }, {
      y: 0,
      x: 0,
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "power3.out"
    })
      .to(bgTextRef.current, {
        x: typeof window !== 'undefined' && window.innerWidth < 768 ? -20 : -100,
        duration: 1
      }, 0);

    // Continuous 3D tilt on mouse move
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 40;
      const yPos = (clientY / innerHeight - 0.5) * 40;

      gsap.to(shoeContainerRef.current, {
        rotationY: xPos,
        rotationX: -yPos,
        duration: 1.2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className={`snap-section relative flex flex-col items-center justify-center overflow-hidden ${currentTheme?.sectionBg || 'bg-black'} py-8 sm:py-20 px-4 sm:px-6 md:px-20 transition-colors duration-700`}
      style={{ perspective: "1500px" }}
    >
      {/* Background Large Text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <h2 className="text-[18vw] sm:text-[25vw] font-black text-white/[0.03] uppercase leading-none whitespace-nowrap text-center">
          INNOVATION
        </h2>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 md:gap-12 items-center z-10">

        {/* Right Side: 3D Shoe Card (Order 1 on mobile) */}
        <div className="relative flex items-center justify-center order-1 lg:order-2 py-4 sm:py-10 lg:py-0">
          <div
            ref={shoeContainerRef}
            className="innovation-card relative w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Glossy Circle Background */}
            <div
              className="absolute inset-0 rounded-full blur-[40px] sm:blur-[120px] opacity-20"
              style={{ backgroundColor: currentTheme?.name === 'white' ? '#006437' : '#fff' }}
            ></div>

            {/* The Shoe Image */}
            <img
              src={currentTheme?.image || "/images/jordan.png"}
              alt="Nike 3D"
              className="w-full h-auto object-contain drop-shadow-[0_60px_120px_rgba(0,0,0,0.9)]"
              style={{
                transform: "translateZ(150px) scale(2.2) translateX(15%) translateY(-5%) rotateY(-35deg) rotateX(20deg) rotate(-10deg)",
                transformOrigin: "center center"
              }}
            />


            {/* Floating Elements for 3D depth */}
            <div
              className={`absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center p-1 sm:p-4 shadow-2xl backdrop-blur-xl border border-white/10`}
              style={{
                transform: "translateZ(100px) md:translateZ(180px) translateX(15px) md:translateX(40px) translateY(-5px) md:translateY(-20px)",
                backgroundColor: currentTheme?.buttonBg.includes('bg-') ? '' : currentTheme?.buttonBg
              }}
            >
              <span className="text-white font-black text-[6px] sm:text-[10px] md:text-xs text-center uppercase leading-none font-bold">Aero<br />Flow</span>
            </div>
          </div>
        </div>

        {/* Content Side (Order 2 on mobile) */}
        <div ref={textRef} className="flex flex-col gap-2 sm:gap-4 md:gap-6 order-2 lg:order-1 text-center lg:text-left items-center lg:items-start mt-6 sm:mt-12">

          <div className="flex items-center gap-3">
            <div className={`h-[1px] w-6 sm:w-12 ${currentTheme?.name === 'white' ? 'bg-[#006437]' : 'bg-[#a8ff00]'}`}></div>
            <span className={`${currentTheme?.name === 'white' ? 'text-[#006437]' : 'text-[#a8ff00]'} font-bold uppercase tracking-[2px] sm:tracking-[4px] text-[8px] sm:text-xs md:text-sm`}>Technology</span>
          </div>

          <h2 className={`text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black ${currentTheme?.primaryText || 'text-white'} uppercase leading-none tracking-tight`}>
            The Future <br />
            <span className="text-transparent" style={{ WebkitTextStroke: `1px ${currentTheme?.name === 'white' ? '#006437' : '#fff'}` }}>Of Motion</span>
          </h2>

          <p className={`${currentTheme?.secondaryText || 'text-gray-400'} text-[10px] sm:text-lg md:text-xl max-w-md leading-relaxed`}>
            Experience the next generation of Air technology.
          </p>
        </div>

      </div>
    </section>



  );
};

export default Innovation3D;
