import React from 'react';

const ScrollingBanner = ({ text, theme }) => {
  return (
    <div className={`mx-2 md:mx-6 py-2 md:py-3 overflow-hidden flex items-center border border-black/10 relative z-10 bg-white shadow-sm rounded-full`}
    >





      <div className="flex whitespace-nowrap animate-marquee-fixed">
        {/* Content Group 1 */}
        <div className="flex items-center">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={`g1-${i}`}>
              <span className={`text-sm md:text-xl font-black uppercase tracking-tight mx-6 ${theme?.name === 'black' ? 'text-black' : theme?.primaryText || 'text-black'}`}>
                Limited Time Offer
              </span>
              <span className={`text-sm md:text-xl font-black mx-6 opacity-30 ${theme?.name === 'black' ? 'text-black' : theme?.primaryText || 'text-black'}`}>
                •
              </span>
              <span className={`text-sm md:text-xl font-black uppercase tracking-tight mx-6 ${theme?.name === 'black' ? 'text-red-600' : theme?.primaryText || 'text-red-600'}`}>
                50% OFF
              </span>
              <span className={`text-sm md:text-xl font-black mx-6 opacity-30 ${theme?.name === 'black' ? 'text-black' : theme?.primaryText || 'text-black'}`}>
                •
              </span>
              <span className={`text-sm md:text-xl font-black uppercase tracking-tight mx-6 ${theme?.name === 'black' ? 'text-black' : theme?.primaryText || 'text-black'}`}>
                Shop Now
              </span>
              <span className={`text-sm md:text-xl font-black mx-6 opacity-30 ${theme?.name === 'black' ? 'text-black' : theme?.primaryText || 'text-black'}`}>
                •
              </span>


            </React.Fragment>
          ))}
        </div>
        {/* Content Group 2 */}
        <div className="flex items-center">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={`g2-${i}`}>
              <span className={`text-sm md:text-xl font-black uppercase tracking-tight mx-6 ${theme?.name === 'black' ? 'text-black' : theme?.primaryText || 'text-black'}`}>
                Limited Time Offer
              </span>
              <span className={`text-sm md:text-xl font-black mx-6 opacity-30 ${theme?.name === 'black' ? 'text-black' : theme?.primaryText || 'text-black'}`}>
                •
              </span>
              <span className={`text-sm md:text-xl font-black uppercase tracking-tight mx-6 ${theme?.name === 'black' ? 'text-red-600' : theme?.primaryText || 'text-red-600'}`}>
                50% OFF
              </span>
              <span className={`text-sm md:text-xl font-black mx-6 opacity-30 ${theme?.name === 'black' ? 'text-black' : theme?.primaryText || 'text-black'}`}>
                •
              </span>
              <span className={`text-sm md:text-xl font-black uppercase tracking-tight mx-6 ${theme?.name === 'black' ? 'text-black' : theme?.primaryText || 'text-black'}`}>
                Shop Now
              </span>
              <span className={`text-sm md:text-xl font-black mx-6 opacity-30 ${theme?.name === 'black' ? 'text-black' : theme?.primaryText || 'text-black'}`}>
                •
              </span>


            </React.Fragment>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee-fixed {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-fixed {
          animation: marquee-fixed 25s linear infinite;
        }
      `}} />
    </div>
  );
};



export default ScrollingBanner;
