import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { shoesData } from '../data/shoesData';
import Footer from '../components/Footer';
import { Search as SearchIcon, ArrowLeft, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const Search = ({ currentTheme }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const filtered = shoesData.filter(shoe => 
        shoe.name.toLowerCase().includes(query.toLowerCase()) ||
        shoe.category.toLowerCase().includes(query.toLowerCase()) ||
        shoe.color.toLowerCase().includes(query.toLowerCase()) ||
        shoe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
    }
  }, [query]);

  useGSAP(() => {
    gsap.from(".search-content", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    });
    inputRef.current?.focus();
  }, []);

  const handleProductClick = (product) => {
    navigate('/checkout', { state: { product } });
  };

  return (
    <div className={`min-h-screen ${currentTheme?.sectionBg || 'bg-white'} transition-colors duration-700 pt-28 md:pt-40 pb-20`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 search-content">
        
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
          <button 
            onClick={() => navigate(-1)}
            className={`${currentTheme?.name === 'white' ? 'bg-[#006437]/5 text-[#006437] hover:bg-[#006437]/10' : 'bg-white/10 text-white hover:bg-white/20'} p-2 md:p-3 rounded-full transition-all shrink-0`}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className={`text-3xl md:text-6xl font-black uppercase ${currentTheme?.primaryText || 'text-[#006437]'} tracking-tight`}>Search</h1>
        </div>

        {/* Big Search Input */}
        <div className="relative mb-12 md:mb-20">
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search kicks..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full bg-transparent border-b ${currentTheme?.name === 'white' ? 'border-[#006437]/20 focus:border-[#006437]' : 'border-white/20 focus:border-white'} ${currentTheme?.primaryText || 'text-[#006437]'} text-xl md:text-5xl py-4 md:py-8 outline-none transition-all font-bold placeholder:${currentTheme?.name === 'white' ? 'text-[#006437]/10' : 'text-white/10'}`}
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className={`${currentTheme?.name === 'white' ? 'text-[#006437]/40 hover:text-[#006437]' : 'text-white/40 hover:text-white'} absolute right-0 top-1/2 -translate-y-1/2 p-2`}
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Results Info & Grid */}
        <div className="min-h-[400px]">
          {query && results.length > 0 && (
            <div className="mb-10">
              <p className={`${currentTheme?.secondaryText || 'text-[#006437]/40'} uppercase tracking-widest text-xs md:text-sm font-bold`}>
                Found {results.length} {results.length === 1 ? 'result' : 'results'}
              </p>
            </div>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {results.map((shoe) => (
                <div 
                  key={shoe.id}
                  onClick={() => handleProductClick(shoe)}
                  className={`group cursor-pointer ${currentTheme?.name === 'white' ? 'bg-[#006437]/5 border-[#006437]/5 hover:border-[#006437]/20 hover:bg-[#006437]/10' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'} rounded-[30px] md:rounded-[40px] p-5 md:p-6 transition-all duration-500`}
                >
                  <div className="aspect-square flex items-center justify-center p-4 mb-4 md:mb-6">
                    <img 
                      src={shoe.image} 
                      alt={shoe.name} 
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6"
                    />
                  </div>
                  <h3 className={`${currentTheme?.primaryText || 'text-[#006437]'} text-base md:text-lg font-bold uppercase tracking-tight`}>{shoe.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`${currentTheme?.secondaryText || 'text-[#006437]/40'} text-xs md:text-sm font-bold`}>{shoe.price}</span>
                    <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${currentTheme?.name === 'white' ? 'bg-[#006437]/5 text-[#006437]/60' : 'bg-white/5 text-white/60'}`}>
                      {shoe.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : query ? (
            /* NOT FOUND STATE */
            <div className="flex flex-col items-center justify-center py-20 text-center animate-pulse">
              <div className="text-6xl md:text-8xl mb-6">🔍</div>
              <h2 className={`text-2xl md:text-4xl font-black ${currentTheme?.primaryText || 'text-[#006437]'} uppercase mb-4`}>No Kicks Found</h2>
              <p className={`${currentTheme?.secondaryText || 'text-[#006437]/40'} max-w-md mx-auto text-sm md:text-base`}>
                We couldn't find any sneakers matching "{query}". <br className="hidden md:block" /> Try searching for "Jordan", "Air", or "Uptempo".
              </p>
            </div>
          ) : (
            /* EMPTY STATE */
            <div className={`flex flex-col items-center justify-center py-20 text-center opacity-30 border-2 border-dashed ${currentTheme?.name === 'white' ? 'border-[#006437]/10' : 'border-white/5'} rounded-[40px]`}>
              <div className="text-5xl md:text-7xl mb-6">👟</div>
              <p className={`${currentTheme?.primaryText || 'text-[#006437]'} text-lg md:text-xl font-bold uppercase tracking-[4px]`}>What are you looking for?</p>
            </div>
          )}
        </div>

      </div>
      <Footer theme={currentTheme} />
    </div>
  );
};

export default Search;
