import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { staffCoordinator, boardTenures, getBoardByTenure } from '../data/board';

const shortTenure = (t) => {
  const [start, end] = t.split('-');
  return `${start.slice(2)}-${end}`;
};

const placeholderImg = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=D71920&color=FFFFFF&bold=true&size=400`;

// ── Animated background orb ──────────────────────────────────
function Orb({ style }) {
  return <div style={{ position: 'fixed', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0, ...style }} />;
}

// ── Member Row (Alternating Layout) ──────────────────────────
function MemberRow({ member, index, isLast }) {
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
          src={member.image}
          alt={member.name}
          onError={e => { e.target.src = placeholderImg(member.name); }}
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
      }}>{member.name}</p>
      
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
          {member.position}
        </span>
      </div>

      {member.email && (
        <a
          href={`mailto:${member.email}`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: hovered ? '#FFD700' : 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
        >
          {member.email}
        </a>
      )}
    </div>
  );

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="board-member-row flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-0"
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

// ── Board Page ────────────────────────────────────────────────
export default function Board() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tenureFromUrl = searchParams.get('tenure');
  const [selectedTenure, setSelectedTenure] = useState(
    boardTenures.includes(tenureFromUrl) ? tenureFromUrl : boardTenures[0]
  );
  const [coordIn, setCoordIn] = useState(false);
  const [headIn, setHeadIn] = useState(false);

  useEffect(() => {
    document.title = `Board ${selectedTenure} | Rotaract GCT`;
  }, [selectedTenure]);

  useEffect(() => {
    if (tenureFromUrl && boardTenures.includes(tenureFromUrl)) setSelectedTenure(tenureFromUrl);
  }, [tenureFromUrl]);

  useEffect(() => {
    setCoordIn(false); setHeadIn(false);
    const t1 = setTimeout(() => setCoordIn(true), 100);
    const t2 = setTimeout(() => setHeadIn(true), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [selectedTenure]);

  const members = getBoardByTenure(selectedTenure);

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

        {/* ── Staff Coordinator ── */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          marginBottom: '80px',
          opacity: coordIn ? 1 : 0,
          transform: coordIn ? 'translateY(0)' : 'translateY(-30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(215,25,32,0.2)',
            borderRadius: '24px',
            padding: '40px 48px',
            boxShadow: '0 0 60px rgba(215,25,32,0.1), inset 0 1px 0 rgba(255,255,255,0.04)',
            maxWidth: '360px',
            width: '100%',
          }}>
            {/* Glow ring */}
            <div style={{ position: 'relative' }}>
              <div className="coord-glow" style={{
                position: 'absolute', inset: '-14px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #D71920, #FFD700, #A50000, #D71920)',
                opacity: 0.6,
              }} />
              <div style={{
                position: 'absolute', inset: '-10px',
                borderRadius: '50%',
                background: '#0D0505',
              }} />
              <div style={{
                width: '140px', height: '140px',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative', zIndex: 1,
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                border: '2px solid rgba(255,215,0,0.2)'
              }}>
                <img
                  src={staffCoordinator.image}
                  alt={staffCoordinator.name}
                  onError={e => { e.target.src = placeholderImg(staffCoordinator.name); }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{
                display: 'inline-block',
                background: 'rgba(255,215,0,0.1)',
                border: '1px solid rgba(255,215,0,0.3)',
                color: '#FFD700',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '9px', fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                padding: '4px 14px', borderRadius: '999px',
                marginBottom: '12px',
              }}>
                Staff Coordinator
              </span>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '17px', fontWeight: 700,
                color: '#ffffff', margin: '0 0 4px',
              }}>{staffCoordinator.name}</p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                margin: 0,
              }}>{staffCoordinator.institution}</p>
            </div>
          </div>
        </div>

        {/* ── Team Heading ── */}
        <div style={{
          textAlign: 'center', marginBottom: '40px',
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
            Meet the leaders
          </p>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(44px, 10vw, 84px)',
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
            TEAM {shortTenure(selectedTenure)}
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
        {members.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {members.map((member, i) => (
              <MemberRow key={member.id} member={member} index={i} isLast={i === members.length - 1} />
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
            }}>👥</div>
            <h3 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '20px', fontWeight: 700,
              color: '#ffffff', marginBottom: '8px',
            }}>Board Coming Soon</h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px', color: 'rgba(255,255,255,0.4)',
            }}>
              Board members for {selectedTenure} will be announced soon.
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .coord-glow {
          animation: spin 6s linear infinite;
        }
        @keyframes textShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @media (max-width: 580px) {
          .board-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
