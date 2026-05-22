'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { BrandCrown } from '@/components/BrandLogo';
import { fadeInUp } from '@/lib/animations';

const MAX_ATTEMPTS = 5;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts]         = useState(0);
  const [locked, setLocked]             = useState(false);

  return (
    <div className="min-h-screen flex pt-[72px]">
      {/* Left branding panel — desktop only */}
      <div className="hidden lg:flex flex-col justify-between p-14 flex-1 bg-[var(--color-night)]" style={{ maxWidth: '46%' }}>
        <div className="flex items-center gap-2">
          <BrandCrown size={22} />
          <span className="text-white font-serif font-bold text-[18px] tracking-[3px]">blac.cess</span>
        </div>

        <div>
          <span className="eyebrow text-[var(--color-accent)] mb-6">Members Only</span>
          <h2 className="heading-xl text-white mb-5">Welcome to the Heritage</h2>
          <p className="text-[15px] leading-relaxed text-white/55 max-w-sm">
            Sign in to access your orders, wishlist, and exclusive member benefits.
            Your cultural design journey continues here.
          </p>
        </div>

        <div className="pt-6 border-t border-white/10">
          <p className="text-[11px] text-white/30 tracking-[0.5px]">
            &copy; 2026 blac.cess. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[var(--color-paper)]">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <BrandCrown size={20} />
            <span className="font-serif font-bold text-[16px] tracking-[3px] text-[var(--color-ink)]">
              blac.cess
            </span>
          </div>

          <div className="card-static p-10">
            <h1 className="heading-lg mb-2">Welcome Back</h1>
            <p className="body-sm mb-8">Sign in to your account to continue.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (locked) return;
                const next = attempts + 1;
                setAttempts(next);
                if (next >= MAX_ATTEMPTS) setLocked(true);
              }}
              className="space-y-5"
            >
              <div>
                <label className="input-label">Email Address <span className="text-[var(--color-accent)]">*</span></label>
                <input type="email" placeholder="amara@example.com" className="input" autoComplete="email" required />
              </div>

              <div>
                <label className="input-label">Password <span className="text-[var(--color-accent)]">*</span></label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    className="input pr-12"
                    autoComplete="current-password"
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
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[var(--color-ink)]" />
                  <span className="text-[13px] text-[var(--color-ink-soft)]">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-[12px] uppercase tracking-[1px] hover:underline text-[var(--color-accent)]">
                  Forgot password?
                </Link>
              </div>

              {attempts > 0 && !locked && (
                <p className="text-[12px] text-center text-[var(--color-warning)]">
                  Incorrect credentials. {MAX_ATTEMPTS - attempts} attempt{MAX_ATTEMPTS - attempts !== 1 ? 's' : ''} remaining.
                </p>
              )}

              {locked && (
                <p className="text-[12px] text-center text-[var(--color-danger)]">
                  Too many failed attempts.{' '}
                  <Link href="/forgot-password" className="underline">Reset your password</Link>
                  {' '}or try again later.
                </p>
              )}

              <button
                type="submit"
                disabled={locked}
                className="btn btn-block mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign In
                <ArrowRight size={14} />
              </button>
            </form>

            <div className="mt-8 pt-6 text-center border-t border-[var(--color-divider)]">
              <p className="text-[13px] text-[var(--color-ink-muted)]">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-semibold hover:underline text-[var(--color-accent)]">
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
