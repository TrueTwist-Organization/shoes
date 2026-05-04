import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import Footer from '../components/Footer';

gsap.registerPlugin(TextPlugin);

const Checkout = ({ currentTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
  }, []);

  const { product } = location.state || {
    product: {
      name: "Air More Uptempo Sneakers",
      price: "₹18,999",
      image: "/images/tempo.png"
    }
  };

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loginMode, setLoginMode] = useState(null); // 'login' or 'guest'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    cardNum: '',
    expiry: '',
    cvv: ''
  });

  const containerRef = useRef(null);
  const shoeRef = useRef(null);
  const progressLineRef = useRef(null);
  const stepsRef = useRef([]);

  // Auto-scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step]);

  const nextStep = () => {
    if (step < 4) {
      // Transition animations based on step
      if (step === 1) {
        // Page turn animation logic could go here
        gsap.to(".step-content", {
          rotateY: -90,
          opacity: 0,
          duration: 0.6,
          onComplete: () => {
            setStep(2);
            gsap.fromTo(".step-content", { rotateY: 90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.6 });
          }
        });
      } else if (step === 2) {
        // Venetian blind wipe
        const strips = document.querySelectorAll('.blind-strip');
        gsap.to(strips, {
          xPercent: -100,
          stagger: 0.05,
          duration: 0.8,
          onComplete: () => {
            setStep(3);
            gsap.set(strips, { xPercent: 100 });
          }
        });
      } else if (step === 3) {
        // Camera flash
        gsap.to(".flash-overlay", {
          opacity: 1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          onComplete: () => setStep(4)
        });
      }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  useGSAP(() => {
    // Initial entrance for progress indicator
    gsap.from(".step-item", {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Update progress line
    const progressWidth = ((step - 1) / 3) * 100;
    gsap.to(progressLineRef.current, {
      width: `${progressWidth}%`,
      duration: 1,
      ease: "power3.inOut"
    });
  }, [step]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white font-['DM_Sans'] selection:bg-[#95D5B2] selection:text-[#1B4332]"
      style={{ '--primary': '#1B4332', '--secondary': '#2D6A4F', '--accent': '#95D5B2' }}
    >
      <style>{`
        @font-face { font-family: 'DM Sans'; font-style: normal; }
        h1, h2, h3, .luxury-text { font-family: 'Cormorant Garamond', serif; }
        
        .shoe-sole {
          clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .step-active .shoe-sole {
          background: var(--primary);
          box-shadow: 0 0 20px rgba(27, 67, 50, 0.3);
          transform: scale(1.1);
        }

        .step-completed .shoe-sole {
          background: var(--accent);
        }

        .floating-shoe {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        .input-underline {
          position: relative;
          border-bottom: 2px solid #e2e8f0;
        }

        .input-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.3s ease;
        }

        .input-underline:focus-within::after {
          width: 100%;
        }

        .blind-strip {
          position: fixed;
          top: 0;
          left: 0;
          height: 12.5vh;
          width: 100vw;
          background: var(--primary);
          z-index: 1000;
          pointer-events: none;
          transform: translateX(100%);
        }

        .camera-flash {
          position: fixed;
          inset: 0;
          background: white;
          opacity: 0;
          z-index: 2000;
          pointer-events: none;
        }

        .shimmer-btn {
          position: relative;
          overflow: hidden;
        }

        .shimmer-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(149, 213, 178, 0.2), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          100% { left: 200%; }
        }
      `}</style>

      {/* FLASH OVERLAY */}
      <div className="camera-flash flash-overlay"></div>

      {/* BLIND STRIPS */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="blind-strip" style={{ top: `${i * 12.5}vh` }}></div>
      ))}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b-2 border-[#1B4332] z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/images/nike-logo.png" alt="Logo" className="h-6 md:h-8" style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(21%) saturate(1512%) hue-rotate(105deg) brightness(92%) contrast(92%)' }} />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { id: 1, label: 'SIZE & LOGIN' },
            { id: 2, label: 'ADDRESS' },
            { id: 3, label: 'PAYMENT' },
            { id: 4, label: 'CONFIRMED' }
          ].map((s) => (
            <div
              key={s.id}
              className={`flex items-center gap-3 transition-all duration-500 ${step === s.id ? 'step-active opacity-100' : step > s.id ? 'step-completed opacity-100' : 'opacity-40'}`}
            >
              <div className="shoe-sole text-[10px] font-bold text-white">
                {step > s.id ? <i className="ri-check-line text-lg"></i> : s.id}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1B4332]">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[#1B4332] font-black text-[10px] tracking-widest uppercase">
          SECURE CHECKOUT <i className="ri-lock-fill animate-pulse"></i>
        </div>
      </nav>

      {/* MOBILE PROGRESS INDICATOR */}
      <div className="md:hidden pt-20 px-6">
        <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
          <div ref={progressLineRef} className="absolute top-0 left-0 h-full bg-[#1B4332]"></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[8px] font-bold tracking-tighter uppercase text-[#1B4332]">Login</span>
          <span className="text-[8px] font-bold tracking-tighter uppercase text-[#1B4332]">Address</span>
          <span className="text-[8px] font-bold tracking-tighter uppercase text-[#1B4332]">Payment</span>
          <span className="text-[8px] font-bold tracking-tighter uppercase text-[#1B4332]">Success</span>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="pt-24 md:pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center">

        <div className="step-content w-full perspective-1000">
          {step === 1 && <Step1 product={product} onNext={(mode) => { setLoginMode(mode); nextStep(); }} />}
          {step === 2 && <Step2 product={product} onNext={nextStep} onBack={prevStep} />}
          {step === 3 && <Step3 product={product} onNext={nextStep} onBack={prevStep} />}
          {step === 4 && <Step4 product={product} />}
        </div>

      </main>

      {/* FOOTER */}
      <Footer theme={{ name: 'white' }} />
    </div>
  );
};

// ==========================================
// STEP 1: LOGIN / GUEST
// ==========================================
const Step1 = ({ product, onNext }) => {
  const shoeRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLoginNext = () => {
    if (loginData.email.trim() === '' || loginData.password.trim() === '') {
      gsap.to(".login-panel", { x: [-10, 10, -10, 10, 0], duration: 0.4, ease: "none" });
      alert("Please enter both email and password to login. 👟");
      return;
    }
    onNext('login');
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".login-panel", { y: 100, opacity: 0, duration: 1, ease: "power4.out" })
      .from(".welcome-text", { text: "", duration: 1.5, ease: "none" }, "-=0.5");

    // Shoe walk in
    gsap.fromTo(shoeRef.current,
      { x: -200, opacity: 0, rotation: -20 },
      {
        x: 0, opacity: 1, rotation: 0, duration: 1.5, ease: "power2.out",
        onComplete: () => {
          gsap.to(shoeRef.current, { rotation: 360, duration: 1, ease: "power2.inOut", delay: 0.2 });
        }
      }
    );
  });

  return (
    <div className="login-panel w-full max-w-4xl bg-[#F8FAF9] rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl mx-auto border border-[#1B4332]/5 min-h-[500px]">
      {/* Left Stripe */}
      <div className="w-full md:w-20 bg-[#1B4332] relative overflow-hidden flex md:flex-col items-center justify-center py-4">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("/images/nike-logo.png")', backgroundSize: '40px', backgroundRepeat: 'repeat' }}></div>
        <div className="text-white text-xs font-black rotate-0 md:-rotate-90 uppercase tracking-[0.5em] whitespace-nowrap">PREMIUM BOUTIQUE</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-16 flex flex-col items-center justify-center relative">
        <div ref={shoeRef} className="w-32 h-32 md:w-48 md:h-48 mb-8">
          <img src={product.image} alt="Shoe" className="w-full h-full object-contain drop-shadow-2xl" />
        </div>

        <h2 className="welcome-text text-3xl md:text-5xl italic mb-10 text-[#1B4332] text-center h-12">
          Welcome, Sneaker Head! 👟
        </h2>

        {!showLogin ? (
          <div className="flex flex-col gap-4 w-full max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button
              onClick={() => setShowLogin(true)}
              className="group bg-[#1B4332] text-white py-4 rounded-full font-bold text-sm tracking-widest hover:bg-[#2D6A4F] transition-all flex items-center justify-center gap-3"
            >
              <i className="ri-user-fill group-hover:translate-x-1 transition-transform"></i>
              LOGIN / SIGNUP
            </button>

            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-[1px] bg-[#1B4332]/10"></div>
              <div className="w-6 h-6 rounded-full border border-[#1B4332]/20 flex items-center justify-center text-[8px] font-bold text-[#1B4332]">OR</div>
              <div className="flex-1 h-[1px] bg-[#1B4332]/10"></div>
            </div>

            <button
              onClick={() => onNext('guest')}
              className="border-2 border-dashed border-[#1B4332]/40 text-[#1B4332] py-4 rounded-full font-bold text-sm tracking-widest hover:bg-[#1B4332] hover:text-white hover:border-solid transition-all"
            >
              CONTINUE AS GUEST
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm animate-in slide-in-from-right-8 fade-in duration-500">
            <div className="space-y-6">
              <div className="input-underline">
                <label className="text-[10px] font-black uppercase text-[#1B4332]/40 tracking-widest block mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  placeholder="sneakerhead@example.com" 
                  className="w-full bg-transparent py-2 text-[#1B4332] focus:outline-none font-bold" 
                />
              </div>
              <div className="input-underline">
                <label className="text-[10px] font-black uppercase text-[#1B4332]/40 tracking-widest block mb-1">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    placeholder="••••••••" 
                    className="w-full bg-transparent py-2 text-[#1B4332] focus:outline-none font-bold" 
                  />
                  <i className="ri-eye-line absolute right-2 top-2 text-[#1B4332]/40 cursor-pointer"></i>
                </div>
              </div>
              <button
                onClick={handleLoginNext}
                className="w-full bg-[#1B4332] text-white py-4 rounded-full font-bold text-sm tracking-widest mt-4 shadow-xl shadow-[#1B4332]/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                PROCEED TO SHIPPING
              </button>
              <p onClick={() => setShowLogin(false)} className="text-center text-[10px] font-black text-[#1B4332]/40 cursor-pointer hover:text-[#1B4332] tracking-widest uppercase mt-4 underline underline-offset-4">Back to choice</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// STEP 2: ADDRESS
// ==========================================
const Step2 = ({ product, onNext, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    flat: '',
    street: '',
    city: '',
    pincode: ''
  });

  const handleNext = () => {
    const isFormIncomplete = Object.values(formData).some(val => val.trim() === '');
    if (isFormIncomplete) {
      gsap.to(".form-card", { x: [-10, 10, -10, 10, 0], duration: 0.4, ease: "none" });
      alert("Please fill out all the address details before proceeding. 👟");
      return;
    }
    onNext();
  };

  useGSAP(() => {
    gsap.from(".form-card", { scale: 0.8, opacity: 0, duration: 1, ease: "power4.out" });
    gsap.from(".input-group", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8 });

    // Running shoe animation at top
    gsap.to(".running-shoe", {
      x: '300px',
      repeat: -1,
      duration: 3,
      ease: "none",
      onRepeat: function () {
        gsap.set(".running-shoe", { x: '-300px' });
      }
    });
  }, { dependencies: [] });

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1 form-card bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-[#1B4332]/5 relative overflow-hidden">
        <div className="running-shoe absolute top-4 left-1/2 -translate-x-1/2 text-2xl">👟</div>

        <h2 className="text-3xl md:text-5xl italic text-[#1B4332] mb-12 text-center">Where should we deliver? 📍</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { id: 'name', label: 'Full Name', icon: 'ri-user-line', placeholder: 'John Doe' },
            { id: 'phone', label: 'Phone Number', icon: 'ri-phone-line', placeholder: '+91 98765 43210' },
            { id: 'flat', label: 'Flat / House No', icon: 'ri-home-4-line', placeholder: 'Apartment 4B' },
            { id: 'street', label: 'Street / Area', icon: 'ri-road-map-line', placeholder: 'Sneaker Street' },
            { id: 'city', label: 'City', icon: 'ri-building-line', placeholder: 'Mumbai' },
            { id: 'pincode', label: 'Pincode', icon: 'ri-map-pin-line', placeholder: '400001' }
          ].map((field, i) => (
            <div key={i} className="input-group group">
              <label className="text-[10px] font-black uppercase text-[#1B4332]/40 tracking-widest mb-2 flex items-center gap-2">
                <i className={field.icon + " text-[#1B4332]"}></i> {field.label}
              </label>
              <div className="relative border-l-4 border-[#1B4332] pl-4">
                <input 
                  type="text" 
                  value={formData[field.id]}
                  onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                  placeholder={field.placeholder} 
                  className="w-full py-2 bg-transparent text-[#1B4332] font-bold focus:outline-none border-b border-[#1B4332]/10 focus:border-[#1B4332] transition-colors" 
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="shimmer-btn w-full bg-[#1B4332] text-white py-5 rounded-full font-black tracking-[0.2em] mt-12 shadow-2xl shadow-[#1B4332]/20 hover:scale-[1.02] active:scale-95 transition-all uppercase"
        >
          DELIVER HERE
        </button>
      </div>

      {/* Side Summary */}
      <div className="w-full md:w-80 space-y-6">
        <div className="bg-[#1B4332] text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-2 right-4 text-[8px] font-black opacity-20 uppercase tracking-[0.3em]">Boutique Item</div>
          <img src={product.image} alt="Shoe" className="w-full h-40 object-contain drop-shadow-2xl floating-shoe" />
          <div className="mt-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#95D5B2] mb-1">Selected Pair</p>
            <h3 className="text-xl font-bold luxury-text">{product.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs font-black uppercase tracking-widest opacity-60">Size 10</span>
              <span className="text-lg font-black">{product.price}</span>
            </div>
          </div>
        </div>
        <button onClick={onBack} className="w-full py-4 border-2 border-[#1B4332]/10 rounded-full text-[10px] font-black uppercase tracking-widest text-[#1B4332]/40 hover:text-[#1B4332] hover:border-[#1B4332] transition-all">Go Back</button>
      </div>
    </div>
  );
};

// ==========================================
// STEP 3: PAYMENT
// ==========================================
const Step3 = ({ product, onNext, onBack }) => {
  const [method, setMethod] = useState('card');

  useGSAP(() => {
    // Removed GSAP stagger animation to prevent cards from getting stuck invisible
    gsap.set(".pay-card", { clearProps: "all" });
  });

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
      <div className="flex-1">
        <h2 className="text-3xl sm:text-4xl md:text-6xl italic text-[#1B4332] mb-10 leading-tight md:leading-none">Choose Payment Method 💳</h2>

        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {[
            { id: 'card', label: 'Card', icon: 'ri-bank-card-line' },
            { id: 'upi', label: 'UPI', icon: 'ri-qr-code-line' },
            { id: 'cod', label: 'COD', icon: 'ri-money-dollar-circle-line' },
            { id: 'net', label: 'Banking', icon: 'ri-bank-line' }
          ].map((m) => (
            <div
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`pay-card p-4 sm:p-6 md:p-8 rounded-[20px] md:rounded-[30px] border-2 transition-all duration-500 cursor-pointer relative overflow-hidden group shadow-sm flex flex-col items-center justify-center text-center min-h-[110px] md:min-h-[140px] ${method === m.id
                ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xl scale-[1.02]'
                : 'bg-white text-[#1B4332] border-[#1B4332]/20 hover:border-[#1B4332]/60 hover:shadow-md'
                }`}
            >
              <i className={`${m.icon} text-3xl md:text-4xl mb-3 ${method === m.id ? 'text-white' : 'text-[#1B4332]'}`}></i>
              <span className={`text-[12px] md:text-sm font-bold uppercase tracking-wider ${method === m.id ? 'text-white' : 'text-[#1B4332]'}`}>
                {m.label}
              </span>

              {method === m.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-[#95D5B2] rounded-full flex items-center justify-center text-[#1B4332] animate-in zoom-in duration-300">
                  <i className="ri-check-line font-bold"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dynamic Detail Area */}
        <div className="mt-10 min-h-[250px] animate-in fade-in duration-700">
          {method === 'card' && (
            <div className="bg-[#1B4332] p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full"></div>
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-8 bg-yellow-400/80 rounded-md"></div>
                <div className="text-xl italic opacity-40">VISA</div>
              </div>
              <div className="space-y-6">
                <div className="text-2xl font-mono tracking-[0.3em] opacity-80">•••• •••• •••• ••••</div>
                <div className="flex gap-10">
                  <div>
                    <p className="text-[8px] font-black uppercase opacity-40 mb-1">Expiry Date</p>
                    <p className="text-sm font-bold">MM/YY</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase opacity-40 mb-1">CVV</p>
                    <p className="text-sm font-bold">•••</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {method === 'upi' && (
            <div className="bg-[#F8FAF9] p-8 rounded-[40px] border-2 border-dashed border-[#1B4332]/20 flex flex-col items-center">
              <div className="w-40 h-40 bg-white p-4 rounded-2xl shadow-xl relative overflow-hidden">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NikePremium" alt="QR" className="w-full h-full opacity-40" />
                <div className="absolute top-0 left-0 w-full h-1 bg-[#95D5B2] shadow-[0_0_10px_#95D5B2] animate-scan"></div>
              </div>
              <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-[#1B4332]/40">Scan with any UPI App</p>
              <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#1B4332] text-white rounded-full text-xs font-black">
                <i className="ri-time-line"></i> 09:59
              </div>
            </div>
          )}
          {method === 'cod' && (
            <div className="bg-[#F8FAF9] p-8 rounded-[40px] border-2 border-dashed border-[#1B4332]/20 flex flex-col items-center justify-center text-center">
              <div className="text-6xl mb-4">💵</div>
              <h3 className="text-2xl font-bold text-[#1B4332] luxury-text">Pay at Delivery</h3>
              <p className="text-xs text-[#1B4332]/60 mt-2 font-bold uppercase tracking-widest">No extra charges for COD</p>
              <div className="mt-6 px-6 py-2 border-2 border-[#1B4332] rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#1B4332]">VERIFIED ORDER</div>
            </div>
          )}
          {method === 'net' && (
            <div className="bg-[#F8FAF9] p-8 rounded-[40px] border-2 border-dashed border-[#1B4332]/20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-6 border border-[#1B4332]/10">
                <i className="ri-bank-line text-4xl text-[#1B4332]"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#1B4332] luxury-text">Net Banking</h3>
              <p className="text-xs text-[#1B4332]/60 mt-2 font-bold uppercase tracking-widest">You will be redirected to your bank</p>
              <div className="mt-6 w-full max-w-sm flex flex-col gap-3">
                <div className="w-full py-3 px-4 bg-white border border-[#1B4332]/10 rounded-xl text-left text-sm font-bold text-[#1B4332] flex justify-between items-center cursor-pointer hover:border-[#1B4332]/30">
                  Select your Bank <i className="ri-arrow-down-s-line"></i>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-96">
        <div className="bg-[#F8FAF9] p-8 md:p-10 rounded-[40px] shadow-2xl border border-[#1B4332]/5 sticky top-32">
          <h3 className="text-2xl font-bold text-[#1B4332] luxury-text mb-8 border-b border-[#1B4332]/10 pb-4">Order Summary</h3>
          <div className="flex gap-4 mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl p-2 flex items-center justify-center border border-[#1B4332]/5">
              <img src={product.image} alt="Shoe" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-[#1B4332] leading-tight mb-1">{product.name}</h4>
              <p className="text-[10px] font-black text-[#1B4332]/40 uppercase tracking-widest">Size 10 • Qty 1</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 line-through decoration-gray-400/50">{product.price}</span>
                <span className="text-sm font-black text-[#1B4332]">
                  {`₹${Math.floor(parseInt(product.price.replace(/[^0-9]/g, ''), 10) / 2).toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#1B4332]/40">
              <span>Shipping</span>
              <span className="text-[#95D5B2]">FREE</span>
            </div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#1B4332]/40">
              <span>Tax (Incl.)</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-red-500">
              <span>Discount</span>
              <span>- 50% OFF</span>
            </div>
          </div>
          <div className="pt-6 border-t-2 border-[#1B4332]/5 flex justify-between items-end mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1B4332]/40">Total Amount</span>
            <span className="text-3xl font-black text-[#1B4332]">
              {`₹${Math.floor(parseInt(product.price.replace(/[^0-9]/g, ''), 10) / 2).toLocaleString('en-IN')}`}
            </span>
          </div>
          <button
            onClick={onNext}
            className="shimmer-btn w-full bg-[#1B4332] text-white py-5 rounded-full font-black tracking-[0.2em] shadow-2xl shadow-[#1B4332]/20 hover:scale-[1.02] active:scale-95 transition-all uppercase flex items-center justify-center gap-3"
          >
            PLACE ORDER <i className="ri-lock-fill"></i>
          </button>
          <p className="text-center text-[8px] font-black text-[#1B4332]/20 uppercase tracking-[0.4em] mt-6 flex items-center justify-center gap-2">
            <i className="ri-shield-check-line text-lg"></i> SSL SECURE PAYMENT
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// STEP 4: CONFIRMED
// ==========================================
const Step4 = ({ product }) => {
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".flash-overlay", { opacity: 0, duration: 1 })
      .from(".success-check", { scale: 0, rotation: -45, duration: 1, ease: "back.out(1.7)" })
      .from(".confirmed-text span", { y: 100, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power4.out" })
      .from(".order-card", { y: 50, opacity: 0, duration: 1 }, "-=0.5")
      .from(".confetti-particle", { y: -200, opacity: 0, stagger: 0.02, duration: 2, ease: "bounce.out" }, "-=1");

    // Van animation
    gsap.fromTo(".delivery-van",
      { x: '-100vw', scale: 0.5 },
      {
        x: '0', scale: 1, duration: 2, ease: "power2.out", delay: 2,
        onComplete: () => {
          gsap.to(".delivery-van", { y: -5, repeat: -1, yoyo: true, duration: 0.2 });
        }
      }
    );
  });

  return (
    <div className="w-full flex flex-col items-center py-10 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti-particle absolute w-2 h-2 rounded-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#1B4332', '#95D5B2', '#FFFFFF', '#FFD700'][Math.floor(Math.random() * 4)],
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          ></div>
        ))}
      </div>

      <div className="success-check w-32 h-32 md:w-48 md:h-48 rounded-full border-8 border-[#95D5B2] flex items-center justify-center bg-[#1B4332]/5 mb-8">
        <i className="ri-check-line text-8xl text-[#95D5B2]"></i>
      </div>

      <h1 className="confirmed-text flex flex-col items-center mb-6">
        <span className="text-4xl md:text-8xl font-black text-[#1B4332] leading-none uppercase tracking-tighter">ORDER</span>
        <span className="text-4xl md:text-8xl font-black text-[#1B4332] leading-none uppercase tracking-tighter">CONFIRMED</span>
      </h1>

      <p className="text-xl md:text-2xl italic text-[#1B4332]/60 mb-16">Your sneakers are on the way! 👟</p>

      {/* Delivery Animation */}
      <div className="relative w-full max-w-lg h-40 mb-20 overflow-hidden">
        <div className="delivery-van absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-48 h-24 bg-[#1B4332] rounded-t-3xl rounded-br-3xl relative p-4 flex items-center justify-center">
            <div className="absolute left-0 top-6 w-8 h-12 bg-[#2D6A4F] rounded-r-lg"></div>
            <img src="/images/nike-logo.png" alt="Logo" className="w-20 opacity-20 brightness-0 invert" />
            <div className="absolute -bottom-4 left-6 w-10 h-10 bg-black rounded-full border-4 border-[#F8FAF9]"></div>
            <div className="absolute -bottom-4 right-6 w-10 h-10 bg-black rounded-full border-4 border-[#F8FAF9]"></div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-1 bg-[#1B4332]/10"></div>
      </div>

      {/* Order Card */}
      <div className="order-card w-full max-w-2xl bg-white rounded-[40px] shadow-2xl border-t-8 border-[#1B4332] p-8 md:p-12 mb-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1B4332]/40 mb-2">Order Identification</p>
            <h4 className="text-xl font-mono font-bold text-[#1B4332]">#NK-{Math.floor(100000 + Math.random() * 900000)}</h4>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#F8FAF9] rounded-2xl p-2">
                  <img src={product.image} alt="Shoe" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h5 className="font-bold text-[#1B4332]">{product.name}</h5>
                  <p className="text-[10px] font-black text-[#1B4332]/40 uppercase tracking-widest">Size 10 • Black</p>
                </div>
              </div>
              <div className="pt-6 border-t border-[#1B4332]/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1B4332]/40 mb-2">Estimated Arrival</p>
                <div className="flex items-center gap-3">
                  <i className="ri-calendar-event-line text-2xl text-[#1B4332]"></i>
                  <span className="text-lg font-bold text-[#1B4332]">2-3 Business Days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-64 bg-[#F8FAF9] p-8 rounded-[30px] border border-[#1B4332]/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1B4332]/40 mb-4">Live Progress</p>
            <div className="space-y-8 relative">
              <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-[#1B4332]/10"></div>
              {[
                { label: 'Warehouse', status: 'completed' },
                { label: 'Packed', status: 'active' },
                { label: 'Shipped', status: 'pending' },
                { label: 'Delivered', status: 'pending' }
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-6 relative z-10">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all duration-500 ${p.status === 'completed' ? 'bg-[#95D5B2] text-[#1B4332]' : p.status === 'active' ? 'bg-[#1B4332] text-white scale-125 shadow-lg' : 'bg-white border-2 border-[#1B4332]/10 text-[#1B4332]/20'}`}>
                    {p.status === 'completed' ? <i className="ri-check-line"></i> : i + 1}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${p.status === 'pending' ? 'text-[#1B4332]/20' : 'text-[#1B4332]'}`}>{p.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[#1B4332]/10">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#2D6A4F] animate-pulse">👟 Shoe is on the path...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl px-6">
        <button
          onClick={() => {
            gsap.to(".success-check", { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1 });
            alert("Tracking link has been sent to your registered email! 👟");
          }}
          className="flex-1 bg-[#1B4332] text-white py-5 rounded-full font-black tracking-[0.2em] shadow-2xl shadow-[#1B4332]/20 hover:scale-[1.05] active:scale-95 transition-all uppercase"
        >
          TRACK MY ORDER 👟
        </button>
        <button onClick={() => navigate('/')} className="flex-1 border-2 border-[#1B4332]/20 text-[#1B4332]/60 py-5 rounded-full font-black tracking-[0.2em] hover:border-[#1B4332] hover:text-[#1B4332] transition-all uppercase">CONTINUE SHOPPING</button>
      </div>
    </div>
  );
};

export default Checkout;
