/**
 * Flexible and accessible Select component
 * Props:
 * - options: Array<{ label: string, value: any }>
 * - value: selected option object
 * - onChange: callback(option) => void
 * - onSearch?: callback(searchText: string) => void
 * - placeholder?: string
 * - disabled?: boolean
 * - success?: boolean
 * - error?: boolean
 * - hint?: string
 * - renderOption?: (option) => ReactNode
 * - renderValue?: (option) => ReactNode
 */
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export const SelectElement = ({
  options = [],
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  icon,
  iconHeight = "h-6",
  iconWidth = "w-6",
}) => {
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(value || null);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [openDropDown, setOpenDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const wrapperRef = useRef(null);


  useEffect(() => {
    const filtered = options.filter((option) =>
      option?.label?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOptions(filtered);

    setHighlightedIndex(null);
  }, [search, options]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleKeyDown = (e) => {
    if (!openDropDown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        if (prev === null) return 0;
        return prev === filteredOptions.length - 1 ? 0 : prev + 1;
      });
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        if (prev === null) return filteredOptions.length - 1;
        return prev === 0 ? filteredOptions.length - 1 : prev - 1;
      });
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex !== null) {
        const selected = filteredOptions[highlightedIndex];
        if (selected) handleSelect(selected);
      }
    }
    if (e.key === "Escape") {
      setOpenDropdown(false);
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSearch(""); // keep label in input after selection
    onChange?.(option); // always return option object
    setOpenDropdown(false);
  };

  let inputClasses = `h-11 w-full rounded-lg border border-primary5 appearance-none pr-0 pl-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:border-primary2 focus:ring-4 transition-all duration-300 focus:ring-primary2/12 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    inputClasses += ` border border-semantic3 focus:border-semantic3 ring-semantic3/12 ring-4 focus:ring-semantic3/12 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += ` border-success-500 ring-4 ring-success-500/12 focus:border-success-300 focus:ring-success-500/12 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <div ref={wrapperRef} className="relative">
      {/* Input */}
      <input
        type={type}
        id={id}
        onClick={() => setOpenDropdown((prev) => !prev)}
        value={openDropDown ? search : selectedOption?.label}
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpenDropdown(true);
        }}
        onKeyDown={handleKeyDown}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
      />

      {/* Hint */}
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}

      {/* Dropdown */}
      {openDropDown && (
        <div className="absolute top-full left-0 mt-1 w-full max-h-60 py-4 px-4 overflow-auto rounded-md border border-primary2 ring-2 ring-primary2/20 bg-white dark:bg-gray-800 shadow-md z-50">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <p
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                key={index}
                className={`hover:bg-gray-100 my-1 transition-all duration-300 cursor-pointer text-gray-800 dark:text-white/90 dark:hover:bg-gray-700 rounded-md px-2 py-1.5 ${
                  selectedOption?.value === option.value
                    ? "border border-primary2"
                    : ""
                } ${
                  highlightedIndex === index
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
              >
                {option.label}
              </p>
            ))
          ) : search ? (
            <p className="text-gray-500 dark:text-gray-400">No options found</p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No Options Available
            </p>
          )}
        </div>
      )}

      {/* Icon */}
      {icon && (
        <span
          className={`absolute top-1/2 right-0 w-[50px]  text-primary1 hover:text-white cursor-pointer transition-all duration-300 rounded-r-md transform  h-full  -translate-y-1/2 flex items-center justify-center ${iconHeight} ${iconWidth}`}
          onClick={() => {
            setOpenDropdown((prev) => !prev);
          }}
        >
          {openDropDown ? (
            <FaAngleUp className={`${iconHeight} ${iconWidth}`} />
          ) : (
            <FaAngleDown className={`${iconHeight} ${iconWidth}`} />
          )}
        </span>
      )}
    </div>
  );
};
