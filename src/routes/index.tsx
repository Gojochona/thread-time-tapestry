import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShieldCheck, MapPin, Sparkles, Users, CreditCard, Truck, Store,
  ChevronRight, Star, Plus, Minus, Scissors,
} from "lucide-react";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Blobs } from "../components/Blobs";
import { Button } from "../components/Button";
import { PaymentMethodsRow } from "../components/PaymentIcons";
import heroImg from "../assets/hero-tailor.jpg";
import showcase1 from "../assets/showcase-1.jpg";
import showcase2 from "../assets/showcase-2.jpg";
import showcase3 from "../assets/showcase-3.jpg";
import stressRelief from "../assets/stress-relief.jpg";
import story1 from "../assets/story-1.jpg";
import story2 from "../assets/story-2.jpg";
import isewMark from "../assets/isew-mark.png";

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
  transition: { duration: 0.6,  },
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
            transition={{ duration: 0.8,  }}
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

function SayGoodbye() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Blobs />
      <div className="absolute inset-0 -z-10 mesh-bg opacity-60" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">A new era of bespoke</p>
            <h2 className="mt-4 font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
              Say goodbye to
              <br />
              <span className="relative inline-block">
                <span className="text-gradient-accent italic">tailoring stress.</span>
                {/* Sewing thread + needle overlay */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-4 right-0 top-1/2 h-[60px] w-[112%] -translate-y-1/2 overflow-visible"
                  viewBox="0 0 400 60"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 38 C 50 8, 110 58, 170 30 S 290 6, 360 34"
                    stroke="currentColor"
                    className="text-accent"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="6 5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                  />
                  {/* Needle attached at the end of the thread */}
                  <motion.g
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.4, duration: 0.4 }}
                    transform="translate(360 34) rotate(20)"
                  >
                    {/* Needle eye */}
                    <ellipse cx="2" cy="0" rx="4" ry="3" fill="none" stroke="currentColor" className="text-primary" strokeWidth="1.5" />
                    <line x1="2" y1="-1.2" x2="2" y2="1.2" stroke="currentColor" className="text-primary" strokeWidth="1.2" />
                    {/* Needle shaft */}
                    <line x1="6" y1="0" x2="44" y2="0" stroke="currentColor" className="text-primary" strokeWidth="2.2" strokeLinecap="round" />
                    {/* Sharp tip */}
                    <polygon points="44,-2 50,0 44,2" fill="currentColor" className="text-primary" />
                  </motion.g>
                </svg>
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              No more missed deadlines, mismatched fabrics or awkward fittings. i-sew brings the entire experience —
              from inspiration to final stitch — into one calm, beautifully orchestrated journey.
            </p>
            <div className="mt-8 grid max-w-md gap-4 sm:grid-cols-2">
              {[
                { k: "Zero", v: "missed deadlines" },
                { k: "100%", v: "verified tailors" },
                { k: "Escrow", v: "secured payments" },
                { k: "14 days", v: "free re-tailoring" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
                  <div className="font-display text-2xl font-bold text-gradient">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Editorial layered photo composition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto h-[520px] w-full max-w-md"
          >
            <div className="absolute left-2 top-6 h-72 w-52 -rotate-6 overflow-hidden rounded-[2rem] shadow-elegant">
              <img src={showcase1} alt="" className="h-full w-full object-cover" loading="lazy" />
              <span className="tape -top-2 left-6 -rotate-6" />
            </div>
            <div className="absolute right-0 top-0 h-80 w-56 rotate-3 overflow-hidden rounded-[2rem] shadow-elegant">
              <img src={stressRelief} alt="Calm tailoring experience" className="h-full w-full object-cover" loading="lazy" />
              <span className="tape -top-2 right-6 rotate-6" />
            </div>
            <div className="absolute bottom-0 left-1/2 h-64 w-56 -translate-x-1/2 rotate-1 overflow-hidden rounded-[2rem] shadow-elegant">
              <img src={story2} alt="" className="h-full w-full object-cover" loading="lazy" />
              <span className="tape -top-2 left-1/2 -translate-x-1/2 -rotate-2" />
            </div>
            <div className="float glass absolute -right-2 bottom-12 rounded-2xl p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-accent text-primary">
                  <Sparkles size={16} />
                </div>
                <div className="text-xs">
                  <div className="font-semibold">Stress-free</div>
                  <div className="text-muted-foreground">end-to-end</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Users, title: "Find trusted tailors", desc: "Hand-vetted master craftsmen rated by real customers." },
    { icon: ShieldCheck, title: "Already know a tailor?", desc: "Invite yours and run the entire order through i-sew." },
    { icon: CreditCard, title: "Pay with confidence", desc: "Funds held in escrow until you approve the finished piece." },
    { icon: Truck, title: "Trace every step", desc: "Real-time updates from measurement to final stitch." },
    { icon: Store, title: "Fabric marketplace", desc: "Curated textiles delivered straight to your tailor." },
  ];
  return (
    <section id="features" className="relative overflow-hidden py-24 sm:py-32">
      <Blobs />
      <div className="absolute inset-0 -z-10 mesh-bg opacity-50" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Everything you need</p>
          <h2 className="mt-3 font-display text-5xl font-bold sm:text-6xl">
            All in <span className="text-gradient-accent italic">one place</span>
          </h2>
          <p className="mt-4 text-muted-foreground">A focused toolkit for ordering bespoke without the back-and-forth.</p>
        </motion.div>
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/80 p-7 shadow-soft backdrop-blur transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <span className="bg-numeral absolute right-4 top-4 select-none">{i + 1}</span>
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                  <it.icon size={22} />
                </div>
                <h3 className="font-display text-2xl font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              </div>
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
    <section id="showcase" className="relative overflow-hidden py-24 sm:py-32">
      <Blobs />
      <div className="mx-auto max-w-7xl px-6 relative">
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
    { quote: "Finally a platform that respects both customers and craftsmen. Payments are seamless.", name: "Tope A.", role: "Master tailor" },
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

function StorySection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-cream">
      <Blobs variant="rich" />
      <div className="absolute inset-0 -z-10 mesh-bg opacity-70" />
      <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Our story</p>
          <h2 className="mt-3 font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            Behind every number
            <br />
            is a <span className="text-gradient-accent italic">story.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            7,000+ wardrobes. 450+ master tailors. Thousands of late-night fittings, hand-pulled threads and finished pieces
            — every order is a relationship, every stitch a small act of trust.
          </p>
        </motion.div>

        {/* 4-photo composition with centered i-sew emblem */}
        <div className="relative mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:gap-6">
          <motion.div {...fadeUp} className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img src={story1} alt="Master tailor at work" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img src={showcase2} alt="" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img src={story2} alt="" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img src={stressRelief} alt="" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>

          {/* centered i-sew emblem */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="stitch stitch-light flex h-28 w-28 items-center justify-center rounded-full bg-card shadow-elegant sm:h-36 sm:w-36">
              <img src={isewMark} alt="i-sew" className="h-16 w-16 sm:h-20 sm:w-20 object-contain" />
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeUp} className="mt-14 grid gap-6 sm:grid-cols-3">
          {[
            { n: "7,000+", l: "Wardrobes crafted" },
            { n: "450+", l: "Master tailors" },
            { n: "96%", l: "Satisfaction rate" },
          ].map((s) => (
            <div key={s.l} className="rounded-3xl border border-border bg-card/80 p-6 text-center backdrop-blur shadow-soft">
              <div className="font-display text-4xl font-bold text-gradient">{s.n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PaymentsBand() {
  return (
    <section className="relative overflow-hidden py-16">
      <Blobs />
      <div className="mx-auto max-w-5xl px-6 text-center relative">
        <motion.p {...fadeUp} className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          <Scissors size={12} className="mr-2 inline -translate-y-px text-accent" />
          Secure checkout — pay your way
        </motion.p>
        <motion.h3 {...fadeUp} className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
          Every major payment method, beautifully handled.
        </motion.h3>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-8 flex justify-center">
          <PaymentMethodsRow />
        </motion.div>
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
        <SayGoodbye />
        <Features />
        <HowItWorks />
        <Showcase />
        <StorySection />
        <Testimonials />
        <PaymentsBand />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
