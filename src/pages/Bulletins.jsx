import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { bulletinTenures, getBulletinsByTenure } from '../data/bulletins';

const shortTenure = (t) => {
  const [start, end] = t.split('-');
  return `${start.slice(2)}-${end}`;
};

// ── Animated background orb ──────────────────────────────────
function Orb({ style }) {
  return <div style={{ position: 'fixed', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0, ...style }} />;
}

// ── Bulletin Row (Alternating Layout) ──────────────────────────
function BulletinRow({ bulletin, index, isLast }) {
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

  const openBulletin = (e, url) => {
    e.preventDefault();
    if (url) window.open(url, '_blank');
  };

  const coverBlock = (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div 
        onClick={(e) => openBulletin(e, bulletin.links?.english)}
        style={{
        position: 'relative',
        width: '100%',
        maxWidth: '300px',
        height: 'auto',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(255,215,0,0.5)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: hovered ? '0 0 0 1px rgba(255,215,0,0.3), 0 20px 60px rgba(215,25,32,0.25)' : '0 8px 32px rgba(0,0,0,0.4)',
        transform: hovered ? (isLeft ? 'translateX(-10px) scale(1.02)' : 'translateX(10px) scale(1.02)') : 'scale(1)',
        transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        cursor: 'pointer',
      }}>
        <img
          src={bulletin.cover}
          alt={`${bulletin.month} Bulletin`}
          onError={e => { e.target.src = 'https://via.placeholder.com/300x400/D71920/FFFFFF?text=Bulletin+Cover'; }}
          style={{
            width: '100%', height: 'auto', objectFit: 'contain',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.6s ease',
            display: 'block',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered
            ? 'linear-gradient(to bottom, rgba(215,25,32,0.1), rgba(255,215,0,0.05))'
            : 'transparent',
          transition: 'background 0.5s ease',
        }} />
        
        {/* Play/Read Icon Overlay on Hover */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'rgba(215,25,32,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            border: '2px solid rgba(255,215,0,0.6)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  const titleContent = (
    <>
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: '12px', fontWeight: 700,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: '#FFD700', marginBottom: '8px',
      }}>{bulletin.year}</p>

      <h2 style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: '42px', fontWeight: 800,
        color: '#ffffff', margin: '0 0 12px',
        lineHeight: 1.1,
      }}>{bulletin.month}</h2>
      
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '16px',
        color: 'rgba(255,255,255,0.7)',
        margin: '0 0 32px',
        maxWidth: '300px',
      }}>{bulletin.title}</p>
    </>
  );

  const linksContent = (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {bulletin.links?.english && (
        <button
          onClick={(e) => openBulletin(e, bulletin.links.english)}
          className="bulletin-btn"
          style={{
            background: 'linear-gradient(135deg, #D71920, #A50000)',
            color: '#ffffff',
            border: 'none',
            padding: '12px 24px', borderRadius: '8px',
            fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 600,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 15px rgba(215,25,32,0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          Read in English
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </button>
      )}
      
      {bulletin.links?.tamil && (
        <button
          onClick={(e) => openBulletin(e, bulletin.links.tamil)}
          className="bulletin-btn-outline"
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '12px 24px', borderRadius: '8px',
            fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 600,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.3s ease',
          }}
        >
          Read in Tamil
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </button>
      )}
    </div>
  );

  const infoBlockDesktop = (
    <div className={`hidden md:flex flex-col justify-center items-center p-5 text-center ${isLeft ? 'md:order-2' : 'md:order-1'}`}
         style={{ transform: hovered ? (isLeft ? 'translateX(10px)' : 'translateX(-10px)') : 'translateX(0)', transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)' }}>
      {titleContent}
      {linksContent}
    </div>
  );

  const titleBlockMobile = (
    <div className="flex md:hidden flex-col justify-center items-center text-center p-5 pb-2 order-1">
      {titleContent}
    </div>
  );

  const linksBlockMobile = (
    <div className="flex md:hidden flex-col justify-center items-center p-5 pt-4 order-3">
      {linksContent}
    </div>
  );

  const coverBlockWrapper = (
    <div className={`order-2 ${isLeft ? 'md:order-1' : 'md:order-2'}`}>
      {coverBlock}
    </div>
  );

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bulletin-row flex flex-col gap-0 md:grid md:grid-cols-2"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)',
        alignItems: 'center',
        padding: '60px 0',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {infoBlockDesktop}
      {titleBlockMobile}
      {coverBlockWrapper}
      {linksBlockMobile}
    </div>
  );
}

// ── Bulletins Page ────────────────────────────────────────────────
export default function Bulletins() {
  const [searchParams] = useSearchParams();
  const tenureFromUrl = searchParams.get('tenure');
  const [selectedTenure, setSelectedTenure] = useState(
    bulletinTenures.includes(tenureFromUrl) ? tenureFromUrl : bulletinTenures[0]
  );
  const [headIn, setHeadIn] = useState(false);

  useEffect(() => {
    document.title = `Bulletins ${selectedTenure} | Rotaract GCT`;
  }, [selectedTenure]);

  useEffect(() => {
    if (tenureFromUrl && bulletinTenures.includes(tenureFromUrl)) setSelectedTenure(tenureFromUrl);
  }, [tenureFromUrl]);

  useEffect(() => {
    setHeadIn(false);
    const t2 = setTimeout(() => setHeadIn(true), 100);
    return () => clearTimeout(t2);
  }, [selectedTenure]);

  const bulletinsList = getBulletinsByTenure(selectedTenure);

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
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 24px 100px', position: 'relative', zIndex: 1 }}>

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
            Monthly Editions
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
            BULLETINS {shortTenure(selectedTenure)}
          </h1>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          }}>
            <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(to left, rgba(255,215,0,0.5), transparent)' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFD700', boxShadow: '0 0 10px rgba(255,215,0,0.6)' }} />
            <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(to right, rgba(255,215,0,0.5), transparent)' }} />
          </div>
        </div>

        {/* ── Bulletin Rows (Alternating Layout) ── */}
        {bulletinsList.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {bulletinsList.map((bulletin, i) => (
              <BulletinRow key={bulletin.id} bulletin={bulletin} index={i} isLast={i === bulletinsList.length - 1} />
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
              border: '1px solid rgba(215,25,32,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px',
            }}>📖</div>
            <h3 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '20px', fontWeight: 700,
              color: '#ffffff', marginBottom: '8px',
            }}>Bulletins Coming Soon</h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px', color: 'rgba(255,255,255,0.4)',
            }}>
              The monthly editions for {selectedTenure} will be published here.
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
        .bulletin-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(215,25,32,0.6) !important;
        }
        .bulletin-btn-outline:hover {
          background: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.4) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .page-enter > div:nth-of-type(2) > div > div.bulletin-row {
            padding: 40px 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
