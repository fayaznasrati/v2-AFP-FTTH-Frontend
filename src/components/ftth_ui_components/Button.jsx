import React from "react";
import { FaSpinner } from "react-icons/fa"; // for loading spinner

function Button({
  label,
  onClick,
  bg = "bg-primary1", // Tailwind bg color class (e.g., bg-blue-500)
  disabled = false,
  isFillOnHover = false,
  className = "",
  type = "button",
  success = false,
  error = false,
  isLoading = false,
  icon,
  iconPosition = "left",
  width = "",
  height = "h-10",
}) {
  // Base styles
  let baseClasses = `flex items-center justify-center gap-2 font-medium rounded-[8px] 
    shadow-md transition-all duration-300 ${width} ${height} px-4 py-3`;

  // Default styles
  let colorClasses = "";

  if (isFillOnHover && !isLoading) {
    // Transparent with border, bg applied only on hover
    colorClasses = `${bg.replace("bg-", "border-")} text-${bg.replace(
      "bg-",
      ""
    )} border hover:${bg} hover:text-white bg-transparent`;
  } else if (isFillOnHover && isLoading) {
    colorClasses = `${bg} text-white`;
  } else {
    // Solid button
    colorClasses = `${bg} text-white hover:bg-primary3`;
  }

  // Success & Error overrides
  if (success)
    colorClasses = isFillOnHover
      ? "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-transparent"
      : "bg-green-500 text-white hover:bg-green-600";

  if (error)
    colorClasses = isFillOnHover
      ? "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
      : "bg-red-500 text-white hover:bg-red-600";

  // Disabled override
  if (disabled)
    colorClasses =
      "bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400";

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseClasses} ${colorClasses} ${className}`}
    >
      {/* Loading spinner */}
      {isLoading && (
        <FaSpinner
          className={`animate-spin h-4 w-4 ${
            isFillOnHover ? " text-white" : "text-white"
          } `}
        />
      )}

      {/* Icon Left */}
      {!isLoading && icon && iconPosition === "left" && (
        <span className="flex items-center">{icon}</span>
      )}

      {/* Label */}
      {label && <span>{label}</span>}

      {/* Icon Right */}
      {!isLoading && icon && iconPosition === "right" && (
        <span className="flex items-center">{icon}</span>
      )}
    </button>
  );
}

export default Button;
