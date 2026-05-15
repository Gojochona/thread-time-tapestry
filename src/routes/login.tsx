import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/features/auth/LoginPage";

export const Route = createFileRoute("/login")({
  head: () => () => ({ meta: [{ title: "Sign in — i-sew" }, { name: "description", content: "Sign in to your i-sew account." }] }),
  component: LoginPage,
});
