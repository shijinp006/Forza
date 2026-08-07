import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const inter = { fontFamily: "Inter, sans-serif" };

export const FilterSelect = ({
    value,
    onChange,
    options = [],
    placeholder = "Select...",
    maxHeight = "max-h-56",
    className = "",
    align = "left", // "left" or "right"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = typeof value === "object" ? value?.label : value;

    return (
        <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
            {/* Filter Dropdown Pill Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                style={{ ...inter }}
                className={`flex items-center justify-between gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#E4E8F1] hover:bg-[#d8d6e6] text-[#2B2F34] font-medium transition cursor-pointer border overflow-hidden text-[10px] sm:text-xs whitespace-nowrap ${isOpen ? "border-slate-800 ring-1 ring-slate-800" : "border-transparent"
                    }`}
            >
                <span className="truncate overflow-hidden text-[10px] sm:text-xs">{selectedLabel || placeholder}</span>
                <ChevronDown
                    size={12}
                    className={`text-slate-600 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-slate-900" : ""
                        }`}
                />
            </button>

            {/* Dropdown Options List with max-h and overflow-auto */}
            {isOpen && (
                <div
                    className={`absolute ${align === "right" ? "right-0" : "left-0"} mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-gray-200/80 py-1.5 z-50 ${maxHeight} overflow-y-auto`}
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#cbd5e1 transparent"
                    }}
                >
                    {options.map((opt) => {
                        const optValue = typeof opt === "object" ? opt.value : opt;
                        const optLabel = typeof opt === "object" ? opt.label : opt;
                        const isSelected = optValue === value;

                        return (
                            <button
                                key={optValue}
                                type="button"
                                onClick={() => {
                                    onChange(optValue);
                                    setIsOpen(false);
                                }}
                                style={{ ...inter, fontSize: "12px" }}
                                className={`w-full text-left px-3 py-1.5 transition flex items-center justify-between cursor-pointer ${isSelected
                                    ? "bg-violet-50 text-violet-700 font-semibold"
                                    : "text-slate-700 hover:bg-gray-100 hover:text-slate-900"
                                    }`}
                            >
                                <span className="truncate">{optLabel}</span>
                                {isSelected && <Check size={13} className="text-violet-600 shrink-0 ml-2" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
