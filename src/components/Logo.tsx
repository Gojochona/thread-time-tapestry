import { motion } from "framer-motion";

export function Logo({ className = "h-9 w-auto", showWordmark = true }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 60 60" className="h-9 w-9" aria-hidden="true">
        <defs>
          <linearGradient id="lg-orange" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.18 65)" />
            <stop offset="100%" stopColor="oklch(0.65 0.2 40)" />
          </linearGradient>
        </defs>
        <circle cx="30" cy="10" r="3.5" fill="oklch(0.65 0.2 40)" />
        <path d="M30 16 L30 50" stroke="oklch(0.34 0.15 264)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M14 38 C 14 52, 46 52, 46 38" stroke="url(#lg-orange)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M44 36 L50 32 L48 40 Z" fill="oklch(0.65 0.2 40)" />
      </svg>
      {showWordmark && (
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          i-<span className="text-gradient-accent">sew</span>
        </span>
      )}
    </div>
  );
}

export function AnimatedLogo({ className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo className={className} />
    </motion.div>
  );
}
