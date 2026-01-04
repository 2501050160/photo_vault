
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { USERS_DATA } from '../constants';
import { UserConfig } from '../types';

interface LoginPageProps {
  onLogin: (user: UserConfig) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const userContext = USERS_DATA.find(u => u.id === userId);

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!userContext) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-glow tracking-widest uppercase">Vault Mismatch</h2>
        <Link to="/" className="text-blue-400 hover:underline tracking-widest uppercase text-xs font-black">Back to Terminal</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setShake(false);

    // Simulate biometric check
    setTimeout(() => {
      if (password === userContext.password) {
        onLogin(userContext);
        navigate('/dashboard');
      } else {
        setError('CRITICAL: PIN MISMATCH. ACCESS DENIED.');
        setShake(true);
        setIsLoading(false);
        setPassword(''); // Clear pin on error
        setTimeout(() => setShake(false), 500);
      }
    }, 1200);
  };

  const initial = userContext.name.charAt(0).toUpperCase();

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-950 flex flex-col md:flex-row items-center justify-center p-6 md:p-20 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]"></div>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        <div className="flex-1 space-y-16 order-2 md:order-1">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-7xl md:text-[10rem] font-black text-white font-['Playfair_Display'] tracking-tighter leading-none text-glow mb-6">Hi <span className="text-4xl">👋</span>,</h1>
            <h2 className="text-6xl md:text-8xl font-black text-white font-['Playfair_Display'] tracking-tighter leading-none mb-10">I'm <span className="text-blue-500">{userContext.name}</span></h2>
            <p className="text-slate-500 text-xs font-black uppercase tracking-[0.8em] ml-2">Authorized Access Point</p>
          </motion.div>

          <motion.div
            className={`glass p-14 rounded-[4rem] border border-white/10 max-w-sm shadow-[0_40px_100px_rgba(0,0,0,0.6)] ${shake ? 'animate-shake border-red-500/50' : ''}`}
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 ml-4">Enter Secure PIN</label>
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-10 py-8 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] text-white focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-slate-800 text-center text-3xl tracking-[0.5em] font-mono"
                  placeholder="••••"
                  maxLength={10}
                  autoFocus
                />
              </div>
              
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-red-400 text-[9px] font-black uppercase tracking-widest text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-7 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-full uppercase tracking-[0.5em] text-[10px] transition-all shadow-2xl active:scale-[0.95] relative overflow-hidden group"
              >
                <span className="relative z-10">{isLoading ? "Verifying..." : "Unlock Vault"}</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </form>
          </motion.div>
        </div>

        <div className="flex-1 relative order-1 md:order-2">
          <div className="relative w-full aspect-[4/5] max-w-lg mx-auto rounded-[6rem] overflow-hidden border-[20px] border-white/5 shadow-[0_80px_150px_rgba(0,0,0,0.8)] z-10 group">
             {imgError ? (
               <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-blue-500/20 flex items-center justify-center mb-6">
                    <span className="text-6xl font-black font-['Playfair_Display'] text-blue-500/40">{initial}</span>
                  </div>
                  <span className="text-[10px] font-black tracking-[0.5em] text-slate-500">BIOMETRIC FEED OFFLINE</span>
               </div>
             ) : (
               <>
                 <img 
                   src={userContext.imageUrl} 
                   alt={userContext.name} 
                   className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                   onError={() => setImgError(true)} 
                 />
                 <motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[1px] bg-blue-500/30 blur-sm z-20"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
               </>
             )}
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 blur-[100px] rounded-full"></div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-12px); }
          75% { transform: translateX(12px); }
        }
        .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </motion.div>
  );
};

export default LoginPage;
