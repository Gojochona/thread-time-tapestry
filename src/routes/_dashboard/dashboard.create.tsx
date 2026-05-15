import { createFileRoute } from "@tanstack/react-router";
import { CreateOrderPage } from "@/features/dashboard/create/CreateOrderPage";

export const Route = createFileRoute("/_dashboard/dashboard/create")({
  head: () => () => ({ meta: [{ title: "Create custom outfit — i-sew" }] }),
  component: CreateOrderPage,
});
