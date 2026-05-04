import React, { useRef } from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Leaf, Flame, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = ({ currentTheme }) => {
  const shoeRef = useRef(null);
  const stats = [
    { number: '50+', label: 'Premium Sneaker Models' },
    { number: '1M+', label: 'Happy Customers' },
    { number: '120+', label: 'Countries Shipped To' },
    { number: '10+', label: 'Years of Excellence' },
  ];

  const values = [
    {
      icon: <Zap size={32} />,
      title: 'Performance First',
      desc: 'Every sneaker we carry is engineered for peak athletic performance, tested by professionals before reaching your hands.',
    },
    {
      icon: <Leaf size={32} />,
      title: 'Sustainably Built',
      desc: 'We are committed to reducing our carbon footprint by sourcing eco-friendly materials and partnering with responsible manufacturers.',
    },
    {
      icon: <Flame size={32} />,
      title: 'Culture & Style',
      desc: 'We live at the intersection of sport and street culture — designing kicks that turn heads on the court and the block.',
    },
    {
      icon: <ShieldCheck size={32} />,
      title: '100% Authentic',
      desc: 'Every pair is verified for authenticity. We never stock replicas. Your trust is the foundation of everything we do.',
    },
  ];

  useGSAP(() => {
    if (!shoeRef.current) return;

    // Entrance: fly in from right with rotation
    gsap.fromTo(
      shoeRef.current,
      { x: 300, rotation: 30, opacity: 0, scale: 0.8 },
      {
        x: 0,
        rotation: -20,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: shoeRef.current,
          start: 'top 80%',
        },
        onComplete: () => {
          // After entrance, keep it gently floating with tilt
          gsap.to(shoeRef.current, {
            y: -15,
            rotation: -18,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        },
      }
    );
  }, []);

  return (
    <div className={`w-full ${currentTheme?.sectionBg || 'bg-[#111]'} overflow-hidden`}>

      {/* ===== HERO SECTION ===== */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
        {/* Background shoe watermark */}
        <img
          src={currentTheme?.image}
          alt=""
          className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[500px] md:w-[700px] opacity-5 pointer-events-none select-none"
          style={{ filter: 'blur(2px)' }}
        />
        <p className={`text-xs md:text-sm uppercase tracking-[6px] font-bold mb-4 ${currentTheme?.primaryText || 'text-white'} opacity-70`}>
          Our Story
        </p>
        <h1 className={`text-5xl sm:text-6xl md:text-8xl font-black uppercase ${currentTheme?.primaryText || 'text-[#006437]'} leading-tight tracking-tighter max-w-4xl`}>
          Born to{' '}
          <span style={{ WebkitTextStroke: `2px ${currentTheme?.bannerStroke || 'rgba(0,100,55,0.9)'}`, color: 'transparent' }}>
            Move.
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-gray-400 leading-relaxed text-base md:text-lg">
          Nike Kicks was founded with one mission — to bring the world's most innovative and iconic sneakers to every athlete, on every street, in every city. We don't just sell shoes. We deliver confidence.
        </p>
        <Link
          to="/collections"
          className={`mt-10 inline-block px-10 py-4 font-bold uppercase tracking-widest text-sm rounded-full transition-all duration-300 ${currentTheme?.buttonBg || 'bg-white'} ${currentTheme?.buttonText || 'text-black'} ${currentTheme?.buttonHover || 'hover:bg-gray-300'}`}
        >
          Shop The Collection
        </Link>
      </div>

      {/* ===== STATS SECTION ===== */}
      <div className="w-full px-6 py-20 border-t border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className={`text-4xl md:text-6xl font-black ${currentTheme?.primaryText || 'text-[#006437]'}`}>{stat.number}</span>
              <span className={`${currentTheme?.secondaryText || 'text-[#006437]/60'} text-sm md:text-base mt-2 font-medium uppercase tracking-wider`}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== BRAND STORY SECTION ===== */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p className={`text-xs uppercase tracking-[5px] font-bold mb-4 ${currentTheme?.primaryText || 'text-white'} opacity-70`}>Who We Are</p>
          <h2 className={`text-4xl md:text-5xl font-black uppercase ${currentTheme?.primaryText || 'text-[#006437]'} leading-tight mb-6`}>
            More Than A Sneaker Brand
          </h2>
          <div className="space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
            <p>
              Founded in 2014, Nike Kicks started as a small boutique in Beaverton, Oregon with a simple idea: every person deserves access to world-class footwear without compromise. We curate only the finest sneakers — from iconic Air Max silhouettes to the latest limited-edition drops.
            </p>
            <p>
              Today, we ship to over 120 countries and have grown a community of over one million loyal sneakerheads. Our team of footwear experts personally tests every model before it hits our digital shelves.
            </p>
            <p>
              We are athletes, collectors, and culture-makers. We are Nike Kicks.
            </p>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className={`w-72 h-72 md:w-96 md:h-96 rounded-full opacity-10 ${currentTheme?.buttonBg || 'bg-white'} absolute blur-3xl`}></div>
          <img
            ref={shoeRef}
            src={currentTheme?.image}
            alt="Nike Kicks Signature Shoe"
            className="relative z-10 w-full max-w-sm object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* ===== VALUES SECTION ===== */}
      <div className="w-full px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className={`text-xs uppercase tracking-[5px] font-bold mb-4 text-center ${currentTheme?.primaryText || 'text-white'} opacity-70`}>What Drives Us</p>
          <h2 className={`text-4xl md:text-5xl font-black uppercase ${currentTheme?.primaryText || 'text-[#006437]'} text-center mb-16`}>Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300">
                <div className={`${currentTheme?.primaryText || 'text-white'} mb-4`}>
                  {v.icon}
                </div>
                <h3 className={`text-lg font-black uppercase mt-4 mb-3 ${currentTheme?.primaryText || 'text-white'}`}>{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CTA SECTION ===== */}
      <div className="w-full px-6 py-24 text-center border-t border-white/10">
        <h2 className={`text-4xl md:text-6xl font-black uppercase ${currentTheme?.primaryText || 'text-[#006437]'} mb-6`}>
          Ready to Step Up?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 text-base md:text-lg">
          Explore our full collection of premium sneakers and find your perfect pair today.
        </p>
        <Link
          to="/collections"
          className={`inline-block px-12 py-5 font-black uppercase tracking-widest text-sm rounded-full transition-all duration-300 shadow-2xl ${currentTheme?.buttonBg || 'bg-white'} ${currentTheme?.buttonText || 'text-black'} ${currentTheme?.buttonHover || 'hover:bg-gray-300'}`}
        >
          Explore Collection
        </Link>
      </div>

      <Footer theme={currentTheme} />
    </div>
  );
};

export default About;
