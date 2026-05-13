import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface StatusNotificationPillProps {
  type?: "success" | "info" | "warning";
  text: string;
  icon?: "check" | "alert";
}

export function StatusNotificationPill({
  type = "info",
  text,
  icon = "check",
}: StatusNotificationPillProps) {
  const bgColorMap = {
    success: "bg-success/10",
    info: "bg-primary/10",
    warning: "bg-accent/10",
  };

  const textColorMap = {
    success: "text-success",
    info: "text-primary",
    warning: "text-accent",
  };

  const borderColorMap = {
    success: "border-success/20",
    info: "border-primary/20",
    warning: "border-accent/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mx-auto flex w-fit max-w-sm items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium ${bgColorMap[type]} ${textColorMap[type]} ${borderColorMap[type]}`}
    >
      {icon === "check" ? (
        <CheckCircle2 size={14} className={textColorMap[type]} />
      ) : (
        <AlertCircle size={14} className={textColorMap[type]} />
      )}
      <span>{text}</span>
    </motion.div>
  );
}
