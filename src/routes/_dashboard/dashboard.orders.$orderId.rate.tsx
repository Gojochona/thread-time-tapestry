import { createFileRoute } from "@tanstack/react-router";
import { RatePage } from "@/features/dashboard/orders/RatePage";

export const Route = createFileRoute("/_dashboard/dashboard/orders/$orderId/rate")({
  component: RatePage,
});
