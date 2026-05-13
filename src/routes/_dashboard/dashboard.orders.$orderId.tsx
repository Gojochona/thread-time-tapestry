import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Paperclip, Mic, Send, FileText, Download, Info, ChevronRight } from "lucide-react";
import { Modal } from "../../components/modals/Modal";

type Msg =
  | { id: string; from: "me" | "them"; text: string; time: string }
  | { id: string; from: "them"; file: { name: string }; time: string };

const INITIAL: Msg[] = [
  { id: "1", from: "me", text: "Pls as soon as you confirm you're okay with the request let me know how soon it can be ready.", time: "09:41 am" },
  { id: "2", from: "them", text: "Hello", time: "09:41 am" },
  { id: "3", from: "them", file: { name: "Outfit Invoice.PDF" }, time: "09:41 am" } as any,
  { id: "4", from: "them", text: "Here is an invoice for your perusal", time: "09:41 am" },
  { id: "5", from: "me", text: "40k is a stretch, let's do 35k pls?", time: "09:41 am" },
  { id: "6", from: "them", text: "Well, that should do it.", time: "09:41 am" },
  { id: "7", from: "them", text: "I'll confirm your order now so you can make payment.", time: "09:41 am" },
  { id: "8", from: "me", text: "Alright then thank you.", time: "09:41 am" },
];

