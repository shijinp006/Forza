import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { counters } from "../../data/posData";

const inter = { fontFamily: "Inter, sans-serif" };

export const MobileCounterSelect = ({ activeCounter, setActiveCounter }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="sm:hidden px-4 mb-4" ref={dropdownRef}>
            <div className="relative w-48">
                {/* Mobile Trigger Choose Field */}
                <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ ...inter, fontWeight: 600, fontSize: "13px" }}
                    className="w-full bg-white text-slate-800 rounded-xl px-3.5 py-2 flex items-center justify-between border border-gray-200/90 shadow-xs cursor-pointer hover:bg-gray-50 transition"
                >
                    <span className="truncate">{activeCounter}</span>
                    <ChevronDown
                        size={16}
                        className={`text-slate-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {/* Mobile Options Dropdown Menu with Max Height and Scroll */}
                {isDropdownOpen && (
                    <div
                        className="absolute left-0 top-full mt-1.5 w-48 bg-white border border-gray-200/90 rounded-xl shadow-lg z-50 max-h-40 overflow-y-auto p-1.5 flex flex-col gap-0.5"
                        style={{ scrollbarWidth: "thin" }}
                    >
                        {counters.map((c) => {
                            const isSelected = activeCounter === c;
                            return (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => {
                                        setActiveCounter(c);
                                        setIsDropdownOpen(false);
                                    }}
                                    style={{ ...inter, fontWeight: isSelected ? 700 : 500, fontSize: "12.5px" }}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition cursor-pointer ${isSelected
                                            ? "bg-violet-50 text-violet-700"
                                            : "text-slate-700 hover:bg-slate-50"
                                        }`}
                                >
                                    {c}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
