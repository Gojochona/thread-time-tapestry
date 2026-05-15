import { createFileRoute } from "@tanstack/react-router";
import { OverviewPage } from "@/features/dashboard/overview/OverviewPage";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  component: OverviewPage,
});
