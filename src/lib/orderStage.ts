// Lightweight per-order stage store (sessionStorage backed) so the
// chat banner / summary modal can move through ongoing states without a backend.

export type Stage =
  | "review"           // tailor reviewing (pending)
  | "confirmed"        // tailor confirmed, awaiting payment
  | "awaiting_fabric"  // payment made, customer to send fabrics
  | "fabric_sent"      // customer marked fabrics sent
  | "work_started"     // tailor acknowledged fabrics, work in progress
  | "completed";

const KEY = (id: string) => `order:${id}:stage`;

export function getStage(id: string): Stage {
  if (typeof window === "undefined") return "review";
  return (sessionStorage.getItem(KEY(id)) as Stage) || "review";
}

export function setStage(id: string, stage: Stage) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY(id), stage);
  window.dispatchEvent(new CustomEvent("order-stage", { detail: { id, stage } }));
}
