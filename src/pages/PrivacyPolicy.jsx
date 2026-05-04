import React from 'react';
import Footer from '../components/Footer';

const PrivacyPolicy = ({ currentTheme }) => {
  return (
    <div className={`min-h-screen pt-28 ${currentTheme?.sectionBg || 'bg-white'}`}>
      <div className={`max-w-4xl mx-auto px-6 py-16 ${currentTheme?.primaryText || 'text-[#006437]'}`}>
        <h1 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 ${currentTheme?.primaryText || 'text-[#006437]'}`}>
          Privacy Policy
        </h1>
        <div className={`space-y-6 leading-relaxed ${currentTheme?.name === 'white' ? 'bg-[#006437]/5 border-[#006437]/10' : 'bg-white/5 border-white/10'} p-8 md:p-12 rounded-3xl border shadow-2xl backdrop-blur-sm`}>
          <p>
            At <strong>Nike Kicks</strong> (accessible from nikekicks.com), the privacy and security of our customers are our highest priorities. This Privacy Policy outlines the types of personal information we collect, how we use it, and the steps we take to protect your data when you shop for premium sneakers on our platform.
          </p>
          
          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-white'} mt-10 mb-4`}>1. Information We Collect</h2>
          <p>To provide you with the best shopping experience, we collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and shipping/billing addresses provided during checkout or account registration.</li>
            <li><strong>Payment Information:</strong> Credit card details and billing information (processed securely through encrypted third-party payment gateways like Stripe or PayPal; we do not store full credit card numbers).</li>
            <li><strong>Device & Browsing Data:</strong> IP address, browser type, device information, and interaction data (pages visited, items added to cart) collected via cookies to optimize website performance.</li>
          </ul>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-white'} mt-10 mb-4`}>2. How We Use Your Information</h2>
          <p>We utilize your data to ensure a seamless sneaker shopping experience. Specifically, we use it to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Process and fulfill your sneaker orders, including shipping and delivery updates.</li>
            <li>Provide customer support and respond to your inquiries regarding sizing, returns, or order status.</li>
            <li>Personalize your experience by recommending shoes based on your browsing history and preferences.</li>
            <li>Send promotional emails about new sneaker drops, exclusive restocks, and sales (you can opt-out at any time).</li>
            <li>Detect, prevent, and mitigate fraudulent transactions to protect our community.</li>
          </ul>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-white'} mt-10 mb-4`}>3. Data Sharing & Third Parties</h2>
          <p>
            We do not sell your personal data to third parties. We only share necessary information with trusted service providers who assist us in operating our business, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Logistics Partners:</strong> Courier services (e.g., FedEx, UPS) to deliver your sneakers.</li>
            <li><strong>Payment Processors:</strong> Secure gateways to authorize and process your transactions.</li>
            <li><strong>Marketing Platforms:</strong> Email service providers to send you newsletters and promotional updates.</li>
          </ul>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-white'} mt-10 mb-4`}>4. Cookies and Tracking Technologies</h2>
          <p>
            Nike Kicks uses cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies help us remember your cart items, understand user behavior, and improve our platform's functionality. You can instruct your browser to refuse all cookies, but some parts of our site may not function properly.
          </p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-white'} mt-10 mb-4`}>5. Your Data Rights</h2>
          <p>
            Depending on your location, you have the right to access, update, or delete the personal information we hold about you. If you wish to exercise these rights, or if you want to close your account and remove your data from our systems, please contact our support team.
          </p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-white'} mt-10 mb-4`}>6. Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:
          </p>
          <p className="mt-2 font-medium">Email: privacy@nikekicks.com</p>
        </div>
      </div>
      <Footer theme={currentTheme} />
    </div>
  );
};

export default PrivacyPolicy;
