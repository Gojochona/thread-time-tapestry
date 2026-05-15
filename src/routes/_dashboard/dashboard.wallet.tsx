import { createFileRoute } from "@tanstack/react-router";
import { WalletPage } from "@/features/dashboard/wallet/WalletPage";

export const Route = createFileRoute("/_dashboard/dashboard/wallet")({
  component: WalletPage,
});
