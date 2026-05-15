import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { setStage } from "@/features/dashboard/orders/orderStage";
import isewMark from "@/assets/isew-mark.png";

export function AcknowledgePage() {
  const { orderId } = Route.useParams();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const confirm = () => {
    setStage(orderId, "closed");
    setDone(true);
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center gap-3">
        <Link to="/dashboard/orders/$orderId" params={{ orderId }} className="rounded-full p-1.5 hover:bg-muted">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-display text-lg font-semibold">Order {orderId}</h1>
      </div>

      <div className="mt-10 px-2">
        <p className="text-sm font-medium">Please note the following:</p>
        <ul className="mt-3 space-y-2 text-sm text-destructive">
          <li className="flex gap-2"><span>•</span><span>Do not acknowledge dress if you haven't received it</span></li>
          <li className="flex gap-2"><span>•</span><span>Once you acknowledge, full payment will be released into the tailor's account</span></li>
        </ul>

        <button
          onClick={confirm}
          className="mt-10 w-full rounded-2xl border-2 border-dashed border-primary bg-primary py-3.5 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Acknowledge
        </button>
      </div>

      <AnimatePresence>
        {done && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center sm:p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-t-3xl bg-card px-6 pb-8 text-center shadow-elegant sm:rounded-3xl"
            >
              <div className="-mx-6 flex items-center justify-center bg-accent/20 py-10">
                <img src={isewMark} alt="i-sew" className="h-12 w-12" />
              </div>
              <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-border sm:hidden" />
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 18 }}
                className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
              >
                <CheckCircle2 className="text-primary" size={24} />
              </motion.div>
              <h3 className="mt-4 font-display text-2xl font-bold">Successful!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Order fulfilled, tailor has been fully paid.<br />Thank you for using i-sew.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=70"
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
                <button
                  onClick={() => navigate({ to: "/dashboard/orders/$orderId/rate", params: { orderId } })}
                  className="flex-1 rounded-2xl border-2 border-dashed border-primary bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Rate tailor
                </button>
              </div>
              <button
                onClick={() => navigate({ to: "/dashboard" })}
                className="mt-3 w-full text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Back to dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
