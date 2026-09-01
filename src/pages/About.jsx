import { useEffect } from 'react';

const themes = [
  {
    title: 'Grow',
    number: '01',
    color: '#D71920',
    bgColor: '#fff5f5',
    quote: '"Every experience makes you grow."',
    desc: "Growth in all aspects, be it one person's or a community's or this universe's is what we need the most to survive the world that changes from time to time. Through the endeavors of Rotaract GCT, we aim to attain the utmost Growth for all the lives in their lifestyle, fundamental needs, skills, and happiness. Also, our efforts to the growth of others always surprises with our own Growth.",
    emoji: '🌱',
  },
  {
    title: 'Cultivate',
    number: '02',
    color: '#A50000',
    bgColor: '#1A1A1A',
    quote: '"Cultivate your present wisely and tirelessly, to combine your future with a pleasant future."',
    desc: "It is important to incubate goodness to cultivate greatness. We all know that small steps in the right direction are better than big steps in the wrong direction. We aim to take small steps each day through our activities to cultivate marvellous eminence.",
    emoji: '🌿',
  },
  {
    title: 'Transmute',
    number: '03',
    color: '#D71920',
    bgColor: '#fff5f5',
    quote: '"Thought, backed by strong desire has the tendency to transmute itself into its physical equivalent."',
    desc: "We dream to transmute the society into perfection. We dream to transmute the dullness into bliss. We dream to transmute ourselves into premium. We are sure that the growth we attain and the greatness we cultivate through effective Rotaraction will result in the ideal 'Transmute'.",
    emoji: '✨',
  }
];

