'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import {
  Waves, Mail, Lock, User, Briefcase,
  ArrowRight, Loader2, CheckCircle, Activity, Globe, Layers,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', full_name: '', department: '',
  });
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (formData.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const result = await signUp(formData.email, formData.password, {
        full_name: formData.full_name,
        department: formData.department,
        role: 'user',
      });
      if (result.success) {
        setRegistered(true);
        toast.success(result.message || 'Registration successful!');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const pwChecks = [
    formData.password.length >= 6,
    /[A-Z]/.test(formData.password),
    /[^a-zA-Z0-9]/.test(formData.password),
  ];
  const pwStrength = pwChecks.filter(Boolean).length;
  const pwLabel = pwStrength === 0 ? '' : pwStrength === 1 ? 'Weak' : pwStrength === 2 ? 'Moderate' : 'Strong';

  if (registered) {
    return (
      <div className="auth-root">
        <div className="success-screen">
          <div className="success-card">
            <div className="success-icon">
              <CheckCircle size={36} strokeWidth={1.5} />
            </div>
            <h2>You&apos;re all set!</h2>
            <p>Check your email to confirm your account. Redirecting to login…</p>
            <Loader2 size={20} className="spinner" />
          </div>
        </div>

        <style jsx>{pageStyles}</style>
      </div>
    );
  }

  return (
    <div className="auth-root">
      {/* ── LEFT PANEL ── */}
      <aside className="left-panel">
        <div className="brand">
          <div className="brand-icon"><Waves size={24} strokeWidth={1.5} /></div>
          <span className="brand-name">GeoPhysics<strong>DS</strong></span>
        </div>

        <div className="hero-copy">
          <h1>Map the<br /><em>invisible</em><br />world.</h1>
          <p>Join the Geophysics Department System and collaborate with researchers across seismology, geodesy, and beyond.</p>
        </div>

        <div className="stat-grid">
          {[
            { icon: <Activity size={16} strokeWidth={1.5} />, val: '12,400+', label: 'Seismic records' },
            { icon: <Globe size={16} strokeWidth={1.5} />, val: '5', label: 'Departments' },
            { icon: <Layers size={16} strokeWidth={1.5} />, val: '340+', label: 'Researchers' },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-val">{s.val}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <svg className="wave-deco" viewBox="0 0 480 60" preserveAspectRatio="none" aria-hidden="true">
          <polyline fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
            points="0,30 30,30 45,10 60,50 75,18 90,42 105,30 130,30 145,6 160,54 175,22 190,38 205,30 480,30" />
        </svg>

        <div className="ring r1" />
        <div className="ring r2" />
        <div className="ring r3" />
      </aside>

      {/* ── RIGHT PANEL ── */}
      <main className="right-panel">
        <div className="form-wrap">
          <div className="form-header">
            <p className="eyebrow">New researcher</p>
            <h2>Create your account</h2>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Row 1 */}
            <div className="field-row">
              <div className="field">
                <label htmlFor="full_name">Full Name <span className="req">*</span></label>
                <div className="input-wrap">
                  <User size={15} strokeWidth={1.5} className="input-icon" />
                  <input id="full_name" type="text" value={formData.full_name}
                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Jane Smith" required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="department">Department <span className="req">*</span></label>
                <div className="input-wrap">
                  <Briefcase size={15} strokeWidth={1.5} className="input-icon" />
                  <select id="department" value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })} required>
                    <option value="">Select one…</option>
                    <option>Seismology</option>
                    <option>Geodesy</option>
                    <option>Geomagnetism</option>
                    <option>Exploration Geophysics</option>
                    <option>Environmental Geophysics</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="field">
              <label htmlFor="email">Email Address <span className="req">*</span></label>
              <div className="input-wrap">
                <Mail size={15} strokeWidth={1.5} className="input-icon" />
                <input id="email" type="email" value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@geophysics.org" required />
              </div>
            </div>

            {/* Row 3 */}
            <div className="field-row">
              <div className="field">
                <label htmlFor="password">Password <span className="req">*</span></label>
                <div className="input-wrap">
                  <Lock size={15} strokeWidth={1.5} className="input-icon" />
                  <input id="password" type="password" value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min. 6 characters" required minLength={6} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="confirmPassword">Confirm Password <span className="req">*</span></label>
                <div className="input-wrap">
                  <Lock size={15} strokeWidth={1.5} className="input-icon" />
                  <input id="confirmPassword" type="password" value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Re-enter password" required />
                </div>
              </div>
            </div>

            {formData.password && (
              <div className="strength-row">
                {pwChecks.map((ok, i) => (
                  <div key={i} className={`strength-bar${ok ? ' active' : ''}`} />
                ))}
                <span className="strength-label">{pwLabel}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className="submit-btn">
              {loading
                ? <><Loader2 size={17} className="spinner" /> Creating account…</>
                : <><span>Create account</span><ArrowRight size={17} /></>}
            </button>
          </form>

          <p className="alt-link">
            Already have an account? <Link href="/login">Sign in →</Link>
          </p>
        </div>
      </main>

      <style jsx>{pageStyles}</style>
    </div>
  );
}

const pageStyles = `
  .auth-root {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 400px 1fr;
    font-family: inherit;
  }

  .left-panel {
    background: #0d2137;
    color: #fff;
    padding: 2.2rem 2rem 1.8rem;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  .brand { display: flex; align-items: center; gap: 9px; margin-bottom: 2.6rem; }
  .brand-icon {
    width: 38px; height: 38px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    color: #6ee7c4;
  }
  .brand-name { font-size: 0.95rem; color: rgba(255,255,255,0.82); letter-spacing: 0.02em; }
  .brand-name strong { color: #6ee7c4; font-weight: 500; }

  .hero-copy { flex: 1; }
  .hero-copy h1 {
    font-size: 2.7rem; line-height: 1.18; font-weight: 300;
    margin-bottom: 1rem; color: #fff;
  }
  .hero-copy h1 em { font-style: italic; color: #6ee7c4; font-weight: 400; }
  .hero-copy p { font-size: 0.87rem; color: rgba(255,255,255,0.48); line-height: 1.7; max-width: 280px; }

  .stat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin: 1.8rem 0 1.4rem; }
  .stat-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 9px; padding: 10px 8px;
    display: flex; flex-direction: column; gap: 3px;
  }
  .stat-icon { color: #6ee7c4; margin-bottom: 2px; }
  .stat-val { font-size: 0.98rem; font-weight: 500; color: #fff; }
  .stat-label { font-size: 0.68rem; color: rgba(255,255,255,0.42); line-height: 1.3; }

  .wave-deco { width: 100%; height: 40px; margin-top: auto; opacity: 0.55; }

  .ring { position: absolute; border-radius: 50%; border: 1px solid rgba(110,231,196,0.07); pointer-events: none; }
  .r1 { width: 280px; height: 280px; right: -120px; top: -70px; }
  .r2 { width: 460px; height: 460px; right: -210px; top: -150px; }
  .r3 { width: 640px; height: 640px; right: -310px; top: -240px; }

  .right-panel {
    background: #f4f2ed;
    display: flex; align-items: center; justify-content: center;
    padding: 2.5rem 1.5rem;
  }
  .form-wrap { width: 100%; max-width: 500px; }

  .form-header { margin-bottom: 1.8rem; }
  .eyebrow {
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: #1e7a5a; margin-bottom: 0.3rem;
  }
  .form-header h2 { font-size: 1.85rem; font-weight: 300; color: #0d2137; line-height: 1.1; }

  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 10px; }
  .field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px; }
  .field-row .field { margin-bottom: 0; }

  .field label { font-size: 0.77rem; font-weight: 500; color: #374a5a; }
  .req { color: #d94f2e; }

  .input-wrap { position: relative; }
  .input-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #8fa0ae; pointer-events: none; }

  .input-wrap input,
  .input-wrap select {
    width: 100%;
    padding: 10px 11px 10px 34px;
    font-size: 0.85rem;
    font-family: inherit;
    background: #fff;
    border: 1.5px solid #dce4ea;
    border-radius: 7px;
    color: #0d2137;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .input-wrap input::placeholder { color: #b8c6d0; }
  .input-wrap input:focus,
  .input-wrap select:focus {
    border-color: #1e7a5a;
    box-shadow: 0 0 0 3px rgba(30,122,90,0.11);
  }

  .strength-row { display: flex; align-items: center; gap: 5px; margin: -4px 0 10px; }
  .strength-bar { flex: 1; height: 3px; border-radius: 2px; background: #dce4ea; transition: background 0.2s; }
  .strength-bar.active { background: #1e7a5a; }
  .strength-label { font-size: 0.72rem; color: #7a8e9a; white-space: nowrap; }

  .submit-btn {
    width: 100%; padding: 12px 20px; margin-top: 4px;
    background: #0d2137; color: #fff;
    font-family: inherit; font-size: 0.9rem; font-weight: 500;
    border: none; border-radius: 8px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 9px;
    transition: background 0.18s, transform 0.1s;
  }
  .submit-btn:hover:not(:disabled) { background: #183d5c; }
  .submit-btn:active:not(:disabled) { transform: scale(0.988); }
  .submit-btn:disabled { opacity: 0.52; cursor: not-allowed; }

  .alt-link { margin-top: 1.3rem; text-align: center; font-size: 0.83rem; color: #6a7f8e; }

  .success-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f4f2ed; padding: 2rem; }
  .success-card {
    background: #fff; border: 1.5px solid #dce4ea; border-radius: 14px;
    padding: 2.8rem 2.2rem; text-align: center; max-width: 360px;
  }
  .success-icon { width: 64px; height: 64px; background: #eef7f3; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1e7a5a; margin: 0 auto 1rem; }
  .success-card h2 { font-size: 1.55rem; font-weight: 300; color: #0d2137; margin-bottom: 0.5rem; }
  .success-card p { font-size: 0.87rem; color: #6a7f8e; line-height: 1.6; margin-bottom: 1.4rem; }

  .spinner { animation: spin 1s linear infinite; display: block; margin: 0 auto; color: #1e7a5a; }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 860px) {
    .auth-root { grid-template-columns: 1fr; }
    .left-panel { min-height: 180px; padding: 1.6rem; }
    .hero-copy h1 { font-size: 1.9rem; }
    .stat-grid { display: none; }
    .field-row { grid-template-columns: 1fr; }
  }
`;