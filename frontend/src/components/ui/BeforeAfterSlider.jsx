import { useRef, useState, useCallback, useEffect } from 'react'

/**
 * Draggable Before/After comparison slider with:
 * - Broadcast Color Scopes (RGB Waveform, Vectorscope, Histogram, False Color)
 * - 100% Grain & Halation Loupe Magnifier
 */
export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'CAMERA RAW (LOG)',
  afterLabel = 'FINAL FILM GRADE',
  cameraMeta = 'ARRI Alexa Mini LF • ARRI LogC3 / ACEScc',
  activeCategory = 'Cinematic',
  className = '',
}) {
  const containerRef = useRef(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [activeScope, setActiveScope] = useState('none') // 'none' | 'waveform' | 'vectorscope' | 'histogram' | 'falsecolor'
  const [showLoupe, setShowLoupe] = useState(false)
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 })

  const updateSlider = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = (x / rect.width) * 100
    setSliderPosition(percent)
  }, [])

  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
    updateSlider(e.clientX)
  }, [updateSlider])

  const handleTouchStart = useCallback((e) => {
    setIsDragging(true)
    updateSlider(e.touches[0].clientX)
  }, [updateSlider])

  const handleMouseMoveLoupe = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setLoupePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => updateSlider(e.clientX)
    const handleTouchMove = (e) => updateSlider(e.touches[0].clientX)
    const handleEnd = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, updateSlider])

  return (
    <div className="flex flex-col gap-3">
      {/* Scope and Tool Switcher Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#08090f] border border-white/10 rounded">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
          <span className="text-[#38BDF8] font-bold">SCOPES:</span>
          {['none', 'waveform', 'vectorscope', 'histogram', 'falsecolor'].map((scope) => (
            <button
              key={scope}
              onClick={() => setActiveScope(scope)}
              className={`px-2 py-0.5 rounded uppercase transition-all ${
                activeScope === scope
                  ? 'bg-[#38BDF8] text-black font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {scope === 'none' ? 'OFF' : scope}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Loupe Mode Toggle */}
          <button
            onClick={() => setShowLoupe(!showLoupe)}
            className={`px-2.5 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 transition-all ${
              showLoupe ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-gray-300 border border-white/10'
            }`}
          >
            <span>🔍 100% GRAIN LOUPE</span>
          </button>
          <span className="text-[10px] font-mono text-[#38BDF8] hidden sm:inline">
            {cameraMeta}
          </span>
        </div>
      </div>

      {/* Main Before/After Frame Container */}
      <div
        ref={containerRef}
        className={`relative overflow-hidden select-none rounded border border-white/10 ${className}`}
        style={{ aspectRatio: '16/9', background: '#08080c' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseMove={handleMouseMoveLoupe}
        data-cursor="DRAG"
      >
        {/* After image (full width, visible behind) */}
        <div className="absolute inset-0">
          <img
            src={afterImage}
            alt="After color grading"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Before image (clipped by slider) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt="Before color grading"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Scope Overlays */}
        {activeScope === 'waveform' && (
          <div className="absolute bottom-4 right-4 w-44 h-32 bg-black/85 backdrop-blur-md rounded border border-cyan-500/40 p-2.5 pointer-events-none z-20">
            <div className="flex justify-between text-[9px] font-mono text-cyan-400 mb-1">
              <span>RGB PARADE WAVEFORM</span>
              <span>100 IRE</span>
            </div>
            <div className="w-full h-20 flex items-end justify-around gap-1 border-b border-white/20 pb-1">
              <div className="w-1/3 h-full bg-gradient-to-t from-red-900/60 via-red-500/80 to-transparent rounded-t" />
              <div className="w-1/3 h-[85%] bg-gradient-to-t from-green-900/60 via-green-500/80 to-transparent rounded-t" />
              <div className="w-1/3 h-[90%] bg-gradient-to-t from-blue-900/60 via-blue-500/80 to-transparent rounded-t" />
            </div>
            <div className="text-[8px] font-mono text-gray-400 flex justify-between mt-1">
              <span>0 IRE</span>
              <span>CALIBRATED D65</span>
            </div>
          </div>
        )}

        {activeScope === 'vectorscope' && (
          <div className="absolute bottom-4 right-4 w-36 h-36 bg-black/85 backdrop-blur-md rounded-full border border-[#38BDF8]/50 p-2 pointer-events-none z-20 flex items-center justify-center relative">
            {/* Skin tone line */}
            <div className="absolute w-28 h-px bg-amber-400/80 rotate-[-35deg]" />
            <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-cyan-500/30" />
            </div>
            <span className="absolute top-2 text-[8px] font-mono text-[#38BDF8]">VECTORSCOPE</span>
            <span className="absolute right-2 text-[7px] font-mono text-amber-300">SKIN I-LINE</span>
          </div>
        )}

        {activeScope === 'histogram' && (
          <div className="absolute bottom-4 right-4 w-44 h-28 bg-black/85 backdrop-blur-md rounded border border-white/20 p-2 pointer-events-none z-20">
            <div className="text-[9px] font-mono text-gray-300 mb-1">LUMA HISTOGRAM (12-BIT)</div>
            <div className="w-full h-16 flex items-end gap-0.5 border-b border-white/20">
              {[20, 35, 55, 78, 90, 85, 60, 45, 30, 15].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#38BDF8]/40 to-[#38BDF8]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        )}

        {activeScope === 'falsecolor' && (
          <div className="absolute inset-0 pointer-events-none z-15 mix-blend-color-dodge opacity-50 bg-gradient-to-r from-purple-900 via-pink-700 via-green-600 via-yellow-500 to-red-600">
            <div className="absolute top-4 right-4 bg-black/80 px-2 py-1 rounded border border-white/20 text-[9px] font-mono text-amber-400">
              FALSE COLOR EXPOSURE MAP
            </div>
          </div>
        )}

        {/* 100% Zoom Loupe */}
        {showLoupe && (
          <div
            className="absolute w-36 h-36 rounded-full border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.4)] pointer-events-none overflow-hidden z-30"
            style={{
              left: `${loupePos.x}%`,
              top: `${loupePos.y}%`,
              transform: 'translate(-50%, -50%)',
              background: '#000',
            }}
          >
            <img
              src={sliderPosition > loupePos.x ? beforeImage : afterImage}
              alt="Loupe Zoom View"
              className="absolute object-cover w-[400%] h-[400%] max-w-none"
              style={{
                left: `${-loupePos.x * 3}%`,
                top: `${-loupePos.y * 3}%`,
              }}
            />
            {/* Loupe crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-cyan-400/40" />
              <div className="h-full w-px bg-cyan-400/40 absolute" />
            </div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-mono text-cyan-300">
              35mm GRAIN 2X
            </div>
          </div>
        )}

        {/* Labels */}
        <div
          className="absolute top-4 left-4 px-3 py-1.5 text-[11px] font-mono tracking-widest uppercase rounded"
          style={{
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#e8e8ec',
            opacity: sliderPosition > 15 ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <span className="text-gray-400 mr-1.5">//</span> {beforeLabel}
        </div>
        <div
          className="absolute top-4 right-4 px-3 py-1.5 text-[11px] font-mono tracking-widest uppercase rounded"
          style={{
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(56, 189, 248,0.4)',
            color: '#38BDF8',
            opacity: sliderPosition < 85 ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <span className="text-[#38BDF8] mr-1.5">★</span> {afterLabel}
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5"
          style={{
            left: `${sliderPosition}%`,
            transform: 'translateX(-50%)',
            background: 'rgba(56, 189, 248, 0.95)',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.6)',
          }}
        />

        {/* Slider handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 z-20"
          style={{
            left: `${sliderPosition}%`,
            transform: `translate(-50%, -50%) scale(${isDragging ? 1.15 : 1})`,
            transition: 'transform 0.2s ease',
          }}
        >
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-ew-resize shadow-[0_0_25px_rgba(56, 189, 248,0.5)]"
            style={{
              background: '#0b0c10',
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(56, 189, 248, 0.95)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L3 10L7 16" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 4L17 10L13 16" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(5,5,7,0.7), transparent)',
          }}
        />
      </div>
    </div>
  )
}

