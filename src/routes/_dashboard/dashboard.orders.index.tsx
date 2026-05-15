import { createFileRoute } from "@tanstack/react-router";
import { OrdersListPage } from "@/features/dashboard/orders/OrdersListPage";

export const Route = createFileRoute("/_dashboard/dashboard/orders/")({
  component: OrdersListPage,
});
