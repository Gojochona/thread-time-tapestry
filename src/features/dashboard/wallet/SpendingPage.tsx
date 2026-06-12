import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Clock, CheckCircle2 } from "lucide-react";
import { getSpendingSummary, formatNaira } from "@/lib/api/wallet";
import { WalletShell, WalletCard } from "./WalletShell";

export function SpendingPage() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["wallet-spending-summary"],
    queryFn: getSpendingSummary,
  });

  const totals = items.reduce(
    (acc, i) => ({
      spending: acc.spending + i.spending,
      pending: acc.pending + i.pending,
      released: acc.released + i.released,
    }),
    { spending: 0, pending: 0, released: 0 },
  );

  return (
    <WalletShell title="Spending" eyebrow="Order escrow">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Spending" value={totals.spending} tone="primary" Icon={ArrowUpRight} />
        <Stat label="Pending" value={totals.pending} tone="accent" Icon={Clock} />
        <Stat label="Released" value={totals.released} tone="success" Icon={CheckCircle2} />
      </div>

      <WalletCard delay={0.1}>
        <h2 className="font-display text-xl font-semibold">By order</h2>
        <p className="text-xs text-muted-foreground">Breakdown of escrow per active order</p>

        <div className="mt-5 space-y-3">
          {isLoading &&
            [1, 2].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />
            ))}

          {!isLoading && items.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">No spending yet.</p>
          )}

          {items.map((item) => (
            <div key={item.order_id} className="rounded-2xl border border-border bg-background p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{item.order_name}</p>
                <Link
                  to="/dashboard/orders/$orderId"
                  params={{ orderId: item.order_id }}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Go to order →
                </Link>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <MiniStat label="Spending" value={item.spending} tone="primary" />
                <MiniStat label="Pending" value={item.pending} tone="accent" />
                <MiniStat label="Released" value={item.released} tone="success" />
              </div>
            </div>
          ))}
        </div>
      </WalletCard>
    </WalletShell>
  );
}

function Stat({
  label,
  value,
  tone,
  Icon,
}: {
  label: string;
  value: number;
  tone: "primary" | "accent" | "success";
  Icon: React.ComponentType<{ size?: number }>;
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    accent: "gradient-cream text-primary",
    success: "bg-success/15 text-success",
  } as const;
  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${tones[tone]}`}>
          <Icon size={12} />
        </div>
      </div>
      <p className="mt-2 font-display text-xl font-bold tabular-nums">{formatNaira(value)}</p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "primary" | "accent" | "success";
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    accent: "gradient-cream text-primary",
    success: "bg-success/15 text-success",
  } as const;
  return (
    <div className={`rounded-xl px-3 py-2 ${tones[tone]}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">{label}</p>
      <p className="mt-0.5 font-bold tabular-nums">{formatNaira(value)}</p>
    </div>
  );
}
