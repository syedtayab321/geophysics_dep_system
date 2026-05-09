'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { Waves, Mail, Lock, ArrowRight, Loader2} from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'invalid_credentials';
      if (message.includes('Email not confirmed')) {
        toast.error('Please verify your email before logging in');
      } else {
        toast.error('Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <style>{styles}</style>

      {/* ── LEFT PANEL ─────────────────────────────────────── */}
      <aside className="left-panel">
        <div className="brand">
          <div className="brand-icon"><Waves size={28} strokeWidth={1.5} /></div>
          <span className="brand-name">GeoPhysics<strong>DS</strong></span>
        </div>

        <div className="hero-copy">
          <h1>Understand<br />the <em>earth`s</em><br />pulse.</h1>
          <p>Access your research dashboard, seismic records, and department tools — all in one place.</p>
        </div>

        <div className="dept-list">
          {['Seismology', 'Geodesy', 'Geomagnetism', 'Exploration Geophysics', 'Environmental Geophysics'].map((d, i) => (
            <div className="dept-chip" key={d} style={{ animationDelay: `${i * 80}ms` }}>
              <span className="dept-dot" />
              {d}
            </div>
          ))}
        </div>

        {/* decorative seismic wave */}
        <svg className="wave-deco" viewBox="0 0 480 80" preserveAspectRatio="none" aria-hidden="true">
          <polyline fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
            points="0,40 20,40 35,18 50,62 65,22 80,58 95,40 120,40 138,8 155,72 170,28 185,52 200,40 480,40" />
        </svg>

        <div className="depth-ring r1" />
        <div className="depth-ring r2" />
        <div className="depth-ring r3" />
      </aside>

      {/* ── RIGHT PANEL ───────────────────────────────────── */}
      <main className="right-panel">
        <div className="form-container">

          <div className="form-header">
            <p className="form-eyebrow">Researcher portal</p>
            <h2>Welcome back</h2>
            <p className="form-sub">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrap">
                <Mail size={16} strokeWidth={1.5} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="jane@geophysics.org"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="field-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
              <div className="input-wrap">
                <Lock size={16} strokeWidth={1.5} className="input-icon" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <><Loader2 size={18} className="spin" /> Signing in…</>
              ) : (
                <><span>Sign in</span><ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="divider"><span>or</span></div>

          <div className="demo-note">
            <span className="demo-badge">Dev note</span>
            After registration, confirm your email. Disable email confirmation in Supabase settings for local dev.
          </div>

          <p className="register-link">
            Don`t have an account? <Link href="/register">Create one →</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

/* ─── STYLES ──────────────────────────────────────────────────── */
const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .login-root {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 420px 1fr;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── LEFT PANEL ─────────────────────── */
  .left-panel {
    background: #0d2137;
    background-image:
      radial-gradient(ellipse 60% 50% at 110% 0%, #1e4d6b 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at -20% 100%, #0a3a55 0%, transparent 60%);
    color: #fff;
    padding: 2.5rem 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 3rem;
  }
  .brand-icon {
    width: 42px; height: 42px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: #6ee7c4;
  }
  .brand-name {
    font-size: 1.05rem;
    color: rgba(255,255,255,0.85);
    letter-spacing: 0.02em;
  }
  .brand-name strong { color: #6ee7c4; font-weight: 500; }

  .hero-copy { flex: 1; }
  .hero-copy h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 3rem;
    line-height: 1.15;
    font-weight: 400;
    margin-bottom: 1rem;
    color: #fff;
  }
  .hero-copy h1 em { font-style: italic; color: #6ee7c4; }
  .hero-copy p {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.52);
    line-height: 1.7;
    max-width: 300px;
  }

  .dept-list {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin: 2rem 0 1.5rem;
  }
  .dept-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.6);
    padding: 7px 12px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 7px;
    letter-spacing: 0.01em;
    animation: slideIn 0.4s ease both;
  }
  .dept-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #6ee7c4;
    flex-shrink: 0;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-8px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .wave-deco {
    width: 100%;
    height: 48px;
    margin-top: auto;
    opacity: 0.6;
  }

  .depth-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(110, 231, 196, 0.07);
    pointer-events: none;
  }
  .r1 { width: 320px; height: 320px; right: -140px; top: -80px; }
  .r2 { width: 500px; height: 500px; right: -240px; top: -160px; }
  .r3 { width: 680px; height: 680px; right: -330px; top: -250px; }

  /* ── RIGHT PANEL ────────────────────── */
  .right-panel {
    background: #f5f3ee;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .form-container {
    width: 100%;
    max-width: 400px;
  }

  .form-header { margin-bottom: 2rem; }
  .form-eyebrow {
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1e7a5a;
    margin-bottom: 0.4rem;
  }
  .form-header h2 {
    font-family: 'DM Serif Display', serif;
    font-size: 2.2rem;
    font-weight: 400;
    color: #0d2137;
    line-height: 1.1;
    margin-bottom: 0.35rem;
  }
  .form-sub {
    font-size: 0.88rem;
    color: #7a8a96;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 1rem;
  }
  .field-group label {
    font-size: 0.8rem;
    font-weight: 500;
    color: #3a4a5a;
  }
  .label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .forgot-link {
    font-size: 0.75rem;
    color: #1e7a5a;
    text-decoration: none;
    font-weight: 500;
  }
  .forgot-link:hover { text-decoration: underline; }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .input-icon {
    position: absolute;
    left: 12px;
    color: #8a9baa;
    pointer-events: none;
  }
  .input-wrap input {
    width: 100%;
    padding: 11px 12px 11px 36px;
    font-size: 0.88rem;
    font-family: 'DM Sans', sans-serif;
    background: #fff;
    border: 1.5px solid #dde4ea;
    border-radius: 8px;
    color: #0d2137;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .input-wrap input::placeholder { color: #bcc8d4; }
  .input-wrap input:focus {
    border-color: #1e7a5a;
    box-shadow: 0 0 0 3px rgba(30, 122, 90, 0.12);
  }

  .submit-btn {
    width: 100%;
    padding: 13px 24px;
    margin-top: 0.6rem;
    background: #0d2137;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: background 0.2s, transform 0.1s;
  }
  .submit-btn:hover:not(:disabled) { background: #1e4d6b; }
  .submit-btn:active:not(:disabled) { transform: scale(0.985); }
  .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 1.4rem 0;
    color: #b0bec8;
    font-size: 0.78rem;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #dde4ea;
  }

  .demo-note {
    background: #eef8f4;
    border: 1px solid #c2e8d8;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 0.78rem;
    color: #3a6655;
    line-height: 1.6;
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  .demo-badge {
    background: #1e7a5a;
    color: #fff;
    font-size: 0.65rem;
    font-weight: 500;
    padding: 2px 7px;
    border-radius: 4px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
    margin-top: 1px;
  }

  .register-link {
    margin-top: 1.4rem;
    text-align: center;
    font-size: 0.85rem;
    color: #6a7f8e;
  }
  .register-link a {
    color: #1e7a5a;
    text-decoration: none;
    font-weight: 500;
  }
  .register-link a:hover { text-decoration: underline; }

  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 820px) {
    .login-root { grid-template-columns: 1fr; }
    .left-panel { min-height: 200px; padding: 1.8rem 2rem; }
    .hero-copy h1 { font-size: 2rem; }
    .dept-list { display: none; }
  }
`;