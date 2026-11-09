import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, Eye, EyeOff, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { ArohamEmblem } from '../components/ArohamLogo';

export default function AdminLogin({ onLogin, onBackToSite }) {
  const [email, setEmail] = useState('admin@aroham.org');
  const [password, setPassword] = useState('aroham2025');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide your admin email and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Allow admin credentials
      if (email.toLowerCase().includes('admin') || password.length >= 6) {
        onLogin({ email, role: 'Executive Administrator', name: 'Aroham Admin Council' });
      } else {
        setError('Invalid credentials. You can use admin@aroham.org / aroham2025.');
      }
      setLoading(false);
    }, 600);
  };

  const handleUseDemo = () => {
    setEmail('admin@aroham.org');
    setPassword('aroham2025');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F4F8F5] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-aroham-terracotta/20 selection:text-aroham-dark">
      {/* Top bar with back to site */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-aroham-border shadow-soft text-xs font-semibold text-aroham-dark hover:bg-aroham-sage transition-all transform hover:-translate-x-0.5"
        >
          <ArrowLeft size={15} />
          <span>Return to Live Website</span>
        </button>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-aroham-forest text-xs font-semibold border border-emerald-200/80">
          <ShieldCheck size={14} />
          <span>Internal Council Access</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-12 bg-white rounded-3xl p-8 sm:p-10 shadow-elevated border border-aroham-border space-y-7 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-200/30 rounded-full blur-2xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none -z-0" />

        <div className="relative z-10 text-center space-y-3">
          <div className="w-16 h-16 mx-auto flex items-center justify-center p-2 rounded-2xl bg-[#F4F8F5] border border-aroham-border shadow-sm">
            <ArohamEmblem size={44} className="mx-auto" />
          </div>

          <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-aroham-sage text-aroham-forest text-[11px] font-bold uppercase tracking-wider border border-aroham-border">
            <Sparkles size={11} className="text-aroham-gold" />
            <span>Council Control Center</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-aroham-heading tracking-tight">
            Admin Dashboard
          </h2>

          <p className="text-xs sm:text-sm text-aroham-body max-w-xs mx-auto">
            Manage mentors, track mentee pairings, schedule events, and oversee network applications.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium animate-fadeIn">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
          <div>
            <label className="block text-xs font-bold text-aroham-dark uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-aroham-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aroham.org"
                className="w-full pl-10 pr-4 py-3 bg-[#F4F8F5] rounded-xl border border-aroham-border text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-aroham-dark uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={handleUseDemo}
                className="text-[11px] text-aroham-terracotta hover:underline font-semibold"
              >
                Auto-fill Demo Credentials
              </button>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-aroham-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-[#F4F8F5] rounded-xl border border-aroham-border text-sm focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 focus:border-aroham-dark"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-aroham-muted hover:text-aroham-dark transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-aroham-dark hover:bg-aroham-forest disabled:opacity-75 text-white rounded-xl text-sm font-bold shadow-soft hover:shadow-elevated transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard →'}
            </button>
          </div>
        </form>

        {/* Quick hint box */}
        <div className="relative z-10 p-3.5 rounded-xl bg-aroham-mint/70 border border-aroham-border text-[11px] text-aroham-forest space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-aroham-forest" />
            <span>Authorized Committee Credentials:</span>
          </div>
          <div className="text-aroham-body pl-4.5">
            Login: <span className="font-mono font-bold text-aroham-dark">admin@aroham.org</span> • Password: <span className="font-mono font-bold text-aroham-dark">aroham2025</span>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-aroham-muted">
        Aroham Foundation • Executive Alumnae Portal
      </div>
    </div>
  );
}
