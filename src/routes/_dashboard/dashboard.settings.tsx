import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/features/dashboard/settings/SettingsPage";

export const Route = createFileRoute("/_dashboard/dashboard/settings")({
  component: SettingsPage,
});
