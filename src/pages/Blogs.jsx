import { useState, useEffect, useRef } from 'react';
import { Heart, User, PenTool } from 'lucide-react';
import { blogs } from '../data/blogs';

function BlogCard({ blog, index }) {
  const [hovered, setHovered] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [views, setViews] = useState(blog.views);

  // Simulate live view updates
  useEffect(() => {
    // Random interval between 5 to 15 seconds
    const intervalTime = Math.floor(Math.random() * 10000) + 5000;
    const interval = setInterval(() => {
      // 30% chance to gain a view every interval to feel organic
      if (Math.random() > 0.7) {
        setViews(prev => prev + 1);
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '40px',
        alignItems: 'stretch',
        width: '100%',
        background: 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(215,25,32,0.5)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: hovered ? '0 20px 40px rgba(215,25,32,0.1)' : '0 10px 30px rgba(0,0,0,0.3)',
      }}
      className="blog-card-responsive"
    >
      {/* Background Hover Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered 
          ? 'linear-gradient(135deg, rgba(215,25,32,0.05) 0%, transparent 100%)' 
          : 'transparent',
        transition: 'background 0.5s ease',
        pointerEvents: 'none',
      }} />

      {/* Left Image Section */}
      <div style={{
        flex: '0 0 40%',
        minHeight: '300px',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      }} className="blog-image-responsive">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 50%)',
          zIndex: 1, pointerEvents: 'none',
        }} />
        <img 
          src={blog.image} 
          alt={blog.title} 
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)',
            position: 'absolute', inset: 0,
          }}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop if fallback fails
            e.target.src = `https://placehold.co/800x600/D71920/FFFFFF?text=${encodeURIComponent(blog.title)}`;
          }}
        />
      </div>

      {/* Right Content Section */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#ffffff', position: 'relative', zIndex: 2 }}>
        
        {/* Author Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: hovered ? '#D71920' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${hovered ? '#D71920' : 'rgba(255,255,255,0.1)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            transition: 'all 0.4s ease',
          }}>
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author.replace('Rtr. ', ''))}&background=D71920&color=FFFFFF`} 
              alt={blog.author} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 1 : 0.8, transition: 'opacity 0.4s ease' }} 
            />
          </div>
          <div>
            <p style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: hovered ? '#ffffff' : 'rgba(255,255,255,0.9)', transition: 'color 0.4s ease' }}>
              {blog.author}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
              {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {blog.readTime}
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '32px',
          fontWeight: 800,
          margin: '0 0 16px 0',
          lineHeight: 1.2,
          color: hovered ? '#FFD700' : '#ffffff',
          transition: 'color 0.4s ease',
        }}>
          {blog.title}
        </h2>

        {/* Excerpt */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '15px',
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.7)',
          margin: '0 0 auto 0',
          paddingBottom: '32px'
        }}>
          {blog.excerpt}
        </p>

        {/* Divider & Footer */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>{views} views</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>{blog.comments} comments</span>
          </div>
          <div 
            onClick={handleLike}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#ffffff', 
              fontFamily: "'Poppins', sans-serif", fontWeight: 700, cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <span>{likes}</span>
            <Heart 
              size={16} 
              color={hasLiked || hovered ? "#D71920" : "rgba(255,255,255,0.5)"} 
              fill={hasLiked || hovered ? "#D71920" : "transparent"} 
              style={{ transition: 'all 0.4s ease', transform: hasLiked ? 'scale(1.2)' : 'scale(1)' }} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Blogs() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    document.title = 'Blogs | Rotaract GCT';
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
            <PenTool size={14} color="#D71920" />
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D71920'
            }}>
              OUR VOICE
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 800, color: '#ffffff',
            lineHeight: 1.1, margin: '0 0 24px',
            letterSpacing: '-0.02em',
          }}>
            <span style={{ color: '#D71920' }}>STORIES</span> & BLOGS
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '18px',
            color: 'rgba(255,255,255,0.6)', maxWidth: '600px',
            margin: '0 auto', lineHeight: 1.6,
          }}>
            Thoughts, reflections, and stories from the heart of Rotaract GCT.
          </p>
        </div>

        {/* Blogs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {blogs.map((blog, idx) => (
            <BlogCard key={blog.id} blog={blog} index={idx} />
          ))}
        </div>
      </div>
      
      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .blog-card-responsive {
            flex-direction: column !important;
            padding: 20px !important;
          }
          .blog-image-responsive {
            flex: none !important;
            height: 250px !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