const legacyPoints = [
  { year: '2012', text: "Rotaract Club of GCT Coimbatore, parented by the Rotary Club of Coimbatore East was chartered on 5th of October, 2012 with Rtr. PP. Naveen as our Charter President.", highlight: "Chartered!", accent: '#D71920', size: 'wide' },
  { year: '2012', text: "There begun our Rotaraction to human kind. We are engineers by profession and Rotaractors by action and that legacy continues till now, touching great heights.", highlight: null, accent: '#555', size: 'normal' },
  { year: '2016', text: "The club showed its comeback which sounded like that of the roar of a wounded lion with all courage and desire to serve mankind under the presidentship of Rtr. PP. Sriram Anax, in the Rotary Year 2016-2017.", highlight: "The Comeback!", accent: '#D71920', size: 'normal' },
  { year: '2016', text: "With this fierce initiation, we continued our journey of Rotaraction which had seen great heights as we moved along with years. Each year achievement and success was not less than the other one.", highlight: null, accent: '#555', size: 'normal' },
  { year: '2017', text: "As years grew, our Rotaraction grew more which led us to the success of bagging 'Outstanding Well-balanced Club' and 'Outstanding Scrapbook' for the Rotary Year 2016-2017.", highlight: "Award Winners!", accent: '#B8860B', size: 'normal' },
  { year: '2017', text: "The event 'Wall-E' – a big initiative to paint the walls along the Thadagam Road innovatively – still stands as the symbol of pride and success in the walls, along the road to GCT.", highlight: "Wall-E!", accent: '#D71920', size: 'wide' },
  { year: '2018', text: "Under the presidentship of Rtr. PP. Poorna Pushkalarajan, along with Rtr. Hema as Secretary for the Rotary Year 2017-2018, we bagged the rolling trophies for 'Outstanding Campus Based Club' and 'Outstanding Scrapbook'.", highlight: "Double Trophy!", accent: '#B8860B', size: 'normal' },
  { year: '2019', text: "Under the presidentship of Rtr. PP. Anuj Skand for the Rotary Year 2018-2019, along with Rtr. Sabarinathan as Secretary, our club saw unbound heights.", highlight: null, accent: '#555', size: 'normal' },
  { year: '2019', text: "'Elixir - RaC GCT's Medical Thiruvizha' – a 3 day medical camp, exclusively for the people of GCT, was initiated in his tenure which got recognised under Top 30 projects by our District 3201.", highlight: "Elixir Born!", accent: '#D71920', size: 'wide' },
  { year: '2020', text: "For the Rotary Year 2019-2020, under Rtr. PP. Deepan, 'The GCT Times' – daily newsletters with news in English and Tamil, along with 'Dhinam Oru Kural' – a Thirukkural every day, were initiated.", highlight: "GCT Times!", accent: '#D71920', size: 'normal' },
  { year: '2022', text: "Despite pandemic and hardships, Rtr. Jaishree G V, the first female president of our club, along with Rtr. Jini J Tracy as Secretary, made a massive impact and raised the standards of RaC GCT.", highlight: "First Female President!", accent: '#D71920', size: 'wide' },
  { year: '2022', text: "We bagged the rolling trophies for 'Outstanding Campus Based Club' and 'Outstanding Bulletin' along with the hyper active citation.", highlight: "Award Winners!", accent: '#B8860B', size: 'normal' },
  { year: '2023', text: "For the Rotary Year 2022-2023, Rtr. PP. Hemananth S as President and Rtr. Roshini M as Secretary, launched 'Zeal #RunToCure' mega marathon for cancer awareness and achieved maximum blood donation of 209 units in Elixir history.", highlight: "209 Units!", accent: '#D71920', size: 'normal' },
  { year: '2024', text: "Under the leadership of Rtr. IPP. Harshini Priyanna as President (2023-2024) and Rtr. Joeshitha T A as Secretary, won Best President, Best Secretary, Best Club Bulletin awards, and executed impactful projects like HAND-I-HOOD and ILLUMINA.", highlight: "Multiple Awards!", accent: '#B8860B', size: 'wide' },
  { year: '2024', text: "GANDIVA, District Sportsmeet (2023-2024) orchestrated under Event Chair Rtr. PP. Hemananth, earned Recognition for District Event Hosting and the 3201 Creator's Recognition.", highlight: "GANDIVA!", accent: '#D71920', size: 'normal' },
  { year: '2025', text: "ELIXIR 25 – the fifth edition of the flagship Medical Thiruvizha – delivered 1,528 general medical checkups, a record 227 units of blood donation, and introduced psychiatric therapy & PCOD consultations for the first time. Earned the prestigious RSAMDIO Award.", highlight: "Record 227 Units!", accent: '#D71920', size: 'wide' },
  { year: '2025', text: "PAARVAI, a focused eye care initiative for tribal communities, provided essential vision support reflecting our continued commitment to compassionate community service.", highlight: "PAARVAI!", accent: '#D71920', size: 'normal' },
  { year: '2025', text: "ANUVAM was executed in two meaningful phases focused on digital empowerment. A Personal Computer was donated to Nizhal Charitable Trust and basic computer tools were taught to young learners, strengthening digital access and confidence.", highlight: "ANUVAM!", accent: '#D71920', size: 'normal' },
  { 
    year: '2026', 
    text: "🏆 2025–26 carried forward the legacy of ELIXIR as a Mega Medical Thiruvizha, bringing the community together with a strong focus on health, wellness, and care.\n\n🩺 5,121+ medical services were provided across General Body Checkups (1,697), Ophthalmic Aid (1,528), Dental Care (1,522), Dermatology (241), Mental Health Support (79), and PCOS/PCOD Counselling (54).\n\n🩸 297 donors registered, with 218 blood units collected, contributing to the life-saving spirit of ELIXIR.\n\n✨ Beyond the numbers, ELIXIR ’26 brought together a community committed to prioritising health, spreading awareness, and making a meaningful difference in people’s lives.", 
    highlight: "ELIXIR'26", 
    accent: '#D71920', 
    size: 'wide' 
  },
  { 
    year: '2026', 
    text: "ASTRA District Sportsmeet (2025–26), orchestrated under the leadership of Event Chair Rtr. Anusha, brought together sports enthusiasts across the district, fostering a spirit of healthy competition, teamwork, and camaraderie. The event showcased exceptional sporting talent while strengthening fellowship among Rotaractors and earned recognition for its successful execution and impactful contribution to sports and fellowship.", 
    highlight: "ASTRA!", 
    accent: '#D71920', 
    size: 'normal' 
  },
];

