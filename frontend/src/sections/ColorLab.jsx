import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextReveal from '../components/ui/TextReveal'

const filmPresets = {
  'kodak5219': {
    name: 'Kodak Vision3 5219',
    exposure: 0.1,
    contrast: 1.25,
    saturation: 1.15,
    temp: 15,
    tint: -5,
    grain: 45,
    halation: 60,
    shadowHue: 200,
    highlightHue: 40,
    desc: 'The gold standard Hollywood 35mm stock. Warm golden skin tones and deep atmospheric cyan shadow density.'
  },
  'fujiEterna': {
    name: 'Fujifilm Eterna 8543',
    exposure: 0.0,
    contrast: 1.05,
    saturation: 0.9,
    temp: -10,
    tint: 10,
    grain: 25,
    halation: 30,
    shadowHue: 170,
    highlightHue: 55,
    desc: 'Soft pastel tonality, subdued saturation, and delicate highlight roll-off favored by European auteur cinema.'
  },
  'triX': {
    name: 'Kodak Tri-X 400 B&W',
    exposure: -0.1,
    contrast: 1.55,
    saturation: 0.0,
    temp: 0,
    tint: 0,
    grain: 85,
    halation: 15,
    shadowHue: 0,
    highlightHue: 0,
    desc: 'Iconic monochrome film stock with punchy silver halide grain, deep velvety blacks, and crisp specular highlights.'
  },
  'bleachBypass': {
    name: 'Bleach Bypass 1995',
    exposure: 0.2,
    contrast: 1.65,
    saturation: 0.55,
    temp: -20,
    tint: -15,
    grain: 60,
    halation: 40,
    shadowHue: 190,
    highlightHue: 80,
    desc: 'Skipping the silver bleaching stage yields ultra-high contrast, gritty muted colors, and metallic speculars.'
  },
  'tealOrange': {
    name: 'Teal & Orange Blockbuster',
    exposure: 0.15,
    contrast: 1.35,
    saturation: 1.3,
    temp: 25,
    tint: -10,
    grain: 35,
    halation: 70,
    shadowHue: 195,
    highlightHue: 35,
    desc: 'Maximum color separation pushing human skin tones to rich amber/peach and skies/shadows to cool cyan.'
  }
}

const resolveNodes = [
  { id: 1, name: '01 CST IN', type: 'Color Space Transform', desc: 'ARRI LogC3 Wide Gamut → ACEScc 1.3 Working Space', bypassed: false },
  { id: 2, name: '02 EXPOSURE', type: 'Primary Balance', desc: 'HDR Offset & Pivot exposure curve leveling', bypassed: false },
  { id: 3, name: '03 SKIN QUALIFIER', type: 'Hue vs Sat Isolation', desc: 'Vector isolation of 3200K skin tone region', bypassed: false },
  { id: 4, name: '04 S-CURVE TONE', type: 'Custom Curves', desc: 'Toe compression & highlight soft clipping', bypassed: false },
  { id: 5, name: '05 PRINT LUT', type: '3D FPE', desc: 'Kodak 2383 D65 35mm film print emulation', bypassed: false },
  { id: 6, name: '06 GRAIN & HALATION', type: 'OFX Finishing', desc: 'Organic optical scatter & 35mm gate weave', bypassed: false },
]

