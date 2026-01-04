import React from "react";
import { Landmark } from "lucide-react";

export default function Spinner({ size = 24, className = "" }) {
  const px = typeof size === "number" ? size : parseInt(size);

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: px, height: px }}
      role="status"
      aria-label="processing"
    >
      <Landmark
        size={px}
        className="text-[#9f1239] animate-pulse"
        strokeWidth={1.8}
      />
    </div>
  );
}
