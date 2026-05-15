import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/features/dashboard/layout/DashboardShell";

export const Route = createFileRoute("/_dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — i-sew" }] }),
  component: DashboardShell,
});
