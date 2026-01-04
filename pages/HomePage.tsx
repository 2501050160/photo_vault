
// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
// import { USERS_DATA } from '../constants';

// // Enhanced SafeImage with Initials Fallback
// const SafeImage = ({ src, alt, name, className }: { src: string, alt: string, name: string, className?: string }) => {
//   const [error, setError] = useState(false);
//   const initial = name.charAt(0).toUpperCase();

//   return (
//     <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
//       {error ? (
//         <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 border-2 border-slate-800">
//            <div className="w-24 h-24 rounded-full border border-blue-500/30 flex items-center justify-center mb-4 relative">
//               <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
//               <span className="text-5xl font-black font-['Playfair_Display'] text-blue-500 text-glow">{initial}</span>
//            </div>
//            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 text-center px-4">Registry Feed Missing</span>
//            <span className="text-[8px] font-bold text-slate-700 uppercase mt-2">Check ./PICS/{name.toLowerCase()}.jpg</span>
//         </div>
//       ) : (
//         <>
//           <img 
//             src={src} 
//             alt={alt} 
//             className="w-full h-full object-cover" 
//             onError={() => setError(true)} 
//           />
//           {/* Scanning Line Overlay */}
//           <motion.div 
//             animate={{ top: ["0%", "100%", "0%"] }}
//             transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
//             className="absolute left-0 right-0 h-[2px] bg-blue-500/40 blur-[2px] shadow-[0_0_15px_#3b82f6] z-10 pointer-events-none"
//           />
//           <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none"></div>
//         </>
//       )}
//     </div>
//   );
// };

// const PixelJoiningName = ({ name }: { name: string }) => {
//   const letters = name.split("");
//   return (
//     <div className="flex overflow-visible justify-center items-center">
//       {letters.map((char, i) => (
//         <motion.span
//           key={`${name}-${i}`}
//           initial={{ opacity: 0, x: Math.random() * 400 - 200, y: Math.random() * 400 - 200, scale: 4, filter: 'blur(30px)' }}
//           animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
//           exit={{ scaleY: 0, scaleX: 2, y: 30, filter: 'blur(20px)', opacity: 0 }}
//           transition={{ duration: 0.9, delay: i * 0.04, type: 'spring', stiffness: 120, damping: 20 }}
//           className="inline-block text-5xl md:text-[8rem] font-black text-white font-['Playfair_Display'] tracking-tighter leading-none text-glow select-none"
//         >
//           {char === " " ? "\u00A0" : char}
//         </motion.span>
//       ))}
//     </div>
//   );
// };

// const OrbitalCursor: React.FC = () => {
//   const [isHovering, setIsHovering] = useState(false);
//   const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
//   const mousePos = useRef({ x: 0, y: 0 });

//   const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
//   const trailConfig = { damping: 35, stiffness: 100, mass: 1 };
  
//   const mouseX = useSpring(0, springConfig);
//   const mouseY = useSpring(0, springConfig);
//   const trailX = useSpring(0, trailConfig);
//   const trailY = useSpring(0, trailConfig);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       mousePos.current = { x: e.clientX, y: e.clientY };
//       mouseX.set(e.clientX);
//       mouseY.set(e.clientY);
//       trailX.set(e.clientX);
//       trailY.set(e.clientY);

//       if (Math.random() > 0.8) {
//         const id = Date.now();
//         setParticles(prev => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }]);
//         setTimeout(() => setParticles(p => p.filter(it => it.id !== id)), 800);
//       }
//     };

//     const handleMouseOver = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       setIsHovering(!!(target.closest('a') || target.closest('button')));
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseover', handleMouseOver);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseover', handleMouseOver);
//     };
//   }, []);

//   return (
//     <div className="fixed inset-0 pointer-events-none z-[99999]">
//       <AnimatePresence>
//         {particles.map((p) => (
//           <motion.div
//             key={p.id}
//             initial={{ scale: 1, opacity: 0.6 }}
//             animate={{ scale: 0, opacity: 0, x: p.x + (Math.random() * 30 - 15), y: p.y + (Math.random() * 30 - 15) }}
//             className="absolute w-1 h-1 bg-blue-500/50 shadow-[0_0_8px_#3b82f6]"
//             style={{ left: p.x, top: p.y }}
//           />
//         ))}
//       </AnimatePresence>
//       <motion.div style={{ x: trailX, y: trailY }} className="absolute -ml-8 -mt-8 w-16 h-16 border border-blue-500/10 rounded-full" />
//       <motion.div style={{ x: mouseX, y: mouseY }} className="absolute -ml-5 -mt-5">
//         <motion.div
//           animate={{ rotate: 360, scale: isHovering ? 1.5 : 1 }}
//           transition={{ rotate: { repeat: Infinity, duration: 4, ease: "linear" }, scale: { type: "spring", stiffness: 300 } }}
//           className="w-10 h-10 border border-blue-500/40 border-dashed rounded-full flex items-center justify-center"
//         >
//           <div className="w-1 h-1 bg-blue-400/50 rounded-full"></div>
//         </motion.div>
//       </motion.div>
//       <motion.div style={{ x: mouseX, y: mouseY }} className="absolute -ml-1 -mt-1 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
//     </div>
//   );
// };

