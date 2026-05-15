import { Construction } from "lucide-react";
import { motion } from "framer-motion";

export function TailorsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
      <div className="rounded-3xl border border-border bg-card p-12 text-center shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-accent text-primary"><Construction size={28} /></div>
        <h1 className="mt-6 font-display text-3xl font-bold">My tailors</h1>
        <p className="mt-2 text-muted-foreground">Save and manage your trusted tailors.</p>
      </div>
    </motion.div>
  );
}
 as never); }
