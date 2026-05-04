import React from 'react';
import Footer from '../components/Footer';

const Contact = ({ currentTheme }) => {
  return (
    <div className={`min-h-screen pt-28 ${currentTheme?.sectionBg || 'bg-[#111]'}`}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tight text-center ${currentTheme?.primaryText || 'text-white'} mb-6`}>
          Contact Us
        </h1>
        <p className={`text-center ${currentTheme?.secondaryText || 'text-gray-400'} mb-12 max-w-2xl mx-auto`}>
          Have a question or need support? We're here to help. Reach out to our team using the form below or contact details provided.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
          {/* Contact Details */}
          <div className="flex flex-col space-y-8">
            <div>
              <h3 className={`text-xl font-bold uppercase mb-2 ${currentTheme?.primaryText || 'text-[#006437]'}`}>Visit Us</h3>
              <p className={`${currentTheme?.secondaryText || 'text-[#006437]/60'}`}>1 Bowerman Drive<br/>Beaverton, OR 97005</p>
            </div>
            <div>
              <h3 className={`text-xl font-bold uppercase mb-2 ${currentTheme?.primaryText || 'text-[#006437]'}`}>Call Us</h3>
              <p className={`${currentTheme?.secondaryText || 'text-[#006437]/60'}`}>1-800-806-6453</p>
            </div>
            <div>
              <h3 className={`text-xl font-bold uppercase mb-2 ${currentTheme?.primaryText || 'text-[#006437]'}`}>Email Us</h3>
              <p className={`${currentTheme?.secondaryText || 'text-[#006437]/60'}`}>support@nikekicks.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Your Name" 
              className={`w-full bg-[#006437]/5 border border-[#006437]/10 focus:border-[#006437]/30 ${currentTheme?.primaryText || 'text-[#006437]'} px-5 py-4 rounded-xl outline-none transition-colors duration-300 placeholder-[#006437]/40`}
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className={`w-full bg-[#006437]/5 border border-[#006437]/10 focus:border-[#006437]/30 ${currentTheme?.primaryText || 'text-[#006437]'} px-5 py-4 rounded-xl outline-none transition-colors duration-300 placeholder-[#006437]/40`}
            />
            <textarea 
              rows="4"
              placeholder="Message" 
              className={`w-full bg-[#006437]/5 border border-[#006437]/10 focus:border-[#006437]/30 ${currentTheme?.primaryText || 'text-[#006437]'} px-5 py-4 rounded-xl outline-none transition-colors duration-300 placeholder-[#006437]/40 resize-none`}
            ></textarea>
            <button 
              type="submit" 
              className={`w-full py-4 mt-2 font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${currentTheme?.buttonBg || 'bg-white'} ${currentTheme?.buttonText || 'text-black'} ${currentTheme?.buttonHover || 'hover:bg-gray-300'}`}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer theme={currentTheme} />
    </div>
  );
};

export default Contact;
