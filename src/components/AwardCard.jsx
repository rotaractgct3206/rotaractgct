import { Trophy } from 'lucide-react';

export default function AwardCard({ award }) {
  return (
    <div className="group bg-white border border-[#F1F1F1] hover:border-[#D71920] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-100 p-6 flex gap-5">
      {/* Icon */}
      <div className="flex-shrink-0 w-14 h-14 bg-[#FFF0F0] border border-[#D71920]/20 flex items-center justify-center group-hover:bg-[#D71920] transition-colors duration-300">
        <Trophy size={22} className="text-[#D71920] group-hover:text-white transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start gap-2 mb-2">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-[#D71920] text-white px-2.5 py-0.5">
            {award.category}
          </span>
          <span className="text-[10px] font-semibold text-[#666666] border border-[#F1F1F1] px-2.5 py-0.5">
            {award.tenure}
          </span>
        </div>
        <h3 className="text-base font-bold text-[#1A1A1A] leading-tight mb-1 group-hover:text-[#D71920] transition-colors">
          {award.title}
        </h3>
        <p className="text-xs text-[#D71920] font-semibold mb-2">{award.organization} • {award.year}</p>
        {award.description && (
          <p className="text-sm text-[#666666] leading-relaxed line-clamp-2">{award.description}</p>
        )}
      </div>
    </div>
  );
}
