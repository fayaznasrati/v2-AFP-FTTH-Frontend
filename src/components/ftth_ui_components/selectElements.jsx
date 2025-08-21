import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

/**
 * SingleSelect Component
 * Props:
 * - items: array of objects
 * - valueKey: property name to use as value (must be unique)
 * - getLabel: function(item) => string, defines how to display the label
 * - placeholder: string
 * - initialSelected: single selected item (object or null)
 * - onChange: callback(selectedItem) => void
 * - className: optional Tailwind classes
 */
export default function SingleSelect({
  items = [],
  valueKey = "value",
  getLabel = (item) => item.label || "",
  placeholder = "Select...",
  initialSelected = null,
  onChange = () => {},
  className = "",
  disabled = false,
  success = false,
  error = false,
  hint,
}) {
  const [selectedItem, setSelectedItem] = useState(initialSelected);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef();


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
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(
        (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filteredItems[highlightedIndex];
      if (item) selectItem(item);
    } else if (e.key === "Backspace" && !inputValue && selectedItem) {
      clearSelection();
    }
  };

  let inputClasses = `flex flex-wrap items-center gap-1 py-2 px-3 dark:border-[#444] ${
    error && "outline-hidden  ring-4 ring-semantic3/12 border-semantic3"
  }  rounded-lg  bg-white border  cursor-text text-sm shadow-theme-xs ${
    isOpen && !error
      ? "outline-hidden  ring-4 ring-primary2/12 border border-primary2"
      : isOpen && error
      ? "outline-hidden  ring-4 ring-semantic3/12 border-semantic3"
      : isOpen && success
      ? "outline-hidden  ring-4 ring-success-500/12 border-success-500"
      : "border-primary5"
  }  transition-all duration-300  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  }

  return (
    <div
      className={`relative w-full ${className} rounded-md`}
      ref={containerRef}
    >
      <div
        className={`${inputClasses}`}
        onClick={() => {
          if (!disabled) {
            setIsOpen(true);
          }
        }}
      >
        {selectedItem && (
          <span className="flex items-center text-[12px] dark:text-white bg-primary2/20 text-gray-800 px-2 py-[2px] rounded">
            {getLabel(selectedItem)}
            <button
              disabled={disabled}
              className="ml-1 text-gray-500 dark:text-white hover:text-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
            >
              &times;
            </button>
          </span>
        )}

        <input
          className={`flex-1 outline-none min-w-[120px] appearance-none placeholder:text-gray-400 dark:text-white/80`}
          placeholder={!selectedItem ? placeholder : ""}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
      </div>

      {isOpen && (
        <ul
          className={`absolute z-10 w-full mt-1 px-2 py-1 transition-all duration-100 border dark:bg-slate-900 ${
            error
              ? "border-semantic3 ring-4 ring-semantic3/12"
              : "border-primary2 ring-4 ring-primary2/12"
          } bg-white rounded shadow max-h-60 overflow-auto`}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={item[valueKey]}
                className={`text-[12px] dark:text-white px-3 py-2 cursor-pointer rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  index === highlightedIndex
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => selectItem(item)}
              >
                {getLabel(item)}
              </li>
            ))
          ) : (
            <p className="px-3 py-2 text-[12px] dark:text-white">
              {inputValue
                ? `No results found for "${inputValue}"`
                : "No Items Available"}
            </p>
          )}
        </ul>
      )}

      {hint && (
        <p
          className={`text-[12px] my-1 ${
            error
              ? "text-semantic3"
              : success
              ? "text-green-500"
              : "text-gray-500 dark:text-white/80"
          }`}
        >
          {hint}
        </p>
      )}

      <div className="absolute right-2 top-[35%] transform -translate-y-1/2">
        {isOpen ? (
          <FaAngleUp className="text-primary1 dark:text-white" />
        ) : (
          <FaAngleDown className="text-primary1 dark:text-white" />
        )}
      </div>
    </div>
  );
}
