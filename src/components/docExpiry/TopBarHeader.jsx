import { useState } from "react";
import { Calendar as CalendarIcon, SlidersHorizontal, ChevronDown, Check } from "lucide-react";

const inter = { fontFamily: "Inter, sans-serif" };

export const TopBarHeader = ({ dateFilter, setDateFilter }) => {
    const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);

    return (
        <div
            className="mx-4 mt-4 sm:mx-6 sm:mt-5 rounded-2xl overflow-visible shrink-0 relative z-30"
            style={{
                background: "linear-gradient(135deg, #5949BE 0%, #CD77FF 100%)",
                boxShadow: "0 8px 32px rgba(89, 73, 190, 0.45), 0 4px 16px rgba(205, 119, 255, 0.3), 0 0 0 4px rgba(205, 119, 255, 0.15)",
            }}
        >
            <div className="flex items-center justify-between px-5 py-3">
                <span style={{ ...inter, fontWeight: 600, fontSize: "15px" }} className="text-white">
                    Alfuttaim
                </span>
                <div className="flex items-center gap-2 relative">
                    <div className="relative">
                        <button
                            onClick={() => setIsDateMenuOpen(!isDateMenuOpen)}
                            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg border border-white/30 hover:bg-white/30 transition cursor-pointer"
                        >
                            <CalendarIcon size={14} />
                            <span style={{ ...inter, fontWeight: 500, fontSize: "13px" }}>{dateFilter}</span>
                            <ChevronDown size={13} />
                        </button>

                        {isDateMenuOpen && (
                            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 text-left">
                                {["Today", "Last 7 Days", "Last 30 Days", "This Month", "All Time"].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => {
                                            setDateFilter(opt);
                                            setIsDateMenuOpen(false);
                                        }}
                                        className="w-full text-left px-3.5 py-1.5 text-xs text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition flex items-center justify-between cursor-pointer"
                                    >
                                        <span>{opt}</span>
                                        {dateFilter === opt && <Check size={13} className="text-violet-600" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setIsDateMenuOpen(!isDateMenuOpen)}
                        className="p-1.5 rounded-lg bg-white/20 border border-white/30 text-white hover:bg-white/30 transition cursor-pointer"
                    >
                        <SlidersHorizontal size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};