// const HomePage: React.FC = () => {
//   const [masterIndex, setMasterIndex] = useState(0);
//   const [isHoveringDir, setIsHoveringDir] = useState(false);
//   const { scrollY } = useScroll();

//   const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
//   const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

//   useEffect(() => {
//     if (isHoveringDir) return;
//     const interval = setInterval(() => {
//       setMasterIndex((prev) => (prev + 1) % USERS_DATA.length);
//     }, 3500);
//     return () => clearInterval(interval);
//   }, [isHoveringDir]);

//   const activeUser = USERS_DATA[masterIndex];

//   return (
//     <div className="min-h-screen relative bg-slate-950 overflow-x-hidden">
//       <OrbitalCursor />

//       {/* 1. HERO SECTION */}
//       <div className="relative h-screen overflow-hidden">
//         <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
//           <motion.img 
//             animate={{ scale: [1.1, 1.25, 1.1], opacity: [0.15, 0.35, 0.15] }} 
//             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
//             src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/70 to-slate-950"></div>
//         </motion.div>

//         <div className="max-w-7xl mx-auto px-6 relative z-10">
//           <nav className="flex justify-between items-center py-10">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg shadow-[0_0_20px_#2563eb]"></div>
//               <span className="font-black tracking-[0.5em] text-[10px] uppercase text-slate-500">Neural Registry v4.3</span>
//             </div>
//             <a href="#gallery" className="text-[10px] font-black uppercase tracking-[0.7em] text-slate-500 hover:text-white transition-all underline-offset-8 hover:underline">Vault Explorer</a>
//           </nav>

//           <header className="pt-40 text-center">
//             <div className="h-40 flex items-center justify-center relative">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeUser.id + '_hero_name'}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="absolute inset-0 flex items-center justify-center"
//                 >
//                   <PixelJoiningName name={activeUser.name} />
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </header>
//         </div>
//       </div>

//       {/* 2. DIRECTORY SECTION */}
//       <div className="w-full relative z-20 mb-64 px-0">
//         <section 
//           className="glass p-12 md:py-40 relative overflow-hidden min-h-[900px] flex items-center shadow-[0_0_120px_rgba(0,0,0,1)]"
//           onMouseEnter={() => setIsHoveringDir(true)}
//           onMouseLeave={() => setIsHoveringDir(false)}
//         >
//            <div className="flex flex-col items-center w-full relative z-10 text-center max-w-7xl mx-auto">
//               <div className="mb-24">
//                 <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[1.2em] mb-6">Phase 02 / Secure Target</h3>
//                 <div className="flex items-center gap-6 justify-center">
//                   <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }} className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"></motion.div>
//                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.6em]">Biometric ID Lock</span>
//                 </div>
//               </div>
              
//               <div className="w-full flex flex-col md:flex-row items-center justify-between gap-16 md:gap-40">
//                 <div className="w-full md:w-1/2 relative h-96 flex items-center justify-center">
//                   <AnimatePresence mode="wait">
//                     <motion.div key={activeUser.id + '_banner_name'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                        <PixelJoiningName name={activeUser.name} />
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 <div className="w-full md:w-1/2 flex flex-col items-center">
//                   <div className="relative w-full aspect-[4/5.5] max-w-sm">
//                     <AnimatePresence mode="wait">
//                       <motion.div
//                         key={activeUser.id + '_dir_card'}
//                         initial={{ opacity: 0, scale: 0.9, x: 100, filter: 'blur(20px)' }}
//                         animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
//                         exit={{ opacity: 0, scale: 1.1, x: -100, filter: 'blur(30px)' }}
//                         transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
//                         className="absolute inset-0 rounded-[5rem] overflow-hidden border border-white/10 shadow-[0_60px_100px_rgba(0,0,0,0.8)] bg-slate-950"
//                       >
//                         <SafeImage src={activeUser.imageUrl} alt={activeUser.name} name={activeUser.name} className="w-full h-full" />
//                         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90"></div>
//                         <div className="absolute bottom-16 left-12 text-left">
//                            <h4 className="text-4xl font-black text-white font-['Playfair_Display'] mb-3 tracking-tighter">{activeUser.name}</h4>
//                            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.5em]">{activeUser.tagline}</p>
//                         </div>
//                       </motion.div>
//                     </AnimatePresence>
//                   </div>
                  
//                   <motion.div className="mt-20 w-full max-w-sm px-4">
//                     <Link 
//                       to={`/login/${activeUser.id}`}
//                       className="group/btn relative block w-full py-8 bg-blue-600 text-white font-black rounded-[2.5rem] shadow-2xl hover:shadow-blue-500/40 transition-all active:scale-[0.96] text-[12px] uppercase tracking-[0.7em] text-center border border-white/10"
//                     >
//                       Establish Link
//                     </Link>
//                   </motion.div>
//                 </div>
//               </div>

