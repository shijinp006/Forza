import { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { TopBarHeader } from "../Pages/docExpiry/TopBarHeader";
import { counters } from "../data/posData";

// Mobile View Component
import { MobileCounterSelect } from "../Pages/posReport/MobileCounterSelect";

// All Counters view components
import { CounterPerformanceChart } from "../Pages/posReport/CounterPerformanceChart";
import { CashiersPerformanceTable } from "../Pages/posReport/CashiersPerformanceTable";

// Specific counter view components
import { SummaryCards } from "../Pages/posReport/SummaryCards";
import { ShiftOverview } from "../Pages/posReport/ShiftOverview";
import { LiveTerminalsList } from "../Pages/posReport/LiveTerminalsList";

const inter = { fontFamily: "Inter, sans-serif" };

export const POSReport = () => {
    const [dateFilter, setDateFilter] = useState("Today");
    const [activeCounter, setActiveCounter] = useState("All Counters");
    const [viewType, setViewType] = useState("Amount");

    const isAllCounters = activeCounter === "All Counters";

    return (
        <div style={inter} className="min-h-screen bg-[#EDEAFB] flex flex-col pb-8">

            {/* ── TOP BAR HEADER ── */}
            <TopBarHeader dateFilter={dateFilter} setDateFilter={setDateFilter} />

            {/* ── PAGE TITLE ROW ── */}
            <div className="px-4 sm:px-10 mt-4 mb-3 flex items-center justify-between">
                <h1 style={{ ...inter, fontWeight: 700 }} className="text-slate-900 tracking-tight text-lg sm:text-2xl whitespace-nowrap">
                    POS Report
                </h1>
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-gray-200/80 shadow-xs cursor-pointer hover:bg-white transition">
                        <CalendarIcon size={13} className="text-slate-500" />
                        <span style={{ ...inter, fontWeight: 500 }} className="text-slate-700 text-[11px] sm:text-xs whitespace-nowrap">
                            Today, 15-01-25
                        </span>
                        <ChevronDown size={12} className="text-slate-400" />
                    </div>
                    <img
                        src="https://i.pravatar.cc/80?img=47"
                        alt="User Profile"
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-200 cursor-pointer shadow-xs"
                    />
                </div>
            </div>

            {/* ── COUNTER TABS / SELECT FIELD ── */}
            {/* Mobile View Component */}
            <MobileCounterSelect
                activeCounter={activeCounter}
                setActiveCounter={setActiveCounter}
            />

            {/* Desktop & Tablet View: Horizontal tab strip */}
            <div className="hidden sm:block px-4 sm:px-6 mb-4">
                <div
                    className="flex items-center rounded-[8px] bg-[#E4E8F1] gap-1.5 overflow-x-auto py-1 px-1 w-fit"
                    style={{ scrollbarWidth: "none" }}
                >
                    {counters.map((c) => {
                        const isActive = activeCounter === c;
                        return (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setActiveCounter(c)}
                                style={{
                                    ...inter,
                                    fontWeight: isActive ? 600 : 500,
                                    fontSize: "12.5px",
                                }}
                                className={`px-4 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${isActive
                                    ? "bg-white text-slate-800 shadow-sm border border-gray-200/60"
                                    : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                                    }`}
                            >
                                {c}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="px-4 sm:px-6 flex flex-col gap-4">

                {isAllCounters ? (
                    /* ══ ALL COUNTERS VIEW — Bar chart + cashiers table + live terminals ══ */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* Left column */}
                        <div className="lg:col-span-8 flex flex-col gap-4">
                            <CounterPerformanceChart onSelectCounter={setActiveCounter} />
                            <CashiersPerformanceTable viewType={viewType} setViewType={setViewType} />
                        </div>
                        {/* Right column */}
                        <div className="lg:col-span-4">
                            <LiveTerminalsList activeCounter={activeCounter} />
                        </div>
                    </div>
                ) : (
                    /* ══ SPECIFIC COUNTER VIEW — Summary cards + shift overview + live terminals ══ */
                    <>
                        {/* 3 summary cards */}
                        <SummaryCards activeCounter={activeCounter} />

                        {/* ── BOTTOM GRID: Shift Overview (left) + Live Terminals (right) ── */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                            <div className="lg:col-span-8">
                                <ShiftOverview counter={activeCounter} />
                            </div>
                            <div className="lg:col-span-4">
                                <LiveTerminalsList activeCounter={activeCounter} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
