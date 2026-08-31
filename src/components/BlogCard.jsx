import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogCard({ blog }) {
  const formattedDate = new Date(blog.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="group bg-white border border-[#F1F1F1] hover:border-[#D71920] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-100 flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x340/D71920/FFFFFF?text=${encodeURIComponent('Blog')}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {blog.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] font-bold tracking-wide uppercase bg-[#FFF0F0] text-[#D71920] px-2.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-[#1A1A1A] leading-tight mb-3 group-hover:text-[#D71920] transition-colors line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[#666666] leading-relaxed mb-4 line-clamp-3 flex-1">
          {blog.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-[#666666] mb-5 pt-4 border-t border-[#F1F1F1]">
          <span className="flex items-center gap-1.5">
            <User size={12} className="text-[#D71920]" />
            {blog.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={12} className="text-[#D71920]" />
            {formattedDate}
          </span>
        </div>

        {/* CTA */}
        <Link
          to={`/blogs/${blog.slug}`}
          className="inline-flex items-center gap-2 text-[#D71920] text-xs font-bold tracking-widest uppercase hover:gap-3 transition-all duration-200"
        >
          Read More <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
