'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Crown, ArrowRight, Check } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

function getPasswordStrength(password: string): { level: number; label: string; color: string } {
  if (!password) return { level: 0, label: '', color: '#E0E0E0' };
  let score = 0;
  if (password.length >= 8)          score++;
  if (/[A-Z]/.test(password))        score++;
  if (/[0-9]/.test(password))        score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { level: 25,  label: 'Weak',   color: '#F44336' };
  if (score === 2) return { level: 50,  label: 'Fair',   color: '#FFC107' };
  if (score === 3) return { level: 75,  label: 'Good',   color: '#4CAF50' };
  return              { level: 100, label: 'Strong', color: '#2E7D32' };
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [password, setPassword]         = useState('');
  const [confirm, setConfirm]           = useState('');

  const strength        = getPasswordStrength(password);
  const passwordsMatch  = confirm.length > 0 && password === confirm;
  const passwordsMismatch = confirm.length > 0 && password !== confirm;

  return (
    <div className="min-h-screen flex" style={{ paddingTop: 72 }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 flex-1"
        style={{ background: '#0A0A0A', maxWidth: '42%' }}
      >
        <div className="flex items-center gap-2">
          <Crown size={22} style={{ color: '#D4A574' }} />
          <span className="text-white font-serif font-bold" style={{ letterSpacing: '3px', fontSize: 18 }}>
            BLAC.CESS
          </span>
        </div>

        <div>
          <p className="font-semibold uppercase mb-6" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', fontSize: 11 }}>
            Join the Heritage
          </p>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 600, lineHeight: 1.2 }}
          >
            Become Part of Something Greater
          </h2>
          <p className="text-sm leading-relaxed max-w-xs mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Create your BLAC.CESS account to unlock early access to new drops, order tracking,
            and a curated wishlist of pieces that speak to your heritage.
          </p>

          <div className="space-y-3">
            {[
              'Early access to new collections',
              'Exclusive member pricing',
              'Order tracking & history',
              'Curated wishlist',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(212,165,116,0.15)', border: '1px solid rgba(212,165,116,0.4)' }}
                >
                  <Check size={9} style={{ color: '#D4A574' }} />
                </div>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4" style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>&copy; 2026 BLAC.CESS. All rights reserved.</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto" style={{ background: '#F5F1EB' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="w-full max-w-md py-8">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Crown size={20} style={{ color: '#D4A574' }} />
            <span className="font-serif font-bold" style={{ color: '#2A2A2A', letterSpacing: '3px' }}>
              BLAC.CESS
            </span>
          </div>

          <div
            className="rounded-xl p-8"
            style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.06)' }}
          >
            <h1 className="font-serif mb-1" style={{ fontSize: '28px', fontWeight: 600, color: '#2A2A2A' }}>
              Create Account
            </h1>
            <p className="text-sm mb-7" style={{ color: 'rgba(42,42,42,0.55)' }}>
              Join BLAC.CESS and celebrate your heritage
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="input-label">Full Name <span style={{ color: '#D4A574' }}>*</span></label>
                <input type="text" placeholder="Amara Nwosu" className="input" autoComplete="name" required />
              </div>

              <div>
                <label className="input-label">Email Address <span style={{ color: '#D4A574' }}>*</span></label>
                <input type="email" placeholder="amara@example.com" className="input" autoComplete="email" required />
              </div>

              <div>
                <label className="input-label">Password <span style={{ color: '#D4A574' }}>*</span></label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    className="input"
                    style={{ paddingRight: 48 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-brand-gold"
                    style={{ color: 'rgba(42,42,42,0.4)' }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(42,42,42,0.1)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${strength.level}%`, background: strength.color }}
                      />
                    </div>
                    <p className="text-xs mt-1" style={{ color: strength.color, fontSize: '11px' }}>{strength.label}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="input-label">Confirm Password <span style={{ color: '#D4A574' }}>*</span></label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    className="input"
                    style={{
                      paddingRight: 48,
                      borderColor: passwordsMismatch ? 'rgba(244,67,54,0.6)' : passwordsMatch ? 'rgba(76,175,80,0.6)' : undefined,
                    }}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-brand-gold"
                    style={{ color: 'rgba(42,42,42,0.4)' }}
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
                <span className="text-sm leading-relaxed" style={{ color: 'rgba(42,42,42,0.6)' }}>
                  I agree to the{' '}
                  <button type="button" className="hover:underline font-medium" style={{ color: '#D4A574' }}>Terms of Service</button>
                  {' '}and{' '}
                  <button type="button" className="hover:underline font-medium" style={{ color: '#D4A574' }}>Privacy Policy</button>
                </span>
              </label>

              <button type="submit" className="btn btn-gold w-full mt-2">
                Create Account
                <ArrowRight size={14} />
              </button>
            </form>

            <div className="mt-6 pt-6 text-center" style={{ borderTop: '1px solid rgba(42,42,42,0.08)' }}>
              <p className="text-sm" style={{ color: 'rgba(42,42,42,0.55)' }}>
                Already have an account?{' '}
                <Link href="/login" className="font-semibold hover:underline" style={{ color: '#D4A574' }}>
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