//               <div className="mt-28 flex gap-8">
//                  {USERS_DATA.map((_, idx) => (
//                    <div key={idx} className={`h-[1px] transition-all duration-1000 ${masterIndex === idx ? 'w-24 bg-blue-500 shadow-[0_0_20px_#3b82f6]' : 'w-6 bg-slate-800'}`} />
//                  ))}
//               </div>
//            </div>
//         </section>
//       </div>

//       {/* 3. GALLERY SECTION */}
//       <div id="gallery" className="relative py-72 bg-slate-950/50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex flex-col md:flex-row items-center gap-12 mb-48">
//             <h2 className="text-7xl md:text-[10rem] font-black font-['Playfair_Display'] tracking-tighter text-glow leading-none">The Vault</h2>
//             <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/30 to-transparent hidden md:block"></div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
//             {USERS_DATA.map((user) => (
//               <motion.div key={user.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
//                 <Link to={`/login/${user.id}`} className="group block">
//                   <div className="relative aspect-[3.5/5.5] rounded-[4.5rem] overflow-hidden mb-12 shadow-3xl transition-all duration-1000 group-hover:-translate-y-8 group-hover:shadow-blue-500/30 border border-white/5">
//                     <SafeImage src={user.imageUrl} alt={user.name} name={user.name} className="w-full h-full grayscale-[90%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-95 group-hover:opacity-40 transition-opacity"></div>
//                     <div className="absolute inset-x-0 bottom-0 p-12 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
//                        <p className="text-[12px] text-blue-400 font-bold uppercase tracking-[0.5em] mb-3">{user.tagline}</p>
//                        <div className="w-16 h-[1.5px] bg-blue-500"></div>
//                     </div>
//                   </div>
//                   <div className="text-center px-6">
//                     <h4 className="text-3xl font-black font-['Playfair_Display'] mb-4 group-hover:text-blue-400 transition-colors tracking-tight">{user.name}</h4>
//                     <span className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-600 group-hover:text-white transition-all">Secure Sync Mode</span>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 4. CINEMATIC FOOTER */}
//       <footer className="relative bg-slate-950 py-96 border-t border-white/5 text-center overflow-hidden">
//         {/* Footer Background Image */}
//         <div className="absolute inset-0 z-0">
//           <img 
//             src="./PICS/footer_bg.jpg" 
//             alt="Group Memories" 
//             className="w-full h-full object-cover opacity-20 filter grayscale blur-[2px]"
//             onError={(e) => {
//               (e.target as HTMLImageElement).style.display = 'none';
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950"></div>
//         </div>

//         <div className="relative z-10 px-6">
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mb-16"
//           >
//              <div className="w-20 h-20 bg-blue-600 rounded-[2rem] mx-auto mb-10 flex items-center justify-center text-4xl font-black shadow-[0_0_60px_rgba(37,99,235,0.6)]">P</div>
//              <h3 className="text-[14px] font-black tracking-[2.5em] uppercase text-white/50 mb-4">Neural Registry</h3>
//              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.8em]">Quantum Vault Infrastructure &bull; v4.5.0</p>
//           </motion.div>
          
//           <div className="max-w-4xl mx-auto border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between items-center gap-10">
//              <div className="text-left">
//                <h5 className="text-white text-xs font-black uppercase tracking-[0.4em] mb-2">System Status</h5>
//                <div className="flex items-center gap-3">
//                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
//                  <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">All Vaults Encrypted & Secure</span>
//                </div>
//              </div>
             
//              <div className="text-[10px] font-black uppercase tracking-[1.4em] text-white/10">
//                 &copy; {new Date().getFullYear()} Room 404 Memories
//              </div>
             
//              <div className="text-right">
//                 <a href="#" className="text-slate-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest">Protocol Documentation</a>
//              </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;












































// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
// import { USERS_DATA } from '../constants';

// // Enhanced SafeImage with Initials Fallback
// const SafeImage = ({ src, alt, name, className }: { src: string, alt: string, name: string, className?: string }) => {
//   const [error, setError] = useState(false);
//   const initial = name.charAt(0).toUpperCase();

//   return (
//     <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
//       {error ? (
//         <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 border-2 border-slate-800">
//            <div className="w-24 h-24 rounded-full border border-blue-500/30 flex items-center justify-center mb-4 relative">
//               <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
//               <span className="text-5xl font-black font-['Playfair_Display'] text-blue-500 text-glow">{initial}</span>
//            </div>
//            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 text-center px-4">Registry Feed Missing</span>
//            <span className="text-[8px] font-bold text-slate-700 uppercase mt-2">Check ./PICS/{name.toLowerCase()}.jpg</span>
//         </div>
//       ) : (
//         <>
//           <img 
//             src={src} 
//             alt={alt} 
//             className="w-full h-full object-cover" 
//             onError={() => setError(true)} 
//           />
//           {/* Scanning Line Overlay */}
//           <motion.div 
//             animate={{ top: ["0%", "100%", "0%"] }}
//             transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
//             className="absolute left-0 right-0 h-[2px] bg-blue-500/40 blur-[2px] shadow-[0_0_15px_#3b82f6] z-10 pointer-events-none"
//           />
//           <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none"></div>
//         </>
//       )}
//     </div>
//   );
// };

