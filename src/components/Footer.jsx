import { Link } from 'react-router-dom';
import { InstagramIcon, LinkedinIcon, YoutubeIcon, XIcon } from './BrandIcons';
import { siteConfig } from '../data/siteConfig';

// ── Footer ───────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer style={{ background: '#1C1C1C', color: '#fff' }}>

      {/* ── Main content ── */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '64px 32px 48px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '48px',
          alignItems: 'start',
        }}
          className="footer-grid"
        >

          {/* ── Brand column ── */}
          <div className="footer-brand">
            {/* Logo mark + name */}
            <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img 
                src="/images/Raclogo.png" 
                alt="Rotaract Logo" 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%',
                  display: 'block',
                  flexShrink: 0,
                  objectFit: 'cover'
                }} 
              />
              {/* Club name */}
              <span style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                color: '#ffffff',
                lineHeight: 1.2,
              }}>
                Rotaract Club of GCT
              </span>
            </div>

            {/* Tagline */}
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '13px',
              lineHeight: 1.7,
              fontFamily: "'Inter', sans-serif",
              marginBottom: '24px',
            }}>
              Engineers by profession, Rotaractors by action. Chartered October 5, 2012 — District 3206.
            </p>

            {/* Social icons */}
            <div className="footer-social" style={{ display: 'flex', gap: '10px' }}>
              {[
                { Icon: InstagramIcon, href: siteConfig.social.instagram, label: 'Instagram' },
                { Icon: LinkedinIcon,  href: siteConfig.social.linkedin,  label: 'LinkedIn' },
                { Icon: YoutubeIcon,   href: siteConfig.social.youtube,   label: 'YouTube' },
                { Icon: XIcon,         href: siteConfig.social.x,         label: 'X (Twitter)' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#D71920'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Affiliation ── */}
          <div className="footer-affiliation">
            <h3 style={{
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontFamily: "'Poppins', sans-serif",
            }}>
              Affiliation
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '13.5px',
              lineHeight: 1.7,
              fontFamily: "'Inter', sans-serif",
            }}>
              Parented by the Rotary Club of Coimbatore East. Hosted at Government College of Technology, Coimbatore.
            </p>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0 32px' }} />

      {/* ── Bottom bar ── */}
      <div className="footer-bottom" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.35)',
          fontSize: '12.5px',
          fontFamily: "'Inter', sans-serif",
          margin: 0,
        }}>
          © {new Date().getFullYear()} Rotaract Club of GCT Coimbatore. All rights reserved.
        </p>
        <p style={{
          color: 'rgba(255,255,255,0.35)',
          fontSize: '12.5px',
          fontFamily: "'Inter', sans-serif",
          margin: 0,
        }}>
          Proudly a part of Rotary International District 3206
        </p>
      </div>

      {/* ── Responsive grid styles ── */}
      <style>{`
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            text-align: center;
          }
          .footer-logo {
            justify-content: center !important;
          }
          .footer-social {
            justify-content: center !important;
          }
          .footer-bottom {
            justify-content: center !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
