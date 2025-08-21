import React from "react";

/**
 * Spinner Component
 * Props:
 * - size: "sm" | "md" | "lg" | number (default: "md")
 * - color: Tailwind text color class (default: "text-blue-500")
 * - className: additional classes
 */
export default function Spinner({
  size = "md",
  color = "text-primary1",
  className = "",
}) {
  // Map size prop to Tailwind width/height
  const sizeClasses =
    size === "sm"
      ? "w-4 h-4 border-2"
      : size === "lg"
      ? "w-12 h-12 border-4"
      : typeof size === "number"
      ? `w-[${size}px] h-[${size}px] border-3`
      : "w-8 h-8 border-4"; // default md

  return (
    <div
      className={`animate-spin rounded-full border-solid border-current border-t-transparent ${sizeClasses} ${color} ${className}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