// const PixelJoiningName = ({ name }: { name: string }) => {
//   const letters = name.split("");
//   return (
//     <div className="flex overflow-visible justify-center items-center">
//       {letters.map((char, i) => (
//         <motion.span
//           key={`${name}-${i}`}
//           initial={{ opacity: 0, x: Math.random() * 400 - 200, y: Math.random() * 400 - 200, scale: 4, filter: 'blur(30px)' }}
//           animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
//           exit={{ scaleY: 0, scaleX: 2, y: 30, filter: 'blur(20px)', opacity: 0 }}
//           transition={{ duration: 0.9, delay: i * 0.04, type: 'spring', stiffness: 120, damping: 20 }}
//           className="inline-block text-5xl md:text-[8rem] font-black text-white font-['Playfair_Display'] tracking-tighter leading-none text-glow select-none"
//         >
//           {char === " " ? "\u00A0" : char}
//         </motion.span>
//       ))}
//     </div>
//   );
// };

// const OrbitalCursor: React.FC = () => {
//   const [isHovering, setIsHovering] = useState(false);
//   const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
//   const mousePos = useRef({ x: 0, y: 0 });

//   const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
//   const trailConfig = { damping: 35, stiffness: 100, mass: 1 };
  
//   const mouseX = useSpring(0, springConfig);
//   const mouseY = useSpring(0, springConfig);
//   const trailX = useSpring(0, trailConfig);
//   const trailY = useSpring(0, trailConfig);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       mousePos.current = { x: e.clientX, y: e.clientY };
//       mouseX.set(e.clientX);
//       mouseY.set(e.clientY);
//       trailX.set(e.clientX);
//       trailY.set(e.clientY);

//       if (Math.random() > 0.8) {
//         const id = Date.now();
//         setParticles(prev => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }]);
//         setTimeout(() => setParticles(p => p.filter(it => it.id !== id)), 800);
//       }
//     };

//     const handleMouseOver = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       setIsHovering(!!(target.closest('a') || target.closest('button')));
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseover', handleMouseOver);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseover', handleMouseOver);
//     };
//   }, []);

//   return (
//     <div className="fixed inset-0 pointer-events-none z-[99999]">
//       <AnimatePresence>
//         {particles.map((p) => (
//           <motion.div
//             key={p.id}
//             initial={{ scale: 1, opacity: 0.6 }}
//             animate={{ scale: 0, opacity: 0, x: p.x + (Math.random() * 30 - 15), y: p.y + (Math.random() * 30 - 15) }}
//             className="absolute w-1 h-1 bg-blue-500/50 shadow-[0_0_8px_#3b82f6]"
//             style={{ left: p.x, top: p.y }}
//           />
//         ))}
//       </AnimatePresence>
//       <motion.div style={{ x: trailX, y: trailY }} className="absolute -ml-8 -mt-8 w-16 h-16 border border-blue-500/10 rounded-full" />
//       <motion.div style={{ x: mouseX, y: mouseY }} className="absolute -ml-5 -mt-5">
//         <motion.div
//           animate={{ rotate: 360, scale: isHovering ? 1.5 : 1 }}
//           transition={{ rotate: { repeat: Infinity, duration: 4, ease: "linear" }, scale: { type: "spring", stiffness: 300 } }}
//           className="w-10 h-10 border border-blue-500/40 border-dashed rounded-full flex items-center justify-center"
//         >
//           <div className="w-1 h-1 bg-blue-400/50 rounded-full"></div>
//         </motion.div>
//       </motion.div>
//       <motion.div style={{ x: mouseX, y: mouseY }} className="absolute -ml-1 -mt-1 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
//     </div>
//   );
// };

// const HomePage: React.FC = () => {
//   const [masterIndex, setMasterIndex] = useState(0);
//   const [isHoveringDir, setIsHoveringDir] = useState(false);
//   const { scrollY } = useScroll();

//   const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
//   const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

//   useEffect(() => {
//     if (isHoveringDir) return;
//     const interval = setInterval(() => {
//       setMasterIndex((prev) => (prev + 1) % USERS_DATA.length);
//     }, 3500);
//     return () => clearInterval(interval);
//   }, [isHoveringDir]);

//   const activeUser = USERS_DATA[masterIndex];

//   return (
//     <div className="min-h-screen relative bg-slate-950 overflow-x-hidden">
//       <OrbitalCursor />

//       {/* 1. HERO SECTION */}
//       <div className="relative h-screen overflow-hidden">
//         <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
//           <motion.img 
//             animate={{ scale: [1.1, 1.25, 1.1], opacity: [0.15, 0.35, 0.15] }} 
//             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
//             src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/70 to-slate-950"></div>
//         </motion.div>

