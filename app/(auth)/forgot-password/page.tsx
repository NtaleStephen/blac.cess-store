'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, ArrowRight, ArrowLeft, Mail, Check, Eye, EyeOff } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export default function ForgotPasswordPage() {
  const [step, setStep]           = useState<0 | 1 | 2>(0);
  const [email, setEmail]         = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const stepContent = [
    /* Step 0: Enter email */
    <div key="email">
      <div
        className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-6"
        style={{ background: 'rgba(212,165,116,0.1)', border: '1px solid rgba(212,165,116,0.3)' }}
      >
        <Mail size={28} style={{ color: '#D4A574' }} strokeWidth={1.5} />
      </div>
      <h1 className="font-serif text-center mb-2" style={{ fontSize: '26px', fontWeight: 600, color: '#2A2A2A' }}>
        Forgot Password?
      </h1>
      <p className="text-sm text-center mb-7 leading-relaxed" style={{ color: 'rgba(42,42,42,0.55)' }}>
        Enter the email address linked to your account and we&apos;ll send you a reset link.
      </p>
      <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-4">
        <div>
          <label className="input-label">Email Address <span style={{ color: '#D4A574' }}>*</span></label>
          <input
            type="email"
            placeholder="amara@example.com"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-gold w-full">
          Send Reset Link
          <ArrowRight size={14} />
        </button>
      </form>
    </div>,

    /* Step 1: Check email */
    <div key="check" className="text-center">
      <div
        className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-6"
        style={{ background: 'rgba(56,142,60,0.1)', border: '1px solid rgba(56,142,60,0.3)' }}
      >
        <Check size={28} style={{ color: '#388E3C' }} />
      </div>
      <h1 className="font-serif mb-2" style={{ fontSize: '26px', fontWeight: 600, color: '#2A2A2A' }}>
        Check Your Email
      </h1>
      <p className="text-sm mb-2 leading-relaxed" style={{ color: 'rgba(42,42,42,0.55)' }}>
        We&apos;ve sent a password reset link to
      </p>
      <p className="font-semibold text-sm mb-7" style={{ color: '#D4A574' }}>{email}</p>
      <p className="text-xs mb-6 leading-relaxed" style={{ color: 'rgba(42,42,42,0.45)' }}>
        Didn&apos;t receive it? Check your spam folder, or{' '}
        <button onClick={() => setStep(0)} className="hover:underline" style={{ color: '#D4A574' }}>
          try another email
        </button>
      </p>
      <button onClick={() => setStep(2)} className="btn btn-gold w-full">
        I&apos;ve received the link
        <ArrowRight size={14} />
      </button>
    </div>,

    /* Step 2: Set new password */
    <div key="reset">
      <h1 className="font-serif mb-2" style={{ fontSize: '26px', fontWeight: 600, color: '#2A2A2A' }}>
        Set New Password
      </h1>
      <p className="text-sm mb-7" style={{ color: 'rgba(42,42,42,0.55)' }}>
        Choose a strong password for your account.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label className="input-label">New Password <span style={{ color: '#D4A574' }}>*</span></label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              className="input"
              style={{ paddingRight: 48 }}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-brand-gold"
              style={{ color: 'rgba(42,42,42,0.4)' }}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div>
          <label className="input-label">Confirm New Password <span style={{ color: '#D4A574' }}>*</span></label>
          <input type="password" placeholder="Repeat new password" className="input" autoComplete="new-password" required />
        </div>
        <button type="submit" className="btn btn-gold w-full">
          <Check size={14} />
          Reset Password
        </button>
      </form>
    </div>,
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#F5F1EB', paddingTop: 'calc(72px + 24px)' }}>
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Crown size={20} style={{ color: '#D4A574' }} />
          <span className="font-serif font-bold" style={{ color: '#2A2A2A', letterSpacing: '3px' }}>
            BLAC.CESS
          </span>
        </div>

        {/* Step progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === step ? '20px' : '8px',
                height: '8px',
                background: i <= step ? '#D4A574' : 'rgba(42,42,42,0.12)',
              }}
            />
          ))}
        </div>

        <div
          className="rounded-xl p-8"
          style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.06)' }}
        >
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

        <div className="text-center mt-5">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 text-sm transition-colors hover:text-brand-gold"
            style={{ color: 'rgba(42,42,42,0.5)' }}
          >
            <ArrowLeft size={14} />
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
