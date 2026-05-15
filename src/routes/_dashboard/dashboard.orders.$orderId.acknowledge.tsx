import { createFileRoute } from "@tanstack/react-router";
import { AcknowledgePage } from "@/features/dashboard/orders/AcknowledgePage";

export const Route = createFileRoute("/_dashboard/dashboard/orders/$orderId/acknowledge")({
  component: AcknowledgePage,
});
