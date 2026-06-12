import { createFileRoute } from "@tanstack/react-router";
import { SpendingPage } from "@/features/dashboard/wallet/SpendingPage";

export const Route = createFileRoute("/_dashboard/dashboard/wallet/spending")({
  component: SpendingPage,
});
