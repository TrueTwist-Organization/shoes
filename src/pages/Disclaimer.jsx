import React from 'react';
import Footer from '../components/Footer';

const Disclaimer = ({ currentTheme }) => {
  return (
    <div className={`min-h-screen pt-28 ${currentTheme?.sectionBg || 'bg-white'}`}>
      <div className={`max-w-4xl mx-auto px-6 py-16 ${currentTheme?.primaryText || 'text-[#006437]'}`}>
        <h1 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 ${currentTheme?.primaryText || 'text-[#006437]'}`}>
          Disclaimer
        </h1>
        <div className={`space-y-6 leading-relaxed ${currentTheme?.name === 'white' ? 'bg-[#006437]/5 border-[#006437]/10' : 'bg-white/5 border-white/10'} p-8 md:p-12 rounded-3xl border shadow-2xl backdrop-blur-sm`}>
          <p>
            The information provided by <strong>Nike Kicks</strong> on nikekicks.com is for general informational purposes only. All sneaker information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>1. External Links Disclaimer</h2>
          <p>The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.</p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>2. Professional Disclaimer</h2>
          <p>The site cannot and does not contain athletic performance advice. The footwear information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.</p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>3. Errors and Omissions Disclaimer</h2>
          <p>While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, Nike Kicks is not responsible for any errors or omissions, or for the results obtained from the use of this information.</p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>4. Fair Use Disclaimer</h2>
          <p>This site may contain copyrighted material the use of which has not always been specifically authorized by the copyright owner. We are making such material available in our efforts to advance understanding of sneaker culture and athletic innovation.</p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>5. "Use at Your Own Risk" Disclaimer</h2>
          <p>All information in the site is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied.</p>
        </div>
      </div>
      <Footer theme={currentTheme} />
    </div>
  );
};

export default Disclaimer;
