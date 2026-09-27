"use client"

import { motion } from "framer-motion"

export default function PremiumBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#030712]" />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.26),transparent_40%)]"
        animate={{ opacity: [0.7, 1, 0.75], scale: [1, 1.05, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.24),transparent_42%)]"
        animate={{ opacity: [0.65, 0.95, 0.7], x: [0, -16, 0], y: [0, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.2),transparent_42%)]"
        animate={{ opacity: [0.55, 0.9, 0.6], x: [0, 14, 0], y: [0, -12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:34px_34px] opacity-20" />
      <div className="absolute left-[8%] top-[14%] h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute right-[8%] top-[28%] h-44 w-44 rounded-full bg-fuchsia-400/20 blur-3xl" />
      <div className="absolute bottom-[12%] left-[30%] h-48 w-48 rounded-full bg-emerald-400/15 blur-3xl" />

      <div className="absolute inset-0 backdrop-blur-[120px]" />
    </div>
  )
}
