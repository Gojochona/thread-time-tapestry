import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Clock } from "lucide-react";
import { getStage, type Stage } from "@/features/dashboard/orders/orderStage";

type Status = "Pending" | "Ongoing" | "Completed";

type Order = {
  id: string;
  name: string;
  tailor: string;
  avatar: string;
  eta: string;
  status: Status;
  progress?: number; // 0-100
  progressLabel?: string;
};

const SEED: Order[] = [
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
    name: "Aso Ebi",
    tailor: "Freddy Han",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=70",
    eta: "1 day",
    status: "Ongoing",
    progress: 97,
    progressLabel: "Started work",
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

const STAGE_TO_STATUS: Record<Stage, { status: Status; progress?: number; label?: string; eta?: string }> = {
  review: { status: "Pending" },
  confirmed: { status: "Pending" },
  awaiting_fabric: { status: "Ongoing", progress: 10, label: "Not started", eta: "-- -- --" },
  fabric_sent: { status: "Ongoing", progress: 15, label: "Not started", eta: "-- -- --" },
  work_started: { status: "Ongoing", progress: 30, label: "Started work", eta: "6 days" },
  cutting_done: { status: "Ongoing", progress: 60, label: "Started work", eta: "3 days" },
  ready_for_ack: { status: "Ongoing", progress: 100, label: "Awaiting", eta: "0 day" },
  closed: { status: "Completed", progress: 100, label: "Completed", eta: "Done" },
};

export function OrdersListPage() {
  const [tab, setTab] = useState<Status>("Ongoing");
  const [orders, setOrders] = useState<Order[]>(SEED);

  // Apply stored stage overrides
  useEffect(() => {
    const apply = () => {
      setOrders((prev) =>
        prev.map((o) => {
          const stg = getStage(o.id);
          const m = STAGE_TO_STATUS[stg];
          if (!m) return o;
          return {
            ...o,
            status: m.status,
            progress: m.progress ?? o.progress,
            progressLabel: m.label ?? o.progressLabel,
            eta: m.eta ?? o.eta,
          };
        }),
      );
    };
    apply();
    const onStage = () => apply();
    window.addEventListener("order-stage", onStage);
    return () => window.removeEventListener("order-stage", onStage);
  }, []);

  const filtered = orders.filter((o) => o.status === tab);

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
                  className="group block rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elegant"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-display text-base font-semibold">{o.name}</div>
                    <ChevronRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>

                  <div className="mt-2 flex items-center gap-2.5">
                    <img src={o.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-muted-foreground">{o.tailor}</div>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground/80">
                        <Clock size={11} /> ETA - {o.eta}
                      </div>
                    </div>
                    {o.status === "Ongoing" && o.progressLabel && (
                      <span
                        className={`text-xs font-medium ${
                          o.progress && o.progress >= 95
                            ? "text-success"
                            : o.progressLabel === "Started work"
                            ? "text-success"
                            : "text-amber-500"
                        }`}
                      >
                        {o.progress && o.progress >= 95 ? `${o.progress}%` : o.progressLabel}
                      </span>
                    )}
                    {o.status === "Pending" && (
                      <span className="rounded-full bg-accent/30 px-2.5 py-1 text-[11px] font-medium text-primary">Pending</span>
                    )}
                    {o.status === "Completed" && (
                      <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-medium text-success">Completed</span>
                    )}
                  </div>

                  {o.status === "Ongoing" && (
                    <div className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${o.progress ?? 0}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          (o.progress ?? 0) >= 95 ? "bg-success" : (o.progress ?? 0) >= 25 ? "bg-success" : "bg-amber-500"
                        }`}
                      />
                      {[25, 50, 75].map((p) => (
                        <span
                          key={p}
                          className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-card"
                          style={{ left: `${p}%` }}
                        />
                      ))}
                    </div>
                  )}
                </Link>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
