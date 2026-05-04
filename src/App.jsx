import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";


export const themes = [
  { // Black (Tempo)
    name: "black",
    image: "/images/tempo.png",
    sectionBg: "bg-[#000000]",
    cardBg: "bg-[#0a0a0a]",
    primaryText: "text-white",
    secondaryText: "text-gray-400",
    buttonBg: "bg-white",
    buttonText: "text-black",
    buttonHover: "hover:bg-gray-300",
    bannerBg: "from-[#000000]",
    bannerStroke: "rgba(255,255,255,0.8)",
    footerBg: "bg-[#000000]",
    imageBg: "bg-[#000000]",
    rotate: "-20deg",
    scale: 0.95,
  },
  { // Green (Jordan)
    name: "green",
    image: "/images/jordan.png",
    sectionBg: "bg-[#003311]",
    cardBg: "bg-[#004d1a]",
    primaryText: "text-[#a8ff00]",
    secondaryText: "text-[#d1ff66]",
    buttonBg: "bg-[#a8ff00]",
    buttonText: "text-black",
    buttonHover: "hover:bg-[#d1ff66]",
    bannerBg: "from-[#003311]",
    bannerStroke: "rgba(168,255,0,0.8)",
    footerBg: "bg-[#003311]",
    imageBg: "bg-[#003311]",
    rotate: "0deg",
    translateY: "0px",
    scale: 1.1,
  },
  { // Red (DT Max)
    name: "red",
    image: "/images/dtmax.png",
    sectionBg: "bg-[#4d0000]",
    cardBg: "bg-[#660000]",
    primaryText: "text-[#ff4d4d]",
    secondaryText: "text-[#ff9999]",
    buttonBg: "bg-[#ff4d4d]",
    buttonText: "text-black",
    buttonHover: "hover:bg-[#ff9999]",
    bannerBg: "from-[#4d0000]",
    bannerStroke: "rgba(255,77,77,0.8)",
    footerBg: "bg-[#4d0000]",
    imageBg: "bg-[#4d0000]",
    rotate: "0deg",
    scale: 0.85,
  },
  { // White (Premium)
    name: "white",
    image: "/d69971809daa3242a4b6efc91e7a4d2a-removebg-preview.png",
    sectionBg: "bg-[#ffffff]",
    cardBg: "bg-white",
    primaryText: "text-[#006437]",
    secondaryText: "text-[#006437]/60",
    buttonBg: "bg-[#006437]",
    buttonText: "text-white",
    buttonHover: "hover:bg-[#004d2b]",
    bannerBg: "from-[#ffffff]",
    bannerStroke: "rgba(0,100,55,0.8)",
    footerBg: "bg-[#ffffff]",
    imageBg: "bg-[#ffffff]",
    rotate: "0deg",
    scale: 1.0,
  }
];

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Disclaimer from "./pages/Disclaimer";
import RefundPolicy from "./pages/RefundPolicy";
import Search from "./pages/Search";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [themeIndex, setThemeIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const currentTheme = themes[themeIndex];
  const location = useLocation();

  const movingShoeRef = React.useRef(null);

  const isHomePage = location.pathname === "/";

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Removed Global ScrollTrigger shoe animation as per user request to stop shoe from scrolling across sections

  const handleLoaderComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader onComplete={handleLoaderComplete} />}

      {/* Navbar - Hidden on Checkout Page */}
      {location.pathname !== '/checkout' && !location.pathname.startsWith('/product') && (
        <div className={`fixed top-0 left-0 right-0 md:px-10 md:py-5 z-[150] transition-all duration-300 ${isScrolled ? 'translate-y-[-5px]' : 'translate-y-0'}`}>
          <Navbar
            isLoaded={!loading}
            currentTheme={isHomePage ? currentTheme : themes[3]}
            isScrolled={isScrolled}
          />
        </div>
      )}

      <div id="main-wrapper" className={`w-full overflow-x-hidden relative ${!loading ? "opacity-100" : "opacity-0"}`}>
        <Routes>
          <Route path="/" element={
            <Home
              loading={loading}
              themeIndex={themeIndex}
              setThemeIndex={setThemeIndex}
              isScrolled={isScrolled}
              currentTheme={currentTheme}
              movingShoeRef={movingShoeRef}
            />
          } />
          <Route path="/collections" element={<Collections currentTheme={themes[3]} />} />
          <Route path="/about" element={<About currentTheme={themes[3]} />} />
          <Route path="/login" element={<Login currentTheme={themes[3]} />} />
          <Route path="/checkout" element={<Checkout currentTheme={themes[3]} />} />
          <Route path="/product/:id" element={<ProductDetails currentTheme={themes[3]} />} />
          <Route path="/contact" element={<Contact currentTheme={themes[3]} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy currentTheme={themes[3]} />} />
          <Route path="/terms-conditions" element={<TermsConditions currentTheme={themes[3]} />} />
          <Route path="/disclaimer" element={<Disclaimer currentTheme={themes[3]} />} />
          <Route path="/refund-policy" element={<RefundPolicy currentTheme={themes[3]} />} />
          <Route path="/search" element={<Search currentTheme={themes[3]} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
