import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import { getBlogBySlug, blogs } from '../data/blogs';
import BlogCard from '../components/BlogCard';
import RevealOnScroll from '../components/RevealOnScroll';

// Simple markdown-ish renderer
function renderContent(content) {
  if (!content) return null;
  const lines = content.trim().split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-extrabold text-[#1A1A1A] mt-10 mb-4 border-l-4 border-[#D71920] pl-4">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-bold text-[#D71920] mt-6 mb-2">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('*') && line.endsWith('*')) {
      elements.push(
        <p key={i} className="text-sm text-[#666666] italic mt-6 pt-4 border-t border-[#F1F1F1]">
          {line.replace(/\*/g, '')}
        </p>
      );
    } else if (line.startsWith('- ')) {
      const items = [line.replace('- ', '')];
      i++;
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().replace('- ', ''));
        i++;
      }
      elements.push(
        <ul key={i} className="list-none space-y-2 my-4 pl-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-[#666666]">
              <span className="w-1.5 h-1.5 bg-[#D71920] rounded-full mt-2.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
      continue;
    } else {
      elements.push(
        <p key={i} className="text-base text-[#555555] leading-relaxed mb-4">
          {line}
        </p>
      );
    }
    i++;
  }
  return elements;
}

export default function BlogDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = getBlogBySlug(slug);

  useEffect(() => {
    if (blog) document.title = `${blog.title} | Rotaract GCT`;
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">📝</div>
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-3">Blog Not Found</h1>
        <p className="text-[#666666] mb-6">This story doesn't exist or has been removed.</p>
        <Link to="/blogs" className="btn-primary">
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
      </div>
    );
  }

  const related = blogs.filter((b) => b.slug !== slug).slice(0, 3);
  const formattedDate = new Date(blog.date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="bg-[#F8F8F8] border-b border-[#F1F1F1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs">
          <Link to="/" className="text-[#666666] hover:text-[#D71920] transition-colors">Home</Link>
          <span className="text-[#666666]">/</span>
          <Link to="/blogs" className="text-[#666666] hover:text-[#D71920] transition-colors">Blogs</Link>
          <span className="text-[#666666]">/</span>
          <span className="text-[#D71920] font-semibold truncate">{blog.title}</span>
        </div>
      </div>

      {/* Article */}
      <article className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <button
            onClick={() => navigate('/blogs')}
            className="flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#D71920] transition-colors mb-8 font-semibold tracking-wide"
          >
            <ArrowLeft size={14} /> Back to Blogs
          </button>

          {/* Tags */}
          {blog.tags && (
            <div className="flex flex-wrap gap-2 mb-5">
              {blog.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-bold tracking-widest uppercase bg-[#FFF0F0] text-[#D71920] px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-[#666666] mb-8 pb-8 border-b border-[#F1F1F1]">
            <span className="flex items-center gap-2">
              <User size={14} className="text-[#D71920]" />
              <strong className="text-[#1A1A1A]">{blog.author}</strong>
              {blog.authorRole && <span className="text-[#999]">• {blog.authorRole}</span>}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-[#D71920]" />
              {formattedDate}
            </span>
          </div>

          {/* Cover Image */}
          <div className="aspect-video overflow-hidden mb-10">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://placehold.co/900x506/D71920/FFFFFF?text=Blog'; }}
            />
          </div>

          {/* Content */}
          <div className="prose-custom">
            {renderContent(blog.content)}
          </div>
        </div>
      </article>

      {/* Related Blogs */}
      {related.length > 0 && (
        <section className="py-16 bg-[#F8F8F8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-8">More Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((b, i) => (
                <RevealOnScroll key={b.id} delay={i * 100}>
                  <BlogCard blog={b} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
