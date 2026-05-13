import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Clock } from "lucide-react";

type Status = "Pending" | "Ongoing" | "Completed";

const ORDERS: { id: string; name: string; tailor: string; avatar: string; eta: string; status: Status }[] = [
  {
    id: "ISJQ-2026-0324-qcaeg1",
    name: "My siu style",
    tailor: "Freddy Han",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=70",
    eta: "-- -- --",
    status: "Pending",
  },
  {
    id: "ISJQ-2026-0301-aabbc2",
    name: "Aso ebi flow",
    tailor: "Lola Ade",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=70",
    eta: "Apr 14",
    status: "Ongoing",
  },
  {
    id: "ISJQ-2025-1218-zzqq9",
    name: "Linen suit",
    tailor: "Tobi M.",
    avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&q=70",
    eta: "Dec 22",
    status: "Completed",
  },
];

const TABS: Status[] = ["Pending", "Ongoing", "Completed"];

function OrdersPage() {
  const [tab, setTab] = useState<Status>("Pending");
  const filtered = ORDERS.filter((o) => o.status === tab);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-bold">Orders</h1>

      {/* Tabs */}
      <div className="relative mt-6 flex rounded-full bg-muted p-1">
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="orders-tab"
                  className="absolute inset-0 rounded-full bg-card shadow-soft"
                  transition={{ type: "spring", stiffness: 360, damping: 32 }}
                />
              )}
              <span className="relative z-10">{t}</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="mt-6 space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center text-sm text-muted-foreground"
            >
              No {tab.toLowerCase()} orders yet.
            </motion.div>
          ) : (
            filtered.map((o, i) => (
              <motion.div
                key={o.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to="/dashboard/orders/$orderId"
                  params={{ orderId: o.id }}
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elegant"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-display text-base font-semibold">{o.name}</div>
                    </div>
                    <div className="mt-2 flex items-center gap-2.5">
                      <img src={o.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                      <div className="min-w-0">
                        <div className="text-sm text-muted-foreground">{o.tailor}</div>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground/80">
                          <Clock size={11} /> ETA {o.eta}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        o.status === "Pending"
                          ? "bg-accent/30 text-primary"
                          : o.status === "Ongoing"
                          ? "bg-primary/10 text-primary"
                          : "bg-success/15 text-success"
                      }`}
                    >
                      {o.status}
                    </span>
                    <ChevronRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_dashboard/dashboard/orders")({
  component: OrdersPage,
});
