import { terminals, liveInvoices } from "../../data/posData";

const inter = { fontFamily: "Inter, sans-serif, Manrope" };

/* Receipt Jagged Edge Component */
function SerratedEdge({ position = "top" }) {
    return (
        <div className={`w-full overflow-hidden leading-none select-none h-2.5 ${position === "bottom" ? "rotate-180" : ""}`}>
            <svg
                className="w-full h-2.5 text-[#F4F6F8] block"
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
                fill="currentColor"
            >
                <path d="M0,12 L10,0 L20,12 L30,0 L40,12 L50,0 L60,12 L70,0 L80,12 L90,0 L100,12 L110,0 L120,12 L130,0 L140,12 L150,0 L160,12 L170,0 L180,12 L190,0 L200,12 L210,0 L220,12 L230,0 L240,12 L250,0 L260,12 L270,0 L280,12 L290,0 L300,12 L310,0 L320,12 L330,0 L340,12 L350,0 L360,12 L370,0 L380,12 L390,0 L400,12 L400,12 L0,12 Z" />
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
                height: isAllCounters ? "790px" : "520px",
                maxHeight: isAllCounters ? "798px" : "520px",
                borderRadius: "12px",
                border: "1px solid #C5BCF2",
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
                data-lenis-prevent
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
                    /* ══ ALL COUNTERS VIEW (Counter 2, 3, 4, 5, 6) ══ */
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
                                            color: t.isOnline ? "#334155" : "#94A3B8",
                                        }}
                                    >
                                        {t.name}
                                    </span>
                                </div>
                                <span style={{ ...inter, fontWeight: 400, fontSize: "11px", color: "#94A3B8" }}>
                                    {t.time}
                                </span>
                            </div>

                            {/* Row 2: Labels + Values */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ ...inter, fontWeight: 400, fontSize: "10.5px", color: "#94A3B8" }}>
                                        Total Invoices
                                    </span>
                                    <span style={{ ...inter, fontWeight: 400, fontSize: "10.5px", color: "#94A3B8" }}>
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
                                            color: t.isOnline ? "#6655D8" : "#CBD5E1",
                                        }}
                                    >
                                        Đ {t.amount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    /* ══ SPECIFIC COUNTER FILTER VIEW (Receipt Cards) ══ */
                    liveInvoices.map((inv) => (
                        <div
                            key={inv.id}
                            className="relative flex flex-col drop-shadow-xs group cursor-pointer"
                        >
                            {/* Top serrated edge */}
                            <SerratedEdge position="top" />

                            {/* Main receipt body */}
                            <div className="bg-[#F4F6F8] px-4 py-3 flex flex-col gap-2">
                                {/* Row 1: Green dot + Invoice ID + Time */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#22C55E] inline-block shrink-0" />
                                        <span style={{ ...inter, fontWeight: 700, fontSize: "13px" }} className="text-slate-800">
                                            {inv.id}
                                        </span>
                                    </div>
                                    <span style={{ ...inter, fontWeight: 500, fontSize: "11px" }} className="text-slate-400">
                                        {inv.time}
                                    </span>
                                </div>

                                {/* Row 2: Labels */}
                                <div className="flex items-center justify-between">
                                    <span style={{ ...inter, fontWeight: 500, fontSize: "11px" }} className="text-slate-400">
                                        Total Items
                                    </span>
                                    <span style={{ ...inter, fontWeight: 500, fontSize: "11px" }} className="text-slate-400">
                                        Amount
                                    </span>
                                </div>

                                {/* Row 3: Values */}
                                <div className="flex items-center justify-between">
                                    <span style={{ ...inter, fontWeight: 800, fontSize: "16px" }} className="text-slate-900">
                                        {inv.items}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <span style={{ ...inter, fontWeight: 700, fontSize: "11px" }} className="text-[#22C55E] tracking-wider">
                                            {inv.method}
                                        </span>
                                        <span style={{ ...inter, fontWeight: 800, fontSize: "14px" }} className="text-[#2563EB]">
                                            Đ {inv.amount}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom serrated edge */}
                            <SerratedEdge position="bottom" />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
