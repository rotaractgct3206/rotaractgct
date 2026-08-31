import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const categoryColors = {
  'Professional Service': '#1A1A1A',
  'Community Service': '#1A1A1A',
  'Club Service': '#1A1A1A',
  'International Service': '#1A1A1A',
};

export default function ProjectCard({ project }) {
  return (
    <div className="group bg-white border border-[#F1F1F1] hover:border-[#D71920] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-100 flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x400/D71920/FFFFFF?text=${encodeURIComponent(project.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#D71920] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1">
            {project.category}
          </span>
        </div>
        {/* Status badge */}
        {project.status === 'Upcoming' && (
          <div className="absolute top-3 right-3">
            <span className="bg-white text-[#D71920] text-[10px] font-bold tracking-widest uppercase px-3 py-1 border border-[#D71920]">
              Upcoming
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-extrabold text-[#1A1A1A] tracking-wide mb-1 group-hover:text-[#D71920] transition-colors duration-200">
          {project.title}
        </h3>

        {/* Tagline */}
        {project.tagline && (
          <p className="text-sm text-[#666666] italic mb-4 leading-snug">
            &ldquo;{project.tagline}&rdquo;
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-xs text-[#666666] mt-auto mb-5">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-[#D71920]" />
            {project.date}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-[#D71920]" />
            {project.location}
          </span>
        </div>

        {/* CTA */}
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-[#D71920] text-xs font-bold tracking-widest uppercase hover:gap-3 transition-all duration-200"
        >
          View Project <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
