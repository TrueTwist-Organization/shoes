import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import Innovation3D from '../components/Innovation3D';
import PerformanceShowcase from '../components/PerformanceShowcase';
import Footer from '../components/Footer';
import ScrollingBanner from '../components/ScrollingBanner';

const Home = ({ loading, themeIndex, setThemeIndex, isScrolled, currentTheme, movingShoeRef }) => {
  // Auto-scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return (
    <>
      <div id="home" className="snap-section relative">
        <HeroSection
          isLoaded={!loading}
          themeIndex={themeIndex}
          onThemeChange={setThemeIndex}
          isScrolled={isScrolled}
          movingShoeRef={movingShoeRef}
        />
        <div className="absolute bottom-0 left-0 w-full z-20 translate-y-1/2">
          <ScrollingBanner text="Just Do It" theme={currentTheme} />
        </div>
      </div>

      <div className="snap-section relative">
        <Innovation3D currentTheme={currentTheme} />
        <div className="absolute bottom-0 left-0 w-full z-20 translate-y-1/2">
          <ScrollingBanner text="Innovation" theme={currentTheme} />
        </div>
      </div>

      <div className="snap-section relative">
        <PerformanceShowcase currentTheme={currentTheme} />
        <div className="absolute bottom-0 left-0 w-full z-[60] translate-y-1/2">
          <ScrollingBanner text="Nike Kicks" theme={currentTheme} />
        </div>
      </div>

      <div className="snap-section">
        <Footer theme={currentTheme} />
      </div>



    </>
  );
};


export default Home;
