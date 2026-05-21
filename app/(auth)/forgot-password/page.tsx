'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, ArrowRight, ArrowLeft, Mail, Check, Eye, EyeOff } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const stepContent = [
    /* Step 0: Enter email */
    <div key="email">
      <div className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-6" style={{ background: 'rgba(212,165,116,0.1)', border: '1px solid rgba(212,165,116,0.3)' }}>
        <Mail size={28} className="text-brand-gold" strokeWidth={1.5} />
      </div>
      <h1 className="text-brand-charcoal text-center mb-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 600 }}>
        Forgot Password?
      </h1>
      <p className="text-brand-charcoal/55 text-sm text-center mb-7 leading-relaxed">
        Enter the email address linked to your account and we&apos;ll send you a reset link.
      </p>
      <form onSubmit={(e) => { e.preventDefault(); setStep(1); }} className="space-y-4">
        <div>
          <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
            Email Address <span className="text-brand-gold">*</span>
          </label>
          <input
            type="email"
            placeholder="amara@example.com"
            className="glass-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="glass-btn glass-btn-primary w-full flex items-center justify-center gap-2"
          style={{ fontSize: '12px', letterSpacing: '1.5px', padding: '14px' }}
        >
          Send Reset Link
          <ArrowRight size={14} />
        </button>
      </form>
    </div>,

    /* Step 1: Check email */
    <div key="check" className="text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-6" style={{ background: 'rgba(56,142,60,0.1)', border: '1px solid rgba(56,142,60,0.3)' }}>
        <Check size={28} style={{ color: '#388E3C' }} />
      </div>
      <h1 className="text-brand-charcoal mb-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 600 }}>
        Check Your Email
      </h1>
      <p className="text-brand-charcoal/55 text-sm mb-2 leading-relaxed">
        We&apos;ve sent a password reset link to
      </p>
      <p className="text-brand-gold font-semibold text-sm mb-7">{email}</p>
      <p className="text-brand-charcoal/45 text-xs mb-6 leading-relaxed">
        Didn&apos;t receive it? Check your spam folder, or{' '}
        <button
          onClick={() => setStep(0)}
          className="text-brand-gold hover:underline"
        >
          try another email
        </button>
      </p>
      <button
        onClick={() => setStep(2)}
        className="glass-btn glass-btn-primary w-full flex items-center justify-center gap-2"
        style={{ fontSize: '12px', letterSpacing: '1.5px', padding: '14px' }}
      >
        I&apos;ve received the link
        <ArrowRight size={14} />
      </button>
    </div>,

    /* Step 2: Set new password */
    <div key="reset">
      <h1 className="text-brand-charcoal mb-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 600 }}>
        Set New Password
      </h1>
      <p className="text-brand-charcoal/55 text-sm mb-7">
        Choose a strong password for your account.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
            New Password <span className="text-brand-gold">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              className="glass-input pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-gold transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-brand-charcoal font-medium mb-1.5" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
            Confirm New Password <span className="text-brand-gold">*</span>
          </label>
          <input type="password" placeholder="Repeat new password" className="glass-input" required />
        </div>
        <button
          type="submit"
          className="glass-btn glass-btn-primary w-full flex items-center justify-center gap-2"
          style={{ fontSize: '12px', letterSpacing: '1.5px', padding: '14px' }}
        >
          <Check size={14} />
          Reset Password
        </button>
      </form>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6" style={{ paddingTop: 'calc(72px + 24px)' }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Crown size={20} className="text-brand-gold" />
          <span className="text-brand-charcoal font-bold tracking-widest" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '3px' }}>
            BLAC.CESS
          </span>
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === step ? '20px' : '8px',
                height: '8px',
                background: i <= step ? '#D4A574' : 'rgba(212,165,116,0.2)',
              }}
            />
          ))}
        </div>

        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(212,165,116,0.2)',
            backdropFilter: 'blur(20px)',
          }}
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
            className="flex items-center justify-center gap-2 text-brand-charcoal/50 hover:text-brand-gold transition-colors text-sm"
          >
            <ArrowLeft size={14} />
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
