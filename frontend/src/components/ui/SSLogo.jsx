export default function SSLogo({ size = 'hero', className = '' }) {
  const isNavLogo = size === 'nav'

  return (
    <div
      className={`relative isolate overflow-hidden bg-black ${
        isNavLogo
          ? 'h-10 w-10 rounded-lg border border-[#D9A84B]/40 shadow-[0_0_16px_rgba(217,168,75,0.16)]'
          : 'aspect-square w-56 rounded-full md:w-72'
      } ${className}`}
    >
      <img
        src="/logo.png"
        alt="Suraj Singh"
        className={`block h-full w-full object-cover ${isNavLogo ? 'scale-[1.9]' : 'scale-[1.35]'}`}
      />
      {!isNavLogo && (
        <span
          aria-hidden="true"
          className="hero-logo-shine absolute inset-y-0 z-10 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
        />
      )}
    </div>
  )
}
