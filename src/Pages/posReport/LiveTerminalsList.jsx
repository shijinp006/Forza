import { terminals, liveInvoices } from "../../data/posData";
import BluecolorDIcon from "../../assets/BluecolorD.svg?react";

const inter = { fontFamily: "Inter, sans-serif, Manrope" };

/* Receipt Scalloped Edge Component (Smooth wavy top) */
function ScallopedTopEdge({ color = "#F4F5F8", stroke = "#E2E8F0" }) {
    return (
        <div className="w-full overflow-hidden leading-none select-none h-3 -mb-[1px]">
            <svg
                className="w-full h-3 block"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
            >
                {/* Fill */}
                <path
                    d="M 0,12 Q 5,2 10,12 Q 15,2 20,12 Q 25,2 30,12 Q 35,2 40,12 Q 45,2 50,12 Q 55,2 60,12 Q 65,2 70,12 Q 75,2 80,12 Q 85,2 90,12 Q 95,2 100,12 Q 105,2 110,12 Q 115,2 120,12 Q 125,2 130,12 Q 135,2 140,12 Q 145,2 150,12 Q 155,2 160,12 Q 165,2 170,12 Q 175,2 180,12 Q 185,2 190,12 Q 195,2 200,12 Q 205,2 210,12 Q 215,2 220,12 Q 225,2 230,12 Q 235,2 240,12 Q 245,2 250,12 Q 255,2 260,12 Q 265,2 270,12 Q 275,2 280,12 Q 285,2 290,12 Q 295,2 300,12 L 300,12 L 0,12 Z"
                    fill={color}
                />
                {/* Top wavy line stroke */}
                <path
                    d="M 0,12 Q 5,2 10,12 Q 15,2 20,12 Q 25,2 30,12 Q 35,2 40,12 Q 45,2 50,12 Q 55,2 60,12 Q 65,2 70,12 Q 75,2 80,12 Q 85,2 90,12 Q 95,2 100,12 Q 105,2 110,12 Q 115,2 120,12 Q 125,2 130,12 Q 135,2 140,12 Q 145,2 150,12 Q 155,2 160,12 Q 165,2 170,12 Q 175,2 180,12 Q 185,2 190,12 Q 195,2 200,12 Q 205,2 210,12 Q 215,2 220,12 Q 225,2 230,12 Q 235,2 240,12 Q 245,2 250,12 Q 255,2 260,12 Q 265,2 270,12 Q 275,2 280,12 Q 285,2 290,12 Q 295,2 300,12"
                    fill="none"
                    stroke={stroke}
                    strokeWidth="1"
                />
            </svg>
        </div>
    );
}

