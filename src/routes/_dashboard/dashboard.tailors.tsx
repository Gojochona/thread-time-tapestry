import { createFileRoute } from "@tanstack/react-router";
import { TailorsPage } from "@/features/dashboard/tailors/TailorsPage";

export const Route = createFileRoute("/_dashboard/dashboard/tailors")({
  component: TailorsPage,
});
