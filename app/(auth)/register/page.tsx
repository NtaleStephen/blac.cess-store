'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Crown, ArrowRight, Check } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

function getPasswordStrength(password: string): { level: number; label: string; color: string } {
  if (!password) return { level: 0, label: '', color: '#E0E0E0' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 25, label: 'Weak', color: '#F44336' };
  if (score === 2) return { level: 50, label: 'Fair', color: '#FFC107' };
  if (score === 3) return { level: 75, label: 'Good', color: '#4CAF50' };
  return { level: 100, label: 'Strong', color: '#2E7D32' };
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const strength = getPasswordStrength(password);
  const passwordsMatch = confirm.length > 0 && password === confirm;
  const passwordsMismatch = confirm.length > 0 && password !== confirm;

  return (
    <div className="min-h-screen flex" style={{ paddingTop: '72px' }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 flex-1"
        style={{
          background: 'linear-gradient(145deg, #1A1A1A 0%, #000000 60%, #2A2A2A 100%)',
          maxWidth: '42%',
        }}
      >
        <div className="flex items-center gap-2">
          <Crown size={22} className="text-brand-gold" />
          <span
            className="text-white text-lg font-bold tracking-widest"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '3px' }}
          >
            BLAC.CESS
          </span>
        </div>

        <div>
          <p
            className="text-white/20 text-xs font-semibold uppercase mb-6"
            style={{ letterSpacing: '3px' }}
          >
            Join the Heritage
          </p>
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px, 3vw, 44px)',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Become Part of Something Greater
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Create your BLAC.CESS account to unlock early access to new drops, order tracking,
            and a curated wishlist of pieces that speak to your heritage.
          </p>

          <div className="mt-8 space-y-3">
            {[
              'Early access to new collections',
              'Exclusive member pricing',
              'Order tracking & history',
              'Curated wishlist',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,165,116,0.2)', border: '1px solid rgba(212,165,116,0.4)' }}>
                  <Check size={9} className="text-brand-gold" />
                </div>
                <span className="text-white/60 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="section-divider mb-4" style={{ opacity: 0.2 }} />
          <p className="text-white/30 text-xs">&copy; 2026 BLAC.CESS. All rights reserved.</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-brand-cream overflow-y-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="w-full max-w-md py-8"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Crown size={20} className="text-brand-gold" />
            <span
              className="text-brand-charcoal font-bold tracking-widest"
              style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '3px' }}
            >
              BLAC.CESS
            </span>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{
              background: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(212,165,116,0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h1
              className="text-brand-charcoal mb-1"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 600 }}
            >
              Create Account
            </h1>
            <p className="text-brand-charcoal/55 text-sm mb-7">
              Join BLAC.CESS and celebrate your heritage
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                  Full Name <span className="text-brand-gold">*</span>
                </label>
                <input type="text" placeholder="Amara Nwosu" className="glass-input" autoComplete="name" required />
              </div>

              <div>
                <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                  Email Address <span className="text-brand-gold">*</span>
                </label>
                <input type="email" placeholder="amara@example.com" className="glass-input" autoComplete="email" required />
              </div>

              <div>
                <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                  Password <span className="text-brand-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    className="glass-input pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-gold transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password strength bar */}
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: '#E0E0E0' }}>
                      <div
                        className="h-full rounded-full transition-all duration-400"
                        style={{ width: `${strength.level}%`, background: strength.color }}
                      />
                    </div>
                    <p className="text-xs mt-1" style={{ color: strength.color, fontSize: '11px' }}>
                      {strength.label}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                  Confirm Password <span className="text-brand-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    className="glass-input pr-12"
                    style={{
                      borderColor: passwordsMismatch
                        ? 'rgba(244,67,54,0.5)'
                        : passwordsMatch
                        ? 'rgba(76,175,80,0.5)'
                        : undefined,
                    }}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-gold transition-colors"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordsMismatch && (
                  <p className="text-xs mt-1" style={{ color: '#F44336', fontSize: '11px' }}>Passwords do not match</p>
                )}
                {passwordsMatch && (
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#4CAF50', fontSize: '11px' }}>
                    <Check size={10} /> Passwords match
                  </p>
                )}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ accentColor: '#D4A574' }} required />
                <span className="text-sm text-brand-charcoal/60 leading-relaxed">
                  I agree to the{' '}
                  <Link href="#" className="text-brand-gold hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="#" className="text-brand-gold hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <button
                type="submit"
                className="glass-btn glass-btn-primary w-full flex items-center justify-center gap-2 mt-2"
                style={{ fontSize: '12px', letterSpacing: '1.5px', padding: '14px' }}
              >
                Create Account
                <ArrowRight size={14} />
              </button>
            </form>

            <div className="mt-6 pt-6 text-center" style={{ borderTop: '1px solid rgba(212,165,116,0.12)' }}>
              <p className="text-brand-charcoal/55 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-brand-gold font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
