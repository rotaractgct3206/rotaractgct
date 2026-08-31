import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { getProjectBySlug, projects } from '../data/projects';
import Gallery from '../components/Gallery';
import RevealOnScroll from '../components/RevealOnScroll';
import ProjectCard from '../components/ProjectCard';

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Rotaract GCT`;
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-3">Project Not Found</h1>
        <p className="text-[#666666] mb-6">The project you are looking for does not exist.</p>
        <Link to="/projects" className="btn-primary">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  // Related projects (same category, different slug)
  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: project.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="bg-[#F8F8F8] border-b border-[#F1F1F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs">
          <Link to="/" className="text-[#666666] hover:text-[#D71920] transition-colors">Home</Link>
          <span className="text-[#666666]">/</span>
          <Link to="/projects" className="text-[#666666] hover:text-[#D71920] transition-colors">Projects</Link>
          <span className="text-[#666666]">/</span>
          <span className="text-[#D71920] font-semibold">{project.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: Image Left, Content Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            {/* Image */}
            <RevealOnScroll direction="left">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/720x540/D71920/FFFFFF?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                </div>
                {/* Category badge overlay */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#D71920] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5">
                    {project.category}
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Content */}
            <RevealOnScroll direction="right">
              <div>
                {/* Back button */}
                <button
                  onClick={() => navigate('/projects')}
                  className="flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#D71920] transition-colors mb-6 font-semibold tracking-wide"
                >
                  <ArrowLeft size={14} /> Back to Projects
                </button>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#D71920] tracking-wide leading-tight mb-3">
                  {project.title}
                </h1>

                {/* Tagline */}
                {project.tagline && (
                  <p
                    className="text-lg text-[#1A1A1A] italic mb-6 leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    &ldquo;{project.tagline}&rdquo;
                  </p>
                )}

                {/* Divider */}
                <div className="w-16 h-1 bg-[#D71920] mb-6" />

                {/* Description */}
                <p className="text-[#666666] leading-relaxed text-base mb-8">
                  {project.description}
                </p>

                {/* Project Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-[#F8F8F8] border border-[#F1F1F1]">
                    <Calendar size={18} className="text-[#D71920] flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-[#D71920] tracking-widest uppercase">Date</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{project.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#F8F8F8] border border-[#F1F1F1]">
                    <MapPin size={18} className="text-[#D71920] flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-[#D71920] tracking-widest uppercase">Location</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{project.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#F8F8F8] border border-[#F1F1F1]">
                    <Users size={18} className="text-[#D71920] flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-[#D71920] tracking-widest uppercase">Tenure</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{project.tenure}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#F8F8F8] border border-[#F1F1F1]">
                    <div className="w-4.5 h-4.5 flex-shrink-0">
                      <span className="text-[#D71920] font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#D71920] tracking-widest uppercase">Status</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{project.status}</p>
                    </div>
                  </div>
                </div>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-xs font-bold text-[#666666] hover:text-[#D71920] transition-colors tracking-wide"
                >
                  <Share2 size={14} /> Share this Project
                </button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Objectives */}
          {project.objectives && project.objectives.length > 0 && (
            <RevealOnScroll>
              <div className="mb-16">
                <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-6 flex items-center gap-3">
                  <span className="w-1 h-7 bg-[#D71920] block" />
                  Objectives
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {project.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-[#F8F8F8] border border-[#F1F1F1]">
                      <span className="w-6 h-6 bg-[#D71920] text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-[#666666] leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          )}

          {/* Impact Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <RevealOnScroll>
              <div
                className="mb-16 p-8 md:p-12 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #800000 0%, #D71920 100%)' }}
              >
                <h2 className="text-xl font-extrabold text-white mb-8 tracking-wider uppercase">Project Impact</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="text-center">
                      <p className="text-3xl md:text-4xl font-extrabold text-white mb-1">{h.number}</p>
                      <p className="text-white/70 text-xs font-bold tracking-widest uppercase">{h.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          )}

          {/* Partners */}
          {project.partners && project.partners.length > 0 && (
            <RevealOnScroll>
              <div className="mb-16">
                <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-6 flex items-center gap-3">
                  <span className="w-1 h-7 bg-[#D71920] block" />
                  Partners & Collaborators
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.partners.map((partner, i) => (
                    <span key={i} className="px-4 py-2 border-2 border-[#D71920] text-[#D71920] text-xs font-bold tracking-wide uppercase">
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <RevealOnScroll>
              <div className="mb-16">
                <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-6 flex items-center gap-3">
                  <span className="w-1 h-7 bg-[#D71920] block" />
                  Gallery
                </h2>
                <Gallery images={project.gallery} title={project.title} />
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="py-16 bg-[#F8F8F8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Related Projects</h2>
              <Link to="/projects" className="flex items-center gap-1.5 text-[#D71920] text-xs font-bold tracking-widest uppercase hover:gap-3 transition-all">
                All Projects <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <RevealOnScroll key={p.id} delay={i * 100}>
                  <ProjectCard project={p} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
