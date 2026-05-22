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
  if (score <= 1) return { level: 25,  label: 'Weak',   color: '#B83333' };
  if (score === 2) return { level: 50,  label: 'Fair',   color: '#B8680A' };
  if (score === 3) return { level: 75,  label: 'Good',   color: '#2E7D32' };
  return              { level: 100, label: 'Strong', color: '#1B5E20' };
}

const BENEFITS = [
  'Early access to new collections',
  'Exclusive member pricing',
  'Order tracking & history',
  'Curated wishlist',
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [password, setPassword]         = useState('');
  const [confirm, setConfirm]           = useState('');

  const strength          = getPasswordStrength(password);
  const passwordsMatch    = confirm.length > 0 && password === confirm;
  const passwordsMismatch = confirm.length > 0 && password !== confirm;

  return (
    <div className="min-h-screen flex pt-[72px]">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between p-14 flex-1 bg-[var(--color-night)]" style={{ maxWidth: '46%' }}>
        <div className="flex items-center gap-2">
          <Crown size={22} className="text-[var(--color-accent)]" />
          <span className="text-white font-serif font-bold text-[18px] tracking-[3px]">BLAC.CESS</span>
        </div>

        <div>
          <span className="eyebrow text-[var(--color-accent)] mb-6">Join the Heritage</span>
          <h2 className="heading-xl text-white mb-5">Become Part of<br />Something Greater</h2>
          <p className="text-[15px] leading-relaxed text-white/55 max-w-sm mb-10">
            Create your BLAC.CESS account to unlock early access to new drops, order
            tracking, and a curated wishlist of pieces that speak to your heritage.
          </p>

          <ul className="space-y-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="w-4 h-4 inline-flex items-center justify-center flex-shrink-0 border border-[var(--color-accent)]/60">
                  <Check size={9} className="text-[var(--color-accent)]" />
                </span>
                <span className="text-[14px] text-white/65">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t border-white/10">
          <p className="text-[11px] text-white/30 tracking-[0.5px]">
            &copy; 2026 BLAC.CESS. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-start justify-center p-6 overflow-y-auto bg-[var(--color-paper)]">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="w-full max-w-md py-10">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <Crown size={20} className="text-[var(--color-accent)]" />
            <span className="font-serif font-bold text-[16px] tracking-[3px] text-[var(--color-ink)]">
              BLAC.CESS
            </span>
          </div>

          <div className="card-static p-10">
            <h1 className="heading-lg mb-2">Create Account</h1>
            <p className="body-sm mb-8">Join BLAC.CESS and celebrate your heritage.</p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label className="input-label">Full Name <span className="text-[var(--color-accent)]">*</span></label>
                <input type="text" placeholder="Amara Nwosu" className="input" autoComplete="name" required />
              </div>

              <div>
                <label className="input-label">Email Address <span className="text-[var(--color-accent)]">*</span></label>
                <input type="email" placeholder="amara@example.com" className="input" autoComplete="email" required />
              </div>

              <div>
                <label className="input-label">Password <span className="text-[var(--color-accent)]">*</span></label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    className="input pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="h-1 overflow-hidden bg-[var(--color-divider)]">
                      <div
                        className="h-full transition-all"
                        style={{ width: `${strength.level}%`, background: strength.color }}
                      />
                    </div>
                    <p className="text-[11px] mt-1 uppercase tracking-[1px]" style={{ color: strength.color }}>
                      {strength.label}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="input-label">Confirm Password <span className="text-[var(--color-accent)]">*</span></label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    className="input pr-12"
                    style={{
                      borderColor: passwordsMismatch
                        ? 'var(--color-danger)'
                        : passwordsMatch
                          ? 'var(--color-success)'
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordsMismatch && (
                  <p className="text-[11px] mt-1 text-[var(--color-danger)]">Passwords do not match</p>
                )}
                {passwordsMatch && (
                  <p className="text-[11px] mt-1 flex items-center gap-1 text-[var(--color-success)]">
                    <Check size={10} /> Passwords match
                  </p>
                )}
              </div>

              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <input type="checkbox" className="w-4 h-4 mt-0.5 flex-shrink-0 accent-[var(--color-ink)]" required />
                <span className="text-[13px] leading-relaxed text-[var(--color-ink-soft)]">
                  I agree to the{' '}
                  <button type="button" className="hover:underline font-medium text-[var(--color-accent)]">Terms of Service</button>
                  {' '}and{' '}
                  <button type="button" className="hover:underline font-medium text-[var(--color-accent)]">Privacy Policy</button>
                </span>
              </label>

              <button type="submit" className="btn btn-block mt-2">
                Create Account
                <ArrowRight size={14} />
              </button>
            </form>

            <div className="mt-8 pt-6 text-center border-t border-[var(--color-divider)]">
              <p className="text-[13px] text-[var(--color-ink-muted)]">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold hover:underline text-[var(--color-accent)]">
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
