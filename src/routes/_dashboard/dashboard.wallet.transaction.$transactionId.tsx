import { createFileRoute } from "@tanstack/react-router";
import { TransactionDetailPage } from "@/features/dashboard/wallet/TransactionDetailPage";

export const Route = createFileRoute(
  "/_dashboard/dashboard/wallet/transaction/$transactionId",
)({
  component: TransactionDetailPage,
});
