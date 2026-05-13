import { Modal } from "./Modal";
import { AlertCircle } from "lucide-react";

export function FabricConfirmationModal({ open, onClose, onConfirm }: any) {
  return (
    <Modal open={open} onClose={onClose} size="md">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-destructive/10 p-2">
            <AlertCircle size={20} className="text-destructive" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">Confirm Fabric Sent</h3>
            <p className="mt-1 text-sm text-muted-foreground">Please note the following:</p>
          </div>
        </div>

        {/* Warnings */}
        <ul className="space-y-3 rounded-xl bg-destructive/5 p-4">
          <li className="flex gap-3 text-sm">
            <span className="mt-0.5 shrink-0 text-destructive">•</span>
            <span className="text-destructive">Do not confirm you've sent fabrics if you haven't</span>
          </li>
          <li className="flex gap-3 text-sm">
            <span className="mt-0.5 shrink-0 text-destructive">•</span>
            <span className="text-destructive">Once you have confirmed fabric dispatch, the tailor will need to acknowledge the delivery</span>
          </li>
          <li className="flex gap-3 text-sm">
            <span className="mt-0.5 shrink-0 text-destructive">•</span>
            <span className="text-destructive">Once delivery is acknowledged, work will start</span>
          </li>
        </ul>

        {/* Action button */}
        <button
          onClick={() => {
            onConfirm?.();
            onClose?.();
          }}
          className="w-full rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-all hover:shadow-glow hover:-translate-y-0.5"
        >
          I've sent the fabrics
        </button>
      </div>
    </Modal>
  );
}
