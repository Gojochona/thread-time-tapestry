import { Modal } from "./Modal";
import { AlertCircle } from "lucide-react";

export function AcknowledgeDressModal({ open, onClose, onAcknowledge }: any) {
  return (
    <Modal open={open} onClose={onClose} size="md">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-destructive/10 p-2">
            <AlertCircle size={20} className="text-destructive" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">Acknowledge Order</h3>
            <p className="mt-1 text-sm text-muted-foreground">Please note the following:</p>
          </div>
        </div>

        {/* Warnings */}
        <ul className="space-y-3 rounded-xl bg-destructive/5 p-4">
          <li className="flex gap-3 text-sm">
            <span className="mt-0.5 shrink-0 text-destructive">•</span>
            <span className="text-destructive">Do not acknowledge dress if you haven't received it</span>
          </li>
          <li className="flex gap-3 text-sm">
            <span className="mt-0.5 shrink-0 text-destructive">•</span>
            <span className="text-destructive">Once you acknowledge, full payment will be released into the tailor's account</span>
          </li>
        </ul>

        {/* Action button */}
        <button
          onClick={() => {
            onAcknowledge?.();
            onClose?.();
          }}
          className="w-full rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-all hover:shadow-glow hover:-translate-y-0.5"
        >
          Acknowledge dress
        </button>
      </div>
    </Modal>
  );
}
