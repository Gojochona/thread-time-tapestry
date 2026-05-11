import { motion } from "framer-motion";
import logoSrc from "../assets/logo.png";

export function Logo({ className = "h-9 w-auto" }: any) {
  return (
    <img src={logoSrc} alt="i-sew" className={className} />
  );
}

export function AnimatedLogo({ className }: any) {
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
