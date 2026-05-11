import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShieldCheck, MapPin, Sparkles, Users, CreditCard, Truck, Store,
  ChevronRight, Star, Plus, Minus,
} from "lucide-react";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Blobs } from "../components/Blobs";
import { Button } from "../components/Button";
import heroImg from "../assets/hero-tailor.jpg";
import showcase1 from "../assets/showcase-1.jpg";
import showcase2 from "../assets/showcase-2.jpg";
import showcase3 from "../assets/showcase-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "i-sew — Custom tailoring, without the stress" },
      { name: "description", content: "Order bespoke outfits from verified tailors. Secure payments, transparent tracking and a curated marketplace of master craftsmen." },
      { property: "og:title", content: "i-sew — Custom tailoring, without the stress" },
      { property: "og:description", content: "Bespoke clothing from verified tailors. Order, track and enjoy." },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <Blobs />
      <div className="gradient-hero absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div {...fadeUp} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles size={14} className="text-accent" />
              Trusted by 7k+ customers worldwide
            </motion.div>
            <motion.h1 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} className="mt-6 font-display text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Custom tailoring,
              <br />
              <span className="text-gradient-accent italic">without the stress.</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-6 max-w-xl text-lg text-muted-foreground">
              The marketplace where bespoke clothing gets done right. Verified tailors, secure payments, transparent timelines.
            </motion.p>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button variant="primary" size="lg">
                  Get started <ChevronRight size={18} />
                </Button>
              </Link>
              <a href="#how">
                <Button variant="outline" size="lg">How it works</Button>
              </a>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[{ n: "7k+", l: "Customers" }, { n: "450+", l: "Tailors" }, { n: "96%", l: "Satisfaction" }].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-bold text-gradient">{s.n}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-elegant">
              <img src={heroImg} alt="Bespoke tailor at work" className="h-[560px] w-full object-cover" width={1280} height={1600} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>

            <motion.div className="float glass absolute -bottom-6 -left-6 rounded-2xl p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-accent text-primary">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-sm font-semibold">Verified tailor</div>
                  <div className="text-xs text-muted-foreground">Master craftsman • 4.9★</div>
                </div>
              </div>
            </motion.div>
            <motion.div className="float glass absolute -right-4 top-10 rounded-2xl p-4 shadow-soft" style={{ animationDelay: "-3s" }}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Truck size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold">ETA 3 days</div>
                  <div className="text-xs text-muted-foreground">Order #A2841 • 71%</div>
                </div>
              </div>
              <div className="mt-2 h-1.5 w-44 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[71%] rounded-full bg-success" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Users, title: "Find trusted tailors", desc: "Hand-vetted master craftsmen rated by real customers." },
    { icon: CreditCard, title: "Pay with confidence", desc: "Funds held in escrow until you approve the finished piece." },
    { icon: Truck, title: "Track every step", desc: "Real-time updates from measurement to final stitch." },
    { icon: Store, title: "Fabric marketplace", desc: "Curated textiles delivered straight to your tailor." },
  ];
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Everything you need</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">All in one place</h2>
          <p className="mt-4 text-muted-foreground">A focused toolkit for ordering bespoke without the back-and-forth.</p>
        </motion.div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                <it.icon size={22} />
              </div>
              <h3 className="font-display text-xl font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Tell us your vision", desc: "Upload inspiration, choose a style and pick your fabric — we guide every choice." },
    { n: "02", title: "Match with a tailor", desc: "Our system pairs you with a verified tailor that matches your style and budget." },
    { n: "03", title: "Receive & enjoy", desc: "Track every stitch and approve the final piece before payment is released." },
  ];
  return (
    <section id="how" className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 30% 20%, white, transparent 50%)" }} />
      <div className="mx-auto max-w-7xl px-6 relative">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">How it works</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">From idea to wardrobe in three steps</h2>
        </motion.div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={s.n} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-all hover:bg-white/10">
              <div className="font-display text-6xl font-bold text-accent/80">{s.n}</div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-primary-foreground/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const cards = [
    { img: showcase2, name: "Freddy Han", spec: "Aso Ebi specialist", rating: 4.9, price: "from $120" },
    { img: showcase3, name: "Marco Bianchi", spec: "Bespoke suits", rating: 5.0, price: "from $480" },
    { img: showcase1, name: "Amaka Okafor", spec: "Couture & alterations", rating: 4.8, price: "from $95" },
  ];
  return (
    <section id="showcase" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Master tailors</p>
            <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Meet our top tailors</h2>
          </div>
          <Button variant="outline">Browse all tailors</Button>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div key={c.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative h-80 overflow-hidden">
                <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                  <Star size={12} className="fill-accent text-accent" /> {c.rating}
                </div>
                <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-success/90 px-3 py-1 text-xs font-semibold text-white">
                  <ShieldCheck size={12} /> Verified
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                  <span className="text-sm font-semibold text-primary">{c.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">{c.spec}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin size={12} /> Lagos, Nigeria
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const ts = [
    { quote: "Game changer. The fit, the fabric, the follow-through — better than my Saville Row tailor.", name: "Daniel Mensah", role: "Architect, Accra" },
    { quote: "I uploaded a Pinterest board and got a perfect Aso Ebi for my wedding. Pure magic.", name: "Adaeze N.", role: "Bride, Lagos" },
    { quote: "Finally a platform that respects both customers and craftsmen. Payments are seamless.", name: "Tope A.", role: "Master tailor", },
  ];
  return (
    <section id="testimonials" className="py-24 bg-cream">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Testimonies</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Loved by people who care about fit</h2>
        </motion.div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ts.map((t, i) => (
            <motion.figure key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="rounded-3xl bg-card p-7 shadow-soft">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} className="fill-current" />)}
              </div>
              <blockquote className="mt-4 font-display text-lg leading-snug">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm">
                <div className="font-semibold">{t.name}</div>
                <div className="text-muted-foreground">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "How are tailors verified?", a: "Every tailor goes through portfolio review, ID verification and a craftsmanship test before joining." },
    { q: "What if I'm not happy with the result?", a: "Funds stay in escrow until you approve. We mediate disputes and offer free re-tailoring within 14 days." },
    { q: "Do you ship internationally?", a: "Yes. Orders ship from your tailor's atelier worldwide via tracked courier." },
    { q: "Can I provide my own fabric?", a: "Absolutely — or order curated textiles from our marketplace and we'll route them to your tailor." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div {...fadeUp} className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Questions, answered</h2>
        </motion.div>
        <div className="mt-12 space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                  <span className="font-display text-lg font-semibold">{it.q}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {isOpen && <div className="px-5 pb-5 text-sm text-muted-foreground">{it.a}</div>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 pb-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] gradient-primary p-10 text-primary-foreground shadow-elegant sm:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">Style delivered to your inbox.</h2>
            <p className="mt-3 text-primary-foreground/80">Curated drops, tailor spotlights and members-only fabrics. No spam, ever.</p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="you@email.com" className="h-13 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent" />
            <Button variant="accent" size="lg">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Showcase />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
