import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Star, BadgeCheck } from "lucide-react";
import { setRated, setStage } from "@/features/dashboard/orders/orderStage";
import { toast } from "sonner";

export function RatePage() {
  const { orderId } = Route.useParams();
  const navigate = useNavigate();
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const canSubmit = stars > 0;

  const submit = () => {
    if (!canSubmit) return;
    setRated(orderId, stars, review);
    setStage(orderId, "closed");
    toast.success("Thanks for rating Freddy!");
    navigate({ to: "/dashboard/orders/$orderId", params: { orderId } });
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center gap-3">
        <Link to="/dashboard/orders/$orderId" params={{ orderId }} className="rounded-full p-1.5 hover:bg-muted">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-display text-lg font-semibold">Rate tailor</h1>
      </div>

      {/* Tailor card */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-accent/30 p-3">
        <img
          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=70"
          alt=""
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="font-display font-semibold">Freddy Han</div>
          <div className="text-xs text-primary">Freddy Fashion Fare</div>
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-primary">
          verified <BadgeCheck size={14} className="fill-primary text-primary-foreground" />
        </span>
      </div>

      {/* Stars */}
      <div className="mt-6">
        <p className="text-sm text-muted-foreground">How satisfied are you with Freddy's services?</p>
        <div className="mt-3 flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((n) => {
            const filled = (hover || stars) >= n;
            return (
              <button
                key={n}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setStars(n)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={36}
                  className={filled ? "fill-yellow-400 text-yellow-400" : "text-yellow-400"}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Review */}
      <div className="mt-6">
        <label className="text-sm font-medium">Review</label>
        <div className="relative mt-2">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value.slice(0, 1500))}
            placeholder="Say something about Freddy's work"
            rows={6}
            className="w-full resize-none rounded-2xl border border-border bg-card p-4 text-sm focus:border-primary focus:outline-none"
          />
          <span className="pointer-events-none absolute bottom-3 right-4 text-[11px] text-muted-foreground">
            200 words max
          </span>
        </div>
      </div>

      <button
        onClick={submit}
        disabled={!canSubmit}
        className={`mt-6 w-full rounded-2xl border-2 border-dashed py-3.5 font-semibold transition ${
          canSubmit
            ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
            : "border-primary/40 bg-primary/40 text-primary-foreground/80 cursor-not-allowed"
        }`}
      >
        Submit
      </button>
    </div>
  );
}
