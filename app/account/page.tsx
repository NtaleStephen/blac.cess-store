'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Check } from 'lucide-react';
import { mockUser } from '@/lib/mock-data';
import { fadeInUp } from '@/lib/animations';

export default function AccountPage() {
  const [saved, setSaved]           = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
      <div className="mb-8">
        <span className="section-eyebrow">My Account</span>
        <h1 className="font-serif" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, color: '#2A2A2A' }}>
          Profile
        </h1>
      </div>

      <div className="space-y-5">
        {/* Avatar section */}
        <div
          className="rounded-xl p-6 flex items-center gap-5"
          style={{ background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)' }}
        >
          <div className="relative flex-shrink-0">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold"
              style={{ background: 'linear-gradient(135deg, #D4A574, #E8B88A)' }}
            >
              {mockUser.name[0]}
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: '#D4A574', border: '2px solid #FFFFFF' }}
              aria-label="Change avatar"
            >
              <Camera size={11} style={{ color: '#FFFFFF' }} />
            </button>
          </div>
          <div>
            <p className="font-serif font-semibold" style={{ fontSize: '18px', color: '#2A2A2A' }}>
              {mockUser.name}
            </p>
            <p className="text-sm" style={{ color: 'rgba(42,42,42,0.55)' }}>{mockUser.email}</p>
            <button className="text-xs mt-1 hover:underline" style={{ color: '#D4A574', fontSize: '11px' }}>
              Change photo
            </button>
          </div>
        </div>

        {/* Personal info form */}
        <div
          className="rounded-xl p-6"
          style={{ background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)' }}
        >
          <h2 className="font-serif font-semibold mb-5" style={{ fontSize: '18px', color: '#2A2A2A' }}>
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Full Name',    placeholder: mockUser.name,              type: 'text',  col2: true },
              { label: 'Email Address', placeholder: mockUser.email,            type: 'email' },
              { label: 'Phone Number', placeholder: mockUser.phone ?? '+1 555 0100', type: 'tel' },
              { label: 'Date of Birth', placeholder: '',                         type: 'date' },
            ].map(({ label, placeholder, type, col2 }) => (
              <div key={label} className={col2 ? 'sm:col-span-2' : ''}>
                <label className="input-label">{label}</label>
                <input
                  type={type}
                  defaultValue={placeholder}
                  placeholder={placeholder}
                  className="input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div
          className="rounded-xl p-6"
          style={{ background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)' }}
        >
          <h2 className="font-serif font-semibold mb-5" style={{ fontSize: '18px', color: '#2A2A2A' }}>
            Preferences
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm" style={{ color: '#2A2A2A' }}>Newsletter</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(42,42,42,0.5)' }}>Receive new collection drops and exclusive offers</p>
            </div>
            <button
              onClick={() => setNewsletter(!newsletter)}
              className="relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
              style={{ background: newsletter ? '#D4A574' : 'rgba(42,42,42,0.15)' }}
              aria-label="Toggle newsletter"
              role="switch"
              aria-checked={newsletter}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300"
                style={{ transform: newsletter ? 'translateX(20px)' : 'translateX(2px)' }}
              />
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className={`btn ${saved ? 'btn-gold' : ''}`}
          >
            {saved && <Check size={14} />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
          <button className="btn btn-outline">
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
