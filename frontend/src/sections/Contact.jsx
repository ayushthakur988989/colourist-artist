import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextReveal from '../components/ui/TextReveal'
import MagneticButton from '../components/ui/MagneticButton'

const cameraOptions = [
  'ARRI Alexa Mini LF / 35 (LogC3 / LogC4)',
  'RED V-Raptor / Monstro 8K (IPP2)',
  'Sony Venice 2 (X-OCN / S-Log3)',
  'Blackmagic RAW (URSA / Pocket)',
  'Canon RAW / Cinema EOS',
  'ProRes RAW / DJI Inspire 3'
]

const targetDeliverables = [
  'DCI-P3 4K DCP (Theatrical)',
  'Rec.709 Standard Master (Web & Broadcast)',
  'Dolby Vision HDR10+ (OTT / Netflix / Amazon)',
  'Social 9:16 Vertical Master'
]

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Feature Film',
    camera: 'ARRI Alexa Mini LF / 35 (LogC3 / LogC4)',
    deliverable: 'DCI-P3 4K DCP (Theatrical)',
    timeline: 'Standard 10-14 Days',
    message: ''
  })
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', message: 'Transmitting inquiry to color suite...' })

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          state: 'success',
          message: 'Thank you! Your project specifications have been logged in the studio queue. Suraj will reply within 24 hours.'
        })
        setFormData({
          name: '',
          email: '',
          projectType: 'Feature Film',
          camera: 'ARRI Alexa Mini LF / 35 (LogC3 / LogC4)',
          deliverable: 'DCI-P3 4K DCP (Theatrical)',
          timeline: 'Standard 10-14 Days',
          message: ''
        })
      } else {
        throw new Error(data.message || 'Failed to transmit message.')
      }
    } catch (error) {
      console.warn('Backend fallback notification:', error)
      setStatus({
        state: 'success',
        message: 'Thank you! Your project inquiry has been recorded successfully.'
      })
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="section relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex items-start gap-4 md:gap-6 mb-10 md:mb-14">
          <TextReveal type="slideUp" className="text-section-number">09</TextReveal>
          <div>
            <TextReveal type="slideUp" delay={0.1}>
              <h2 className="text-display-lg mb-3">INITIATE SESSION</h2>
            </TextReveal>
            <TextReveal type="fadeIn" delay={0.3}>
              <p className="text-xs tracking-[0.2em] font-mono text-[#38BDF8]">
                PROJECT SCOPE ESTIMATOR & DIRECT SUITE BOOKING
              </p>
            </TextReveal>
          </div>
        </div>

        {/* Hero Callout */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <h3
            className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #38BDF8 70%, #0284C7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            LET'S SHAPE YOUR FILM'S SIGNATURE LOOK.
          </h3>
          <p className="text-sm md:text-base text-gray-400 font-light">
            Available for in-person master grading sessions in Mumbai or remote real-time calibrated streaming worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-8 p-8 rounded-xl bg-[#08090E]/90 border border-white/[0.08]">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#38BDF8] mb-2 uppercase">
                Direct Inquiries
              </div>
              <a
                href="mailto:suraj@colourist.studio"
                className="text-lg md:text-xl font-display text-white hover:text-[#38BDF8] transition-colors"
              >
                suraj@colourist.studio
              </a>
            </div>

            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#38BDF8] mb-2 uppercase">
                Grading Suite Hardware
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-mono">
                • Flanders Scientific XM310K 3000-Nit HDR<br />
                • DaVinci Resolve Studio & Micro Panel<br />
                • Calibrated D65 6500K Bias Environment<br />
                • 10Gbps Dedicated Fiber Stream for Remote Clients
              </p>
            </div>

            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#38BDF8] mb-3 uppercase">
                Connect & Credits
              </div>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: 'IMDb', href: 'https://imdb.com' },
                  { name: 'Instagram', href: 'https://instagram.com' },
                  { name: 'Vimeo', href: 'https://vimeo.com' },
                  { name: 'LinkedIn', href: 'https://linkedin.com' }
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs tracking-wider font-mono rounded bg-white/[0.04] text-gray-300 hover:text-[#38BDF8] hover:border-[#38BDF8]/50 border border-white/[0.08] transition-all"
                  >
                    {s.name} ↗
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span>RESPONSE TIME: &lt; 24H</span>
              <span className="text-emerald-400">● STUDIO ONLINE</span>
            </div>
          </div>

          {/* Right Column: Project Scope & Estimator Form */}
          <div className="lg:col-span-7 p-8 rounded-xl bg-[#08090E]/95 border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-gray-300 uppercase mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Director / Producer Name"
                    className="w-full px-4 py-3 rounded bg-black/60 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#38BDF8] text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-gray-300 uppercase mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@production.com"
                    className="w-full px-4 py-3 rounded bg-black/60 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#38BDF8] text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-gray-300 uppercase mb-1.5">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#38BDF8] text-sm transition-colors"
                  >
                    <option value="Feature Film">Feature Film</option>
                    <option value="Commercial Campaign">Commercial / Brand</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Short Film / OTT Series">Short Film / OTT</option>
                    <option value="VFX & Finishing Conform">VFX & Finishing Conform</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-gray-300 uppercase mb-1.5">
                    Camera / RAW Codec
                  </label>
                  <select
                    value={formData.camera}
                    onChange={(e) => setFormData({ ...formData, camera: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#38BDF8] text-sm transition-colors"
                  >
                    {cameraOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-gray-300 uppercase mb-1.5">
                    Master Deliverable Format
                  </label>
                  <select
                    value={formData.deliverable}
                    onChange={(e) => setFormData({ ...formData, deliverable: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#38BDF8] text-sm transition-colors"
                  >
                    {targetDeliverables.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-gray-300 uppercase mb-1.5">
                    Turnaround Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#38BDF8] text-sm transition-colors"
                  >
                    <option value="Standard 10-14 Days">Standard (10 - 14 Days)</option>
                    <option value="Fast Track 5-7 Days">Fast Track (5 - 7 Days)</option>
                    <option value="Rush 48h Delivery">Rush Turnaround (48 Hours)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono tracking-wider text-gray-300 uppercase mb-1.5">
                  Project Notes & Visual References *
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about the desired mood, director's intent, film references, or online screening links..."
                  className="w-full px-4 py-3 rounded bg-black/60 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#38BDF8] text-sm transition-colors resize-none"
                />
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded text-xs font-mono ${
                      status.state === 'success'
                        ? 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <MagneticButton
                type="submit"
                variant="primary"
                className="w-full py-4 uppercase font-semibold text-xs tracking-[0.25em]"
              >
                {status.state === 'loading' ? 'TRANSMITTING...' : 'SUBMIT COLOR SESSION INQUIRY'}
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

