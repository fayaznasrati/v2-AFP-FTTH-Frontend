import React from "react";

function Switch({
  color = "primary1", // "primary1", "blue", "red", etc.
  size = "md", // "sm" | "md" | "lg"
  value = false,
  onChange = (val) => console.log(val),
}) {
  // ✅ Size mapping
  const sizes = {
    sm: {
      track: "w-10 h-5",
      thumb: "w-4 h-4",
      translate: "translate-x-[23px]", // enough to reach right edge
    },
    md: {
      track: "w-12 h-6",
      thumb: "w-5 h-5",
      translate: "translate-x-[26px]",
    },
    lg: {
      track: "w-14 h-8",
      thumb: "w-7 h-7",
      translate: "translate-x-[26px]",
    },
  };

  // ✅ Safe Tailwind colors
  const colorMap = {
    primary1: "bg-primary1",
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    gray: "bg-gray-500",
  };

  const activeColor = colorMap[color] || colorMap["primary1"]; // fallback
  const { track, thumb, translate } = sizes[size] || sizes.md;

  return (
    <button
      role="switch"
      aria-checked={value}
      tabIndex={0}
      onClick={() => onChange(!value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onChange(!value);
        }
      }}
      className={`relative inline-flex ${track} items-center rounded-full transition-colors duration-300 ease-in-out 
        ${
          value
            ? `${activeColor} ring-2 ring-primary1/40`
            : "bg-white dark:bg-gray-500 border border-primary1"
        }
      `}
    >
      <span
        className={`absolute top-1/2 -translate-y-1/2 left-0 ${thumb} rounded-full shadow-md transform transition-transform duration-300 ease-in-out
          ${value ? `${translate} bg-white` : "translate-x-[2px] bg-primary1"}
        `}
      />
    </button>
  );
}

export default Switch;
