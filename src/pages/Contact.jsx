import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { InstagramIcon, LinkedinIcon, XIcon, YoutubeIcon } from '../components/BrandIcons';

export default function Contact() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  const [hoveredMethod, setHoveredMethod] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  useEffect(() => {
    document.title = 'Contact | Rotaract GCT';
  }, []);

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

  const contactMethods = [
    { id: 'address', icon: MapPin, title: 'Address', detail: siteConfig.address },
    { id: 'email', icon: Mail, title: 'Email', detail: siteConfig.email, link: `mailto:${siteConfig.email}` },
    { id: 'phone', icon: Phone, title: 'Phone', detail: siteConfig.phone, link: `tel:${siteConfig.phone}` },
  ];

  const socialLinks = [
    { id: 'instagram', icon: InstagramIcon, name: 'Instagram', url: siteConfig.social.instagram, label: '@rotaractgct' },
    { id: 'linkedin', icon: LinkedinIcon, name: 'LinkedIn', url: siteConfig.social.linkedin, label: 'Rotaract GCT' },
    { id: 'x', icon: XIcon, name: 'X', url: siteConfig.social.x, label: '@Rotaractgct' },
    { id: 'youtube', icon: YoutubeIcon, name: 'YouTube', url: siteConfig.social.youtube, label: '@rotaractgct' },
  ];

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
        position: 'absolute', bottom: '10%', right: '5%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(255,215,0,0.03) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0
      }} />

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(215,25,32,0.1)', border: '1px solid rgba(215,25,32,0.3)',
            padding: '6px 16px', borderRadius: '999px', marginBottom: '24px'
          }}>
            <MessageSquare size={14} color="#D71920" />
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D71920'
            }}>
              GET IN TOUCH
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 800, color: '#ffffff',
            lineHeight: 1.1, margin: '0 0 24px',
            letterSpacing: '-0.02em',
          }}>
            <span style={{ color: '#D71920' }}>CONTACT</span> US
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '18px',
            color: 'rgba(255,255,255,0.6)', maxWidth: '600px',
            margin: '0 auto', lineHeight: 1.6,
          }}>
            Have a question, collaboration idea, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {contactMethods.map((method) => {
            const Icon = method.icon;
            const isHovered = hoveredMethod === method.id;
            const isLink = !!method.link;
            
            const content = (
              <div
                onMouseEnter={() => setHoveredMethod(method.id)}
                onMouseLeave={() => setHoveredMethod(null)}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: isHovered ? '1px solid rgba(215,25,32,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px',
                  transition: 'all 0.3s ease',
                  boxShadow: isHovered ? '0 10px 30px rgba(215,25,32,0.1)' : 'none',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  textDecoration: 'none',
                  cursor: isLink ? 'pointer' : 'default',
                  height: '100%',
                }}
              >
                <div style={{
                  width: '64px', height: '64px', flexShrink: 0,
                  background: isHovered ? '#D71920' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isHovered ? '#D71920' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}>
                  <Icon size={24} color={isHovered ? '#ffffff' : '#D71920'} />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Poppins', sans-serif", fontSize: '16px', fontWeight: 700,
                    color: '#ffffff', margin: '0 0 12px', letterSpacing: '0.05em', textTransform: 'uppercase'
                  }}>
                    {method.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6,
                  }}>
                    {method.detail}
                  </p>
                </div>
              </div>
            );

            return isLink ? (
              <a key={method.id} href={method.link} style={{ textDecoration: 'none', display: 'block' }}>
                {content}
              </a>
            ) : (
              <div key={method.id}>{content}</div>
            );
          })}
        </div>

        {/* Socials Grid */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '40px', height: '2px', background: 'rgba(215,25,32,0.8)', margin: '0 auto 16px' }} />
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: 700,
              color: 'rgba(255,255,255,0.6)', margin: 0, letterSpacing: '0.15em', textTransform: 'uppercase'
            }}>
              Follow Us
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const isHovered = hoveredSocial === social.id;
              
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(social.id)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: isHovered ? '1px solid rgba(215,25,32,0.5)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex', alignItems: 'center', gap: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: isHovered ? '0 10px 30px rgba(215,25,32,0.1)' : 'none',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                >
                  <div style={{
                    width: '48px', height: '48px', flexShrink: 0,
                    background: isHovered ? '#D71920' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${isHovered ? '#D71920' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s ease',
                  }}>
                    <Icon size={20} className={isHovered ? 'text-white' : 'text-[#D71920]'} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: '0 0 4px' }}>
                      {social.name}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                      {social.label}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