//         <div className="max-w-7xl mx-auto px-6 relative z-10">
//           <nav className="flex justify-between items-center py-10">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg shadow-[0_0_20px_#2563eb]"></div>
//               <span className="font-black tracking-[0.5em] text-[10px] uppercase text-slate-500">Neural Registry v4.3</span>
//             </div>
//             <a href="#gallery" className="text-[10px] font-black uppercase tracking-[0.7em] text-slate-500 hover:text-white transition-all underline-offset-8 hover:underline">Vault Explorer</a>
//           </nav>

//           <header className="pt-40 text-center">
//             <div className="h-40 flex items-center justify-center relative">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeUser.id + '_hero_name'}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="absolute inset-0 flex items-center justify-center"
//                 >
//                   <PixelJoiningName name={activeUser.name} />
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </header>
//         </div>
//       </div>

//       {/* 2. DIRECTORY SECTION (PHASE 2) */}
//       <div className="w-full relative z-20 mb-64 px-0">
//         <section 
//           className="glass p-12 md:py-40 relative overflow-hidden min-h-[900px] flex items-center shadow-[0_0_120px_rgba(0,0,0,1)]"
//           onMouseEnter={() => setIsHoveringDir(true)}
//           onMouseLeave={() => setIsHoveringDir(false)}
//         >
//            {/* Section Background with Minimum Opacity */}
//            <div className="absolute inset-0 z-0">
//              <img 
//                src="./PICS/footer_bg.jpg" 
//                alt="Group Background" 
//                className="w-full h-full object-cover opacity-10 filter blur-[4px]"
//                onError={(e) => {
//                  (e.target as HTMLImageElement).style.display = 'none';
//                }}
//              />
//              <div className="absolute inset-0 bg-slate-950/40"></div>
//            </div>

//            <div className="flex flex-col items-center w-full relative z-10 text-center max-w-7xl mx-auto">
//               <div className="mb-24">
//                 <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[1.2em] mb-6">Phase 02 / Secure Target</h3>
//                 <div className="flex items-center gap-6 justify-center">
//                   <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }} className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"></motion.div>
//                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.6em]">Biometric ID Lock</span>
//                 </div>
//               </div>
              
//               <div className="w-full flex flex-col md:flex-row items-center justify-between gap-16 md:gap-40">
//                 <div className="w-full md:w-1/2 relative h-96 flex items-center justify-center">
//                   <AnimatePresence mode="wait">
//                     <motion.div key={activeUser.id + '_banner_name'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                        <PixelJoiningName name={activeUser.name} />
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 <div className="w-full md:w-1/2 flex flex-col items-center">
//                   <div className="relative w-full aspect-[4/5.5] max-w-sm">
//                     <AnimatePresence mode="wait">
//                       <motion.div
//                         key={activeUser.id + '_dir_card'}
//                         initial={{ opacity: 0, scale: 0.9, x: 100, filter: 'blur(20px)' }}
//                         animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
//                         exit={{ opacity: 0, scale: 1.1, x: -100, filter: 'blur(30px)' }}
//                         transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
//                         className="absolute inset-0 rounded-[5rem] overflow-hidden border border-white/10 shadow-[0_60px_100px_rgba(0,0,0,0.8)] bg-slate-950"
//                       >
//                         <SafeImage src={activeUser.imageUrl} alt={activeUser.name} name={activeUser.name} className="w-full h-full" />
//                         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90"></div>
//                         <div className="absolute bottom-16 left-12 text-left">
//                            <h4 className="text-4xl font-black text-white font-['Playfair_Display'] mb-3 tracking-tighter">{activeUser.name}</h4>
//                            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.5em]">{activeUser.tagline}</p>
//                         </div>
//                       </motion.div>
//                     </AnimatePresence>
//                   </div>
                  
//                   <motion.div className="mt-20 w-full max-w-sm px-4">
//                     <Link 
//                       to={`/login/${activeUser.id}`}
//                       className="group/btn relative block w-full py-8 bg-blue-600 text-white font-black rounded-[2.5rem] shadow-2xl hover:shadow-blue-500/40 transition-all active:scale-[0.96] text-[12px] uppercase tracking-[0.7em] text-center border border-white/10"
//                     >
//                       Establish Link
//                     </Link>
//                   </motion.div>
//                 </div>
//               </div>

//               <div className="mt-28 flex gap-8">
//                  {USERS_DATA.map((_, idx) => (
//                    <div key={idx} className={`h-[1px] transition-all duration-1000 ${masterIndex === idx ? 'w-24 bg-blue-500 shadow-[0_0_20px_#3b82f6]' : 'w-6 bg-slate-800'}`} />
//                  ))}
//               </div>
//            </div>
//         </section>
//       </div>

