import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Check, Info } from "lucide-react";
import { AcknowledgeDressModal } from "../../components/modals/AcknowledgeDressModal";
import { FabricConfirmationModal } from "../../components/modals/FabricConfirmationModal";
import { RateTailorModal } from "../../components/modals/RateTailorModal";

// Sample order details - in a real app, this would come from props/params
const ORDER_DETAILS: any = {
  "ISJQ-2026-0324-qcaeg1": {
    id: "ISJQ-2026-0324-qcaeg1",
    name: "My siu style",
    tailor: {
      name: "Freddy Han",
      shop: "Freddy Fashion Fare",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=70",
    },
    eta: "1 day",
    status: "awaiting-acknowledgement", // "awaiting-acknowledgement" | "work-in-progress" | "payment-awaiting" | "processing" | "order-closed"
    progressPercentage: 97,
    gender: "Male",
    outfitCategory: "Native wear",
    styles: {
      neckStyle: "Buttoned",
      fit: "Regular",
      sleeve: "Long",
      length: "Long",
    },
    styleReference: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=70",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=200&q=70",
    ],
    fabricStatus: "delivered",
    deliveryTimeline: 5,
    amount: 35000,
    transactionId: "Order ISJQ-2026-0324-qcaeg1",
    milestones: [
      { name: "Payment confirmed", completed: true },
      { name: "Cutting", completed: true },
      { name: "Sewing", completed: false },
      { name: "Final fitting", completed: false },
      { name: "Delivery", completed: false },
    ],
  },
};

