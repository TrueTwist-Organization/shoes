import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isLoaded, currentTheme, isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navref = useRef(null);
  const location = useLocation();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (!isLoaded) return;
    gsap.from(navref.current, {
      y: -100,
      duration: 0.8,
      opacity: 0,
    });
  }, [isLoaded]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path) => location.pathname === path;

  // Prevent background scroll when menu is open
  React.useEffect(() => {
    const mainWrapper = document.getElementById('main-wrapper');
    if (isMenuOpen) {
      if (mainWrapper) mainWrapper.style.overflowY = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      if (mainWrapper) mainWrapper.style.overflowY = 'scroll';
      document.body.style.overflow = 'hidden'; // Keep body hidden as per index.css
    }
    return () => {
      if (mainWrapper) mainWrapper.style.overflowY = 'scroll';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav 
        ref={navref} 
        className={`w-full flex items-center justify-between px-6 md:px-10 py-4 md:py-6 z-[100] relative transition-all duration-500 ${
          isScrolled 
            ? (currentTheme?.name === 'white' 
                ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 rounded-2xl md:rounded-full mt-2" 
                : "bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20 rounded-2xl md:rounded-full mt-2")
            : "bg-transparent"
        }`}
      >
        
        {/* Logo */}
        <Link to="/" className="logo shrink-0 z-[160]">
          <img 
            className="h-6 md:h-10 transition-all duration-700" 
            src="/images/nike-logo.png" 
            alt="Nike Logo" 
            style={{ 
              filter: currentTheme?.name === 'white' 
                ? 'brightness(0) saturate(100%) invert(21%) sepia(82%) saturate(1469%) hue-rotate(130deg) brightness(91%) contrast(101%)' 
                : 'none' 
            }}
          />
        </Link>

        {/* DESKTOP Nav Links */}
        <div className={`hidden md:flex navlinks ${currentTheme?.name === 'white' ? 'bg-[#006437]/5 border-[#006437]/10' : 'bg-white/5 border-white/10'} backdrop-blur-xl p-1 rounded-full border items-center gap-1 transition-all duration-700`}>
          <Link 
            to="/" 
            className={`${isActive('/') 
              ? (currentTheme?.name === 'white' ? 'bg-[#006437] text-white shadow-md' : 'bg-white text-black shadow-md') 
              : (currentTheme?.name === 'white' ? 'text-[#006437] hover:bg-[#006437]/10' : 'text-white hover:bg-white/10')
            } py-2.5 px-7 rounded-full font-bold text-sm transition-all duration-300`}
          >
            Home
          </Link>
          <Link 
            to="/collections" 
            className={`${isActive('/collections') 
              ? (currentTheme?.name === 'white' ? 'bg-[#006437] text-white shadow-md' : 'bg-white text-black shadow-md') 
              : (currentTheme?.name === 'white' ? 'text-[#006437] hover:bg-[#006437]/10' : 'text-white hover:bg-white/10')
            } py-2.5 px-7 rounded-full transition-all duration-300 text-sm font-semibold`}
          >
            Collections
          </Link>
          <Link 
            to="/about" 
            className={`${isActive('/about') 
              ? (currentTheme?.name === 'white' ? 'bg-[#006437] text-white shadow-md' : 'bg-white text-black shadow-md') 
              : (currentTheme?.name === 'white' ? 'text-[#006437] hover:bg-[#006437]/10' : 'text-white hover:bg-white/10')
            } py-2.5 px-7 rounded-full transition-all duration-300 text-sm font-semibold`}
          >
            About
          </Link>
          <Link 
            to="/login" 
            className={`${isActive('/login') 
              ? (currentTheme?.name === 'white' ? 'bg-[#006437] text-white shadow-md' : 'bg-white text-black shadow-md') 
              : (currentTheme?.name === 'white' ? 'text-[#006437] border-[#006437]/20 hover:bg-[#006437]/10' : 'text-white border-white/20 hover:bg-white/10')
            } py-2.5 px-7 rounded-full transition-all duration-300 text-sm font-semibold border ml-2`}
          >
            Login
          </Link>
        </div>

        {/* RIGHT Icons & Toggle */}
        <div className="flex items-center gap-3 z-[160]">
          <div className="flex items-center gap-2">
            <Link 
              to="/search"
              className={`${currentTheme?.name === 'white' ? 'text-[#006437] bg-[#006437]/5 hover:bg-[#006437]/10' : 'text-white bg-white/10 hover:bg-white/20'} p-3 rounded-full transition-all`}
            >
              <i className="ri-search-line text-lg"></i>
            </Link>
          </div>

          {/* Hamburger Toggle */}
          <button 
            className={`${currentTheme?.name === 'white' ? 'text-[#006437] bg-[#006437]/5 hover:bg-[#006437]/10' : 'text-white bg-white/10 hover:bg-white/20'} p-3 rounded-full md:hidden flex items-center justify-center transition-all`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 h-[100dvh] bg-white z-[200] flex flex-col transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"}`}>
        
        {/* Top bar inside menu */}
        <div className="w-full flex items-center justify-between px-6 py-6 border-b border-[#006437]/10 bg-white">
          <Link to="/" onClick={toggleMenu}>
            <img 
              className="h-6" 
              src="/images/nike-logo.png" 
              alt="Nike Logo" 
              style={{ filter: 'brightness(0) saturate(100%) invert(21%) sepia(82%) saturate(1469%) hue-rotate(130deg) brightness(91%) contrast(101%)' }}
            />
          </Link>
          <button onClick={toggleMenu} className="text-[#006437] bg-[#006437]/5 p-3 rounded-full">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Links Container */}
        <div className="flex-1 flex flex-col items-start justify-center gap-4 px-10 bg-white">
          <Link 
            to="/" 
            onClick={toggleMenu} 
            className={`w-full ${isActive('/') 
              ? 'bg-[#006437] text-white px-6 py-3 rounded-2xl shadow-lg' 
              : 'text-[#006437] hover:opacity-70'} text-4xl font-black uppercase tracking-tight transition-all drop-shadow-sm flex items-center justify-between`}
          >
            Home
            {isActive('/') && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </Link>
          <Link 
            to="/collections" 
            onClick={toggleMenu} 
            className={`w-full ${isActive('/collections') 
              ? 'bg-[#006437] text-white px-6 py-3 rounded-2xl shadow-lg' 
              : 'text-[#006437] hover:opacity-70'} text-4xl font-black uppercase tracking-tight transition-all drop-shadow-sm flex items-center justify-between`}
          >
            Collections
            {isActive('/collections') && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </Link>

          <Link 
            to="/about" 
            onClick={toggleMenu} 
            className={`w-full ${isActive('/about') 
              ? 'bg-[#006437] text-white px-6 py-3 rounded-2xl shadow-lg' 
              : 'text-[#006437] hover:opacity-70'} text-4xl font-black uppercase tracking-tight transition-all drop-shadow-sm flex items-center justify-between`}
          >
            About
            {isActive('/about') && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </Link>
          <Link 
            to="/login" 
            onClick={toggleMenu} 
            className={`w-full ${isActive('/login') 
              ? 'bg-[#006437] text-white px-6 py-3 rounded-2xl shadow-lg' 
              : 'text-[#006437] hover:opacity-70'} text-4xl font-black uppercase tracking-tight transition-all drop-shadow-sm flex items-center justify-between`}
          >
            Login
            {isActive('/login') && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </Link>
        </div>

        {/* Bottom bar inside menu */}
        <div className="p-10 border-t border-[#006437]/10 flex flex-col gap-6 bg-white">
          <div className="flex justify-center opacity-20 mt-2">
             <img 
              className="h-6" 
              src="/images/nike-logo.png" 
              alt="Nike Logo" 
              style={{ filter: 'brightness(0) saturate(100%) invert(21%) sepia(82%) saturate(1469%) hue-rotate(130deg) brightness(91%) contrast(101%)' }}
             />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