//       {/* 3. GALLERY SECTION */}
//       <div id="gallery" className="relative py-72 bg-slate-950/50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex flex-col md:flex-row items-center gap-12 mb-48">
//             <h2 className="text-7xl md:text-[10rem] font-black font-['Playfair_Display'] tracking-tighter text-glow leading-none">The Vault</h2>
//             <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/30 to-transparent hidden md:block"></div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
//             {USERS_DATA.map((user) => (
//               <motion.div key={user.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
//                 <Link to={`/login/${user.id}`} className="group block">
//                   <div className="relative aspect-[3.5/5.5] rounded-[4.5rem] overflow-hidden mb-12 shadow-3xl transition-all duration-1000 group-hover:-translate-y-8 group-hover:shadow-blue-500/30 border border-white/5">
//                     <SafeImage src={user.imageUrl} alt={user.name} name={user.name} className="w-full h-full grayscale-[90%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-95 group-hover:opacity-40 transition-opacity"></div>
//                     <div className="absolute inset-x-0 bottom-0 p-12 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
//                        <p className="text-[12px] text-blue-400 font-bold uppercase tracking-[0.5em] mb-3">{user.tagline}</p>
//                        <div className="w-16 h-[1.5px] bg-blue-500"></div>
//                     </div>
//                   </div>
//                   <div className="text-center px-6">
//                     <h4 className="text-3xl font-black font-['Playfair_Display'] mb-4 group-hover:text-blue-400 transition-colors tracking-tight">{user.name}</h4>
//                     <span className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-600 group-hover:text-white transition-all">Secure Sync Mode</span>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 4. CINEMATIC FOOTER */}
//       <footer className="relative bg-slate-950 py-96 border-t border-white/5 text-center overflow-hidden">
//         {/* Footer Background Image */}
//         <div className="absolute inset-0 z-0">
//           <img 
//             src="./PICS/footer_bg.jpg" 
//             alt="Group Memories" 
//             className="w-full h-full object-cover opacity-20 filter grayscale blur-[2px]"
//             onError={(e) => {
//               (e.target as HTMLImageElement).style.display = 'none';
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950"></div>
//         </div>

//         <div className="relative z-10 px-6">
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mb-16"
//           >
//              <div className="w-20 h-20 bg-blue-600 rounded-[2rem] mx-auto mb-10 flex items-center justify-center text-4xl font-black shadow-[0_0_60px_rgba(37,99,235,0.6)]">P</div>
//              <h3 className="text-[14px] font-black tracking-[2.5em] uppercase text-white/50 mb-4">Neural Registry</h3>
//              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.8em]">Quantum Vault Infrastructure &bull; v4.5.0</p>
//           </motion.div>
          
//           <div className="max-w-4xl mx-auto border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between items-center gap-10">
//              <div className="text-left">
//                <h5 className="text-white text-xs font-black uppercase tracking-[0.4em] mb-2">System Status</h5>
//                <div className="flex items-center gap-3">
//                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
//                  <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">All Vaults Encrypted & Secure</span>
//                </div>
//              </div>
             
//              <div className="text-[10px] font-black uppercase tracking-[1.4em] text-white/10">
//                 &copy; {new Date().getFullYear()} Room 404 Memories
//              </div>
             
//              <div className="text-right">
//                 <a href="#" className="text-slate-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest">Protocol Documentation</a>
//              </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;

























import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { USERS_DATA } from '../constants';

// Enhanced SafeImage with Initials Fallback
const SafeImage = ({ src, alt, name, className }: { src: string, alt: string, name: string, className?: string }) => {
  const [error, setError] = useState(false);
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      {error ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 border-2 border-slate-800">
           <div className="w-24 h-24 rounded-full border border-blue-500/30 flex items-center justify-center mb-4 relative">
              <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
              <span className="text-5xl font-black font-['Playfair_Display'] text-blue-500 text-glow">{initial}</span>
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 text-center px-4">Registry Feed Missing</span>
        </div>
      ) : (
        <>
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover" 
            onError={() => setError(true)} 
          />
          {/* Scanning Line Overlay */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-blue-500/40 blur-[2px] shadow-[0_0_15px_#3b82f6] z-10 pointer-events-none"
          />
          <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none"></div>
        </>
      )}
    </div>
  );
};

const PixelJoiningName = ({ name }: { name: string }) => {
  const letters = name.split("");
  return (
    <div className="flex overflow-visible justify-center items-center">
      {letters.map((char, i) => (
        <motion.span
          key={`${name}-${i}`}
          initial={{ opacity: 0, x: Math.random() * 400 - 200, y: Math.random() * 400 - 200, scale: 4, filter: 'blur(30px)' }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ scaleY: 0, scaleX: 2, y: 30, filter: 'blur(20px)', opacity: 0 }}
          transition={{ duration: 0.9, delay: i * 0.04, type: 'spring', stiffness: 120, damping: 20 }}
          className="inline-block text-5xl md:text-[8rem] font-black text-white font-['Playfair_Display'] tracking-tighter leading-none text-glow select-none"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

const OrbitalCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const trailConfig = { damping: 35, stiffness: 100, mass: 1 };
  
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  const trailX = useSpring(0, trailConfig);
  const trailY = useSpring(0, trailConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);

      if (Math.random() > 0.8) {
        const id = Date.now();
        setParticles(prev => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => setParticles(p => p.filter(it => it.id !== id)), 800);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!(target.closest('a') || target.closest('button')));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 0, opacity: 0, x: p.x + (Math.random() * 30 - 15), y: p.y + (Math.random() * 30 - 15) }}
            className="absolute w-1 h-1 bg-blue-500/50 shadow-[0_0_8px_#3b82f6]"
            style={{ left: p.x, top: p.y }}
          />
        ))}
      </AnimatePresence>
      <motion.div style={{ x: trailX, y: trailY }} className="absolute -ml-8 -mt-8 w-16 h-16 border border-blue-500/10 rounded-full" />
      <motion.div style={{ x: mouseX, y: mouseY }} className="absolute -ml-5 -mt-5">
        <motion.div
          animate={{ rotate: 360, scale: isHovering ? 1.5 : 1 }}
          transition={{ rotate: { repeat: Infinity, duration: 4, ease: "linear" }, scale: { type: "spring", stiffness: 300 } }}
          className="w-10 h-10 border border-blue-500/40 border-dashed rounded-full flex items-center justify-center"
        >
          <div className="w-1 h-1 bg-blue-400/50 rounded-full"></div>
        </motion.div>
      </motion.div>
      <motion.div style={{ x: mouseX, y: mouseY }} className="absolute -ml-1 -mt-1 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
    </div>
  );
};

