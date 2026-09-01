import { useEffect, useState, useRef } from 'react';
import { pastPresidents } from '../data/pastPresidents';

const placeholderImg = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=D71920&color=FFFFFF&bold=true&size=400`;

function Orb({ style }) {
  return <div style={{ position: 'fixed', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0, ...style }} />;
}

function PresidentRow({ president, index, isLast }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), 100); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const photoBlock = (
    <div className={isLeft ? "md:order-1" : "md:order-2"} style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        position: 'relative',
        width: '240px',
        height: '280px',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(255,215,0,0.5)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: hovered ? '0 0 0 1px rgba(255,215,0,0.3), 0 20px 60px rgba(215,25,32,0.25)' : '0 8px 32px rgba(0,0,0,0.4)',
        transform: hovered ? (isLeft ? 'translateX(-10px) scale(1.02)' : 'translateX(10px) scale(1.02)') : 'scale(1)',
        transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <img
          src={president.image}
          alt={president.name}
          onError={e => { e.target.src = placeholderImg(president.name); }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.6s ease',
            display: 'block',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered
            ? 'linear-gradient(to bottom, rgba(215,25,32,0.15), rgba(255,215,0,0.1))'
            : 'transparent',
          transition: 'background 0.5s ease',
        }} />
      </div>
    </div>
  );

  const textBlock = (
    <div className={isLeft ? "md:order-2" : "md:order-1"} style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      textAlign: 'center',
      transform: hovered ? (isLeft ? 'translateX(10px)' : 'translateX(-10px)') : 'translateX(0)',
      transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: '22px', fontWeight: 700,
        color: '#ffffff', margin: '0 0 8px',
      }}>{president.name}</p>
      
      <div style={{ margin: '0 0 16px' }}>
        <span style={{
          display: 'inline-block',
          background: '#D71920',
          color: '#ffffff',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '11px', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '6px 16px', borderRadius: '999px',
          boxShadow: '0 4px 15px rgba(215,25,32,0.4)',
        }}>
          TENURE {president.tenure}
        </span>
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)',
        alignItems: 'center',
        padding: '40px 0',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {photoBlock}
      {textBlock}
    </div>
  );
}

export default function PastPresidents() {
  const [headIn, setHeadIn] = useState(false);

  useEffect(() => {
    document.title = "Past Presidents | Rotaract GCT";
    const t2 = setTimeout(() => setHeadIn(true), 300);
    return () => clearTimeout(t2);
  }, []);

  return (
    <div className="page-enter" style={{ background: '#0D0505', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* ── Background Orbs ── */}
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
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '120px 24px 100px', position: 'relative', zIndex: 1 }}>

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
            The Leaders
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
            PAST PRESIDENTS
          </h1>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          }}>
            <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(to left, rgba(255,215,0,0.5), transparent)' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFD700', boxShadow: '0 0 10px rgba(255,215,0,0.6)' }} />
            <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(to right, rgba(255,215,0,0.5), transparent)' }} />
          </div>
        </div>

        {/* ── Member Rows (Alternating Layout) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {pastPresidents.map((president, i) => (
            <PresidentRow key={president.id} president={president} index={i} isLast={i === pastPresidents.length - 1} />
          ))}
        </div>
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
