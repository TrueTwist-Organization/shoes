import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shoesData } from '../data/shoesData';
import Footer from '../components/Footer';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('UK 9');

  // Scroll to top whenever the product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  const product = shoesData.find(s => s.id === parseInt(id));
  const accentColor = product?.colorHex || '#1B4332';

  // Ensure text is readable on light colors (used for size buttons only)
  const isLightColor = (hex) => {
    if (!hex || hex.startsWith('linear')) return false;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 180;
  };
  const sizeTextColor = isLightColor(accentColor) ? '#1a1a1a' : '#ffffff';

  useGSAP(() => {
    if (!product) return;
    gsap.set([".product-image-wrap", ".product-info > *"], { opacity: 1, x: 0, y: 0 });

    const tl = gsap.timeline();
    tl.from(".product-image-wrap", { x: -80, opacity: 0, duration: 1, ease: "power4.out" })
      .from(".product-info > *", { y: 25, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" }, "-=0.6");

    gsap.to(".product-image", {
      y: 18,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { dependencies: [] });

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAF9]">
        <h2 className="text-3xl font-black text-[#1B4332]">Product Not Found</h2>
        <button onClick={() => navigate('/collections')} className="mt-6 px-8 py-3 bg-[#1B4332] text-white rounded-full font-bold">Back to Collections</button>
      </div>
    );
  }

  const sizes = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];

  const handleBuyNow = () => {
    navigate('/checkout', { state: { product } });
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col">

      {/* Top bar */}
      <div className="w-full bg-white border-b border-[#1B4332]/10 px-6 md:px-10 py-4 flex items-center justify-between fixed top-0 z-50 shadow-sm">
        <button
          onClick={() => navigate('/collections')}
          className="flex items-center gap-2 text-[#1B4332]/60 hover:text-[#1B4332] font-bold text-sm transition-all"
        >
          <i className="ri-arrow-left-line text-lg"></i> Back to Collections
        </button>
        <span className="text-xs font-black uppercase tracking-widest text-[#1B4332]/40">SECURE CHECKOUT 🔒</span>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col lg:flex-row gap-10 items-center justify-center pt-24 pb-16">

        {/* LEFT: Image Panel */}
        <div className="product-image-wrap w-full lg:w-1/2 flex items-center justify-center relative overflow-hidden min-h-[380px]">
          {/* Faded category background text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[18vw] lg:text-[12vw] font-black italic uppercase opacity-[0.04] text-[#1B4332] leading-none tracking-tighter">
              {product.category}
            </span>
          </div>
          {/* Accent color glow blob */}
          <div
            className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: accentColor, opacity: 0.12 }}
          ></div>
          <img
            src={product.image}
            alt={product.name}
            className="product-image w-full max-w-sm md:max-w-md object-contain drop-shadow-2xl relative z-10"
          />
        </div>

        {/* RIGHT: Product Info */}
        <div className="product-info w-full lg:w-1/2 flex flex-col gap-5">

          {/* Category badge */}
          <div className="inline-block px-4 py-1 border border-[#1B4332]/20 rounded-full text-xs font-black uppercase tracking-widest text-[#1B4332]/60 w-max">
            {product.category} Footwear
          </div>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-black uppercase text-[#1B4332] leading-none tracking-tighter">
            {product.name}
          </h1>

          {/* Price + Discount + Free shipping badge */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-gray-400 line-through decoration-2 decoration-gray-400/50">{product.price}</span>
              <span className="text-xs font-black text-white bg-red-500 px-2 py-1 rounded tracking-widest uppercase">50% OFF</span>
            </div>
            <div className="flex items-baseline gap-3 flex-wrap mt-[-4px]">
              <span className="text-4xl font-black text-[#1B4332]">
                {`₹${Math.floor(parseInt(product.price.replace(/[^0-9]/g, ''), 10) / 2).toLocaleString('en-IN')}`}
              </span>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">✓ FREE SHIPPING</span>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-gray-500 text-sm leading-relaxed max-w-md font-medium border-l-4 pl-4"
            style={{ borderColor: accentColor }}
          >
            {product.description}
          </p>

          {/* Color Swatch */}
          <div className="pt-4 border-t border-[#1B4332]/10">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1B4332]/50 mb-3">Color</h3>
            <div className="flex items-center gap-4">
              {/* Swatch circle — uses inline style so the actual color shows */}
              <div
                className="w-12 h-12 rounded-full border-4 border-white shadow-xl cursor-pointer"
                style={{
                  background: accentColor,
                  boxShadow: `0 0 0 3px ${accentColor}, 0 4px 15px ${accentColor}66`
                }}
              ></div>
              <div>
                <p className="text-sm font-black text-[#1B4332]">{product.color}</p>
                <p className="text-[10px] font-bold text-[#1B4332]/40 uppercase tracking-widest">Selected</p>
              </div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="pt-4 border-t border-[#1B4332]/10">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1B4332]/50">Select Size</h3>
              <span className="text-xs font-bold text-[#1B4332]/50 underline cursor-pointer hover:text-[#1B4332]">Size Guide</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className="py-3 rounded-xl text-xs font-black border-2 transition-all duration-200"
                  style={
                    selectedSize === size
                      ? {
                          background: '#1B4332',
                          borderColor: '#1B4332',
                          color: '#ffffff',
                          transform: 'scale(1.07)',
                          boxShadow: '0 6px 18px rgba(27,67,50,0.4)'
                        }
                      : {
                          background: 'transparent',
                          borderColor: 'rgba(27,67,50,0.25)',
                          color: '#1B4332'
                        }
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* BUY NOW BUTTON — always visible */}
          <div className="pt-4">
            <button
              onClick={handleBuyNow}
              className="w-full py-4 px-6 rounded-full font-black tracking-[0.12em] uppercase flex items-center justify-between group transition-all duration-300 hover:scale-[1.02] active:scale-95"
              style={{
                background: '#1B4332',
                color: '#ffffff',
                boxShadow: '0 16px 40px rgba(27,67,50,0.35)'
              }}
            >
              {/* Left: Cart icon */}
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-shopping-cart-2-fill text-lg"></i>
              </div>
              {/* Center: Text */}
              <div className="flex flex-col items-center">
                <span className="text-base font-black tracking-[0.15em]">BUY NOW</span>
                <span className="text-sm font-bold opacity-80">
                  {`₹${Math.floor(parseInt(product.price.replace(/[^0-9]/g, ''), 10) / 2).toLocaleString('en-IN')}`}
                </span>
              </div>
              {/* Right: Arrow icon */}
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                <i className="ri-arrow-right-line text-lg group-hover:translate-x-1 transition-transform"></i>
              </div>
            </button>
            <p className="text-center text-[10px] font-black text-[#1B4332]/40 mt-3 tracking-widest uppercase">
              🔒 Secure Checkout &nbsp;•&nbsp; 7-Day Easy Returns
            </p>
          </div>

        </div>
      </div>

      <Footer theme={{ name: 'white' }} />
    </div>
  );
};

export default ProductDetails;