export function LiveTerminalsList({ activeCounter = "All Counters" }) {
    const isAllCounters = activeCounter === "All Counters";

    return (
        <div
            style={{
                width: "100%",
                height: isAllCounters ? "855px" : "520px",
                maxHeight: isAllCounters ? "855px" : "520px",
                borderRadius: "12px",
                border: "1px solid #E0E3E5",
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: "20px",
                    borderBottom: "1px solid #C5BCF2",
                    backgroundColor: "#E7EBEF",
                    flexShrink: 0,
                }}
            >
                <h3 style={{ ...inter, fontWeight: 900, fontSize: "16px", color: "#1E293B", margin: 0 }}>
                    Live Terminals
                </h3>
            </div>

            {/* Scrollable list */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    padding: "16px 12px 24px 12px",
                    backgroundColor: "#FFFFFF",
                    scrollbarWidth: "thin",
                }}
            >
                {isAllCounters ? (
                    /* ══ ALL COUNTERS VIEW ══ */
                    terminals.map((t) => (
                        <div
                            key={t.name}
                            style={{
                                width: "100%",
                                minHeight: "103px",
                                borderRadius: "12px",
                                border: "0.5px solid #E5E7EB",
                                backgroundColor: "#FFFFFF",
                                padding: "16px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                                boxSizing: "border-box",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                flexShrink: 0,
                            }}
                        >
                            {/* Row 1: dot + Counter name + time */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span
                                        style={{
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "50%",
                                            backgroundColor: t.isOnline ? "#4ADE80" : "#CBD5E1",
                                            display: "inline-block",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <span
                                        style={{
                                            ...inter,
                                            fontWeight: 600,
                                            fontSize: "13px",
                                            color: t.isOnline ? "#191C1E" : "#94A3B8",
                                        }}
                                    >
                                        {t.name}
                                    </span>
                                </div>
                                <span style={{ ...inter, fontWeight: 400, fontSize: "11px", color: "#515F73" }}>
                                    {t.time}
                                </span>
                            </div>

                            {/* Row 2: Labels + Values */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ ...inter, fontWeight: 400, fontSize: "10.5px", color: "#515F73" }}>
                                        Total Invoices
                                    </span>
                                    <span style={{ ...inter, fontWeight: 400, fontSize: "10.5px", color: "#515F73" }}>
                                        Amount
                                    </span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <span
                                        style={{
                                            ...inter,
                                            fontWeight: 700,
                                            fontSize: "16px",
                                            color: t.isOnline ? "#1E293B" : "#CBD5E1",
                                        }}
                                    >
                                        {t.invoices}
                                    </span>
                                    <span
                                        style={{
                                            ...inter,
                                            fontWeight: 700,
                                            fontSize: "13px",
                                            color: t.isOnline ? "#0053DB" : "#CBD5E1",
                                        }}
                                        className="inline-flex items-center gap-1"
                                    >
                                        {t.isOnline ? (
                                            <BluecolorDIcon className="w-4 h-4 shrink-0" />
                                        ) : (
                                            <BluecolorDIcon className="w-4 h-4 shrink-0 opacity-40 grayscale" />
                                        )}
                                        {t.amount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    /* ══ SPECIFIC COUNTER FILTER VIEW (Scalloped Receipt Cards) ══ */
                    liveInvoices.map((inv) => (
                        <div
                            key={inv.id}
                            className="relative flex flex-col drop-shadow-2xs group cursor-pointer"
                        >
                            {/* Top Scalloped Wave Edge */}
                            <ScallopedTopEdge color="#F4F5F8" stroke="#E2E8F0" />

                            {/* Main receipt body */}
                            <div className="bg-[#F4F5F8] border-x border-b border-[#E2E8F0] rounded-b-xl px-4 py-3 flex flex-col gap-2.5">
                                {/* Row 1: Green dot + Invoice ID + Time */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#6EE7B7] inline-block shrink-0" />
                                        <span style={{ ...inter, fontWeight: 700, fontSize: "13px" }} className="text-[#191C1E]">
                                            {inv.id}
                                        </span>
                                    </div>
                                    <span style={{ ...inter, fontWeight: 500, fontSize: "11.5px" }} className="text-[#515F73]">
                                        {inv.time}
                                    </span>
                                </div>

                                {/* Row 2: Labels */}
                                <div className="flex items-center justify-between mt-1">
                                    <span style={{ ...inter, fontWeight: 500, fontSize: "11px" }} className="text-[#515F73]">
                                        Total Items
                                    </span>
                                    <span style={{ ...inter, fontWeight: 500, fontSize: "11px" }} className="text-[#515F73]">
                                        Amount
                                    </span>
                                </div>

                                {/* Row 3: Values */}
                                <div className="flex items-center justify-between">
                                    <span style={{ ...inter, fontWeight: 700, fontSize: "15px" }} className="text-[#191C1E]">
                                        {inv.items}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span style={{ ...inter, fontWeight: 700, fontSize: "11.5px" }} className="text-[#22C55E] tracking-wider uppercase">
                                            {inv.method}
                                        </span>
                                        <span style={{ ...inter, fontWeight: 700, fontSize: "14px" }} className="text-[#0053DB] inline-flex items-center gap-1">
                                            <BluecolorDIcon className="w-3.5 h-3.5 shrink-0" />
                                            <span>{inv.amount}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
