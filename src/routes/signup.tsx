import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Blobs } from "@/components/shared/Blobs";
import { AuthSide } from "./login";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — i-sew" }, { name: "description", content: "Create your i-sew account." }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const checks = useMemo(() => ({
    len: pw.length >= 8 && pw.length <= 16,
    num: /\d/.test(pw),
    up: /[A-Z]/.test(pw),
    low: /[a-z]/.test(pw),
  }), [pw]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 700);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthSide />
      <div className="relative flex items-center justify-center px-6 py-10">
        <Blobs />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center"><Link to="/"><Logo /></Link></div>
          <h1 className="font-display text-4xl font-bold">Welcome</h1>
          <p className="mt-2 text-muted-foreground">Create your account in under a minute.</p>

          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <Input label="First name" required placeholder="Johan" />
              <Input label="Last name" required placeholder="Yesuf" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium"><span className="mr-0.5 text-accent">*</span>Region</label>
              <select className="h-12 w-full rounded-xl border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40">
                <option>Select region</option>
                <option>Lagos, Nigeria</option>
                <option>Accra, Ghana</option>
                <option>Nairobi, Kenya</option>
                <option>London, UK</option>
              </select>
            </div>
            <Input label="Email or phone number" required placeholder="you@email.com" type="email" />
            <Input label="Create password" required placeholder="••••••••" type="password" value={pw} onChange={(e: any) => setPw(e.target.value)} />

            <ul className="grid grid-cols-2 gap-2 text-xs">
              {[
                { ok: checks.len, label: "8-16 characters" },
                { ok: checks.num, label: "At least 1 number" },
                { ok: checks.up, label: "1 upper case letter" },
                { ok: checks.low, label: "1 lower case letter" },
              ].map((c) => (
                <li key={c.label} className={`flex items-center gap-1.5 ${c.ok ? "text-primary" : "text-muted-foreground"}`}>
                  <CheckCircle2 size={14} className={c.ok ? "fill-primary text-primary-foreground" : ""} />
                  {c.label}
                </li>
              ))}
            </ul>

            <label className="mt-2 flex items-start gap-2.5 text-sm text-muted-foreground">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border accent-[oklch(0.34_0.15_264)]" />
              <span>I have read and agreed to i-sew's <a href="#" className="font-semibold text-primary underline">terms of service</a> and <a href="#" className="font-semibold text-primary underline">privacy policy</a>.</span>
            </label>

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={!agreed || loading}>
              {loading ? "Creating account…" : <>Create account <ArrowRight size={18} /></>}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
