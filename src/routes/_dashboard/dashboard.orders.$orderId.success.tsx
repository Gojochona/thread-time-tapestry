import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { RateTailorModal } from "../../components/modals/RateTailorModal";

const TAILOR = {
  name: "Freddy Han",
  shop: "Freddy Fashion Fare",
  avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=70",
};

function SuccessPage() {
  const { orderId } = Route.useParams();
  const navigate = useNavigate();
  const [ratingOpen, setRatingOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-xl flex-col items-center justify-center px-4 py-12">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-accent/20 via-transparent to-transparent" />
      </div>

      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.2,
        }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 -z-10 rounded-full bg-accent/30 blur-xl" />
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 ring-4 ring-accent/20">
          <CheckCircle2 size={48} className="text-accent" />
        </div>
      </motion.div>

      {/* Success text */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <h1 className="font-display text-3xl font-bold mb-2">Successful!</h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          Order fulfilled, tailor has been fully paid. Thank you for using i-sew.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 w-full space-y-3"
      >
        {/* Rate tailor button */}
        <button
          onClick={() => setRatingOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-all hover:shadow-glow hover:-translate-y-0.5"
        >
          <img
            src={TAILOR.avatar}
            alt={TAILOR.name}
            className="h-6 w-6 rounded-full object-cover"
          />
          Rate tailor
        </button>

        {/* Back to dashboard link */}
        <Link
          to="/dashboard/orders"
          className="flex w-full items-center justify-center rounded-full px-6 py-3 font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to dashboard
        </Link>
      </motion.div>

      {/* Rating Modal */}
      <RateTailorModal
        open={ratingOpen}
        onClose={() => setRatingOpen(false)}
        tailor={TAILOR}
        onSubmit={(data: any) => {
          console.log("[v0] Rating submitted:", data);
          setRatingOpen(false);
          // Optionally redirect after rating
          setTimeout(() => {
            navigate({ to: "/dashboard/orders" });
          }, 1000);
        }}
      />
    </div>
  );
}

export const Route = createFileRoute("/_dashboard/dashboard/orders/$orderId/success")({
  component: SuccessPage,
});
