import { createFileRoute } from "@tanstack/react-router";
import { OrderDetailPage } from "@/features/dashboard/orders/OrderDetailPage";

export const Route = createFileRoute("/_dashboard/dashboard/orders/$orderId")({
  component: OrderDetailPage,
});
