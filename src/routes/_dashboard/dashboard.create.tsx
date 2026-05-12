import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Check, Upload,
  Search, Building2, User, MapPin, Edit3,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { TailorSearchModal } from "../../components/modals/TailorSearchModal";
import { TailorProfileModal } from "../../components/modals/TailorProfileModal";
import { TailorBidModal } from "../../components/modals/TailorBidModal";
import { OrderSummaryModal } from "../../components/modals/OrderSummaryModal";

export const Route = createFileRoute("/_dashboard/dashboard/create")({
  head: () => ({ meta: [{ title: "Create custom outfit — i-sew" }] }),
  component: CreateOrderPage,
});

const steps = ["Outfit category", "Style builder", "Style reference", "Estimated price", "Choose tailor"];

const maleOutfits = ["Senator/native", "Casual", "Suit / Blazer", "Shirt", "Trousers", "Aso Ebi", "Wedding Outfit"];
const femaleOutfits = ["Dress", "Gown", "Native", "Aso Ebi", "Buba", "Wedding Outfit", "Casual"];

const attributes = [
  { key: "neck", label: "Neck style", options: ["Buttoned", "Round", "V-neck", "Mandarin"] },
  { key: "fit", label: "Fit", options: ["Slim", "Regular", "Relaxed"] },
  { key: "sleeve", label: "Sleeve", options: ["Short", "Three-quarter", "Long"] },
  { key: "length", label: "Length", options: ["Short", "Regular", "Long"] },
];

const trendingStyles = [
  "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=400&q=70",
  "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&q=70",
  "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400&q=70",
  "https://images.unsplash.com/photo-1620019124678-d3e3a14f1c83?w=400&q=70",
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=70",
  "https://images.unsplash.com/photo-1614093302611-8efc4de12407?w=400&q=70",
];

function CreateOrderPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // form state
  const [forWho, setForWho] = useState<"myself" | "someone">("myself");
  const [recipient, setRecipient] = useState({ name: "", phone: "", address: "" });
  const [gender, setGender] = useState("");
  const [outfit, setOutfit] = useState("");
  const [attrs, setAttrs] = useState<any>({ neck: 0, fit: 1, sleeve: 2, length: 2 });
  const [reference, setReference] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  // tailor flow state
  const [mode, setMode] = useState<"find" | "fashion-house" | "submit" | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileTailor, setProfileTailor] = useState<any>(null);
  const [bidTailor, setBidTailor] = useState<any>(null);
  const [selectedTailor, setSelectedTailor] = useState<any>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const outfits = gender === "Female" ? femaleOutfits : maleOutfits;
  const attrSummary = attributes.map((a) => `${a.options[attrs[a.key]].toLowerCase()} ${a.label.toLowerCase()}`).join(", ");
  const estimatedPrice = 38000;

  const canNext = (() => {
    if (step === 0) {
      if (forWho === "someone" && (!recipient.name || !recipient.phone)) return false;
      return Boolean(gender && outfit);
    }
    return true;
  })();

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => (step === 0 ? router.history.back() : setStep((s) => Math.max(s - 1, 0)));

  const handleTailorPick = (mode: "find" | "fashion-house" | "submit") => {
    setMode(mode);
    if (mode === "find") setSearchOpen(true);
    if (mode === "fashion-house") {
      setSelectedTailor({ initials: "iS", name: "i-sew Fashion House", shop: "Verified by i-sew" });
      setSummaryOpen(true);
    }
    if (mode === "submit") {
      setSelectedTailor({ initials: "MT", name: "My tailor", shop: "From your saved tailors" });
      setSummaryOpen(true);
    }
  };

  const sendOrder = () => {
    setSummaryOpen(false);
    toast.success("Order sent to tailor", { description: `${selectedTailor?.name} will respond shortly.` });
    setTimeout(() => router.navigate({ to: "/dashboard/orders" }), 600);
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={prev} className="rounded-full p-2 hover:bg-muted"><ArrowLeft size={18} /></button>
        <h1 className="font-display text-2xl font-bold">Create custom outfit</h1>
      </div>

      {/* Stepper */}
      <div className="mt-4">
        <div className="text-sm font-medium text-accent">Step {step + 1}/{steps.length}</div>
        <div className="mt-2 grid grid-cols-5 gap-2">
          {steps.map((_, i) => (
            <div key={i} className="h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={false}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full bg-accent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <Step1
                forWho={forWho} setForWho={setForWho}
                recipient={recipient} setRecipient={setRecipient}
                gender={gender} setGender={setGender}
                outfit={outfit} setOutfit={setOutfit}
                outfits={outfits}
              />
            )}
            {step === 1 && <Step2 attrs={attrs} setAttrs={setAttrs} outfit={outfit} />}
            {step === 2 && <Step3 outfit={outfit} reference={reference} setReference={setReference} notes={notes} setNotes={setNotes} />}
            {step === 3 && (
              <Step4
                price={estimatedPrice}
                attrSummary={attrSummary}
                onPick={handleTailorPick}
              />
            )}
            {step === 4 && (
              <Step5
                onOpenSearch={() => setSearchOpen(true)}
                selected={selectedTailor}
                onReview={() => setSummaryOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav buttons */}
      <div className="mt-6 flex items-center justify-between">
        {step > 0 ? (
          <Button variant="ghost" onClick={prev}><ChevronLeft size={16} /> Previous</Button>
        ) : <span />}
        {step < 3 && (
          <Button variant="primary" onClick={next} disabled={!canNext}>
            Next <ChevronRight size={16} />
          </Button>
        )}
      </div>

      {/* Modals */}
      <TailorSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={(t: any) => { setSearchOpen(false); setProfileTailor(t); }}
      />
      <TailorProfileModal
        open={!!profileTailor}
        onClose={() => setProfileTailor(null)}
        tailor={profileTailor}
        onOrder={() => {
          setBidTailor({ ...profileTailor, bid: estimatedPrice, delivery: "5-7 days", replyTime: "~12 min", note: "Happy to take this on. Can deliver in 6 days." });
          setProfileTailor(null);
        }}
      />
      <TailorBidModal
        open={!!bidTailor}
        onClose={() => setBidTailor(null)}
        tailor={bidTailor}
        onDecline={() => setBidTailor(null)}
        onAccept={() => {
          setSelectedTailor(bidTailor);
          setBidTailor(null);
          setStep(4);
          setSummaryOpen(true);
        }}
      />
      <OrderSummaryModal
        open={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        order={{
          tailor: selectedTailor,
          category: outfit || "Outfit",
          gender: gender || "—",
          timeline: "5-7 days",
          location: recipient.address || "Lagos, Nigeria",
          fabric: "Tailor-provided",
          styles: attrSummary,
          notes,
          price: estimatedPrice,
        }}
        onEdit={() => { setSummaryOpen(false); setStep(1); }}
        onSend={sendOrder}
      />
    </div>
  );
}

/* ---------- Steps ---------- */

function Step1({ forWho, setForWho, recipient, setRecipient, gender, setGender, outfit, setOutfit, outfits }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold">Outfit category</h2>
        <p className="mt-1 text-sm text-muted-foreground">Who is this order for?</p>
        <div className="mt-3 inline-flex gap-2">
          <Pill active={forWho === "myself"} onClick={() => setForWho("myself")}>Myself</Pill>
          <Pill active={forWho === "someone"} onClick={() => setForWho("someone")}>Someone else</Pill>
        </div>
      </div>

      {forWho === "someone" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" value={recipient.name} onChange={(e: any) => setRecipient({ ...recipient, name: e.target.value })} placeholder="Enter name" />
          <Input label="Phone number" value={recipient.phone} onChange={(e: any) => setRecipient({ ...recipient, phone: e.target.value })} placeholder="Enter phone number" />
          <div className="sm:col-span-2">
            <Input label="Address" value={recipient.address} onChange={(e: any) => setRecipient({ ...recipient, address: e.target.value })} placeholder="Enter address" />
          </div>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium">Gender</label>
        <select value={gender} onChange={(e) => { setGender(e.target.value); setOutfit(""); }}
          className="h-12 w-full rounded-xl border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
          <option value="">Select gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      {gender && (
        <div>
          <label className="mb-3 block text-sm font-medium">What would you like to make?</label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {outfits.map((o: string) => {
              const active = outfit === o;
              return (
                <button key={o} onClick={() => setOutfit(o)}
                  className={`group relative overflow-hidden rounded-2xl border-2 p-3 text-left transition-all ${
                    active ? "border-primary bg-primary/5 shadow-soft" : "border-border bg-card hover:border-primary/30"
                  }`}>
                  <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-muted to-secondary" />
                  <div className="mt-2 text-sm font-medium">{o}</div>
                  {active && (
                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check size={12} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Step2({ attrs, setAttrs, outfit }: any) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">
        Style builder <span className="text-sm font-normal text-muted-foreground">(Attribute selection)</span>
      </h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-secondary p-8">
          <div className="font-display text-lg text-muted-foreground">{outfit || "Preview"}</div>
        </div>
        <div className="space-y-3">
          {attributes.map((a) => (
            <div key={a.key} className="rounded-2xl border border-border bg-muted/40 p-3">
              <div className="text-xs font-semibold uppercase text-muted-foreground">{a.label}</div>
              <div className="mt-1 flex items-center justify-between">
                <button onClick={() => setAttrs({ ...attrs, [a.key]: (attrs[a.key] - 1 + a.options.length) % a.options.length })}
                  className="rounded-full p-1.5 hover:bg-card"><ChevronLeft size={16} /></button>
                <div className="text-sm font-semibold">{a.options[attrs[a.key]]}</div>
                <button onClick={() => setAttrs({ ...attrs, [a.key]: (attrs[a.key] + 1) % a.options.length })}
                  className="rounded-full p-1.5 hover:bg-card"><ChevronRight size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <label className="mb-1.5 block text-sm font-medium">Select measurement</label>
        <select className="h-12 w-full rounded-xl border-2 border-primary/40 bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
          <option>Select a measurement</option>
          <option>My default measurements</option>
          <option>Add new measurement</option>
        </select>
      </div>
    </div>
  );
}

function Step3({ outfit, reference, setReference, notes, setNotes }: any) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">Style reference</h2>
      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 px-6 py-10 text-center transition-colors hover:bg-primary/10">
        {reference ? (
          <img src={reference} alt="" className="h-32 w-32 rounded-xl object-cover" />
        ) : (
          <>
            <Upload size={28} className="text-primary" />
            <span className="mt-2 text-sm font-medium text-primary">Upload style</span>
          </>
        )}
        <input type="file" accept="image/*" className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setReference(URL.createObjectURL(f));
          }} />
      </label>

      <div className="mt-6">
        <h3 className="text-sm font-semibold">Trending styles{outfit ? ` of ${outfit.toLowerCase()}` : ""}</h3>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {trendingStyles.map((src, i) => (
            <button key={i} onClick={() => setReference(src)}
              className={`group relative aspect-square overflow-hidden rounded-2xl border-2 transition-all ${
                reference === src ? "border-primary shadow-soft" : "border-transparent hover:border-primary/40"
              }`}>
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-1.5 block text-sm font-medium">Additional notes (optional)</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
          placeholder="Any specific instructions for the tailor…"
          className="w-full rounded-xl border border-border bg-card p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
      </div>
    </div>
  );
}

function Step4({ price, attrSummary, onPick }: any) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">
        Estimated price <span className="text-sm font-normal text-muted-foreground">(Based on attributes, location, and category)</span>
      </h2>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-muted/40 p-3">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/40 to-primary/30" />
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-muted to-secondary" />
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold uppercase text-muted-foreground">Styles</div>
          <p className="truncate text-sm">{attrSummary}</p>
        </div>
        <button className="rounded-full p-2 text-muted-foreground hover:bg-card"><Edit3 size={14} /></button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-accent/30 bg-card p-4">
          <div className="text-xs text-muted-foreground">Estimated price</div>
          <div className="mt-1 text-sm">from <span className="font-display text-lg font-bold text-primary">NGN {price.toLocaleString()}</span></div>
        </div>
        <div className="rounded-2xl border-2 border-accent/30 bg-card p-4">
          <div className="text-xs text-muted-foreground">Estimated timeline</div>
          <div className="mt-1 text-sm">delivery in <span className="font-semibold text-primary">5-7 days</span></div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button variant="primary" size="lg" className="w-full" onClick={() => onPick("find")}>
          <Search size={16} /> Find tailor <ArrowRight size={16} />
        </Button>
        <button onClick={() => onPick("fashion-house")}
          className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium text-primary hover:bg-primary/5">
          <Building2 size={16} /> Use i-sew fashion house
        </button>
        <button onClick={() => onPick("submit")}
          className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium text-primary hover:bg-primary/5">
          <User size={16} /> Submit to my tailor
        </button>
      </div>
    </div>
  );
}

function Step5({ onOpenSearch, selected, onReview }: any) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">Tailor search</h2>
      <p className="mt-1 text-sm text-muted-foreground">Browse tailors near you or by reputation.</p>

      <div className="mt-5 space-y-3">
        <button onClick={onOpenSearch}
          className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left hover:border-primary/30 hover:shadow-soft">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-accent text-primary"><Search size={18} /></div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Open tailor finder</div>
            <div className="text-xs text-muted-foreground">Search by name, location or rating</div>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/40 p-4">
          <MapPin size={18} className="text-primary" />
          <div className="text-sm text-muted-foreground">Showing tailors near <span className="font-semibold text-foreground">Ebute Meta, Lagos</span></div>
        </div>

        {selected && (
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-sm font-bold text-primary-foreground">{selected.initials}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{selected.name}</div>
                <div className="text-xs text-muted-foreground">{selected.shop}</div>
              </div>
              <Button size="sm" onClick={onReview}>Review order</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Pill({ active, onClick, children }: any) {
  return (
    <button onClick={onClick}
      className={`rounded-xl px-5 py-2 text-sm font-medium transition-all ${
        active ? "bg-primary text-primary-foreground shadow-soft" : "bg-muted text-muted-foreground hover:bg-secondary"
      }`}>
      {children}
    </button>
  );
}
