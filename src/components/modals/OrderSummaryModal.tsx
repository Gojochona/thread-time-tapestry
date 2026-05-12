import { motion } from "framer-motion";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { Check, MapPin, Calendar, Scissors, Pencil } from "lucide-react";

export function OrderSummaryModal({ open, onClose, order, onEdit, onSend }: any) {
  if (!order) return null;
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Review your order"
      size="lg"
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <Button variant="outline" className="flex-1" onClick={onEdit}>
            <Pencil size={14} /> Edit details
          </Button>
          <Button variant="primary" className="flex-1" onClick={onSend}>Send order</Button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success"
        >
          <Check size={28} />
        </motion.div>
        <h3 className="mt-3 font-display text-lg font-semibold">Almost ready</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Confirm the details below — we'll send this to your tailor for approval.
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-sm font-bold text-primary-foreground">
            {order.tailor?.initials ?? "T"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold">{order.tailor?.name ?? "—"}</div>
            <div className="text-xs text-muted-foreground">{order.tailor?.shop ?? "Selected tailor"}</div>
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Row icon={Scissors} label="Outfit" value={`${order.category} · ${order.gender}`} />
        <Row icon={Calendar} label="Timeline" value={order.timeline} />
        <Row icon={MapPin} label="Location" value={order.location} />
        <Row icon={Pencil} label="Fabric" value={order.fabric} />
      </div>

      <div className="mt-3 rounded-2xl border border-border bg-muted/40 p-4">
        <div className="text-xs font-semibold uppercase text-muted-foreground">Style attributes</div>
        <p className="mt-1 text-sm">{order.styles}</p>
      </div>

      {order.notes && (
        <div className="mt-3 rounded-2xl border border-border bg-card p-4">
          <div className="text-xs font-semibold uppercase text-muted-foreground">Additional notes</div>
          <p className="mt-1 text-sm text-foreground/80">{order.notes}</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <div>
          <div className="text-xs text-muted-foreground">Estimated total</div>
          <div className="font-display text-xl font-bold text-primary">NGN {order.price.toLocaleString()}</div>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          Final price set<br />after tailor review
        </div>
      </div>
    </Modal>
  );
}

function Row({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-primary"><Icon size={16} /></div>
      <div className="min-w-0">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}
