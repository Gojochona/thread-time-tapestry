import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shirt, Scissors, ShieldCheck, MapPin, Plus, ChevronRight, Clock } from "lucide-react";
import { Button } from "../../components/Button";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  component: Overview,
});

function Card({ children, className = "", delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`rounded-3xl border border-border bg-card p-6 shadow-soft ${className}`}>
      {children}
    </motion.div>
  );
}

function Overview() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl gradient-primary p-8 text-primary-foreground shadow-elegant">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm text-primary-foreground/70">Welcome back</p>
            <h1 className="font-display text-4xl font-bold">Hi, Seyi 👋</h1>
            <p className="mt-2 max-w-md text-primary-foreground/80">Order custom outfits from verified tailors and track every stitch.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="accent" size="lg">New order <Plus size={16} /></Button>
            <Button variant="glass" size="lg">Find a tailor</Button>
          </div>
        </div>
      </motion.div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Shirt, title: "Order an outfit", desc: "Pick a style, fabric and tailor.", tone: "primary" },
          { icon: Scissors, title: "Add personal tailor", desc: "Save your trusted tailors.", tone: "accent" },
          { icon: ShieldCheck, title: "Verified tailors", desc: "Browse master craftsmen.", tone: "success" },
          { icon: MapPin, title: "Order tracker", desc: "Real-time updates.", tone: "primary" },
        ].map((q, i) => (
          <Card key={q.title} delay={i * 0.05} className="cursor-pointer hover:-translate-y-1 transition-all hover:shadow-elegant">
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${
              q.tone === "accent" ? "gradient-accent text-primary" : q.tone === "success" ? "bg-success text-white" : "gradient-primary text-primary-foreground"
            }`}>
              <q.icon size={20} />
            </div>
            <h3 className="font-display text-base font-semibold">{q.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{q.desc}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Measurements */}
        <Card delay={0.1} className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">My measurements</h2>
            <Link to="/dashboard/settings" className="text-sm font-semibold text-primary hover:underline">Manage</Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Upper body", "Core fit", "Lower body"].map((t, i) => (
              <button key={t} className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}>{t}</button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { l: "Neck", v: '32.0"' }, { l: "Shoulder", v: '15.5"' },
              { l: "Chest", v: '32.0"' }, { l: "Bicep", v: '15.5"' },
            ].map((m) => (
              <div key={m.l} className="rounded-2xl border border-border bg-background p-4">
                <div className="text-xs text-muted-foreground">{m.l}</div>
                <div className="mt-1 font-display text-2xl font-bold">{m.v}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card delay={0.15}>
          <h2 className="font-display text-xl font-semibold">Notifications</h2>
          <ul className="mt-4 space-y-3">
            {[
              { t: "Order #A2841 is at fitting stage", time: "2h ago", tone: "primary" },
              { t: "Freddy Han accepted your order", time: "5h ago", tone: "success" },
              { t: "New fabric drop: Royal Aso Oke", time: "Yesterday", tone: "accent" },
            ].map((n, i) => (
              <li key={i} className="flex gap-3 rounded-xl p-2 hover:bg-muted">
                <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                  n.tone === "success" ? "bg-success" : n.tone === "accent" ? "bg-accent" : "bg-primary"
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{n.t}</p>
                  <p className="text-xs text-muted-foreground">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Recent orders */}
      <Card delay={0.2}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Recent orders</h2>
          <Link to="/dashboard/orders" className="text-sm font-semibold text-primary hover:underline">View all</Link>
        </div>
        <div className="mt-5 divide-y divide-border">
          {[
            { name: "Aso Ebi · Royal Blue", tailor: "Freddy Han", eta: "3 days", progress: 71 },
            { name: "Bespoke Suit · Charcoal", tailor: "Marco Bianchi", eta: "9 days", progress: 32 },
            { name: "Cocktail Dress · Emerald", tailor: "Amaka Okafor", eta: "5 days", progress: 88 },
          ].map((o, i) => (
            <div key={i} className="flex flex-wrap items-center gap-4 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-cream text-primary">
                <Shirt size={20} />
              </div>
              <div className="flex-1 min-w-[180px]">
                <div className="font-semibold">{o.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2"><Clock size={12} /> ETA {o.eta} · {o.tailor}</div>
              </div>
              <div className="flex-1 min-w-[140px]">
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-success transition-all" style={{ width: `${o.progress}%` }} />
                </div>
                <div className="mt-1 text-right text-xs font-semibold text-success">{o.progress}%</div>
              </div>
              <button className="rounded-full bg-muted p-2 hover:bg-secondary"><ChevronRight size={16} /></button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
