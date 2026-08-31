import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { awardTenures, awards } from '../data/awards';

const shortTenure = (t) => {
  const [start, end] = t.split('-');
  return `${start.slice(2)}-${end}`;
};

// ── Background Orb ──────────────────────────────────────────
function Orb({ style }) {
  return <div style={{ position: 'fixed', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0, ...style }} />;
}

// ── Award Card ──────────────────────────────────────────────
function AwardCard({ award }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), 100); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)') : 'translateY(20px)',
        transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(255,215,0,0.4)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: hovered ? '0 10px 30px rgba(215,25,32,0.15), inset 0 0 20px rgba(255,215,0,0.05)' : '0 4px 20px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gradient glow on hover */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at left center, rgba(255,215,0,0.1), transparent 60%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Icon */}
      <div style={{
        width: '56px', height: '56px', flexShrink: 0,
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(215,25,32,0.8), rgba(130,0,0,0.9))',
        border: '1px solid rgba(255,215,0,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}>
        🏆
      </div>

      {/* Content */}
      <div style={{ flex: 1, zIndex: 1 }}>
        {award.category && (
          <div style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '10px', fontWeight: 700,
            color: '#FFB400',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '4px',
          }}>
            {award.category}
          </div>
        )}
        <h3 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '16px', fontWeight: 800,
          color: '#ffffff',
          margin: '0 0 4px 0',
          lineHeight: 1.3,
        }}>
          {award.title}
        </h3>
        {award.organization && (
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px', fontWeight: 500,
            color: 'rgba(255,255,255,0.6)',
            margin: 0,
          }}>
            {award.organization}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Awards Page ────────────────────────────────────────────────
export default function Awards() {
  const [searchParams] = useSearchParams();
  const tenureFromUrl = searchParams.get('tenure');
  
  // Default to 2024-25 or the first available tenure if URL has none
  const activeTenures = awardTenures;
  const defaultTenure = '2024-25'; // Default to a tenure with awards
  
  const [selectedTenure, setSelectedTenure] = useState(
    activeTenures.includes(tenureFromUrl) ? tenureFromUrl : defaultTenure
  );
  
  const [headIn, setHeadIn] = useState(false);

  useEffect(() => {
    document.title = `Awards ${selectedTenure} | Rotaract GCT`;
  }, [selectedTenure]);

  useEffect(() => {
    if (tenureFromUrl && activeTenures.includes(tenureFromUrl)) setSelectedTenure(tenureFromUrl);
  }, [tenureFromUrl]);

  useEffect(() => {
    setHeadIn(false);
    const t2 = setTimeout(() => setHeadIn(true), 100);
    return () => clearTimeout(t2);
  }, [selectedTenure]);

  // Filter awards by selected tenure
  const awardsList = awards.filter((a) => a.tenure === selectedTenure);

  return (
    <div className="page-enter" style={{ background: '#0D0505', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* ── Background Elements ── */}
      <Orb style={{ width: '600px', height: '600px', top: '-100px', left: '-150px', background: 'rgba(215,25,32,0.12)', animation: 'drift1 14s ease-in-out infinite' }} />
      <Orb style={{ width: '450px', height: '450px', top: '30%', right: '-100px', background: 'rgba(255,215,0,0.06)', animation: 'drift2 18s ease-in-out infinite' }} />
      <Orb style={{ width: '500px', height: '500px', bottom: '5%', left: '15%', background: 'rgba(165,0,0,0.12)', animation: 'drift3 22s ease-in-out infinite' }} />

      {/* Subtle grid lines */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(215,25,32,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(215,25,32,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* ── Page body ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 24px 100px', position: 'relative', zIndex: 1 }}>

        {/* ── Heading ── */}
        <div style={{
          textAlign: 'center', marginBottom: '80px',
          opacity: headIn ? 1 : 0,
          transform: headIn ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#FFD700', marginBottom: '12px',
          }}>
            Club Recognitions
          </p>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(36px, 8vw, 64px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
            margin: '0 0 16px',
            background: 'linear-gradient(135deg, #ffffff 0%, #FFD700 30%, #FFA500 70%, #ffffff 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'textShimmer 6s linear infinite',
          }}>
            AWARDS {shortTenure(selectedTenure)}
          </h1>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          }}>
            <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(to left, rgba(255,215,0,0.5), transparent)' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFD700', boxShadow: '0 0 10px rgba(255,215,0,0.6)' }} />
            <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(to right, rgba(255,215,0,0.5), transparent)' }} />
          </div>
        </div>

        {/* ── Award Grid ── */}
        {awardsList.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '32px' 
          }}>
            {awardsList.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '80px 0',
            opacity: headIn ? 1 : 0,
            transition: 'opacity 0.5s ease 0.4s',
          }}>
            <div style={{
              width: '80px', height: '80px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px',
            }}>🏆</div>
            <h3 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '20px', fontWeight: 700,
              color: '#ffffff', marginBottom: '8px',
            }}>No Awards Yet</h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px', color: 'rgba(255,255,255,0.6)',
            }}>
              The recognitions for {selectedTenure} are still in the making.
            </p>
          </div>
        )}
      </div>

      {/* ── Global Styles ── */}
      <style>{`
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0); }
          33%       { transform: translate(40px, -30px); }
          66%       { transform: translate(-20px, 20px); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0); }
          33%       { transform: translate(-50px, 30px); }
          66%       { transform: translate(30px, -20px); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(60px, -40px); }
        }
        @keyframes textShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>
    </div>
  );
}
