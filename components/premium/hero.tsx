"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <div className="text-center max-w-5xl mx-auto py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="text-xs uppercase tracking-[0.3em] text-white/50">ChildDevOS</div>
        <h1 className="mt-5 text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight bg-gradient-to-r from-white via-white to-orange-200 bg-clip-text text-transparent">
          One system for childhood development.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-white/65 max-w-2xl mx-auto leading-7">
          A teacher-first observation layer that turns daily classroom moments into parent-ready reports and a privacy-conscious,
          longitudinal development profile. Assistive insights, not medical advice.
        </p>
      </motion.div>

      <motion.div
        className="mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <a
          href="/dashboard/teacher"
          className="px-6 py-3 rounded-2xl bg-white text-slate-950 font-medium shadow-[0_20px_60px_rgba(255,255,255,0.08)] transition hover:scale-[1.02]"
        >
          Open teacher dashboard
        </a>
        <a
          href="/dashboard/parent"
          className="px-6 py-3 rounded-2xl border border-white/15 bg-white/5 text-white backdrop-blur-xl transition hover:bg-white/8"
        >
          Open parent dashboard
        </a>
      </motion.div>
    </div>
  )
}
