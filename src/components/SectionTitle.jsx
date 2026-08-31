export default function SectionTitle({ label, title, subtitle, centered = false, light = false }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {label && (
        <div className={`flex items-center gap-2 mb-3 ${centered ? 'justify-center' : ''}`}>
          {!centered && <span className="block w-8 h-0.5 bg-[#D71920]" />}
          <span
            style={{ color: light ? 'rgba(255,255,255,0.7)' : '#D71920' }}
            className="text-xs font-bold tracking-widest uppercase"
          >
            {label}
          </span>
          {centered && <span className="block w-8 h-0.5 bg-[#D71920]" />}
          {!centered && <span className="block w-8 h-0.5 bg-[#D71920]" />}
        </div>
      )}
      <h2
        className="text-4xl md:text-5xl font-extrabold leading-tight"
        style={{ color: light ? '#FFFFFF' : '#1A1A1A' }}
      >
        {typeof title === 'string'
          ? title.split('|').map((part, i) =>
              i % 2 === 1 ? (
                <span key={i} style={{ color: light ? '#FF6B6B' : '#D71920' }}>
                  {part}
                </span>
              ) : (
                part
              )
            )
          : title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-lg max-w-2xl leading-relaxed"
          style={{
            color: light ? 'rgba(255,255,255,0.7)' : '#666666',
            ...(centered ? { margin: '1rem auto 0' } : {}),
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
