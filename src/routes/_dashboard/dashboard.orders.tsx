import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";

function Placeholder({ title }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl">
      <div className="rounded-3xl border border-border bg-card p-12 text-center shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-accent text-primary">
          <Construction size={28} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-muted-foreground">This section is coming soon. We're crafting something beautiful here.</p>
      </div>
    </motion.div>
  );
}

export const Route = createFileRoute("/_dashboard/dashboard/orders")({
  component: () => <Placeholder title="Orders" />,
});
