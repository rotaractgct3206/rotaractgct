import { InstagramIcon, LinkedinIcon } from './BrandIcons';

const positionColors = {
  'President': 'bg-[#D71920] text-white',
  'Vice President': 'bg-[#A50000] text-white',
  'Secretary': 'bg-[#800000] text-white',
  'Treasurer': 'bg-[#800000] text-white',
};

export default function BoardCard({ member }) {
  const badgeClass = positionColors[member.position] || 'bg-[#1A1A1A] text-white';

  return (
    <div className="group bg-white border border-[#F1F1F1] hover:border-[#D71920] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-100 flex flex-col text-center">
      {/* Photo */}
      <div className="relative overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=D71920&color=FFFFFF&size=400&bold=true`;
            }}
          />
        </div>
        {/* Red overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#D71920]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Social links on hover */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-[#D71920] hover:text-white text-[#D71920] transition-colors duration-200"
              aria-label={`${member.name} Instagram`}
            >
              <InstagramIcon size={15} />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-[#D71920] hover:text-white text-[#D71920] transition-colors duration-200"
              aria-label={`${member.name} LinkedIn`}
            >
              <LinkedinIcon size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 ${badgeClass}`}>
          {member.position}
        </span>
        <h3 className="text-base font-bold text-[#1A1A1A] mt-3 leading-tight">{member.name}</h3>
        {member.bio && (
          <p className="text-xs text-[#666666] mt-2 leading-relaxed line-clamp-2">{member.bio}</p>
        )}
      </div>
    </div>
  );
}
