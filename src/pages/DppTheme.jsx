import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { dppTenures, getDppThemeByTenure } from '../data/dpp';
import { Star } from 'lucide-react';

const tenureLabel = (t) => {
  const [start, end] = t.split('-');
  return `TENURE ${start.slice(2)}-${end}`;
};

function AcronymCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(215,25,32,0.5)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '32px 24px',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: hovered ? '0 20px 40px rgba(215,25,32,0.1)' : '0 4px 20px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered 
          ? 'linear-gradient(135deg, rgba(215,25,32,0.1) 0%, transparent 100%)' 
          : 'transparent',
        transition: 'background 0.4s ease',
        pointerEvents: 'none',
      }} />
      
      <div style={{
        width: '64px', height: '64px',
        background: hovered ? '#D71920' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hovered ? '#D71920' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '24px',
        transition: 'all 0.4s ease',
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '32px', fontWeight: 800,
          color: hovered ? '#ffffff' : '#D71920',
          lineHeight: 1,
        }}>
          {item.letter}
        </span>
      </div>

      <h3 style={{
        fontFamily: "'Inter', sans-serif", fontSize: '18px', fontWeight: 700,
        color: '#ffffff', marginBottom: '16px',
      }}>
        {item.title}
      </h3>

      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '14px',
        color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0,
      }}>
        {item.description}
      </p>
    </div>
  );
}

export default function DppTheme() {
  const [searchParams] = useSearchParams();
  const tenureFromUrl = searchParams.get('tenure');
  
  const defaultTenure = '2026-27';
  
  const [selectedTenure, setSelectedTenure] = useState(
    dppTenures.includes(tenureFromUrl) ? tenureFromUrl : defaultTenure
  );

  useEffect(() => {
    if (tenureFromUrl && dppTenures.includes(tenureFromUrl)) {
      setSelectedTenure(tenureFromUrl);
    }
  }, [tenureFromUrl]);

  useEffect(() => {
    document.title = `DPP Theme ${selectedTenure} | Rotaract GCT`;
  }, [selectedTenure]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const dppData = getDppThemeByTenure(selectedTenure);

  return (
    <div 
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: '#0D0505',
        color: '#ffffff',
        padding: '24px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Background Orbs */}
      <div style={{
        position: 'absolute', top: mousePos.y - 400, left: mousePos.x - 400,
        width: '800px', height: '800px',
        background: 'radial-gradient(circle, rgba(215,25,32,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', transition: 'top 0.8s ease-out, left 0.8s ease-out', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', top: '10%', right: '5%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(255,215,0,0.03) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0
      }} />

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(215,25,32,0.1)', border: '1px solid rgba(215,25,32,0.3)',
            padding: '6px 16px', borderRadius: '999px', marginBottom: '24px'
          }}>
            <Star size={14} color="#D71920" />
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D71920'
            }}>
              DISTRICT PRIORITY PROJECT
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 800, color: '#ffffff',
            lineHeight: 1.1, margin: '0 0 24px',
            letterSpacing: '-0.02em',
          }}>
            <span style={{ color: '#D71920' }}>DPP</span> THEME
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '18px',
            color: 'rgba(255,255,255,0.6)', maxWidth: '600px',
            margin: '0 auto', lineHeight: 1.6,
          }}>
            The overarching theme and vision for the {tenureLabel(selectedTenure)} Rotaract year.
          </p>
        </div>

        {/* Content */}
        {dppData ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {/* Main Description */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              padding: '40px',
              maxWidth: '800px',
              margin: '0 auto',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                background: 'linear-gradient(90deg, transparent, #D71920, transparent)',
              }} />
              
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '48px', fontWeight: 800,
                color: '#FFD700', margin: '0 0 24px',
                letterSpacing: '0.05em'
              }}>
                {dppData.theme}
              </h2>
              
              <div style={{ width: '60px', height: '2px', background: 'rgba(215,25,32,0.8)', margin: '0 auto 24px' }} />
              
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: '16px',
                color: 'rgba(255,255,255,0.8)', lineHeight: 1.8,
                margin: 0, whiteSpace: 'pre-wrap',
              }}>
                {dppData.description}
              </p>
            </div>

            {/* Acronym Grid */}
            {dppData.acronyms && dppData.acronyms.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                marginTop: '32px'
              }}>
                {dppData.acronyms.map((item, idx) => (
                  <AcronymCard key={idx} item={item} index={idx} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: '24px',
          }}>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '16px',
              color: 'rgba(255,255,255,0.4)', margin: 0,
            }}>
              No DPP Theme data documented yet for {tenureLabel(selectedTenure)}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
