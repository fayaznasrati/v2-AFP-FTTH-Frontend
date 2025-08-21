import React from "react";
import { FaCheck } from "react-icons/fa";

function Checkbox({
  variant = "filled", // "filled" or "blank"
  color = "primary1", // Tailwind color string
  size = "md", // "sm" | "md" | "lg"
  value = false,
  onChange = (val) => console.log(val),
}) {
  // Size mapping
  const sizes = {
    sm: "w-4 h-4 text-xs",
    md: "w-5 h-5 text-sm",
    lg: "w-6 h-6 text-base",
  };
  const ringColors = {
    primary1: "ring-primary1/40",
    red: "ring-red-500/40",
    green: "ring-green-500/40",
    // add more as needed
  };
  const boxSize = sizes[size] || sizes.md;

  // Variant styles
  const baseClasses = `flex items-center ${value ? "ring-2" : "ring-1"}  ${
    ringColors[color] || ""
  }  p-1 justify-center rounded outline-hidden outline-none transition-all duration-300 ease-in-out cursor-pointer border-2 border-${color}`;
  let boxClasses = "";

  if (variant === "filled") {
    boxClasses = value
      ? `bg-${color} border-${color} text-white`
      : `bg-transparent border-${color}`;
  } else {
    // blank (outline only)
    boxClasses = value
      ? `border-${color} text-${color}`
      : `border-${color} bg-transparent`;
  }

  return (
    <div
      className={`${baseClasses} ${boxSize} ${boxClasses}`}
      onClick={() => onChange(!value)}
      role="checkbox"
      aria-checked={value}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onChange(!value);
        }
      }}
    >
      <FaCheck
        className={`transition-all duration-300 transform ${
          value ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      />
    </div>
  );
}

export default Checkbox;
