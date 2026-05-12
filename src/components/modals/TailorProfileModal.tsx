import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { Star, CheckCircle2, MapPin, Clock, Truck, MessageSquare } from "lucide-react";

const tabs = ["Overview", "Portfolio", "Reviews"] as const;
type Tab = typeof tabs[number];

export function TailorProfileModal({ open, onClose, tailor, onOrder }: any) {
  const [tab, setTab] = useState<Tab>("Overview");
  if (!tailor) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      footer={
        <Button variant="primary" className="w-full" onClick={onOrder}>
          Order from {tailor.name.split(" ")[0]}
        </Button>
      }
    >
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl gradient-primary">
          <div className="flex h-full w-full items-center justify-center font-display text-2xl font-bold text-primary-foreground">
            {tailor.initials}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-bold">{tailor.name}</h2>
            {tailor.verified && <CheckCircle2 size={18} className="text-success" />}
          </div>
          <p className="text-sm text-muted-foreground">{tailor.shop}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Star size={12} className="fill-accent text-accent" /> {tailor.rating} ({tailor.reviews?.length ?? 0})</span>
            <span className="inline-flex items-center gap-1"><MapPin size={12} /> {tailor.distance}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Quick icon={MessageSquare} label="Replies in" value={tailor.replyTime} />
        <Quick icon={Truck} label="Delivers in" value={tailor.delivery} />
      </div>

      <div className="sticky top-0 z-10 -mx-5 mt-5 bg-card px-5 sm:-mx-6 sm:px-6">
        <div className="flex gap-1 rounded-full border border-border bg-muted p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="mt-5"
        >
          {tab === "Overview" && (
            <div className="space-y-4 text-sm text-foreground/80">
              <p>{tailor.bio ?? "Master tailor specialising in bespoke menswear and traditional native attire. Over a decade of experience crafting premium garments for clients across Lagos."}</p>
              <div className="grid grid-cols-3 gap-3">
                <Stat label="Orders" value={tailor.orders} />
                <Stat label="On time" value={`${tailor.completion}%`} />
                <Stat label="Repeat" value={`${tailor.repeat ?? 64}%`} />
              </div>
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {(tailor.specialties ?? ["Senator", "Suits", "Native"]).map((s: string) => (
                    <span key={s} className="rounded-full border border-border bg-card px-3 py-1 text-xs">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "Portfolio" && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {(tailor.portfolio ?? Array.from({ length: 6 })).map((p: any, i: number) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-muted">
                  {p ? <img src={p} alt="" className="h-full w-full object-cover" /> : <div className="h-full w-full gradient-primary opacity-30" />}
                </div>
              ))}
            </div>
          )}

          {tab === "Reviews" && (
            <div className="space-y-3">
              {(tailor.reviews ?? defaultReviews).map((r: any, i: number) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="inline-flex items-center gap-1 text-xs">
                      <Star size={12} className="fill-accent text-accent" /> {r.rating}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-foreground/80">{r.text}</p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock size={11} /> {r.date}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
}

const defaultReviews = [
  { name: "Tunde A.", rating: 5, text: "Outstanding craftsmanship — fit was perfect on the first try.", date: "2 weeks ago" },
  { name: "Amaka O.", rating: 4.8, text: "Great communication and delivered ahead of schedule.", date: "1 month ago" },
  { name: "Bayo K.", rating: 5, text: "My go-to tailor in Lagos now. Quality is unmatched.", date: "2 months ago" },
];

function Quick({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-accent text-primary"><Icon size={16} /></div>
      <div>
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 text-center">
      <div className="font-display text-base font-semibold text-primary">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
