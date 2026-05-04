import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ currentTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Logged in with:', { email, password });
      navigate('/'); // Redirect to home page
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-x-hidden bg-white transition-colors duration-700 pt-24 md:pt-0">

      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#006437]/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#006437]/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-12 z-10 py-10 md:py-32">

        {/* Visual Content - Now Responsive */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <div className="relative group w-full max-w-[240px] md:max-w-lg">
            <img
              src="/images/tempo.png"
              alt="Nike Sneaker"
              className="w-full object-contain drop-shadow-[0_20px_40px_rgba(0,100,55,0.2)] transition-transform duration-700 group-hover:scale-105 -rotate-12"
              style={{ animation: 'subtleFloat 6s ease-in-out infinite' }}
            />
          </div>
          <div className="mt-8 md:mt-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-[#006437] leading-none mb-4 md:mb-6">
              Step into<br /><span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,100,55,0.4)' }}>the future</span>
            </h2>
            <p className="text-[#006437]/60 text-sm md:text-xl font-medium max-w-xs md:max-w-md mx-auto lg:mx-0">
              Your exclusive access to the most iconic sneaker drops starts here.
            </p>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="w-full lg:w-1/2 max-w-md mx-auto">
          <div className="bg-[#006437]/5 border border-[#006437]/10 rounded-[30px] md:rounded-[40px] p-6 md:p-12 backdrop-blur-xl shadow-2xl shadow-black/5">
            {/* Header */}
            <div className="mb-8 md:mb-10 text-center lg:text-left">
              <h1 className="text-2xl md:text-4xl font-black uppercase text-[#006437] mb-2">Sign In</h1>
              <p className="text-[#006437]/60 text-xs md:text-base font-medium">Enter your details to access your account.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold rounded-2xl animate-pulse text-center uppercase tracking-widest">
                {error}
              </div>
            )}

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1 md:space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#006437]/60 ml-1">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-[#006437]/30">
                    <i className="ri-mail-line"></i>
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-5 py-3 md:py-4 bg-white border border-[#006437]/10 text-[#006437] placeholder:text-[#006437]/30 rounded-xl md:rounded-2xl focus:outline-none focus:border-[#006437]/30 transition-all text-sm md:text-base shadow-inner"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 md:space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#006437]/60">Password</label>
                  <a href="#" className="text-[9px] font-bold text-[#006437]/30 hover:text-[#006437] transition-colors uppercase tracking-widest">Forgot?</a>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-[#006437]/30">
                    <i className="ri-lock-password-line"></i>
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 md:py-4 bg-white border border-[#006437]/10 text-[#006437] placeholder:text-[#006437]/30 rounded-xl md:rounded-2xl focus:outline-none focus:border-[#006437]/30 transition-all text-sm md:text-base shadow-inner"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center ml-1">
                <input type="checkbox" className="w-3 h-3 md:w-4 md:h-4 rounded border-[#006437]/10 bg-[#006437]/5 text-[#006437] focus:ring-offset-0 focus:ring-0" />
                <label className="ml-3 text-[10px] font-bold text-[#006437]/40 uppercase tracking-widest">Remember Me</label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'bg-[#006437] text-white hover:scale-[1.02] active:scale-[0.98]'}`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : 'Sign In'}
              </button>
            </form>

            <p className="mt-8 md:mt-10 text-center text-[10px] font-bold uppercase tracking-widest text-[#006437]/30">
              New here? <Link to="/login" className="text-[#006437] hover:underline ml-1">Create Account</Link>
            </p>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-15px) rotate(-10deg); }
        }
      `}</style>
    </div>
  );
};
export default Login;
