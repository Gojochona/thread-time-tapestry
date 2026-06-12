import { createFileRoute } from "@tanstack/react-router";
import { AddBankPage } from "@/features/dashboard/wallet/AddBankPage";

export const Route = createFileRoute("/_dashboard/dashboard/wallet/withdraw/add-bank")({
  component: AddBankPage,
});