const HomePage: React.FC = () => {
  const [masterIndex, setMasterIndex] = useState(0);
  const [isHoveringDir, setIsHoveringDir] = useState(false);
  const { scrollY } = useScroll();

  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    if (isHoveringDir) return;
    const interval = setInterval(() => {
      setMasterIndex((prev) => (prev + 1) % USERS_DATA.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHoveringDir]);

  const activeUser = USERS_DATA[masterIndex];
  const adminUser = USERS_DATA.find(u => u.role === 'admin');
  const regularUsers = USERS_DATA.filter(u => u.role !== 'admin');

  return (
    <div className="min-h-screen relative bg-slate-950 overflow-x-hidden">
      <OrbitalCursor />

      {/* 1. HERO SECTION */}
      <div className="relative h-screen overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <motion.img 
            animate={{ scale: [1.1, 1.25, 1.1], opacity: [0.15, 0.35, 0.15] }} 
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/70 to-slate-950"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="flex justify-between items-center py-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg shadow-[0_0_20px_#2563eb]"></div>
              <span className="font-black tracking-[0.5em] text-[10px] uppercase text-slate-500">Neural Registry v4.6</span>
            </div>
            <a href="#gallery" className="text-[10px] font-black uppercase tracking-[0.7em] text-slate-500 hover:text-white transition-all underline-offset-8 hover:underline">Vault Explorer</a>
          </nav>

          <header className="pt-40 text-center">
            <div className="h-40 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeUser.id + '_hero_name'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <PixelJoiningName name={activeUser.name} />
                </motion.div>
              </AnimatePresence>
            </div>
          </header>
        </div>
      </div>

      {/* 2. DIRECTORY SECTION (PHASE 2) */}
      <div className="w-full relative z-20 mb-64 px-0">
        <section 
          className="glass p-12 md:py-40 relative overflow-hidden min-h-[900px] flex items-center shadow-[0_0_120px_rgba(0,0,0,1)] border-y border-white/5"
          onMouseEnter={() => setIsHoveringDir(true)}
          onMouseLeave={() => setIsHoveringDir(false)}
        >
           {/* Section Background with Minimum Opacity */}
           <div className="absolute inset-0 z-0">
             <img 
               src="./PICS/footer_bg.jpg" 
               alt="Group Background" 
               className="w-full h-full object-cover opacity-[0.05] filter blur-[6px] grayscale scale-110"
               onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
             />
             <div className="absolute inset-0 bg-slate-950/40"></div>
           </div>

           <div className="flex flex-col items-center w-full relative z-10 text-center max-w-7xl mx-auto">
              <div className="mb-24">
                <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[1.2em] mb-6">Phase 02 / Directory</h3>
                <div className="flex items-center gap-6 justify-center">
                  <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }} className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"></motion.div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.6em]">Biometric ID Lock</span>
                </div>
              </div>
              
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-16 md:gap-40">
                <div className="w-full md:w-1/2 relative h-96 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeUser.id + '_banner_name'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                       <PixelJoiningName name={activeUser.name} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="w-full md:w-1/2 flex flex-col items-center">
                  <div className="relative w-full aspect-[4/5.5] max-w-sm">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeUser.id + '_dir_card'}
                        initial={{ opacity: 0, scale: 0.9, x: 100, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.1, x: -100, filter: 'blur(30px)' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 rounded-[5rem] overflow-hidden border border-white/10 shadow-[0_60px_100px_rgba(0,0,0,0.8)] bg-slate-950"
                      >
                        <SafeImage src={activeUser.imageUrl} alt={activeUser.name} name={activeUser.name} className="w-full h-full" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90"></div>
                        <div className="absolute bottom-16 left-12 text-left">
                           <h4 className="text-4xl font-black text-white font-['Playfair_Display'] mb-3 tracking-tighter">{activeUser.name}</h4>
                           <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.5em]">{activeUser.tagline}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  <motion.div className="mt-20 w-full max-w-sm px-4">
                    <Link 
                      to={`/login/${activeUser.id}`}
                      className="group/btn relative block w-full py-8 bg-blue-600 text-white font-black rounded-[2.5rem] shadow-2xl hover:shadow-blue-500/40 transition-all active:scale-[0.96] text-[12px] uppercase tracking-[0.7em] text-center border border-white/10"
                    >
                      Establish Link
                    </Link>
                  </motion.div>
                </div>
              </div>

              <div className="mt-28 flex gap-8">
                 {USERS_DATA.map((_, idx) => (
                   <div key={idx} className={`h-[1px] transition-all duration-1000 ${masterIndex === idx ? 'w-24 bg-blue-500 shadow-[0_0_20px_#3b82f6]' : 'w-6 bg-slate-800'}`} />
                 ))}
              </div>
           </div>
        </section>
      </div>

      {/* 3. GALLERY SECTION */}
      <div id="gallery" className="relative py-72 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-48">
            <h2 className="text-7xl md:text-[10rem] font-black font-['Playfair_Display'] tracking-tighter text-glow leading-none">The Vault</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/30 to-transparent hidden md:block"></div>
          </div>

          {/* ADMIN SPECIAL SECTION (BIGGER) */}
          {adminUser && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-32"
            >
              <Link to={`/login/${adminUser.id}`} className="group relative block w-full h-[600px] rounded-[6rem] overflow-hidden border-[1px] border-blue-500/20 shadow-[0_0_80px_rgba(59,130,246,0.15)] transition-all duration-1000 hover:shadow-blue-500/40">
                <SafeImage src={adminUser.imageUrl} alt={adminUser.name} name={adminUser.name} className="w-full h-full grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90"></div>
                <div className="absolute bottom-20 left-20 right-20 flex flex-col md:flex-row justify-between items-end gap-10">
                  <div>
                    <span className="inline-block px-4 py-1 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6">Root Authority</span>
                    <h4 className="text-7xl md:text-9xl font-black font-['Playfair_Display'] tracking-tighter text-glow">{adminUser.name}</h4>
                    <p className="text-lg text-blue-400 font-bold uppercase tracking-[0.8em] mt-2 ml-2">{adminUser.tagline}</p>
                  </div>
                  <div className="w-full md:w-auto">
                    <div className="py-6 px-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[12px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">Establish Admin Protocol</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* REGULAR USERS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
            {regularUsers.map((user) => (
              <motion.div key={user.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Link to={`/login/${user.id}`} className="group block">
                  <div className="relative aspect-[3.5/5.5] rounded-[4.5rem] overflow-hidden mb-12 shadow-3xl transition-all duration-1000 group-hover:-translate-y-8 group-hover:shadow-blue-500/30 border border-white/5">
                    <SafeImage src={user.imageUrl} alt={user.name} name={user.name} className="w-full h-full grayscale-[90%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-95 group-hover:opacity-40 transition-opacity"></div>
                    <div className="absolute inset-x-0 bottom-0 p-12 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                       <p className="text-[12px] text-blue-400 font-bold uppercase tracking-[0.5em] mb-3">{user.tagline}</p>
                       <div className="w-16 h-[1.5px] bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="text-center px-6">
                    <h4 className="text-3xl font-black font-['Playfair_Display'] mb-4 group-hover:text-blue-400 transition-colors tracking-tight">{user.name}</h4>
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-600 group-hover:text-white transition-all">Secure Sync Mode</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. CINEMATIC FOOTER - DIFFERENTIATED FROM BODY */}
      <footer className="relative bg-black pt-96 pb-20 text-center overflow-hidden">
        {/* Depth Transition Overlay */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-slate-950 to-transparent z-10"></div>
        
        {/* Footer Background Image with Tinted Differentiation */}
        <div className="absolute inset-0 z-0">
          <img 
            src="./PICS/footer_bg.jpg" 
            alt="Group Memories" 
            className="w-full h-full object-cover opacity-30 filter grayscale mix-blend-screen"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          {/* Deep Indigo/Violet Overlay for distinct feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-indigo-900/10 mix-blend-multiply"></div>
        </div>

        <div className="relative z-20 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
             <div className="w-20 h-20 bg-blue-600 rounded-[2rem] mx-auto mb-10 flex items-center justify-center text-4xl font-black shadow-[0_0_60px_rgba(37,99,235,0.6)]">P</div>
             <h3 className="text-[14px] font-black tracking-[2.5em] uppercase text-white/50 mb-4">Neural Registry</h3>
             <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.8em]">Quantum Vault Infrastructure &bull; v4.6.0</p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between items-center gap-10">
             <div className="text-left">
               <h5 className="text-white text-xs font-black uppercase tracking-[0.4em] mb-2">System Status</h5>
               <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">All Vaults Encrypted & Secure</span>
               </div>
             </div>
             
             <div className="text-[10px] font-black uppercase tracking-[1.4em] text-white/10">
                &copy; {new Date().getFullYear()} Room 404 Memories
             </div>
             
             <div className="text-right">
                <a href="#" className="text-slate-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest">Protocol Documentation</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;