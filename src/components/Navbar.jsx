import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { boardTenures } from '../data/board';
import { bulletinTenures } from '../data/bulletins';
import { projectTenures } from '../data/projects';
import { awardTenures } from '../data/awards';
import { flagshipTenures } from '../data/flagships';
import { dppTenures } from '../data/dpp';

// Tenure display label e.g. "2026-27" → "Tenure 26-27"
const tenureLabel = (t) => {
  const [start, end] = t.split('-');
  return `Tenure ${start.slice(2)}-${end}`;
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [boardOpen, setBoardOpen] = useState(false);
  const [bulletinOpen, setBulletinOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [awardOpen, setAwardOpen] = useState(false);
  const [flagshipOpen, setFlagshipOpen] = useState(false);
  const [dppOpen, setDppOpen] = useState(false);
  const [mobileBoardOpen, setMobileBoardOpen] = useState(false);
  const [mobileBulletinOpen, setMobileBulletinOpen] = useState(false);
  const [mobileProjectOpen, setMobileProjectOpen] = useState(false);
  const [mobileAwardOpen, setMobileAwardOpen] = useState(false);
  const [mobileFlagshipOpen, setMobileFlagshipOpen] = useState(false);
  const [mobileDppOpen, setMobileDppOpen] = useState(false);
  const location = useLocation();
  const boardRef = useRef(null);
  const bulletinRef = useRef(null);
  const projectRef = useRef(null);
  const awardRef = useRef(null);
  const flagshipRef = useRef(null);
  const dppRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setBoardOpen(false);
    setBulletinOpen(false);
    setProjectOpen(false);
    setAwardOpen(false);
    setFlagshipOpen(false);
    setDppOpen(false);
    setMobileBoardOpen(false);
    setMobileBulletinOpen(false);
    setMobileProjectOpen(false);
    setMobileAwardOpen(false);
    setMobileFlagshipOpen(false);
    setMobileDppOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (boardRef.current && !boardRef.current.contains(e.target)) {
        setBoardOpen(false);
      }
      if (bulletinRef.current && !bulletinRef.current.contains(e.target)) {
        setBulletinOpen(false);
      }
      if (projectRef.current && !projectRef.current.contains(e.target)) {
        setProjectOpen(false);
      }
      if (awardRef.current && !awardRef.current.contains(e.target)) {
        setAwardOpen(false);
      }
      if (flagshipRef.current && !flagshipRef.current.contains(e.target)) {
        setFlagshipOpen(false);
      }
      if (dppRef.current && !dppRef.current.contains(e.target)) {
        setDppOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Separate links so Blogs and Contact can be rendered at the very end
  const startLinks = siteConfig.navLinks.filter(l => ['/', '/about'].includes(l.path));
  const endLinks = siteConfig.navLinks.filter(l => ['/blogs', '/past-presidents', '/contact'].includes(l.path));
  const isBoardActive = location.pathname === '/board' || location.pathname.startsWith('/board');
  const isBulletinActive = location.pathname === '/bulletins' || location.pathname.startsWith('/bulletins');
  const isProjectActive = location.pathname === '/projects' || location.pathname.startsWith('/projects');
  const isAwardActive = location.pathname === '/awards' || location.pathname.startsWith('/awards');
  const isFlagshipActive = location.pathname === '/flagships' || location.pathname.startsWith('/flagships');
  const isDppActive = location.pathname === '/dpp-theme' || location.pathname.startsWith('/dpp-theme');

  return (
    <>
      {/* ── HEADER ── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: '#ffffff',
          borderBottom: scrolled ? '1px solid #F1F1F1' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1344px',
            margin: '0 auto',
            padding: '0 32px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >

          {/* ── LOGO ── */}
          <Link
            to="/"
            aria-label="Rotaract GCT Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <img
              src="/images/Raclogo.png"
              alt="Rotaract Logo"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                display: 'block',
                flexShrink: 0,
                objectFit: 'cover'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingBottom: '2px' }}>
              <span
                style={{
                  color: '#1A1A1A',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: '16.5px',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                Rotaract Club of GCT
              </span>
              <span
                style={{
                  color: '#666666',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '13px',
                  letterSpacing: '0',
                  lineHeight: 1.1,
                }}
              >
                Coimbatore RI District 3206
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav
            aria-label="Main navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2px',
              flex: 1,
              justifyContent: 'center',
            }}
            className="desktop-nav"
          >
            {/* Regular nav links */}
            {startLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 10px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: isActive ? '#D71920' : '#1A1A1A',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                })}
                className="nav-link-item"
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '10px',
                        right: '10px',
                        height: '2px',
                        background: '#D71920',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.25s ease',
                        borderRadius: '1px',
                      }}
                      className="nav-underline"
                    />
                  </>
                )}
              </NavLink>
            ))}

            {/* ── BOARD MEGA DROPDOWN ── */}
            <div
              ref={boardRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setBoardOpen(true)}
              onMouseLeave={() => setBoardOpen(false)}
            >
              <button
                onClick={() => setBoardOpen(v => !v)}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 10px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isBoardActive ? '#D71920' : '#1A1A1A',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
                className="nav-link-item"
                aria-expanded={boardOpen}
                aria-haspopup="true"
              >
                Board
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.25s ease',
                    transform: boardOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
                {/* Active underline */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '10px',
                    right: '10px',
                    height: '2px',
                    background: '#D71920',
                    transform: isBoardActive || boardOpen ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.25s ease',
                    borderRadius: '1px',
                  }}
                />
              </button>

              {/* Dropdown panel */}
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '50%',
                  background: 'rgba(180, 10, 15, 0.95)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  padding: '12px',
                  minWidth: '200px',
                  opacity: boardOpen ? 1 : 0,
                  visibility: boardOpen ? 'visible' : 'hidden',
                  transform: boardOpen
                    ? 'translateX(-50%) translateY(0)'
                    : 'translateX(-50%) translateY(-8px)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {boardTenures.map((tenure) => (
                  <Link
                    key={tenure}
                    to={`/board?tenure=${tenure}`}
                    onClick={() => setBoardOpen(false)}
                    style={{
                      background: '#ffffff',
                      color: '#D71920',
                      padding: '12px 16px',
                      borderRadius: '999px',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '14px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#f8f8f8';
                      e.currentTarget.style.color = '#A50000';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.color = '#D71920';
                    }}
                  >
                    TENURE {tenure.slice(2)}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── BULLETINS MEGA DROPDOWN ── */}
            <div
              ref={bulletinRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setBulletinOpen(true)}
              onMouseLeave={() => setBulletinOpen(false)}
            >
              <button
                onClick={() => setBulletinOpen(v => !v)}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 10px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isBulletinActive ? '#D71920' : '#1A1A1A',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
                className="nav-link-item"
                aria-expanded={bulletinOpen}
                aria-haspopup="true"
              >
                Bulletins
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.25s ease',
                    transform: bulletinOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '10px',
                    right: '10px',
                    height: '2px',
                    background: '#D71920',
                    transform: isBulletinActive || bulletinOpen ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.25s ease',
                    borderRadius: '1px',
                  }}
                />
              </button>

              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '50%',
                  background: 'rgba(180, 10, 15, 0.95)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  padding: '12px',
                  minWidth: '200px',
                  opacity: bulletinOpen ? 1 : 0,
                  visibility: bulletinOpen ? 'visible' : 'hidden',
                  transform: bulletinOpen
                    ? 'translateX(-50%) translateY(0)'
                    : 'translateX(-50%) translateY(-8px)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {bulletinTenures.map((tenure) => (
                  <Link
                    key={tenure}
                    to={`/bulletins?tenure=${tenure}`}
                    onClick={() => setBulletinOpen(false)}
                    style={{
                      background: '#ffffff',
                      color: '#D71920',
                      padding: '12px 16px',
                      borderRadius: '999px',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '14px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#f8f8f8';
                      e.currentTarget.style.color = '#A50000';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.color = '#D71920';
                    }}
                  >
                    TENURE {tenure.slice(2)}
                  </Link>
                ))}
              </div>
            </div>
            {/* ── PROJECTS MEGA DROPDOWN ── */}
            <div
              ref={projectRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setProjectOpen(true)}
              onMouseLeave={() => setProjectOpen(false)}
            >
              <button
                onClick={() => setProjectOpen(v => !v)}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 10px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isProjectActive ? '#D71920' : '#1A1A1A',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
                className="nav-link-item"
                aria-expanded={projectOpen}
                aria-haspopup="true"
              >
                Projects
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.25s ease',
                    transform: projectOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '10px',
                    right: '10px',
                    height: '2px',
                    background: '#D71920',
                    transform: isProjectActive || projectOpen ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.25s ease',
                    borderRadius: '1px',
                  }}
                />
              </button>

              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '50%',
                  background: 'rgba(180, 10, 15, 0.95)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  padding: '12px',
                  minWidth: '200px',
                  opacity: projectOpen ? 1 : 0,
                  visibility: projectOpen ? 'visible' : 'hidden',
                  transform: projectOpen
                    ? 'translateX(-50%) translateY(0)'
                    : 'translateX(-50%) translateY(-8px)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {projectTenures.map((tenure) => (
                  <Link
                    key={tenure}
                    to={`/projects?tenure=${tenure}`}
                    onClick={() => setProjectOpen(false)}
                    style={{
                      background: '#ffffff',
                      color: '#D71920',
                      padding: '12px 16px',
                      borderRadius: '999px',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '14px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#f8f8f8';
                      e.currentTarget.style.color = '#A50000';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.color = '#D71920';
                    }}
                  >
                    TENURE {tenure.slice(2)}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── FLAGSHIPS MEGA DROPDOWN ── */}
            <div
              ref={flagshipRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setFlagshipOpen(true)}
              onMouseLeave={() => setFlagshipOpen(false)}
            >
              <button
                onClick={() => setFlagshipOpen(v => !v)}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 10px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isFlagshipActive ? '#D71920' : '#1A1A1A',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
                className="nav-link-item"
                aria-expanded={flagshipOpen}
                aria-haspopup="true"
              >
                Flagships
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.25s ease',
                    transform: flagshipOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '10px',
                    right: '10px',
                    height: '2px',
                    background: '#D71920',
                    transform: isFlagshipActive || flagshipOpen ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.25s ease',
                    borderRadius: '1px',
                  }}
                />
              </button>

              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '50%',
                  background: 'rgba(180, 10, 15, 0.95)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  padding: '12px',
                  minWidth: '200px',
                  opacity: flagshipOpen ? 1 : 0,
                  visibility: flagshipOpen ? 'visible' : 'hidden',
                  transform: flagshipOpen
                    ? 'translateX(-50%) translateY(0)'
                    : 'translateX(-50%) translateY(-8px)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {flagshipTenures.map((tenure) => (
                  <Link
                    key={tenure}
                    to={`/flagships?tenure=${tenure}`}
                    onClick={() => setFlagshipOpen(false)}
                    style={{
                      background: '#ffffff',
                      color: '#D71920',
                      padding: '12px 16px',
                      borderRadius: '999px',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '14px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#f8f8f8';
                      e.currentTarget.style.color = '#A50000';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.color = '#D71920';
                    }}
                  >
                    TENURE {tenure.slice(2)}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── DPP THEME MEGA DROPDOWN ── */}
            <div
              ref={dppRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setDppOpen(true)}
              onMouseLeave={() => setDppOpen(false)}
            >
              <button
                onClick={() => setDppOpen(v => !v)}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 10px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isDppActive ? '#D71920' : '#1A1A1A',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
                className="nav-link-item"
                aria-expanded={dppOpen}
                aria-haspopup="true"
              >
                DPP Theme
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.25s ease',
                    transform: dppOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '10px',
                    right: '10px',
                    height: '2px',
                    background: '#D71920',
                    transform: isDppActive || dppOpen ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.25s ease',
                    borderRadius: '1px',
                  }}
                />
              </button>

              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '50%',
                  background: 'rgba(180, 10, 15, 0.95)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  padding: '12px',
                  minWidth: '200px',
                  opacity: dppOpen ? 1 : 0,
                  visibility: dppOpen ? 'visible' : 'hidden',
                  transform: dppOpen
                    ? 'translateX(-50%) translateY(0)'
                    : 'translateX(-50%) translateY(-8px)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {dppTenures.map((tenure) => (
                  <Link
                    key={tenure}
                    to={`/dpp-theme?tenure=${tenure}`}
                    onClick={() => setDppOpen(false)}
                    style={{
                      background: '#ffffff',
                      color: '#D71920',
                      padding: '12px 16px',
                      borderRadius: '999px',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '14px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#f8f8f8';
                      e.currentTarget.style.color = '#A50000';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.color = '#D71920';
                    }}
                  >
                    TENURE {tenure.slice(2)}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── AWARDS MEGA DROPDOWN ── */}
            <div
              ref={awardRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setAwardOpen(true)}
              onMouseLeave={() => setAwardOpen(false)}
            >
              <button
                onClick={() => setAwardOpen(v => !v)}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 10px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isAwardActive ? '#D71920' : '#1A1A1A',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
                className="nav-link-item"
                aria-expanded={awardOpen}
                aria-haspopup="true"
              >
                Awards
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.25s ease',
                    transform: awardOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '10px',
                    right: '10px',
                    height: '2px',
                    background: '#D71920',
                    transform: isAwardActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.25s ease',
                    borderRadius: '1px',
                  }}
                  className="nav-underline"
                />
              </button>

              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  background: 'rgba(215, 25, 32, 0.95)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  padding: '12px',
                  minWidth: '200px',
                  opacity: awardOpen ? 1 : 0,
                  visibility: awardOpen ? 'visible' : 'hidden',
                  transform: awardOpen
                    ? 'translateX(-50%) translateY(0)'
                    : 'translateX(-50%) translateY(-8px)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {awardTenures.map((tenure) => (
                  <Link
                    key={tenure}
                    to={`/awards?tenure=${tenure}`}
                    onClick={() => setAwardOpen(false)}
                    style={{
                      background: '#ffffff',
                      color: '#D71920',
                      padding: '12px 16px',
                      borderRadius: '999px',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '14px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#f8f8f8';
                      e.currentTarget.style.color = '#A50000';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.color = '#D71920';
                    }}
                  >
                    TENURE {tenure.slice(2)}
                  </Link>
                ))}
              </div>
            </div>

            {/* End Links (Blogs & Contact) */}
            {endLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 10px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: isActive ? '#D71920' : '#1A1A1A',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                })}
                className="nav-link-item"
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '10px',
                        right: '10px',
                        height: '2px',
                        background: '#D71920',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.25s ease',
                        borderRadius: '1px',
                      }}
                      className="nav-underline"
                    />
                  </>
                )}
              </NavLink>
            ))}

          </nav>

          {/* ── RIGHT SIDE: HAMBURGER ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0,
            }}
          >
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="hamburger-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                background: 'transparent',
                border: '1px solid #F1F1F1',
                cursor: 'pointer',
                color: '#1A1A1A',
                flexShrink: 0,
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#D71920'; e.currentTarget.style.color = '#D71920'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#F1F1F1'; e.currentTarget.style.color = '#1A1A1A'; }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
          .hamburger-btn { display: none !important; }
        }
        .nav-link-item:hover { color: #D71920 !important; }
        .nav-link-item:hover .nav-underline { transform: scaleX(1) !important; }
      `}</style>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 45,
          width: '280px',
          background: '#fff',
          boxShadow: '-4px 0 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #F1F1F1',
            minHeight: '72px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src="/images/Raclogo.png"
              alt="Rotaract Logo"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'block',
                flexShrink: 0,
                objectFit: 'cover'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <div style={{ color: '#1A1A1A', fontWeight: 800, fontSize: '12px', letterSpacing: '-0.02em', fontFamily: "'Inter', sans-serif" }}>Rotaract Club of GCT</div>
              <div style={{ color: '#666', fontWeight: 500, fontSize: '9px', letterSpacing: '0', fontFamily: "'Inter', sans-serif" }}>District 3201 &middot; Coimbatore</div>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{
              width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#F8F8F8', border: 'none', cursor: 'pointer', color: '#666', flexShrink: 0,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav
          aria-label="Mobile navigation"
          style={{ flex: 1, overflowY: 'auto', paddingTop: '8px', paddingBottom: '8px' }}
        >
          {/* Regular links */}
          {startLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 24px',
                textDecoration: 'none',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: isActive ? '#D71920' : '#1A1A1A',
                background: isActive ? '#FFF0F0' : 'transparent',
                borderLeft: isActive ? '3px solid #D71920' : '3px solid transparent',
                transition: 'all 0.15s ease',
              })}
            >
              {link.name}
              {location.pathname === link.path && (
                <span style={{ width: '6px', height: '6px', background: '#D71920', borderRadius: '50%', flexShrink: 0 }} />
              )}
            </NavLink>
          ))}

          {/* Board section — tenure list */}
          <div style={{ padding: '8px 0' }}>
            <button
              onClick={() => setMobileBoardOpen(v => !v)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 24px', background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1A1A1A'
              }}
            >
              Board
              <ChevronDown size={16} style={{ transition: 'transform 0.3s ease', transform: mobileBoardOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            <div style={{ overflow: 'hidden', transition: 'max-height 0.3s ease', maxHeight: mobileBoardOpen ? '1000px' : '0' }}>
              {boardTenures.map((tenure, idx) => {
                const isLatest = idx === 0;
                return (
                  <Link
                    key={tenure}
                    to={`/board?tenure=${tenure}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 24px 12px 40px',
                      textDecoration: 'none',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      borderLeft: '3px solid transparent',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{tenureLabel(tenure)}</span>
                    {isLatest && (
                      <span style={{
                        background: '#D71920', color: '#ffffff',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '8px', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        padding: '2px 8px', borderRadius: '999px',
                      }}>
                        Current
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* DPP Theme section — tenure list */}
          <div style={{ padding: '8px 0', borderTop: '1px solid #F1F1F1' }}>
            <button
              onClick={() => setMobileDppOpen(v => !v)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 24px', background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1A1A1A'
              }}
            >
              DPP Theme
              <ChevronDown size={16} style={{ transition: 'transform 0.3s ease', transform: mobileDppOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            <div style={{ overflow: 'hidden', transition: 'max-height 0.3s ease', maxHeight: mobileDppOpen ? '1000px' : '0' }}>
              {dppTenures.map((tenure, idx) => {
                const isLatest = idx === 0;
                return (
                  <Link
                    key={tenure}
                    to={`/dpp-theme?tenure=${tenure}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 24px 12px 40px',
                      textDecoration: 'none',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      borderLeft: '3px solid transparent',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{tenureLabel(tenure)}</span>
                    {isLatest && (
                      <span style={{
                        background: '#D71920', color: '#ffffff',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '8px', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        padding: '2px 8px', borderRadius: '999px',
                      }}>
                        Current
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bulletins section — tenure list */}
          <div style={{ padding: '8px 0', borderTop: '1px solid #F1F1F1' }}>
            <button
              onClick={() => setMobileBulletinOpen(v => !v)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 24px', background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1A1A1A'
              }}
            >
              Bulletins
              <ChevronDown size={16} style={{ transition: 'transform 0.3s ease', transform: mobileBulletinOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            <div style={{ overflow: 'hidden', transition: 'max-height 0.3s ease', maxHeight: mobileBulletinOpen ? '1000px' : '0' }}>
              {bulletinTenures.map((tenure, idx) => {
                const isLatest = idx === 0;
                return (
                  <Link
                    key={tenure}
                    to={`/bulletins?tenure=${tenure}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 24px 12px 40px',
                      textDecoration: 'none',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      borderLeft: '3px solid transparent',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{tenureLabel(tenure)}</span>
                    {isLatest && (
                      <span style={{
                        background: '#D71920', color: '#ffffff',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '8px', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        padding: '2px 8px', borderRadius: '999px',
                      }}>
                        Current
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Projects section — tenure list */}
          <div style={{ padding: '8px 0', borderTop: '1px solid #F1F1F1' }}>
            <button
              onClick={() => setMobileProjectOpen(v => !v)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 24px', background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1A1A1A'
              }}
            >
              Projects
              <ChevronDown size={16} style={{ transition: 'transform 0.3s ease', transform: mobileProjectOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            <div style={{ overflow: 'hidden', transition: 'max-height 0.3s ease', maxHeight: mobileProjectOpen ? '1000px' : '0' }}>
              {projectTenures.map((tenure, idx) => {
                const isLatest = idx === 0;
                return (
                  <Link
                    key={tenure}
                    to={`/projects?tenure=${tenure}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 24px 12px 40px',
                      textDecoration: 'none',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      borderLeft: '3px solid transparent',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{tenureLabel(tenure)}</span>
                    {isLatest && (
                      <span style={{
                        background: '#D71920', color: '#ffffff',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '8px', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        padding: '2px 8px', borderRadius: '999px',
                      }}>
                        Current
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Flagships section — tenure list */}
          <div style={{ padding: '8px 0', borderTop: '1px solid #F1F1F1' }}>
            <button
              onClick={() => setMobileFlagshipOpen(v => !v)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 24px', background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1A1A1A'
              }}
            >
              Flagships
              <ChevronDown size={16} style={{ transition: 'transform 0.3s ease', transform: mobileFlagshipOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            <div style={{ overflow: 'hidden', transition: 'max-height 0.3s ease', maxHeight: mobileFlagshipOpen ? '1000px' : '0' }}>
              {flagshipTenures.map((tenure, idx) => {
                const isLatest = idx === 0;
                return (
                  <Link
                    key={tenure}
                    to={`/flagships?tenure=${tenure}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 24px 12px 40px',
                      textDecoration: 'none',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      borderLeft: '3px solid transparent',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{tenureLabel(tenure)}</span>
                    {isLatest && (
                      <span style={{
                        background: '#D71920', color: '#ffffff',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '8px', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        padding: '2px 8px', borderRadius: '999px',
                      }}>
                        Current
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Awards section — tenure list */}
          <div style={{ padding: '8px 0', borderTop: '1px solid #F1F1F1' }}>
            <button
              onClick={() => setMobileAwardOpen(v => !v)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 24px', background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1A1A1A'
              }}
            >
              Awards
              <ChevronDown size={16} style={{ transition: 'transform 0.3s ease', transform: mobileAwardOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            <div style={{ overflow: 'hidden', transition: 'max-height 0.3s ease', maxHeight: mobileAwardOpen ? '1000px' : '0' }}>
              {awardTenures.map((tenure, idx) => {
                const isLatest = idx === 0;
                return (
                  <Link
                    key={tenure}
                    to={`/awards?tenure=${tenure}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 24px 12px 40px',
                      textDecoration: 'none',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      borderLeft: '3px solid transparent',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{tenureLabel(tenure)}</span>
                    {isLatest && (
                      <span style={{
                        background: '#D71920', color: '#ffffff',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '8px', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        padding: '2px 8px', borderRadius: '999px',
                      }}>
                        Current
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* End Links (Blogs & Contact) */}
          <div style={{ padding: '8px 0', borderTop: '1px solid #F1F1F1' }}>
            {endLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 24px',
                  textDecoration: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: isActive ? '#D71920' : '#1A1A1A',
                  background: isActive ? '#FFF0F0' : 'transparent',
                  borderLeft: isActive ? '3px solid #D71920' : '3px solid transparent',
                  transition: 'all 0.15s ease',
                })}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span style={{ width: '6px', height: '6px', background: '#D71920', borderRadius: '50%', flexShrink: 0 }} />
                )}
              </NavLink>
            ))}
          </div>
        </nav>
        {/* Drawer footer */}
        <div
          style={{
            padding: '20px',
            borderTop: '1px solid #F1F1F1',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >

          <p
            style={{
              textAlign: 'center',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#999',
            }}
          >
            GROW • CULTIVATE • TRANSMUTE
          </p>
        </div>
      </div>

      {/* ── SPACER ── */}
      <div style={{ height: '72px' }} />
    </>
  );
}
