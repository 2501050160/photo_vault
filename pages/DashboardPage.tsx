
import React, { useEffect, useState } from 'react';
import { UserConfig } from '../types';

interface DashboardPageProps {
  user: UserConfig;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Navigation Bar */}
      <nav className="glass border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">V</div>
          <span className="text-xl font-bold tracking-tight">PhotoVault</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-200">{user.name}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">{user.role}</span>
          </div>
          <button 
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/50 rounded-lg transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className={`transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hello, {user.name}</h1>
            <p className="text-slate-400 text-lg">Your secure photo archive is ready for access.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Drive Link Card */}
            <div className="glass rounded-[2rem] p-8 border border-blue-500/20 bg-gradient-to-br from-slate-900/50 to-blue-900/10 flex flex-col">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Google Drive Access</h3>
              <p className="text-slate-400 mb-8 flex-1 leading-relaxed">
                Click the button below to open your dedicated Google Drive folder. You can view, manage, and download all your high-resolution photos directly from there.
              </p>
              <a 
                href={user.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-center shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                Open Google Drive Folder
              </a>
            </div>

            {/* Profile Info */}
            <div className="glass rounded-[2rem] overflow-hidden flex flex-col md:flex-row gap-6 p-6">
               <div className="w-full md:w-48 aspect-square rounded-2xl overflow-hidden shrink-0">
                  <img src={user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col justify-center gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">User Profile</h4>
                    <p className="text-xl font-bold text-white">{user.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Account Role</h4>
                    <p className="text-lg font-medium text-blue-400">{user.role === 'admin' ? 'Super Administrator' : 'Standard User'}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800">
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                      "Memories are the architecture of our existence. Keep them safe and cherish every frame."
                    </p>
                  </div>
               </div>
            </div>
          </div>

          <div className="mt-12 glass rounded-3xl p-8 border border-white/5">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                Security Status
             </h3>
             <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Your session is currently encrypted and active. For your security, please ensure you log out when accessing from public or shared devices. Unauthorized sharing of credentials is strictly prohibited by system policies.
             </p>
             <div className="flex gap-4">
               <div className="px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 text-[10px] text-slate-500">AES-256 ENCRYPTION</div>
               <div className="px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 text-[10px] text-slate-500">2FA ENABLED</div>
             </div>
          </div>
        </div>
      </main>

      <footer className="py-8 px-6 text-center text-slate-600 text-sm">
        Managed by PhotoVault Secure Systems &bull; Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
      </footer>
    </div>
  );
};

export default DashboardPage;
