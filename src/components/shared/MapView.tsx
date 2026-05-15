import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

/**
 * Stylised map background with animated tailor pins.
 * SVG-only — no external map provider needed.
 */
export function MapView({
  pins = 6,
  height = "h-72",
  label,
  onPin,
}: {
  pins?: number;
  height?: string;
  label?: string;
  onPin?: (i: number) => void;
}) {
  // deterministic pin positions
  const positions = [
    { x: 28, y: 40 }, { x: 55, y: 30 }, { x: 70, y: 55 },
    { x: 40, y: 65 }, { x: 80, y: 70 }, { x: 18, y: 70 },
    { x: 60, y: 78 }, { x: 35, y: 22 },
  ].slice(0, pins);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-border bg-[#eef2f5] ${height}`}>
      {/* stylised streets */}
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#dbe1e7" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#map-grid)" />
        {/* roads */}
        <path d="M0 90 Q 200 70 400 110" stroke="#cfd6dc" strokeWidth="10" fill="none" />
        <path d="M0 90 Q 200 70 400 110" stroke="#fff" strokeWidth="6" fill="none" />
        <path d="M120 0 Q 150 150 110 300" stroke="#cfd6dc" strokeWidth="10" fill="none" />
        <path d="M120 0 Q 150 150 110 300" stroke="#fff" strokeWidth="6" fill="none" />
        <path d="M260 0 L 280 300" stroke="#cfd6dc" strokeWidth="8" fill="none" />
        <path d="M260 0 L 280 300" stroke="#fff" strokeWidth="5" fill="none" />
        <path d="M0 220 L 400 240" stroke="#cfd6dc" strokeWidth="8" fill="none" />
        <path d="M0 220 L 400 240" stroke="#fff" strokeWidth="5" fill="none" />
        {/* parks / water */}
        <path d="M-10 280 Q 60 250 130 280 L 130 320 L -10 320 Z" fill="#d9ecf2" opacity="0.7" />
        <circle cx="330" cy="60" r="32" fill="#dbe9d6" opacity="0.7" />
      </svg>

      {/* pins */}
      {positions.map((p, i) => (
        <motion.button
          key={i}
          onClick={() => onPin?.(i)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05 * i, type: "spring", stiffness: 280, damping: 18 }}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-primary/30" />
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant ring-2 ring-card">
            <MapPin size={12} />
          </span>
        </motion.button>
      ))}

      {label && (
        <div className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[11px] font-medium shadow-soft backdrop-blur">
          {label}
        </div>
      )}
    </div>
  );
}