export default function ColorLab() {
  const [currentPreset, setCurrentPreset] = useState('kodak5219')
  const [params, setParams] = useState(filmPresets['kodak5219'])
  const [nodes, setNodes] = useState(resolveNodes)
  const [activeNode, setActiveNode] = useState(1)
  const [showExportModal, setShowExportModal] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handlePresetChange = (key) => {
    setCurrentPreset(key)
    setParams(filmPresets[key])
  }

  const toggleNodeBypass = (nodeId) => {
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, bypassed: !n.bypassed } : n))
  }

  // Calculate dynamic canvas styling based on active parameters and node bypasses
  const cstBypassed = nodes.find(n => n.id === 1)?.bypassed
  const exposureBypassed = nodes.find(n => n.id === 2)?.bypassed
  const skinBypassed = nodes.find(n => n.id === 3)?.bypassed
  const curveBypassed = nodes.find(n => n.id === 4)?.bypassed
  const printBypassed = nodes.find(n => n.id === 5)?.bypassed
  const grainBypassed = nodes.find(n => n.id === 6)?.bypassed

  const contrastVal = curveBypassed ? 1 : params.contrast
  const satVal = printBypassed ? 0.7 : params.saturation
  const brightnessVal = exposureBypassed ? 1 : 1 + params.exposure
  const hueRotateVal = skinBypassed ? 0 : params.tint
  const sepiaVal = params.temp > 0 ? (params.temp / 100) * 0.4 : 0

  const handleCopyLUT = () => {
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2500)
  }

  return (
    <section id="lab" className="section relative bg-[#06070a]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex items-start gap-4 md:gap-6 mb-8 md:mb-12">
          <TextReveal type="slideUp" className="text-section-number">03</TextReveal>
          <div>
            <TextReveal type="slideUp" delay={0.1}>
              <h2 className="text-display-lg mb-3">INTERACTIVE COLOR LAB</h2>
            </TextReveal>
            <TextReveal type="fadeIn" delay={0.2}>
              <p className="text-xs tracking-[0.2em] font-mono text-[#38BDF8]">
                LIVE WEB DAVINCI RESOLVE SUITE & 35mm FILM STOCK EMULATOR
              </p>
            </TextReveal>
          </div>
        </div>

        {/* Top Preset Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 rounded-lg bg-[#0b0d14] border border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs font-mono text-gray-400 font-bold mr-1">// STOCK:</span>
            {Object.keys(filmPresets).map((key) => (
              <button
                key={key}
                onClick={() => handlePresetChange(key)}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                  currentPreset === key
                    ? 'bg-[#38BDF8] text-black font-bold shadow-[0_0_15px_rgba(56, 189, 248,0.4)]'
                    : 'bg-white/[0.04] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {filmPresets[key].name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono flex items-center gap-2 transition-all"
          >
            <span>💾 EXPORT .CUBE 3D LUT</span>
          </button>
        </div>

        {/* Main Color Suite Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left / Center: Interactive Grade Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div
              className="relative w-full overflow-hidden rounded-lg border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              style={{
                aspectRatio: '16/9',
                background: '#040508'
              }}
            >
              {/* Dynamic Graded Film Viewport */}
              <div
                className="w-full h-full relative overflow-hidden flex items-center justify-center transition-all duration-150"
                style={{
                  filter: `contrast(${contrastVal}) saturate(${satVal}) brightness(${brightnessVal}) hue-rotate(${hueRotateVal}deg) sepia(${sepiaVal})`,
                  background: 'linear-gradient(135deg, #091a28 0%, #1c152b 50%, #2b1c15 100%)'
                }}
              >
                {/* Visual Subject Representation */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(56, 189, 248,0.4)_0%,transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(74,158,173,0.35)_0%,transparent_50%)]" />

                {/* Silhouette & Lighting Cast */}
                <div className="relative z-10 text-center px-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-[#08090e] border border-white/10 flex items-center justify-center shadow-2xl mb-3">
                    <span className="text-3xl">🎭</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-display text-white tracking-widest uppercase drop-shadow-md">
                    {params.name}
                  </h3>
                  <p className="text-[10px] font-mono text-gray-300 mt-1">
                    ACTIVE GRADE: EXP {params.exposure > 0 ? `+${params.exposure}` : params.exposure} EV • CONTRAST {params.contrast}x • SAT {Math.round(params.saturation * 100)}%
                  </p>
                </div>

                {/* Halation Glow Simulation */}
                {!grainBypassed && params.halation > 0 && (
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, rgba(255, 60, 0, ${params.halation / 200}) 0%, transparent 60%)`
                    }}
                  />
                )}

                {/* 35mm Grain Texture Overlay */}
                {!grainBypassed && params.grain > 0 && (
                  <div
                    className="absolute inset-0 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]"
                    style={{ opacity: (params.grain / 100) * 0.25 }}
                  />
                )}

                {/* Live ACES Status Watermark */}
                <div className="absolute top-3 left-3 bg-black/75 px-2.5 py-1 rounded border border-white/10 font-mono text-[9px] text-[#38BDF8] tracking-wider">
                  ACEScc 1.3 • {cstBypassed ? 'LOGC3 RAW' : 'ACES COLOR MANAGED'}
                </div>
              </div>
            </div>

            {/* Film Stock Description Banner */}
            <div className="p-3.5 rounded bg-black/40 border border-white/10">
              <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-widest block mb-1">
                // STOCK PROFILE CHARACTERISTICS
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">
                {params.desc}
              </p>
            </div>
          </div>

          {/* Right: Master Control Wheels & Sliders */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-5 rounded-lg bg-[#0b0d14] border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono font-bold tracking-wider text-white">
                  PRIMARY COLOR CONTROLS
                </span>
                <button
                  onClick={() => setParams(filmPresets[currentPreset])}
                  className="text-[10px] font-mono text-gray-400 hover:text-[#38BDF8] transition-colors"
                >
                  RESET DEFAULTS
                </button>
              </div>

              {/* Exposure Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>EXPOSURE (OFFSET)</span>
                  <span className="text-cyan-400 font-bold">{params.exposure > 0 ? `+${params.exposure}` : params.exposure} EV</span>
                </div>
                <input
                  type="range"
                  min="-1.5"
                  max="1.5"
                  step="0.05"
                  value={params.exposure}
                  onChange={(e) => setParams({ ...params, exposure: parseFloat(e.target.value) })}
                  className="w-full accent-[#38BDF8] cursor-pointer"
                />
              </div>

              {/* Contrast Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>CONTRAST (PIVOT)</span>
                  <span className="text-cyan-400 font-bold">{params.contrast}x</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.9"
                  step="0.05"
                  value={params.contrast}
                  onChange={(e) => setParams({ ...params, contrast: parseFloat(e.target.value) })}
                  className="w-full accent-[#38BDF8] cursor-pointer"
                />
              </div>

              {/* Saturation Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>SATURATION</span>
                  <span className="text-cyan-400 font-bold">{Math.round(params.saturation * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2.0"
                  step="0.05"
                  value={params.saturation}
                  onChange={(e) => setParams({ ...params, saturation: parseFloat(e.target.value) })}
                  className="w-full accent-[#38BDF8] cursor-pointer"
                />
              </div>

              {/* Color Temperature / Warmth */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>TEMPERATURE (WARMTH)</span>
                  <span className="text-[#38BDF8] font-bold">{params.temp > 0 ? `+${params.temp}` : params.temp} K</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={params.temp}
                  onChange={(e) => setParams({ ...params, temp: parseInt(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* 35mm Grain Density */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>35mm FILM GRAIN DENSITY</span>
                  <span className="text-gray-400 font-bold">{params.grain}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={params.grain}
                  onChange={(e) => setParams({ ...params, grain: parseInt(e.target.value) })}
                  className="w-full accent-gray-400 cursor-pointer"
                />
              </div>

              {/* Optical Halation Bloom */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>OPTICAL HALATION BLOOM</span>
                  <span className="text-red-400 font-bold">{params.halation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={params.halation}
                  onChange={(e) => setParams({ ...params, halation: parseInt(e.target.value) })}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DaVinci Resolve Node Tree Pipeline Simulator */}
        <div className="p-6 rounded-xl bg-[#080a10] border border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#38BDF8] uppercase block">
                DAVINCI RESOLVE STUDIO NODE PIPELINE
              </span>
              <p className="text-xs text-gray-400 mt-0.5">
                Click any node to inspect or toggle the <span className="text-red-400 font-mono">BYPASS (MUTE)</span> state to preview its visual contribution.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-black/60 border border-white/10 text-cyan-400">
              NON-DESTRUCTIVE 32-BIT FLOAT PIPELINE
            </span>
          </div>

          {/* Node Graph Grid */}
          <div className="auto-marquee auto-marquee--left">
            <div className="auto-marquee__track gap-3 pr-3">
            {[...nodes, ...nodes].map((node, index) => (
              <motion.div
                key={`${node.id}-${index}`}
                onClick={() => setActiveNode(node.id)}
                data-cursor="NODE"
                whileHover={{ y: -6, scale: 1.035 }}
                className={`auto-marquee__item relative cursor-pointer rounded-lg border p-3 transition-all ${
                  activeNode === node.id
                    ? 'bg-[#101420] border-[#38BDF8] shadow-[0_0_20px_rgba(56, 189, 248,0.2)]'
                    : 'bg-[#0b0d14] border-white/10 hover:border-white/25'
                }`}
              >
                {/* Node Top Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-[#38BDF8]">
                    {node.name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleNodeBypass(node.id)
                    }}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase transition-all ${
                      node.bypassed
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}
                    title="Toggle Node Bypass"
                  >
                    {node.bypassed ? 'MUTED' : 'ACTIVE'}
                  </button>
                </div>

                <div className="text-xs font-medium text-white mb-1">
                  {node.type}
                </div>
                <p className="text-[9px] text-gray-400 leading-tight">
                  {node.desc}
                </p>

                {/* Simulated DaVinci RGB Node Output Dot */}
                <div className="flex items-center gap-1 mt-3 pt-2 border-t border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-[8px] font-mono text-gray-500 ml-auto">RGB</span>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>

      </div>

      {/* Export LUT Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-lg w-full p-6 md:p-8 rounded-xl bg-[#0d1018] border border-[#38BDF8]/40 shadow-[0_0_50px_rgba(56, 189, 248,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowExportModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
              >
                ✕
              </button>

              <div className="mb-4">
                <span className="text-xs font-mono tracking-widest text-[#38BDF8]">
                  3D CUBE LUT GENERATOR
                </span>
                <h3 className="text-2xl font-display text-white mt-1">
                  Export {params.name} Grade
                </h3>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                This 3D LUT is calibrated for <strong className="text-white">DaVinci Resolve Studio, Premiere Pro, Final Cut Pro, and ACES 1.3 pipelines</strong>.
              </p>

              <div className="p-4 rounded bg-black/60 border border-white/10 font-mono text-[11px] text-cyan-300 space-y-1 mb-6">
                <div># LUT Size: 33x33x33 3D CUBE</div>
                <div># Target Color Space: Rec.709 D65 / ACEScc</div>
                <div># Exposure Shift: {params.exposure} EV</div>
                <div># Contrast Pivot: {params.contrast}x</div>
                <div># Emulation: {params.name}</div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCopyLUT}
                  className="flex-1 py-2.5 rounded bg-[#38BDF8] hover:bg-[#7DD3FC] text-black font-semibold text-xs font-mono tracking-wider transition-all"
                >
                  {isCopied ? '✓ RECIPE COPIED TO CLIPBOARD' : 'COPY 3D LUT RECIPE'}
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-5 py-2.5 rounded bg-white/10 text-white text-xs font-mono hover:bg-white/20 transition-all"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-divider mt-16 md:mt-24" />
    </section>
  )
}
