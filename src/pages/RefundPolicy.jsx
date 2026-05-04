import React from 'react';
import Footer from '../components/Footer';

const RefundPolicy = ({ currentTheme }) => {
  return (
    <div className={`min-h-screen pt-28 ${currentTheme?.sectionBg || 'bg-white'}`}>
      <div className={`max-w-4xl mx-auto px-6 py-16 ${currentTheme?.primaryText || 'text-[#006437]'}`}>
        <h1 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 ${currentTheme?.primaryText || 'text-[#006437]'}`}>
          Refund Policy
        </h1>
        <div className={`space-y-6 leading-relaxed ${currentTheme?.name === 'white' ? 'bg-[#006437]/5 border-[#006437]/10' : 'bg-white/5 border-white/10'} p-8 md:p-12 rounded-3xl border shadow-2xl backdrop-blur-sm`}>
          <p>
            At <strong>Nike Kicks</strong>, we want you to be completely satisfied with your premium sneaker purchase. If you are not entirely happy with your order, we're here to help with our straightforward refund and return policy.
          </p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>1. Returns Eligibility</h2>
          <p>You have <strong>30 calendar days</strong> to return an item from the date you received it. To be eligible for a return, your sneakers must be:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Unworn and in the same condition that you received them.</li>
            <li>In the original packaging (including the original shoe box).</li>
            <li>Accompanied by the receipt or proof of purchase.</li>
          </ul>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>2. Refunds Process</h2>
          <p>Once we receive your item, we will inspect it and notify you that we have received your returned sneakers. We will immediately notify you on the status of your refund after inspecting the item.</p>
          <p>If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>3. Shipping Costs</h2>
          <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>4. Damaged or Defective Items</h2>
          <p>If you receive a damaged or defective pair of sneakers, please contact us immediately so we can evaluate the issue and make it right through an exchange or full refund.</p>

          <h2 className={`text-2xl font-bold ${currentTheme?.primaryText || 'text-[#006437]'} mt-10 mb-4`}>5. Contact Us</h2>
          <p>If you have any questions on how to return your sneakers to us, contact us at:</p>
          <p className="mt-2 font-medium">Email: returns@nikekicks.com</p>
        </div>
      </div>
      <Footer theme={currentTheme} />
    </div>
  );
};

export default RefundPolicy;
