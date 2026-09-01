import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, HeartHandshake, Users, Globe } from 'lucide-react';
import { boardMembers } from '../data/board';

const serviceAvenues = [
  {
    title: 'Professional Service',
    desc: 'An Avenue where we focus on acquiring new knowledge and enhancing professional skills.',
    icon: Briefcase,
  },
  {
    title: 'Community Service',
    desc: 'An Avenue aiming on contributing to the community and being a supportive force in its progress to the next level.',
    icon: HeartHandshake,
  },
  {
    title: 'Club Service',
    desc: 'This Avenue focuses on the internal operations and activities of the club, with the goal of fostering fellowship among fellow Rotaractors.',
    icon: Users,
  },
  {
    title: 'International Service',
    desc: 'This Avenue focuses on international humanitarian projects and collaborations to collectively bring about positive change.',
    icon: Globe,
  }
];

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  // Extract number and surrounding text
  const numMatch = value.match(/(\d+)/);
  const target = numMatch ? parseInt(numMatch[1], 10) : 0;
  const prefix = value.substring(0, numMatch ? numMatch.index : 0);
  const suffix = numMatch ? value.substring(numMatch.index + numMatch[1].length) : value;

  useEffect(() => {
    const el = ref.current;
    if (!el || target === 0) return;
    
    let observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let currentCount = 0;
        const duration = 2000; // 2 seconds
        
        // Calculate the increment step to match duration
        const steps = 40; // 40 frames total
        const increment = Math.max(1, Math.floor(target / steps));
        const stepTime = Math.floor(duration / steps);
        
        const timer = setInterval(() => {
          currentCount += increment;
          if (currentCount >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(currentCount);
          }
        }, stepTime);
        
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{target > 0 ? count : value}{suffix}
    </span>
  );
}