function OrderDetailPage() {
  const { orderId } = Route.useParams();
  const navigate = useNavigate();
  const order = ORDER_DETAILS[orderId] || ORDER_DETAILS["ISJQ-2026-0324-qcaeg1"];

  const [acknowledgeOpen, setAcknowledgeOpen] = useState(false);
  const [fabricOpen, setFabricOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [rated, setRated] = useState(false);

  const statusConfig: any = {
    "awaiting-acknowledgement": {
      color: "bg-emerald-50 border-emerald-200 text-emerald-900",
      badgeColor: "bg-emerald-100 text-emerald-700",
      label: "Delivered - awaiting acknowledgement",
      button: "Acknowledge dress",
      onButton: () => setAcknowledgeOpen(true),
    },
    "work-in-progress": {
      color: "bg-emerald-50 border-emerald-200 text-emerald-900",
      badgeColor: "bg-emerald-100 text-emerald-700",
      label: "Work in progress",
      button: "I've sent the fabrics",
      onButton: () => setFabricOpen(true),
    },
    "payment-awaiting": {
      color: "bg-amber-50 border-amber-200 text-amber-900",
      badgeColor: "bg-amber-100 text-amber-700",
      label: "Payment made, tailor awaiting fabric",
      button: "I've sent the fabrics",
      onButton: () => setFabricOpen(true),
    },
    processing: {
      color: "bg-amber-50 border-amber-200 text-amber-900",
      badgeColor: "bg-amber-100 text-amber-700",
      label: "Processing attire",
      button: null,
      onButton: null,
    },
    "order-closed": {
      color: "bg-orange-50 border-orange-200 text-orange-900",
      badgeColor: "bg-orange-100 text-orange-700",
      label: "Order closed",
      button: rated ? "Rated" : "Rate tailor",
      onButton: () => setRatingOpen(true),
    },
  };

  const config = statusConfig[order.status];

  const completedMilestones = order.milestones?.filter((m: any) => m.completed).length || 0;
  const totalMilestones = order.milestones?.length || 1;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/dashboard/orders" className="rounded-full p-1.5 hover:bg-muted">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-display text-2xl font-bold">{order.name}</h1>
      </div>

      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative mb-6 flex items-stretch gap-3 rounded-2xl border p-1 ${config.color}`}
      >
        <div className="flex gap-1.5 p-1">
          {order.styleReference.map((ref: string, i: number) => (
            <div
              key={i}
              className="h-14 w-12 shrink-0 rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url('${ref}')` }}
            />
          ))}
        </div>
        <div className={`flex flex-1 items-center justify-between rounded-xl px-4 py-2 ${config.badgeColor}`}>
          <div className="min-w-0">
            <div className="font-semibold text-sm">{order.name}</div>
            <div className="text-xs opacity-90">Ongoing order</div>
          </div>
          <ChevronRight size={14} />
        </div>
      </motion.div>

      {/* Status and Action */}
      <div className="mb-6 space-y-3">
        <div className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 ${config.color}`}>
          <div className="text-sm font-medium">{config.label}</div>
          <div className="text-xs font-semibold opacity-75">{order.progressPercentage}%</div>
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-2 rounded-full bg-emerald-500 origin-left"
          style={{
            width: `${order.progressPercentage}%`,
          }}
        />

        {/* Milestones */}
        {order.status === "work-in-progress" && order.milestones && (
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <Link to="#" className="font-semibold text-primary">
              View
            </Link>
            <div className="flex gap-2">
              {order.milestones.map((m: any, i: number) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    m.completed ? "bg-emerald-500" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ETA */}
      <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/50 px-4 py-3 text-sm">
        <span className="flex items-center gap-2 text-muted-foreground">
          <Info size={14} /> ETA - {order.eta}
        </span>
        <span className="font-semibold text-emerald-600">{order.progressPercentage}%</span>
      </div>

      {/* Order Details */}
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 font-display font-semibold text-sm text-muted-foreground">Gender</h3>
          <p className="font-medium">{order.gender}</p>
        </div>

        <div>
          <h3 className="mb-3 font-display font-semibold text-sm text-muted-foreground">Outfit category</h3>
          <p className="font-medium">{order.outfitCategory}</p>
        </div>

        {/* Styles */}
        <div className="rounded-2xl bg-blue-50 p-4">
          <h3 className="mb-3 font-display font-semibold text-sm">Styles</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Neck style</p>
              <p className="font-medium">{order.styles.neckStyle}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Fit</p>
              <p className="font-medium">{order.styles.fit}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Sleeve</p>
              <p className="font-medium">{order.styles.sleeve}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Length</p>
              <p className="font-medium">{order.styles.length}</p>
            </div>
          </div>

          {/* Style reference */}
          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-3 text-xs font-semibold text-muted-foreground">Style reference</p>
            <div className="flex items-center gap-2">
              {order.styleReference.map((ref: string, i: number) => (
                <div
                  key={i}
                  className="h-12 w-12 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url('${ref}')` }}
                />
              ))}
              <button className="text-xs font-semibold text-primary">change</button>
            </div>
          </div>
        </div>

        {/* Fabric and delivery */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-muted-foreground">Fabrics and materials</h3>
            <span className="text-sm font-semibold">{order.fabricStatus === "delivered" ? "Delivered" : "Awaiting"}</span>
          </div>
          {order.fabricStatus === "delivered" && <Info size={14} className="text-muted-foreground" />}

          <div className="flex items-center justify-between">
            <h3 className="text-sm text-muted-foreground">Delivery timeline</h3>
            <span className="text-sm font-semibold">{order.deliveryTimeline} days</span>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-sm text-muted-foreground">Amount</h3>
            <span className="text-sm font-semibold">₦{order.amount.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-sm text-muted-foreground">Transaction ID</h3>
            <span className="text-sm font-semibold">{order.transactionId}</span>
          </div>
        </div>

        {/* Action Button */}
        {config.button && (
          <button
            onClick={config.onButton}
            className="w-full rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-all hover:shadow-glow hover:-translate-y-0.5 mt-6"
          >
            {config.button}
          </button>
        )}
      </div>

      {/* Modals */}
      <AcknowledgeDressModal
        open={acknowledgeOpen}
        onClose={() => setAcknowledgeOpen(false)}
        onAcknowledge={() => {
          // Handle acknowledgement
        }}
      />

      <FabricConfirmationModal
        open={fabricOpen}
        onClose={() => setFabricOpen(false)}
        onConfirm={() => {
          // Handle fabric confirmation
        }}
      />

      <RateTailorModal
        open={ratingOpen}
        onClose={() => setRatingOpen(false)}
        tailor={order.tailor}
        onSubmit={(data: any) => {
          console.log("[v0] Rating submitted:", data);
          setRated(true);
        }}
      />
    </div>
  );
}

export const Route = createFileRoute("/_dashboard/dashboard.orders.$orderId.detail")({
  component: OrderDetailPage,
});
