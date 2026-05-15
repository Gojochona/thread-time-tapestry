import { createFileRoute } from "@tanstack/react-router";
import { SignupPage } from "@/features/auth/SignupPage";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — i-sew" }, { name: "description", content: "Create your i-sew account." }] }),
  component: SignupPage,
});
