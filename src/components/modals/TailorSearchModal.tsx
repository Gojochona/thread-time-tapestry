import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "./Modal";
import { Search, Star, MapPin, CheckCircle2, Loader2, ChevronRight } from "lucide-react";

const TAILORS = [
  { id: "t1", initials: "AO", name: "Adunni Olawale", shop: "Adunni Bespoke", rating: 4.9, orders: 248, distance: "1.2 km", completion: 98, verified: true },
  { id: "t2", initials: "KE", name: "Kunle Eze", shop: "Royal Stitches", rating: 4.8, orders: 412, distance: "2.4 km", completion: 96, verified: true },
  { id: "t3", initials: "MA", name: "Maryam Ali", shop: "M.A. Couture", rating: 4.7, orders: 187, distance: "3.1 km", completion: 94, verified: false },
  { id: "t4", initials: "TS", name: "Tope Soyinka", shop: "Threadcraft Studio", rating: 4.9, orders: 530, distance: "0.8 km", completion: 99, verified: true },
  { id: "t5", initials: "BJ", name: "Bola Johnson", shop: "Bola J Atelier", rating: 4.6, orders: 92, distance: "4.6 km", completion: 91, verified: false },
];

const types = ["By name", "By location", "By rating"] as const;

export function TailorSearchModal({ open, onClose, onSelect }: any) {
  const [type, setType] = useState<typeof types[number]>("By name");
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setDebounced(query);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    let list = TAILORS.slice();
    if (type === "By rating") list = list.sort((a, b) => b.rating - a.rating);
    if (type === "By location") list = list.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    if (!q) return list;
    return list.filter((t) =>
      type === "By location"
        ? t.distance.toLowerCase().includes(q) || t.shop.toLowerCase().includes(q)
        : type === "By rating"
          ? String(t.rating).includes(q)
          : t.name.toLowerCase().includes(q) || t.shop.toLowerCase().includes(q)
    );
  }, [debounced, type]);

  return (
    <Modal open={open} onClose={onClose} title="Find a tailor" size="lg">
      <div className="flex gap-1 rounded-full border border-border bg-muted p-1">
        {types.map((t) => (
          <button key={t} onClick={() => setType(t)}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
              type === t ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
            }`}>{t}</button>
        ))}
      </div>

      <div className="relative mt-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={type === "By location" ? "Search location…" : type === "By rating" ? "Min rating e.g. 4.7" : "Search tailor name…"}
          className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{loading ? "Searching…" : `${results.length} tailor${results.length === 1 ? "" : "s"} found`}</span>
      </div>

      <div className="mt-2 space-y-2">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 size={20} className="animate-spin" />
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            No tailors match your search.
          </div>
        ) : (
          results.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              onClick={() => onSelect?.(t)}
              className="group flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition-all hover:border-primary/30 hover:shadow-soft"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl gradient-primary">
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-primary-foreground">{t.initials}</div>
                {t.verified && (
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-card p-0.5">
                    <CheckCircle2 size={12} className="text-success" />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="truncate text-sm font-semibold">{t.name}</div>
                </div>
                <div className="truncate text-xs text-muted-foreground">{t.shop}</div>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Star size={11} className="fill-accent text-accent" />{t.rating}</span>
                  <span>{t.orders} orders</span>
                  <span className="inline-flex items-center gap-1"><MapPin size={11} />{t.distance}</span>
                  <span className="hidden sm:inline">{t.completion}% on-time</span>
                </div>
              </div>
              <ChevronRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          ))
        )}
      </div>
    </Modal>
  );
}
