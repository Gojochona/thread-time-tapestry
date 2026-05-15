import { createFileRoute } from "@tanstack/react-router";
import { ExplorePage } from "@/features/dashboard/explore/ExplorePage";

export const Route = createFileRoute("/_dashboard/dashboard/explore")({
  component: ExplorePage,
});
