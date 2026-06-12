import { createFileRoute } from "@tanstack/react-router";
import { WalletSuccessPage } from "@/features/dashboard/wallet/WalletSuccessPage";

type SuccessSearch = { message?: string };

export const Route = createFileRoute("/_dashboard/dashboard/wallet/success")({
  validateSearch: (s: Record<string, unknown>): SuccessSearch => ({
    message: typeof s.message === "string" ? s.message : undefined,
  }),
  component: WalletSuccessPage,
});
