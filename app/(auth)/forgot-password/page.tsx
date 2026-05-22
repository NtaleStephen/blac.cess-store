'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Mail, Check, Eye, EyeOff } from 'lucide-react';
import { BrandCrown } from '@/components/BrandLogo';
import { fadeInUp } from '@/lib/animations';

export default function ForgotPasswordPage() {
  const [step, setStep]                 = useState<0 | 1 | 2>(0);
  const [email, setEmail]               = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const stepContent = [
    /* Step 0: Enter email */
    <div key="email">
      <div className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-7 border border-[var(--color-divider-strong)]">
        <Mail size={26} className="text-[var(--color-accent)]" strokeWidth={1.4} />
      </div>
      <h1 className="heading-lg text-center mb-3">Forgot Password?</h1>
      <p className="body-sm text-center mb-8">
        Enter the email address linked to your account and we&apos;ll send you a reset link.
      </p>
      <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-5">
        <div>
          <label className="input-label">Email Address <span className="text-[var(--color-accent)]">*</span></label>
          <input
            type="email"
            placeholder="amara@example.com"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-block">
          Send Reset Link
          <ArrowRight size={14} />
        </button>
      </form>
    </div>,

    /* Step 1: Check email */
    <div key="check" className="text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-7 border border-[var(--color-success)]/40">
        <Check size={26} className="text-[var(--color-success)]" />
      </div>
      <h1 className="heading-lg mb-3">Check Your Email</h1>
      <p className="body-sm mb-1">We&apos;ve sent a password reset link to</p>
      <p className="font-semibold text-[14px] mb-8 text-[var(--color-accent)]">{email}</p>
      <p className="text-[12px] mb-8 leading-relaxed text-[var(--color-ink-muted)]">
        Didn&apos;t receive it? Check your spam folder, or{' '}
        <button onClick={() => setStep(0)} className="hover:underline text-[var(--color-accent)]">
          try another email
        </button>
      </p>
      <button onClick={() => setStep(2)} className="btn btn-block">
        I&apos;ve received the link
        <ArrowRight size={14} />
      </button>
    </div>,

    /* Step 2: Set new password */
    <div key="reset">
      <h1 className="heading-lg mb-3">Set New Password</h1>
      <p className="body-sm mb-8">Choose a strong password for your account.</p>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div>
          <label className="input-label">New Password <span className="text-[var(--color-accent)]">*</span></label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              className="input pr-12"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div>
          <label className="input-label">Confirm New Password <span className="text-[var(--color-accent)]">*</span></label>
          <input type="password" placeholder="Repeat new password" className="input" autoComplete="new-password" required />
        </div>
        <button type="submit" className="btn btn-block">
          <Check size={14} />
          Reset Password
        </button>
      </form>
    </div>,
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-[96px] bg-[var(--color-paper)]">
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <BrandCrown size={20} />
          <span className="font-serif font-bold text-[16px] tracking-[3px] text-[var(--color-ink)]">
            blac.cess
          </span>
        </div>

        {/* Step progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="transition-all"
              style={{
                width: i === step ? '24px' : '8px',
                height: '2px',
                background: i <= step ? 'var(--color-accent)' : 'var(--color-divider-strong)',
              }}
            />
          ))}
        </div>

        <div className="card-static p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              {stepContent[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 text-[12px] uppercase tracking-[1.5px] transition-colors text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]"
          >
            <ArrowLeft size={14} />
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
