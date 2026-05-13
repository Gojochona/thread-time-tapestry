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
  const colors = {
    success: "bg-green-50 text-green-900 border-green-200",
    info: "bg-blue-50 text-blue-900 border-blue-200",
    warning: "bg-amber-50 text-amber-900 border-amber-200",
  };

  const iconColors = {
    success: "text-green-600",
    info: "text-blue-600",
    warning: "text-amber-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mx-auto flex w-fit max-w-sm items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium ${colors[type]}`}
    >
      {icon === "check" ? (
        <CheckCircle2 size={14} className={iconColors[type]} />
      ) : (
        <AlertCircle size={14} className={iconColors[type]} />
      )}
      <span>{text}</span>
    </motion.div>
  );
}
