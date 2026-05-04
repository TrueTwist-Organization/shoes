import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ theme }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isWhite = theme?.name === 'white';
  const bgClass = isWhite ? 'bg-[#F8FAF9]' : (theme?.sectionBg || 'bg-[#111111]');
  const textPrimary = isWhite ? 'text-[#1B4332]' : (theme?.primaryText || 'text-white');
  const textSecondary = isWhite ? 'text-[#1B4332]/60' : 'text-gray-400';
  const borderClass = isWhite ? 'border-[#1B4332]/10' : 'border-white/10';
  const hoverClass = isWhite ? 'hover:text-[#1B4332]' : 'hover:text-white';

  return (
    <footer className={`w-screen ${bgClass} ${textPrimary} pt-20 pb-10 px-10 transition-colors duration-700 border-t ${borderClass} z-50 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Column 1: Company Info */}
          <div className="flex flex-col space-y-6">
            <h2 className={`text-3xl font-black uppercase tracking-tighter ${isWhite ? 'text-[#1B4332]' : 'text-white'}`}>
              Nike <span className={isWhite ? 'text-[#1B4332]' : (theme?.primaryText || 'text-[#ff4d4d]')}>Kicks</span>
            </h2>

            <p className={`${textSecondary} text-sm leading-relaxed max-w-xs font-medium`}>
              We bring inspiration and innovation to every athlete in the world. Step into the future with our premium collection.
            </p>
            <div className="flex flex-col space-y-3 pt-2">
              <div className={`flex items-center space-x-3 ${textSecondary} text-sm`}>
                <span>📍</span>
                <span>1 Bowerman Drive, Beaverton, OR 97005</span>
              </div>
              <div className={`flex items-center space-x-3 ${textSecondary} text-sm`}>
                <span>📞</span>
                <span>1-800-806-6453</span>
              </div>
              <div className={`flex items-center space-x-3 ${textSecondary} text-sm`}>
                <span>✉️</span>
                <span>support@nikekicks.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-6">
            <h3 className={`text-lg font-bold uppercase tracking-wider ${textPrimary}`}>Quick Links</h3>
            <ul className="space-y-4">
              <li><Link onClick={scrollToTop} to="/" className={`${textSecondary} ${hoverClass} transition-colors duration-300 text-sm font-medium hover:translate-x-2 inline-block transform`}>Home</Link></li>
              <li><Link onClick={scrollToTop} to="/about" className={`${textSecondary} ${hoverClass} transition-colors duration-300 text-sm font-medium hover:translate-x-2 inline-block transform`}>About Us</Link></li>
              <li><Link onClick={scrollToTop} to="/contact" className={`${textSecondary} ${hoverClass} transition-colors duration-300 text-sm font-medium hover:translate-x-2 inline-block transform`}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal Pages */}
          <div className="flex flex-col space-y-6">
            <h3 className={`text-lg font-bold uppercase tracking-wider ${textPrimary}`}>Legal</h3>
            <ul className="space-y-4">
              <li><Link onClick={scrollToTop} to="/privacy-policy" className={`${textSecondary} ${hoverClass} transition-colors duration-300 text-sm font-medium hover:translate-x-2 inline-block transform`}>Privacy Policy</Link></li>
              <li><Link onClick={scrollToTop} to="/terms-conditions" className={`${textSecondary} ${hoverClass} transition-colors duration-300 text-sm font-medium hover:translate-x-2 inline-block transform`}>Terms & Conditions</Link></li>
              <li><Link onClick={scrollToTop} to="/disclaimer" className={`${textSecondary} ${hoverClass} transition-colors duration-300 text-sm font-medium hover:translate-x-2 inline-block transform`}>Disclaimer</Link></li>
              <li><Link onClick={scrollToTop} to="/refund-policy" className={`${textSecondary} ${hoverClass} transition-colors duration-300 text-sm font-medium hover:translate-x-2 inline-block transform`}>Refund Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-6">
            <h3 className={`text-lg font-bold uppercase tracking-wider ${textPrimary}`}>Stay In The Loop</h3>
            <p className={`${textSecondary} text-sm leading-relaxed font-medium`}>
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full ${isWhite ? 'bg-white border-[#1B4332]/20 focus:border-[#1B4332] text-[#1B4332] placeholder-[#1B4332]/40' : 'bg-[#1a1a1a] border-white/10 focus:border-white/40 text-white placeholder-gray-600'} pl-5 pr-[120px] py-4 rounded-xl outline-none transition-colors duration-300 text-sm`}
                  required
                />
                <button
                  type="submit"
                  className={`absolute right-2 top-2 bottom-2 ${isWhite ? 'bg-[#1B4332] text-white hover:bg-[#2D6A4F]' : 'bg-white text-black hover:bg-gray-300'} font-bold uppercase tracking-widest text-xs px-6 rounded-lg transition-all duration-300`}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`border-t ${borderClass} pt-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10`}>
          <p className={`${isWhite ? 'text-[#1B4332]/40' : 'text-gray-500'} text-sm font-medium`}>© 2026 Nike Kicks. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className={`flex items-center space-x-3 ${textSecondary} ${hoverClass} transition-colors duration-300 group font-bold text-xs uppercase tracking-[2px]`}
          >
            <span>Back to top</span>
            <div className={`w-10 h-10 rounded-full ${isWhite ? 'bg-[#1B4332]/5 border-[#1B4332]/10' : 'bg-white/5 border-white/10'} border group-hover:${isWhite ? 'bg-[#1B4332] text-white' : 'bg-white text-black'} flex items-center justify-center transition-all duration-300 shadow-lg`}>
              <span>↑</span>
            </div>
          </button>
        </div>

        {/* Large Background Text */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 pointer-events-none select-none ${isWhite ? 'opacity-10' : 'opacity-[0.03]'} w-full text-center overflow-hidden`}>
          <h2 className={`text-[15vw] font-black uppercase tracking-tighter leading-none ${isWhite ? 'text-[#1B4332]' : (theme?.primaryText || 'text-white')}`}>
            Nike Kicks
          </h2>
        </div>


      </div>
    </footer>
  );
};

export default Footer;