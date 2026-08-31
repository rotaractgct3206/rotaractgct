import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ icon: Icon, title, subtitle, description, link }) {
  return (
    <Link
      to={link}
      className="group bg-white hover:border-[#D71920] border border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-100 p-7 flex flex-col h-full"
    >
      <div className="w-12 h-12 bg-[#FFF0F0] group-hover:bg-[#D71920] flex items-center justify-center mb-5 transition-colors duration-300">
        <Icon size={22} className="text-[#D71920] group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-base font-extrabold text-[#1A1A1A] mb-1 group-hover:text-[#D71920] transition-colors">
        {title}
      </h3>
      <p className="text-xs font-bold tracking-widest uppercase text-[#666666] mb-3">{subtitle}</p>
      <div className="w-6 h-0.5 bg-[#D71920] mb-4 group-hover:w-10 transition-all duration-300" />
      <p className="text-sm text-[#666666] leading-relaxed flex-1">{description}</p>
      <div className="mt-5 flex items-center gap-1.5 text-[#D71920] text-xs font-bold tracking-widest uppercase group-hover:gap-2.5 transition-all duration-200">
        Explore <ArrowRight size={12} />
      </div>
    </Link>
  );
}
