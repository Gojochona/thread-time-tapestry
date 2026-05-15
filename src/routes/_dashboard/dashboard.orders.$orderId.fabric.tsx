import { createFileRoute } from "@tanstack/react-router";
import { FabricPage } from "@/features/dashboard/orders/FabricPage";

export const Route = createFileRoute("/_dashboard/dashboard/orders/$orderId/fabric")({
  component: FabricPage,
});