function OrderChatPage() {
  const { orderId } = Route.useParams();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [draft, setDraft] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { id: String(Date.now()), from: "me", text: draft, time: "now" }]);
    setDraft("");
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Link to="/dashboard/orders" className="rounded-full p-1.5 hover:bg-muted">
          <ArrowLeft size={18} />
        </Link>
        <img
          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=70"
          alt=""
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="font-display text-base font-semibold">Freddy Han</div>
      </div>

      {/* Order banner */}
      <div className="px-4 pt-4">
        <button
          onClick={() => setSummaryOpen(true)}
          className={`flex w-full items-stretch gap-2 rounded-2xl p-1 text-left transition-colors ${
            confirmed ? "bg-accent/40" : "bg-muted"
          }`}
        >
          <div className="flex gap-1.5 p-1">
            <div className="h-14 w-12 shrink-0 rounded-lg bg-[url('https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=70')] bg-cover bg-center" />
            <div className="h-14 w-12 shrink-0 rounded-lg bg-[url('https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=200&q=70')] bg-cover bg-center" />
          </div>
          <div
            className={`flex flex-1 items-center justify-between rounded-xl px-4 py-2 text-primary-foreground ${
              confirmed ? "bg-accent text-primary" : "bg-foreground/60"
            }`}
          >
            <div className="min-w-0">
              <div className="font-semibold">My siu style</div>
              <div className="text-xs opacity-90">{confirmed ? "Order confirmed." : "Order under review."}</div>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium">
              View order <ChevronRight size={14} />
            </div>
          </div>
        </button>

        {/* CTA / status */}
        {confirmed ? (
          <button
            onClick={() => navigate({ to: "/dashboard/orders/$orderId/pay", params: { orderId } })}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Pay NGN 35,000.00 <ArrowRight size={16} />
          </button>
        ) : (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-muted/70 px-4 py-3 text-xs">
            <div className="flex items-start gap-2 text-muted-foreground">
              <Info size={14} className="mt-0.5 shrink-0" />
              <span>Once your order is confirmed by the tailor, you can proceed with payment to begin work.</span>
            </div>
            <button
              onClick={() => setConfirmed(true)}
              className="shrink-0 whitespace-nowrap text-sm font-medium text-primary/60"
            >
              Make payment <ArrowRight size={12} className="inline" />
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m: any) => {
          const mine = m.from === "me";
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[78%] ${mine ? "items-end" : "items-start"}`}>
                {m.file ? (
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 rounded-xl bg-foreground px-3 py-2 text-xs text-background">
                      <FileText size={14} />
                      <span className="font-medium">{m.file.name}</span>
                      <Download size={14} className="ml-1 opacity-70" />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm ${
                      mine ? "bg-primary/10 text-primary" : "bg-muted text-foreground"
                    }`}
                  >
                    <p>{m.text}</p>
                    <div className={`mt-1 text-[10px] ${mine ? "text-primary/60" : "text-muted-foreground"}`}>
                      {m.time} ✓
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Composer */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1.5">
          <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
            <Paperclip size={16} />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type Message Here…"
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
          <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
            <Mic size={16} />
          </button>
          <button
            onClick={send}
            className="rounded-full bg-primary p-2.5 text-primary-foreground hover:bg-primary/90"
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Order summary modal */}
      <Modal open={summaryOpen} onClose={() => setSummaryOpen(false)} size="md">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold">Order summary</h2>
        </div>

        <div
          className={`mt-5 rounded-2xl p-1 ${
            confirmed ? "bg-accent/30" : "bg-muted"
          }`}
        >
          <div
            className={`flex items-start justify-between rounded-xl px-4 py-3 ${
              confirmed ? "bg-accent text-primary" : "bg-foreground/60 text-primary-foreground"
            }`}
          >
            <div>
              <div className="font-semibold">My siu style</div>
              <div className="mt-0.5 text-xs opacity-90">
                {confirmed ? "Order confirmed." : "Order under review. Pay once accepted to begin work"}
              </div>
            </div>
            <div className="text-xs">Pending order</div>
          </div>
        </div>

        <Row label="Gender" value="Male" />
        <Row label="Outfit category" value="Native wear" />

        <div className="mt-4 rounded-2xl bg-muted/60 p-4">
          <div className="font-semibold">Styles</div>
          <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
            <Field k="Neck style" v="Buttoned" />
            <Field k="Fit" v="Regular" />
            <Field k="Sleeve" v="Long" />
            <Field k="Length" v="Long" />
          </div>
          <div className="mt-4 text-sm font-medium">Style reference</div>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-12 w-12 rounded-lg bg-[url('https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=70')] bg-cover bg-center" />
            <div className="h-12 w-12 rounded-lg bg-[url('https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=200&q=70')] bg-cover bg-center" />
            <div className="flex flex-1 items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm">
              <span className="text-muted-foreground">Native wear</span>
              <button className="inline-flex items-center gap-1 text-primary">
                change <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
          {confirmed ? (
            <Row label="Delivery timeline" value="5 days" />
          ) : (
            <Row label="Estimated timeline" value="5 - 7 days" />
          )}
          <Row label={confirmed ? "Sub total" : "Proposed amount"} value="₦35,000" />
          <Row
            label="Fabrics and materials"
            value={
              <span className="inline-flex items-center gap-1">
                I'll provide <Info size={12} className="text-muted-foreground" />
              </span>
            }
          />
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className={confirmed ? "" : "text-muted-foreground"}>
            {confirmed ? "Total amount" : "Total amount (pending tailor's confirmation)"}
          </span>
          <span className="font-display text-lg font-bold text-primary">₦35,000</span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            disabled={!confirmed}
            onClick={() => {
              setSummaryOpen(false);
              navigate({ to: "/dashboard/orders/$orderId/pay", params: { orderId } });
            }}
            className={`flex-1 rounded-2xl border-2 border-dashed py-3 font-semibold transition ${
              confirmed
                ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-primary/40 bg-primary/40 text-primary-foreground/80 cursor-not-allowed"
            }`}
          >
            Make payment
          </button>
          <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Send size={16} />
          </button>
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">Look for another tailor?</p>
      </Modal>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="mt-3 flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Field({ k, v }: any) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{k}</div>
      <div className="font-medium">{v}</div>
    </div>
  );
}

export const Route = createFileRoute("/_dashboard/dashboard/orders/$orderId")({
  component: OrderChatPage,
});
