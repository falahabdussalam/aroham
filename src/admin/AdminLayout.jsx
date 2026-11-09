import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  GraduationCap, 
  Calendar, 
  Mail, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import ArohamLogo, { ArohamEmblem } from '../components/ArohamLogo';

export default function AdminLayout({ 
  currentTab, 
  setCurrentTab, 
  adminUser, 
  onLogout, 
  onBackToSite, 
  onOpenAddMentor,
  children 
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mentors', label: 'Manage Mentors', icon: Users },
    { id: 'mentees', label: 'Manage Mentees', icon: GraduationCap },
    { id: 'events', label: 'Manage Events', icon: Calendar },
    { id: 'applications', label: 'Network Applications', icon: Mail },
  ];

  const handleSelectTab = (tabId) => {
    setCurrentTab(tabId);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F8F5] flex flex-col font-sans selection:bg-aroham-terracotta/20 selection:text-aroham-dark">
      {/* Top Mobile Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-aroham-dark text-white px-4 py-3 flex items-center justify-between border-b border-aroham-pine shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle Sidebar"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <ArohamLogo size="header" textDark={false} onClick={onBackToSite} />
        </div>

        <button
          onClick={onBackToSite}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 transition-colors flex items-center gap-1"
        >
          <span>Live Site</span>
          <ExternalLink size={12} />
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* =========================================================================
            SIDEBAR (Desktop & Mobile Drawer)
            ========================================================================= */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-aroham-dark text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-aroham-pine/60
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Top Brand & Links */}
          <div className="p-6 space-y-6">
            {/* Brand Logo */}
            <div className="hidden lg:block pb-5 border-b border-white/10">
              <ArohamLogo size="header" textDark={false} onClick={onBackToSite} />
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                <ShieldCheck size={12} />
                <span>Executive Admin Console</span>
              </div>
            </div>

            {/* Quick "Add Mentor" Highlight Action */}
            <div>
              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onOpenAddMentor();
                }}
                className="w-full py-3 px-4 bg-aroham-terracotta hover:bg-aroham-terracotta-dark text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow hover:shadow-elevated flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:scale-98"
              >
                <UserPlus size={16} />
                <span>+ Add New Mentor</span>
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300/80 px-3 pb-1">
                Main Administration
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-white text-aroham-dark shadow-soft scale-[1.01]'
                        : 'text-emerald-100/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={17} className={isActive ? 'text-aroham-forest' : 'text-emerald-300'} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight size={14} className="text-aroham-forest" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar: Admin Profile & Live Site link */}
          <div className="p-5 border-t border-white/10 space-y-3 bg-aroham-darker">
            <button
              onClick={onBackToSite}
              className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/10"
            >
              <span>Back to Public Website</span>
              <ExternalLink size={13} />
            </button>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-aroham-dark font-bold text-xs flex items-center justify-center font-serif">
                  AC
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">Admin Council</div>
                  <div className="text-[10px] text-emerald-300">Executive Access</div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-emerald-300 hover:text-red-300 hover:bg-white/10 transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile backdrop shadow */}
        {mobileSidebarOpen && (
          <div 
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}

        {/* =========================================================================
            MAIN CONTENT VIEW AREA
            ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Desktop Top Header */}
          <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white/90 backdrop-blur-md border-b border-aroham-border sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold font-serif text-aroham-heading capitalize">
                {navItems.find(i => i.id === currentTab)?.label || 'Dashboard'}
              </h1>
              <span className="text-xs text-aroham-muted">• Aroham Foundation Hub</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onBackToSite}
                className="px-4 py-2 bg-aroham-sage hover:bg-aroham-mint text-aroham-dark rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-aroham-border"
              >
                <span>Live Website</span>
                <ExternalLink size={13} className="text-aroham-forest" />
              </button>

              <button
                onClick={onLogout}
                className="px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </header>

          {/* Child Content View */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
