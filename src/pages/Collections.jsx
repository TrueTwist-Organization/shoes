import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shoesData } from '../data/shoesData';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Footer from '../components/Footer';

const Collections = ({ currentTheme }) => {
  const navigate = useNavigate();
  const containerRef = React.useRef(null);
  const [activeShoe, setActiveShoe] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Create a large array for the mosaic effect
  const mosaicShoes = useMemo(() => {
    let list = [];
    for (let i = 0; i < 6; i++) {
      list = [...list, ...shoesData];
    }
    return list.sort(() => Math.random() - 0.5);
  }, []);

  const filteredMosaic = useMemo(() => {
    return mosaicShoes.filter(shoe => 
      shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shoe.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, mosaicShoes]);

  // Single click: Navigate to product details page
  const handleItemInteraction = (shoe) => {
    navigate(`/product/${shoe.id}`);
  };

  // Optimized Movement Handler (Clean 2D Parallax)
  const handleMove = (x, y) => {
    const { innerWidth, innerHeight } = window;
    const xPos = (x / innerWidth) - 0.5;
    const yPos = (y / innerHeight) - 0.5;
    
    gsap.to(".mosaic-mask", {
      x: xPos * 40, 
      y: yPos * 40,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto"
    });

    gsap.to(".mosaic-item", {
      x: xPos * 15,
      y: yPos * 15,
      duration: 1.5,
      stagger: 0.003,
      ease: "power3.out",
      overwrite: "auto"
    });
  };

  const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
  const onTouchMove = (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Stable Entrance Animation
    gsap.from(".mosaic-item", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      stagger: { amount: 1, grid: "auto", from: "center" },
      ease: "power4.out",
    });

    // Gentle floating effect
    gsap.to(".mosaic-mask", {
      y: "+=10",
      x: "+=5",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, [filteredMosaic]);

  return (
    <div 
      className="min-h-screen bg-white overflow-x-hidden overflow-y-auto"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      ref={containerRef}
      onClick={(e) => {
        // Clear active shoe if clicking background
        if (e.target.closest('.mosaic-item') === null) {
          setActiveShoe(null);
        }
      }}
    >
      <style>{`
        .mosaic-mask {
          will-change: transform;
        }
        .mosaic-item {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          will-change: transform;
        }
        @media (hover: hover) {
          .mosaic-item:hover img {
            transform: scale(1.6) translateY(-10px);
            z-index: 50;
          }
        }
        .mosaic-item.active img {
          transform: scale(2.2) translateY(-20px);
          filter: drop-shadow(0 30px 40px rgba(0,100,55,0.4));
          z-index: 200;
        }
      `}</style>

      {/* SNEAKER MOSAIC CONTENT */}
      <div className="w-full flex flex-col items-center relative overflow-hidden pt-32 md:pt-48 pb-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center w-full px-4">
          
          {/* Main Title Area */}
          <div className="text-center z-20 mb-12 md:mb-20">
             <div className="flex flex-col items-center gap-2">
               <span className="text-[10px] md:text-xs font-black uppercase tracking-[10px] text-[#006437]/20">The Collection</span>
               <h1 className="text-6xl md:text-[11rem] font-black uppercase text-[#006437] leading-[0.8] tracking-tighter">Drops</h1>
             </div>
             <p className="text-[#006437]/40 font-bold uppercase tracking-[8px] text-[10px] md:text-xs mt-6 animate-pulse">Tap to Shop</p>
          </div>

          {/* Mosaic Grid */}
          <div className="mosaic-mask w-full max-w-6xl grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6 md:gap-8 px-6">
            {filteredMosaic.slice(0, 60).map((shoe, i) => (
              <div 
                key={`${shoe.id}-${i}`} 
                className={`mosaic-item aspect-square flex items-center justify-center p-2 cursor-pointer relative z-10 ${activeShoe === i ? 'active' : ''}`}
                onMouseEnter={() => {
                  if (window.innerWidth > 768) setActiveShoe(i);
                }}
                onMouseLeave={() => {
                  if (window.innerWidth > 768) setActiveShoe(null);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemInteraction(shoe);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleItemInteraction(shoe);
                }}
              >
                <img 
                  src={shoe.image} 
                  alt="Nike" 
                  className="w-full h-auto object-contain drop-shadow-md"
                />
              </div>
            ))}
          </div>

          {filteredMosaic.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[#006437]/20 text-2xl font-black uppercase tracking-widest">No sneakers found</p>
            </div>
          )}
        </div>
      </div>

      <Footer theme={currentTheme} />
    </div>

  );
};

export default Collections;
