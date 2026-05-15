import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/features/home/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "i-sew — Custom tailoring, without the stress" },
      { name: "description", content: "Order bespoke outfits from verified tailors. Secure payments, transparent tracking and a curated marketplace of master craftsmen." },
      { property: "og:title", content: "i-sew — Custom tailoring, without the stress" },
      { property: "og:description", content: "Bespoke clothing from verified tailors. Order, track and enjoy." },
    ],
  }),
  component: HomePage,
});
