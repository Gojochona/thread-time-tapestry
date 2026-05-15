import { createFileRoute } from "@tanstack/react-router";
import { PayPage } from "@/features/dashboard/orders/PayPage";

export const Route = createFileRoute("/_dashboard/dashboard/orders/$orderId/pay")({
  component: PayPage,
});
