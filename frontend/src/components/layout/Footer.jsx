export default function Footer() {
  return (
    <footer
      className="relative py-12 px-4 md:px-8 border-t border-white/[0.08] bg-[#020305]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded border border-[#38BDF8]/50 flex items-center justify-center bg-black/50">
                <span className="text-sm font-black text-[#38BDF8] font-display">SS</span>
              </div>
              <span className="text-sm font-bold tracking-[0.2em] text-white font-display">
                SURAJ SINGH
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed font-light">
              Senior Cinematic Colorist & Finishing Artist crafting emotive, award-winning visual identities for feature films, commercials, and music videos globally.
            </p>
            <div className="text-[10px] font-mono text-[#38BDF8] tracking-widest">
              DCI MASTERING • ACES 1.3 • DAVINCI RESOLVE STUDIO
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <span className="text-xs font-mono font-bold text-white tracking-widest uppercase block mb-3">
              EXPLORE SUITE
            </span>
            <ul className="space-y-2 text-xs font-mono text-gray-400">
              <li><a href="#home" className="hover:text-[#38BDF8] transition-colors">00 // HOME</a></li>
              <li><a href="#showreel" className="hover:text-[#38BDF8] transition-colors">01 // 4K SHOWREEL</a></li>
              <li><a href="#grading" className="hover:text-[#38BDF8] transition-colors">02 // COLOR SUITE SCOPES</a></li>
              <li><a href="#lab" className="hover:text-[#38BDF8] transition-colors">03 // FILM STOCK LAB</a></li>
              <li><a href="#work" className="hover:text-[#38BDF8] transition-colors">04 // SELECTED WORK</a></li>
              <li><a href="#about" className="hover:text-[#38BDF8] transition-colors">05 // THE ARTIST</a></li>
            </ul>
          </div>

          {/* Studio Location & Time */}
          <div>
            <span className="text-xs font-mono font-bold text-white tracking-widest uppercase block mb-3">
              STUDIO LOCATION
            </span>
            <p className="text-xs text-gray-400 font-mono leading-relaxed mb-3">
              Andheri West, Mumbai, MH<br />
              10Gbps High-Speed Calibrated Live Stream Suite
            </p>
            <a
              href="#contact"
              className="inline-block px-4 py-2 rounded bg-[#38BDF8] hover:bg-[#7DD3FC] text-black font-semibold text-xs font-mono tracking-wider transition-all"
            >
              BOOK SESSION →
            </a>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>© {new Date().getFullYear()} SURAJ SINGH. ALL RIGHTS RESERVED.</p>
          <p className="text-[10px] tracking-widest text-gray-400">
            CRAFTED WITH PRECISION • 32-BIT FLOAT PIPELINE
          </p>
        </div>
      </div>
    </footer>
  )
}