export default function About() {
  useEffect(() => {
    document.title = 'About | Rotaract GCT';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('about-reveal-active');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.about-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-enter" style={{ background: '#ffffff' }}>

      {/* ════════ HERO — SPLIT LAYOUT ════════ */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '92vh',
      }} className="about-hero-grid">
        {/* Left — Dark Panel */}
        <div style={{
          background: 'linear-gradient(160deg, #1A0000 0%, #6B0000 60%, #D71920 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', bottom: '-40px', left: '-20px',
            fontSize: '320px', fontWeight: 900,
            color: 'rgba(255,255,255,0.03)',
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
          }}>R</div>

          <div className="about-reveal" style={{ position: 'relative', zIndex: 1 }}>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)', marginBottom: '40px',
            }}>
              Rotaract Club of GCT Coimbatore
            </p>
            <div style={{
              fontSize: '96px', lineHeight: 0.8,
              color: '#D71920', fontFamily: 'Georgia, serif',
              marginBottom: '16px', opacity: 0.6,
            }}>"</div>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(26px, 3.2vw, 42px)',
              fontWeight: 700, color: '#ffffff',
              lineHeight: 1.4, fontStyle: 'italic', marginBottom: '32px',
            }}>
              The best way to find yourself is to lose yourself in the service of others.
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img 
                src="/images/mahatma-gandhi.jpg" 
                alt="Mahatma Gandhi" 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(255, 215, 0, 0.5)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  filter: 'grayscale(20%) contrast(110%)',
                }}
              />
              <div style={{ width: '40px', height: '2px', background: '#FFD700' }} />
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '16px', fontWeight: 600, color: '#FFD700',
                letterSpacing: '0.05em'
              }}>
                Mahatma Gandhi
              </p>
            </div>
          </div>
        </div>

        {/* Right — White Panel */}
        <div style={{
          background: '#ffffff',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '80px 64px',
        }}>
          <div className="about-reveal about-reveal-right">
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: '#D71920', marginBottom: '24px',
            }}>
              Who We Are &amp; What We Do
            </p>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 800, color: '#111111',
              lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '32px',
            }}>
              Engineers by<br />
              <span style={{ color: '#D71920' }}>Profession</span>,<br />
              Rotaractors by<br />
              <span style={{ color: '#D71920' }}>Action</span>.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '17px', lineHeight: 1.85,
              color: '#555555', marginBottom: '40px',
            }}>
              Rotaract is all about self-growth and self's dedication to community's growth.
              Perfection in effective Rotaraction results in community's evolution towards betterment,
              relaxation while achieving ambition and the Rotaractor's satisfaction.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: '#FFF5F5', border: '1.5px solid #FFD0D0',
              borderRadius: '999px', padding: '12px 28px',
            }}>
              <span style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800, fontSize: '15px',
                color: '#D71920', letterSpacing: '0.05em',
              }}>
                🌱 Grow · Cultivate · Transmute
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ THEME SECTIONS — Full-Width Alternating ════════ */}
      {themes.map((theme, i) => {
        const isDark = theme.bgColor === '#1A1A1A';
        return (
          <section key={theme.title} style={{
            background: theme.bgColor,
            padding: '100px 0',
            overflow: 'hidden',
          }}>
            <div style={{
              maxWidth: '1280px', margin: '0 auto',
              padding: '0 64px',
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '1fr 1.1fr' : '1.1fr 1fr',
              gap: '80px', alignItems: 'center',
            }} className="about-theme-grid">

              {i % 2 !== 0 && (
                <div className="about-reveal" style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: 'clamp(100px, 15vw, 200px)',
                    fontWeight: 900, lineHeight: 1,
                    color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(215,25,32,0.07)',
                    fontFamily: "'Poppins', sans-serif",
                    marginBottom: '-40px', pointerEvents: 'none', userSelect: 'none',
                  }}>{theme.number}</div>
                  <div style={{ fontSize: '56px', marginBottom: '8px' }}>{theme.emoji}</div>
                  <h2 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 'clamp(52px, 7vw, 96px)',
                    fontWeight: 900,
                    color: isDark ? '#ffffff' : '#111111',
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase', lineHeight: 1,
                  }}>{theme.title}</h2>
                </div>
              )}

              <div className="about-reveal about-reveal-right">
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  fontStyle: 'italic', lineHeight: 1.7,
                  color: isDark ? '#FFD700' : '#D71920',
                  marginBottom: '32px',
                  borderLeft: '4px solid #D71920',
                  paddingLeft: '24px',
                }}>{theme.quote}</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '17px', lineHeight: 1.9,
                  color: isDark ? 'rgba(255,255,255,0.75)' : '#555555',
                }}>{theme.desc}</p>
              </div>

              {i % 2 === 0 && (
                <div className="about-reveal">
                  <div style={{
                    fontSize: 'clamp(100px, 15vw, 200px)',
                    fontWeight: 900, lineHeight: 1,
                    color: 'rgba(215,25,32,0.07)',
                    fontFamily: "'Poppins', sans-serif",
                    marginBottom: '-40px', pointerEvents: 'none', userSelect: 'none',
                  }}>{theme.number}</div>
                  <div style={{ fontSize: '56px', marginBottom: '8px' }}>{theme.emoji}</div>
                  <h2 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 'clamp(52px, 7vw, 96px)',
                    fontWeight: 900, color: '#111111',
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase', lineHeight: 1,
                  }}>{theme.title}</h2>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* ════════ LEGACY — BENTO GRID ════════ */}
      <section style={{
        background: 'linear-gradient(160deg, #0D0D0D 0%, #1A0000 50%, #0D0D0D 100%)',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow accents */}
        <div style={{
          position: 'absolute', top: 0, left: '20%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(215,25,32,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '15%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(215,25,32,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div className="about-reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: '#D71920', marginBottom: '16px',
            }}>Our Journey</p>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 900, color: '#ffffff',
              letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px',
            }}>
              The Story of the <span style={{ color: '#D71920' }}>Built Legacy</span>
            </h2>
            <div style={{
              width: '80px', height: '4px',
              background: 'linear-gradient(to right, #D71920, #FFD700)',
              margin: '0 auto', borderRadius: '2px',
            }} />
          </div>

          {/* Bento Card Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }} className="legacy-bento-grid">
            {legacyPoints.map((item, index) => (
              <div
                key={index}
                className="about-reveal legacy-card"
                style={{
                  gridColumn: item.size === 'wide' ? 'span 2' : 'span 1',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  padding: '32px 36px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
                  e.currentTarget.style.borderColor = 'rgba(215, 25, 32, 0.4)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(215, 25, 32, 0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Background number watermark */}
                <div style={{
                  position: 'absolute', bottom: '-20px', right: '-10px',
                  fontFamily: "'Poppins', sans-serif", fontWeight: 900,
                  fontSize: '96px', lineHeight: 1,
                  color: 'rgba(255,255,255,0.025)',
                  pointerEvents: 'none', userSelect: 'none',
                }}>
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Top row — year badge + highlight chip */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: '#D71920', borderRadius: '999px', padding: '4px 14px',
                    boxShadow: '0 0 12px rgba(215,25,32,0.5)',
                  }}>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 800, fontSize: '12px',
                      color: '#ffffff', letterSpacing: '0.05em',
                    }}>{item.year}</span>
                  </div>

                  {item.highlight && (
                    <span style={{
                      display: 'inline-block',
                      background: item.accent === '#B8860B' ? 'rgba(184,134,11,0.15)' : 'rgba(215,25,32,0.12)',
                      color: item.accent === '#B8860B' ? '#FFD700' : '#FF6B6B',
                      border: `1px solid ${item.accent === '#B8860B' ? 'rgba(184,134,11,0.3)' : 'rgba(215,25,32,0.3)'}`,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '11px', fontWeight: 700,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      padding: '4px 12px', borderRadius: '999px',
                    }}>
                      ✦ {item.highlight}
                    </span>
                  )}
                </div>

                {/* Text */}
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px', lineHeight: 1.85,
                  color: 'rgba(255,255,255,0.72)',
                  margin: 0, position: 'relative', zIndex: 1,
                  whiteSpace: 'pre-wrap',
                }}>{item.text}</p>

                {/* Bottom accent line */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: '100%', height: '2px',
                  background: 'linear-gradient(to right, #D71920, transparent)',
                  opacity: 0.3, borderRadius: '0 0 20px 20px',
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .about-reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.9s ease-out, transform 0.9s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .about-reveal.about-reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        .about-reveal-right {
          transform: translateX(40px);
        }
        .about-reveal-right.about-reveal-active {
          transform: translateX(0);
        }
        @media (max-width: 900px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .about-theme-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 0 24px !important;
          }
          .legacy-bento-grid {
            grid-template-columns: 1fr !important;
          }
          .legacy-card {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
}