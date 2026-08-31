import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { flagshipTenures, getFlagshipsByTenure } from '../data/flagships';

const shortTenure = (t) => {
  const [start, end] = t.split('-');
  return `${start.slice(2)}-${end}`;
};

// ── Background Orb ──────────────────────────────────────────
function Orb({ style }) {
  return <div style={{ position: 'fixed', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0, ...style }} />;
}

// ── Flagship Row (Alternating Layout) ──────────────────────────
function FlagshipRow({ flagship, index, isLast }) {
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

  const imageBlock = (
    <div className={`flex flex-col items-center md:items-start text-center md:text-left gap-4 ${isLeft ? "md:order-1" : "md:order-2"}`}>
      <h2 style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: '32px', fontWeight: 800,
        color: '#D71920', // Rotaract Red
        margin: 0,
        lineHeight: 1,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        {flagship.title}
      </h2>
      <div className="w-full sm:w-[360px] md:w-full" style={{
        background: 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(215,25,32,0.5)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: hovered ? '0 0 0 1px rgba(215,25,32,0.3), 0 20px 60px rgba(215,25,32,0.25)' : '0 8px 32px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        borderRadius: '12px',
        transform: hovered ? (isLeft ? 'translateX(-10px) scale(1.02)' : 'translateX(10px) scale(1.02)') : 'scale(1)',
        transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        position: 'relative',
      }}>
        <img
          src={flagship.currentEdition?.image || flagship.image}
          alt={flagship.title}
          onError={e => { e.target.src = `https://placehold.co/720x540/${flagship.color.replace('#', '')}/FFFFFF?text=${encodeURIComponent(flagship.title)}`; }}
          style={{ 
            width: '100%', height: 'auto', objectFit: 'contain', display: 'block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }}
        />

        <div style={{
          position: 'absolute', inset: 0,
          background: hovered
            ? 'linear-gradient(to bottom, rgba(215,25,32,0.1), rgba(255,215,0,0.05))'
            : 'transparent',
          transition: 'background 0.5s ease',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  );

  const contentBlock = (
    <div className={`flex flex-col items-center md:items-start text-center md:text-left justify-center ${isLeft ? "md:order-2 md:pl-10" : "md:order-1 md:pr-10"}`}>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '22px', fontStyle: 'italic',
        color: '#FFD700',
        margin: '0 0 16px',
        lineHeight: 1.4,
      }}>
        &ldquo;{flagship.currentEdition?.tagline || flagship.tagline}&rdquo;
      </p>
      
      <div style={{ width: '40px', height: '2px', background: 'rgba(215,25,32,0.8)', marginBottom: '24px' }} />
      
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '15px',
        color: 'rgba(255,255,255,0.8)',
        margin: '0 0 24px',
        lineHeight: 1.8,
      }}>
        {flagship.currentEdition?.description || flagship.description}
      </p>

      {/* Current Edition info */}
      {flagship.currentEdition && (
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderLeft: '3px solid #D71920',
          padding: '16px',
          marginBottom: '24px',
          borderRadius: '0 8px 8px 0',
        }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>
            Edition: <span style={{ color: '#FFD700' }}>{flagship.currentEdition.year}</span>
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            Date: {flagship.currentEdition.date}
          </p>
        </div>
      )}

      {/* Impact */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '8px',
      }}>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Impact</p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#ffffff', margin: 0, fontWeight: 500 }}>
          {flagship.currentEdition?.impact || flagship.impact}
        </p>
      </div>
      

    </div>
  );

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col gap-10 mb-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-5 items-center">
        {imageBlock}
        {contentBlock}
      </div>

      {!isLast && (
        <div style={{
          width: '100%',
          height: '1px',
          background: 'rgba(255,255,255,0.06)',
        }} />
      )}
    </div>
  );
}

// ── Flagships Page ────────────────────────────────────────────────
export default function Flagships() {
  const [searchParams] = useSearchParams();
  const tenureFromUrl = searchParams.get('tenure');
  
  const defaultTenure = '2026-27'; // Default to match other pages
  
  const [selectedTenure, setSelectedTenure] = useState(
    flagshipTenures.includes(tenureFromUrl) ? tenureFromUrl : defaultTenure
  );
  
  const [headIn, setHeadIn] = useState(false);

  useEffect(() => {
    document.title = `Flagships ${selectedTenure} | Rotaract GCT`;
  }, [selectedTenure]);

  useEffect(() => {
    if (tenureFromUrl && flagshipTenures.includes(tenureFromUrl)) setSelectedTenure(tenureFromUrl);
  }, [tenureFromUrl]);

  useEffect(() => {
    setHeadIn(false);
    const t2 = setTimeout(() => setHeadIn(true), 100);
    return () => clearTimeout(t2);
  }, [selectedTenure]);

  // Filter flagships by selected tenure
  const flagshipsList = getFlagshipsByTenure(selectedTenure);

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
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 24px 100px', position: 'relative', zIndex: 1 }}>

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
            Our Legacy
          </p>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(36px, 8vw, 64px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
            margin: '0 0 16px',
            background: 'linear-gradient(135deg, #ffffff 0%, #D71920 30%, #FFD700 70%, #ffffff 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'textShimmer 6s linear infinite',
          }}>
            FLAGSHIPS {shortTenure(selectedTenure)}
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px', color: 'rgba(255,255,255,0.7)',
            maxWidth: '600px', margin: '0 auto 24px',
          }}>
            Our most impactful, signature initiatives that define the spirit of Rotaract GCT.
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          }}>
            <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(to left, rgba(215,25,32,0.5), transparent)' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D71920', boxShadow: '0 0 10px rgba(215,25,32,0.6)' }} />
            <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(to right, rgba(215,25,32,0.5), transparent)' }} />
          </div>
        </div>

        {/* ── Flagship Rows ── */}
        {flagshipsList.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {flagshipsList.map((flagship, i) => (
              <FlagshipRow key={flagship.id} flagship={flagship} index={i} isLast={i === flagshipsList.length - 1} />
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
              background: 'rgba(215,25,32,0.1)',
              border: '1px solid rgba(215,25,32,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px',
            }}>🌟</div>
            <h3 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '20px', fontWeight: 700,
              color: '#ffffff', marginBottom: '8px',
            }}>No Flagships Listed</h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px', color: 'rgba(255,255,255,0.6)',
            }}>
              Flagship events for {selectedTenure} will be showcased here.
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
        @media (max-width: 768px) {
          /* Cleaned up redundant CSS since we use Tailwind */
        }
      `}</style>
    </div>
  );
}
