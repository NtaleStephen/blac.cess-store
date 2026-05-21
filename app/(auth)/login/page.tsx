'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Crown, ArrowRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

const MAX_ATTEMPTS = 5;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts]         = useState(0);
  const [locked, setLocked]             = useState(false);

  return (
    <div className="min-h-screen flex" style={{ paddingTop: 72 }}>
      {/* Left branding panel — desktop only */}
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
            Members Only
          </p>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 600, lineHeight: 1.2 }}
          >
            Welcome to the Heritage
          </h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Sign in to access your orders, wishlist, and exclusive member benefits. Your cultural
            luxury journey continues here.
          </p>
        </div>

        <div>
          <div className="mb-4" style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>
            &copy; 2026 BLAC.CESS. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6" style={{ background: '#F5F1EB' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Crown size={20} style={{ color: '#D4A574' }} />
            <span className="font-serif font-bold" style={{ color: '#2A2A2A', letterSpacing: '3px' }}>
              BLAC.CESS
            </span>
          </div>

          {/* Form card */}
          <div
            className="rounded-xl p-8"
            style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.06)' }}
          >
            <h1 className="font-serif mb-1" style={{ fontSize: '28px', fontWeight: 600, color: '#2A2A2A' }}>
              Welcome Back
            </h1>
            <p className="text-sm mb-7" style={{ color: 'rgba(42,42,42,0.55)' }}>
              Sign in to your account to continue
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (locked) return;
                const next = attempts + 1;
                setAttempts(next);
                if (next >= MAX_ATTEMPTS) setLocked(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="input-label">
                  Email Address <span style={{ color: '#D4A574' }}>*</span>
                </label>
                <input type="email" placeholder="amara@example.com" className="input" autoComplete="email" required />
              </div>

              <div>
                <label className="input-label">
                  Password <span style={{ color: '#D4A574' }}>*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    className="input"
                    style={{ paddingRight: 48 }}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200 hover:text-brand-gold"
                    style={{ color: 'rgba(42,42,42,0.4)' }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#D4A574' }} />
                  <span className="text-sm" style={{ color: 'rgba(42,42,42,0.6)' }}>Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm hover:underline" style={{ color: '#D4A574', fontSize: 13 }}>
                  Forgot password?
                </Link>
              </div>

              {attempts > 0 && !locked && (
                <p className="text-xs text-center" style={{ color: '#F57C00' }}>
                  Incorrect credentials. {MAX_ATTEMPTS - attempts} attempt{MAX_ATTEMPTS - attempts !== 1 ? 's' : ''} remaining.
                </p>
              )}

              {locked && (
                <p className="text-xs text-center" style={{ color: '#C62828' }}>
                  Too many failed attempts. Please{' '}
                  <Link href="/forgot-password" className="underline">reset your password</Link>
                  {' '}or try again later.
                </p>
              )}

              <button
                type="submit"
                disabled={locked}
                className="btn btn-gold w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign In
                <ArrowRight size={14} />
              </button>
            </form>

            <div className="mt-6 pt-6 text-center" style={{ borderTop: '1px solid rgba(42,42,42,0.08)' }}>
              <p className="text-sm" style={{ color: 'rgba(42,42,42,0.55)' }}>
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-semibold hover:underline" style={{ color: '#D4A574' }}>
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
