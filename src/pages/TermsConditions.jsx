import React from 'react';
import Footer from '../components/Footer';

const TermsConditions = ({ currentTheme }) => {
  return (
    <div className={`min-h-screen pt-28 ${currentTheme?.sectionBg || 'bg-white'}`}>
      <div className={`max-w-4xl mx-auto px-6 py-16 ${currentTheme?.primaryText || 'text-[#006437]'}`}>
        <h1 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 ${currentTheme?.primaryText || 'text-[#006437]'}`}>
          Terms & Conditions
        </h1>
        <div className={`space-y-6 leading-relaxed ${currentTheme?.name === 'white' ? 'bg-[#006437]/5 border-[#006437]/10' : 'bg-white/5 border-white/10'} p-8 md:p-12 rounded-3xl border shadow-2xl backdrop-blur-sm`}>
          <p>
            Welcome to <strong>Nike Kicks</strong>. These Terms and Conditions govern your use of our website and services. By accessing or using our platform to purchase premium sneakers, you agree to be bound by these terms. If you do not agree with any part of these terms, please refrain from using our website.
          </p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>1. Use of the Website</h2>
          <p>By using this website, you warrant that you are at least 18 years old or are using the site under the supervision of a parent or guardian. You agree to use the site only for lawful purposes and in a manner that does not infringe the rights of others.</p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>2. Product Information & Pricing</h2>
          <p>We strive to ensure that all sneaker descriptions, images, and prices are accurate. However, errors may occur. In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price. All sneaker availability is subject to change without notice.</p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>3. Intellectual Property</h2>
          <p>All content on this website, including text, graphics, logos, and sneaker images, is the property of Nike Kicks or its content suppliers and is protected by international copyright laws. Unauthorized use of any materials on this site is strictly prohibited.</p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>4. Limitation of Liability</h2>
          <p>Nike Kicks shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our website or the purchase of any products through the site.</p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>5. Governing Law</h2>
          <p>These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which Nike Kicks operates. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in that region.</p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>6. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on the website. Your continued use of the site after changes are posted constitutes your acceptance of the new terms.</p>
        </div>
      </div>
      <Footer theme={currentTheme} />
    </div>
  );
};

export default TermsConditions;
