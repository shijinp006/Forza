import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { barData, collectionDistribution, cashiers } from "../../data/posData";
import DIcon from "../../assets/D.svg?react";

const poppins = { fontFamily: "Poppins, sans-serif" };
const inter = { fontFamily: "Inter, sans-serif" };

// Design-spec constants (from Figma reference)
const COL_W = 46;           // px – each bar column width
const COL_H = 281;          // px – each bar column height
const PAD_TOP = 110;        // px – always-empty space at top of column
const PAD_X = 4;            // px – left/right padding inside column
const FILL_AREA = COL_H - PAD_TOP; // 171px usable fill area
const MAX_VAL = 5000;
const Y_TICKS = [5000, 4000, 3000, 2000, 1000, 0];

export function CounterPerformanceChart({ activeCounter, onSelectCounter, viewType }) {
    const displayBarData = barData.map((bar) => {
        if (viewType === "QTY") {
            const cashierItem = cashiers.find((c) => c.counter === bar.label);
            const qtyVal = cashierItem ? parseInt(cashierItem.qty) || 0 : 0;
            const height = Math.round((qtyVal / 200) * 100);
            return { ...bar, height };
        }
        return bar;
    });
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-sm flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 style={{ ...poppins, fontWeight: 700 }} className="text-slate-900 text-[13px] sm:text-base md:text-lg tracking-tight">
                    All Counter Performance Overview
                </h2>
                <button className="text-slate-400 hover:text-slate-600 transition cursor-pointer p-1 shrink-0">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {/* Flex content: Bar Chart + Donut Chart — stacked on mobile/tablet, row on desktop */}
            <div className="flex flex-col xl:flex-row items-center xl:items-start justify-between gap-6 pt-2">

                {/* ── BAR CHART ── */}
                <div className="flex-1 w-full flex items-start gap-3 overflow-x-auto min-w-0" style={{ scrollbarWidth: "none" }}>

                    {/* Y-axis labels — starts from top, spans full column height */}
                    <div
                        style={{
                            height: `${COL_H}px`,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            ...inter,
                            fontSize: "10px",
                            fontWeight: 500,
                            color: "#A0AEC0",
                            userSelect: "none",
                            paddingRight: "6px",
                            flexShrink: 0,
                            lineHeight: 1,
                        }}
                    >
                        {Y_TICKS.map((t) => (
                            <span key={t}>{t}</span>
                        ))}
                    </div>

                    {/* Bar columns + horizontal grid lines wrapper */}
                    <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>

                        {/* Horizontal dashed grid lines — span full column height */}
                        {Y_TICKS.map((t) => {
                            // Position matches Y-axis labels: 5000 at top (0px), 0 at bottom (COL_H)
                            const topPx = (1 - t / MAX_VAL) * COL_H;
                            return (
                                <div
                                    key={t}
                                    style={{
                                        position: "absolute",
                                        top: `${topPx}px`,
                                        left: 0,
                                        right: 0,
                                        borderTop: "1px dashed rgba(226, 232, 240, 0.8)",
                                        zIndex: 0,
                                        pointerEvents: "none",
                                    }}
                                />
                            );
                        })}

                        {/* Bar columns row — 14px gap on mobile so bars never squish, justify-between on desktop */}
                        <div
                            style={{ display: "flex", position: "relative", zIndex: 1 }}
                            className="gap-3.5 sm:gap-4 lg:gap-0 lg:justify-between w-max lg:w-full min-w-max lg:min-w-0"
                        >
                            {displayBarData.map((bar) => {
                                const fillH = Math.round((bar.height / 100) * FILL_AREA);

                                return (
                                    <div
                                        key={bar.id}
                                        onClick={() => onSelectCounter && onSelectCounter(bar.id)}
                                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
                                        className="group cursor-pointer"
                                    >
                                        {/* ── Column track (matching uploaded image effect) ── */}
                                        <div
                                            style={{
                                                width: `${COL_W}px`,
                                                height: `${COL_H}px`,
                                                paddingTop: `${PAD_TOP}px`,
                                                paddingLeft: "4px",
                                                borderRadius: "16px",
                                                paddingRight: "2px",
                                                paddingBottom: "2px",
                                                border: "1px solid #E2E0EE",
                                                backgroundColor: "#ECE9F5",
                                                boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.05)",
                                                position: "relative",
                                                overflow: "hidden",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-end",
                                                boxSizing: "border-box",
                                            }}
                                        >
                                            {fillH > 0 && (
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: `${fillH}px`,
                                                        borderRadius: "8px",
                                                        background: "linear-gradient(180deg, #6F57DE 0%, #573DD4 100%)",
                                                        boxShadow: "inset 4px 3px 4px rgba(255, 255, 255, 0.95), 0px 2px 10px rgba(111, 87, 222, 0.4)",
                                                        border: "1.5px solid rgba(255, 255, 255, 0.85)",
                                                        transition: "height 0.5s ease",
                                                        position: "relative",
                                                        zIndex: 2,
                                                    }}
                                                />
                                            )}
                                        </div>

                                        {/* Dot + label */}
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                                            <span
                                                style={{
                                                    width: "7px",
                                                    height: "7px",
                                                    borderRadius: "50%",
                                                    display: "inline-block",
                                                    backgroundColor: bar.height > 0 ? "#6655D8" : "transparent",
                                                    border: bar.height > 0 ? "none" : "2px solid #CBD5E1",
                                                }}
                                            />
                                            <span
                                                style={{
                                                    ...inter,
                                                    fontWeight: 600,
                                                    fontSize: "11px",
                                                    color: bar.height > 0 ? "#64748B" : "#CBD5E1",
                                                }}
                                            >
                                                {bar.label}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── COLLECTION DISTRIBUTION DONUT ── */}
                <div className="w-full sm:w-[280px] bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-5 flex flex-col items-center shrink-0">
                    <h3 style={{ ...poppins, fontWeight: 700, fontSize: "14px" }} className="text-slate-900 self-start mb-2">
                        Collection Distribution
                    </h3>

                    {/* Donut SVG */}
                    <div className="relative w-full h-48 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                            <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="11" fill="transparent" />
                            <circle cx="50" cy="50" r="38" stroke="#22C55E" strokeWidth="11" fill="transparent"
                                strokeDasharray="95.5 143.2" strokeDashoffset="0" strokeLinecap="round" />
                            <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="11" fill="transparent"
                                strokeDasharray="71.6 167.1" strokeDashoffset="-98" strokeLinecap="round" />
                            <circle cx="50" cy="50" r="38" stroke="#F97316" strokeWidth="11" fill="transparent"
                                strokeDasharray="35.8 202.9" strokeDashoffset="-172" strokeLinecap="round" />
                            <circle cx="50" cy="50" r="38" stroke="#EF4444" strokeWidth="11" fill="transparent"
                                strokeDasharray="11.9 226.8" strokeDashoffset="-210" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                            <span style={{ ...inter, fontWeight: 500, fontSize: "10.5px" }} className="text-slate-400 leading-tight">
                                Total Collected
                            </span>
                            <span style={{ ...poppins, fontWeight: 700, fontSize: "13.5px" }} className="text-slate-900 leading-tight mt-1 flex items-center justify-center gap-1">
                                <DIcon className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                                <span>51212608.00</span>
                            </span>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 w-full mt-3 pt-3 border-t border-gray-100">
                        {collectionDistribution.map((item) => (
                            <div key={item.type} className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                <span style={{ ...inter, fontSize: "11.5px", fontWeight: 500 }} className="text-slate-600 truncate">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
