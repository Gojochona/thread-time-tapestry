import { useState } from "react";
import { Modal } from "./Modal";
import { Star, CheckCircle2 } from "lucide-react";

export function RateTailorModal({ open, onClose, tailor, onSubmit }: any) {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const wordCount = review.trim().split(/\s+/).length;
  const maxWords = 200;
  const canSubmit = rating !== null && wordCount > 0 && wordCount <= maxWords;

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit?.({ rating, review });
      setRating(null);
      setReview("");
      onClose?.();
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="md">
      <div className="space-y-6">
        {/* Tailor header */}
        <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4">
          <img
            src={tailor?.avatar ?? "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=70"}
            alt={tailor?.name}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="font-display font-semibold">{tailor?.name ?? "Tailor"}</div>
              <CheckCircle2 size={16} className="shrink-0 text-primary" />
            </div>
            <div className="text-xs text-muted-foreground">{tailor?.shop ?? "i-sew verified"}</div>
          </div>
        </div>

        {/* Rating question */}
        <div>
          <p className="mb-4 text-sm font-medium">How satisfied are you with {tailor?.name ?? "their"} services?</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={`transition-colors ${
                    rating && rating >= star
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review text */}
        <div>
          <label className="mb-2 block text-sm font-medium">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={`Say something about ${tailor?.name ?? "their"} work`}
            maxLength={500}
            className="min-h-32 w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className={wordCount > maxWords ? "text-destructive" : "text-muted-foreground"}>
              {wordCount} / {maxWords} words
            </span>
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full rounded-full px-6 py-3.5 font-semibold transition-all ${
            canSubmit
              ? "bg-primary text-primary-foreground hover:shadow-glow hover:-translate-y-0.5"
              : "bg-muted/40 text-muted-foreground cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
}
