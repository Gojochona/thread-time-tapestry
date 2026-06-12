import { createFileRoute } from "@tanstack/react-router";
import { TopUpPage } from "@/features/dashboard/wallet/TopUpPage";

export const Route = createFileRoute("/_dashboard/dashboard/wallet/topup")({
  component: TopUpPage,
});