export default function Home() {
  const president = boardMembers.find(m => m.position === 'President' && m.tenure === '2026-27');
  const secretary = boardMembers.find(m => m.position === 'Secretary' && m.tenure === '2026-27');

  useEffect(() => {
    document.title = 'Rotaract Club of GCT Coimbatore';
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-enter">

      {/* Wrapper for full-page background */}
      <div className="home-bg-wrapper" style={{
        backgroundColor: '#0D0505',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("/images/gctbg1.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}>

        {/* ════════════════════════════════════════
            TOP LOGO BANNER
        ════════════════════════════════════════ */}
        <div 
          className="px-4 py-8 md:px-12 md:pb-8 lg:pt-24 bg-transparent"
        >
        <div 
          className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-10 text-center"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >

          {/* ── Club logo (left) ── */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
           
          </div>

          {/* ── Centre title ── */}
          <div style={{ textAlign: 'center',marginTop: '20px' }}>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(18px, 2.8vw, 30px)',
              color: '#ffffff',
              lineHeight: 1.3,
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              ROTARACT CLUB OF GCT
            </h1>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(18px, 2.8vw, 30px)',
              color: '#FF4444',
              lineHeight: 1.3,
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              COIMBATORE
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#cccccc',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '6px 0 0',
            }}>
              Rotary International District 3206
            </p>
          </div>

         

        </div>
      </div>

        {/* ════════════════════════════════════════
            HERO SECTION
        ════════════════════════════════════════ */}
        <section 
          className="responsive-hero overflow-hidden"
          style={{
            minHeight: 'calc(100vh - 72px - 121px)',
            display: 'flex',
            alignItems: 'center',
            padding: '72px 0 64px',
          }}
        >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
          }}
          className="px-4 md:px-8 flex flex-col items-center text-center w-full"
        >

          {/* ── Text content ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Pill badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '999px',
              padding: '8px 20px',
              marginBottom: '32px',
              fontSize: '13px',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.02em',
              backdropFilter: 'blur(10px)',
            }}>
              <span style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: '#FF4444',
                flexShrink: 0,
              }} />
              Grow
              <span style={{
                width: '4px', height: '4px',
                borderRadius: '50%',
                background: '#FF4444',
                flexShrink: 0,
              }} />
              Cultivate
              <span style={{
                width: '4px', height: '4px',
                borderRadius: '50%',
                background: '#FF4444',
                flexShrink: 0,
              }} />
              Transmute
            </div>

            {/* Main heading */}
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(34px, 4.5vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.12,
              color: '#ffffff',
              marginBottom: '24px',
              letterSpacing: '-0.01em',
            }}>
              Engineers by profession,<br />
              <span style={{ color: '#FF4444' }}>Rotaractors</span> by action.
            </h2>

            {/* Description */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              lineHeight: 1.75,
              color: '#dddddd',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px auto',
            }}>
              Empowering youth and transforming community through purposeful
              service since 2012 — one project, one drive, one classroom at a time.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '52px' }}>
              <Link
                to="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#D71920',
                  color: '#fff',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '13px 26px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  transition: 'background 0.25s, transform 0.2s, box-shadow 0.25s',
                  boxShadow: '0 6px 24px rgba(215,25,32,0.28)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#A50000';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 32px rgba(215,25,32,0.38)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#D71920';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(215,25,32,0.28)';
                }}
              >
                Explore Our Journey <ArrowRight size={15} />
              </Link>

              <Link
                to="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'transparent',
                  color: '#ffffff',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '13px 26px',
                  borderRadius: '999px',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#FF4444';
                  e.currentTarget.style.color = '#FF4444';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Learn More
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>

      {/* ════════════════════════════════════════
          STATS SECTION
      ════════════════════════════════════════ */}
      <section 
        className="responsive-section"
        style={{ background: '#ffffff', padding: '100px 32px' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h3 className="reveal" style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: '14px',
              color: '#D71920',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Impact by the Numbers
            </h3>
            <h2 className="reveal reveal-delay-1" style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(32px, 4vw, 44px)',
              fontWeight: 800,
              color: '#111111',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}>
              A Legacy of Meaningful Service
            </h2>
            <p className="reveal reveal-delay-2" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              color: '#666666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}>
          
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
          }}>
          {[
            { value: '10+',   label: 'Years of Service' },
            { value: '25+',   label: 'Active Members' },
            { value: '3206', label: 'Rotary District' },
            { value: '500+',    label: 'Service projects' },
          ].map((stat, i) => (
            <div key={stat.value} className={`reveal reveal-delay-${i + 1}`} style={{ 
              background: '#ffffff',
              borderRadius: '24px',
              border: '1.5px solid #EBEBEB',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
              padding: '40px 24px',
              textAlign: 'center',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(215, 25, 32, 0.1)';
              e.currentTarget.style.borderColor = '#D71920';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)';
              e.currentTarget.style.borderColor = '#EBEBEB';
            }}
            >
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                fontSize: '48px',
                color: '#D71920',
                lineHeight: 1,
                marginBottom: '12px',
              }}>
                <AnimatedCounter value={stat.value} />
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#666666',
                fontWeight: 500,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          LEADERSHIP SECTION
      ════════════════════════════════════════ */}
      <section 
        className="responsive-section"
        style={{ background: '#FAFAFA', padding: '100px 32px', borderTop: '1px solid #EBEBEB' }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h3 className="reveal" style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: '14px',
              color: '#D71920',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Club Leadership
            </h3>
            <h2 className="reveal reveal-delay-1" style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(32px, 4vw, 44px)',
              fontWeight: 800,
              color: '#111111',
              letterSpacing: '-0.02em',
            }}>
              Guiding the Vision
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {[president, secretary].map((leader, i) => leader && (
              <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
                background: '#ffffff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(215, 25, 32, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)';
              }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/4',
                  overflow: 'hidden',
                  background: '#f5f5f5',
                }}>
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '60%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    right: '24px',
                  }}>
                    <h3 style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '28px',
                      fontWeight: 800,
                      color: '#ffffff',
                      margin: 0,
                      lineHeight: 1.2,
                    }}>
                      {leader.name}
                    </h3>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#FFD700',
                      margin: '4px 0 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      {leader.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SERVICES SECTION
      ════════════════════════════════════════ */}
      <section 
        className="responsive-section"
        style={{ background: '#ffffff', padding: '100px 32px', position: 'relative' }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h3 className="reveal" style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: '14px',
            color: '#D71920',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Services
          </h3>
          <h2 className="reveal reveal-delay-1" style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(32px, 4vw, 44px)',
            fontWeight: 800,
            color: '#111111',
            marginBottom: '64px',
            letterSpacing: '-0.02em',
          }}>
            Our Avenues of Service
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px',
          }}>
            {serviceAvenues.map((svc, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${(i % 4) + 1}`}
                style={{
                  background: 'linear-gradient(145deg, #A50000 0%, #D71920 100%)',
                  borderRadius: '24px',
                  padding: '48px 32px',
                  color: '#ffffffff',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(215, 25, 32, 0.15)',
                  borderTop: '6px solid #FFD700', // Gold accent replacing the top rod
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(215, 25, 32, 0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(215, 25, 32, 0.15)';
                }}
              >
                {/* Subtle background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  opacity: 0.1,
                  transform: 'scale(2.5)',
                  pointerEvents: 'none',
                }}>
                  <svc.icon size={100} />
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '16px',
                  borderRadius: '50%',
                  marginBottom: '24px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}>
                  <svc.icon size={28} color="#ffffff" strokeWidth={2.5} />
                </div>
                
                <h4 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '16px',
                  lineHeight: 1.3,
                  letterSpacing: '0.01em',
                }}>
                  {svc.title}
                </h4>
                
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  lineHeight: 1.8,
                  color: '#ffffff',
                  opacity: 0.9,
                  margin: 0,
                }}>
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PRAYER SECTION
      ════════════════════════════════════════ */}
      <section 
        className="responsive-section"
        style={{ 
          background: '#FAFAFA', 
          padding: '100px 32px',
          borderTop: '1px solid rgba(0,0,0,0.04)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
        }}>
          {/* Decorative Quote Mark */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '140px',
            lineHeight: 1,
            color: '#D71920',
            opacity: 0.05,
            fontFamily: 'serif',
            pointerEvents: 'none',
            zIndex: 0,
          }}>
            "
          </div>

          <h3 className="reveal" style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: '15px',
            color: '#D71920',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '32px',
            position: 'relative',
            zIndex: 1,
          }}>
            The Rotaract Prayer
          </h3>
          
          <p className="reveal reveal-delay-1" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(18px, 2.2vw, 24px)',
            lineHeight: 1.8,
            color: '#333333',
            fontStyle: 'italic',
            fontWeight: 400,
            margin: 0,
            position: 'relative',
            zIndex: 1,
          }}>
            Oh God, our Almighty Father and Ruler of the Universe, we thank Thee for the inspiration Thou hast given us for the Rotaract movement, based upon Fellowship through Service. We humbly beg Thee to continue Thy grace, to enable us to do our service — to ourselves, to our neighbours, and to the honour and glory of Thy holy name.
          </p>
          
          {/* Small decorative line */}
          <div style={{
            width: '60px',
            height: '3px',
            background: '#FFD700',
            margin: '40px auto 0',
            borderRadius: '2px',
          }} />
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOUR-WAY TEST SECTION
      ════════════════════════════════════════ */}
      <section 
        className="responsive-section"
        style={{ background: '#ffffff', padding: '100px 32px' }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h3 className="reveal" style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: '14px',
              color: '#D71920',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Core Values
            </h3>
            <h2 className="reveal reveal-delay-1" style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(32px, 4vw, 44px)',
              fontWeight: 800,
              color: '#111111',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}>
              The Four-Way Test
            </h2>
            <p className="reveal reveal-delay-2" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: '#555555',
              fontStyle: 'italic',
            }}>
              Of the things we think, say or do —
            </p>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
          }}>
            {/* Cards */}
            {[
              { num: '01', text: 'Is it the', highlight: 'truth', end: '?' },
              { num: '02', text: 'Is it', highlight: 'fair', end: 'to all concerned?' },
              { num: '03', text: 'Will it build', highlight: 'goodwill', end: 'and better friendships?' },
              { num: '04', text: 'Will it be', highlight: 'beneficial', end: 'to all concerned?' }
            ].map((item, index) => (
              <div key={item.num} className={`reveal reveal-delay-${(index % 4) + 1}`} style={{
                background: '#FAFAFA',
                borderRadius: '24px',
                padding: '40px 32px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                {/* Big Background Number */}
                <div style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '80px',
                  fontWeight: 900,
                  color: '#D71920',
                  opacity: 0.05,
                  position: 'absolute',
                  top: '-10px',
                  right: '10px',
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}>
                  {item.num}
                </div>
                
                {/* Small Accent Number */}
                <div style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#D71920',
                  marginBottom: '24px',
                }}>
                  {item.num}
                </div>
                
                {/* Text Content */}
                <h4 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '20px',
                  fontWeight: 400,
                  color: '#555555',
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {item.text} <br/>
                  <span style={{ fontWeight: 800, color: '#111111', fontSize: '24px' }}>{item.highlight}</span> <br/>
                  {item.end}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keyframes + responsive */}
      <style>{`
        @keyframes heroRingSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .home-bg-wrapper {
          background-position: center top, center top !important;
        }
        @media (max-width: 768px) {
          .home-bg-wrapper {
            background-position: center top, 83% top !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            text-align: center;
          }
          .hero-grid p { margin-left: auto; margin-right: auto; }
          .stat-divider { display: none; }
          
          /* Responsive Padding for Sections */
          .responsive-section {
            padding: 64px 16px !important;
          }
          .responsive-hero {
            padding: 48px 0 !important;
          }
        }
        @media (max-width: 600px) {
          .logo-banner-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            text-align: center;
          }
          .logo-banner-grid > div { justify-content: center !important; }
        }
        
        /* Scroll Reveal Animations */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .reveal.reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }
        .reveal-delay-5 { transition-delay: 0.5s; }
      `}</style>

    </div>
  );
}
