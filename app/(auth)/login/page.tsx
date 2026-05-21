'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Crown, ArrowRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

const MAX_ATTEMPTS = 5;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ paddingTop: '72px' }}>
      {/* Left branding panel — desktop only */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 flex-1"
        style={{
          background: 'linear-gradient(145deg, #1A1A1A 0%, #000000 60%, #2A2A2A 100%)',
          maxWidth: '42%',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Crown size={22} className="text-brand-gold" />
          <span
            className="text-white text-lg font-bold tracking-widest"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '3px' }}
          >
            BLAC.CESS
          </span>
        </div>

        {/* Middle content */}
        <div>
          <p
            className="text-white/20 text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ letterSpacing: '3px' }}
          >
            Members Only
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
            Welcome to the Heritage
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Sign in to access your orders, wishlist, and exclusive member benefits. Your cultural
            luxury journey continues here.
          </p>
        </div>

        {/* Bottom accent */}
        <div>
          <div className="section-divider mb-4" style={{ opacity: 0.2 }} />
          <p className="text-white/30 text-xs">
            &copy; 2026 BLAC.CESS. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right form section */}
      <div className="flex-1 flex items-center justify-center p-6 bg-brand-cream">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="w-full max-w-md"
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

          {/* Form card */}
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
              Welcome Back
            </h1>
            <p className="text-brand-charcoal/55 text-sm mb-7">
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
                <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                  Email Address <span className="text-brand-gold">*</span>
                </label>
                <input
                  type="email"
                  placeholder="amara@example.com"
                  className="glass-input"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                  Password <span className="text-brand-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    className="glass-input pr-12"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-gold transition-colors duration-200"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#D4A574' }} />
                  <span className="text-sm text-brand-charcoal/60">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-brand-gold hover:underline"
                  style={{ fontSize: '13px' }}
                >
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
                className="glass-btn glass-btn-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: '12px', letterSpacing: '1.5px', padding: '14px' }}
              >
                Sign In
                <ArrowRight size={14} />
              </button>
            </form>

            <div className="mt-6 pt-6 text-center" style={{ borderTop: '1px solid rgba(212,165,116,0.12)' }}>
              <p className="text-brand-charcoal/55 text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-brand-gold font-semibold hover:underline">
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
