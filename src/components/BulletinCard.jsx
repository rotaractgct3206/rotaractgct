import { BookOpen, Download, ExternalLink } from 'lucide-react';

export default function BulletinCard({ bulletin }) {
  return (
    <div className="group bg-white border border-[#F1F1F1] hover:border-[#D71920] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-100 flex flex-col">
      {/* Cover Image */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={bulletin.cover}
          alt={`${bulletin.month} ${bulletin.year} Bulletin`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x533/D71920/FFFFFF?text=${encodeURIComponent(bulletin.month + ' ' + bulletin.year)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Tenure badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#D71920] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1">
            {bulletin.tenure}
          </span>
        </div>
        {/* Month/Year overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-extrabold text-xl leading-tight">{bulletin.month}</p>
          <p className="text-white/80 text-sm font-semibold">{bulletin.year}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 flex gap-2">
        <a
          href={bulletin.file}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#D71920] text-white text-xs font-bold tracking-wide uppercase py-2.5 hover:bg-[#A50000] transition-colors duration-200"
        >
          <BookOpen size={13} />
          Read
        </a>
        <a
          href={bulletin.file}
          download
          className="flex-1 flex items-center justify-center gap-1.5 border-2 border-[#D71920] text-[#D71920] text-xs font-bold tracking-wide uppercase py-2.5 hover:bg-[#D71920] hover:text-white transition-all duration-200"
        >
          <Download size={13} />
          Download
        </a>
      </div>
    </div>
  );
}
