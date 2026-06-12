import { createFileRoute } from "@tanstack/react-router";
import { WithdrawPage } from "@/features/dashboard/wallet/WithdrawPage";

export const Route = createFileRoute("/_dashboard/dashboard/wallet/withdraw")({
  component: WithdrawPage,
});
