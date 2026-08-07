import { FileText, ScanSearch } from "lucide-react";
import { summaryCards, counterDetailsData } from "../../data/posData";

const inter = { fontFamily: "Inter, sans-serif" };

const ICON_MAP = { receipt: FileText, scan: ScanSearch };

export function SummaryCards({ activeCounter }) {
    const cards = (activeCounter && counterDetailsData[activeCounter]?.summaryCards) || summaryCards;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {cards.map((card) => {
                const Icon = ICON_MAP[card.iconType] ?? FileText;
                return (
                    <div
                        key={card.label}
                        className="bg-white rounded-2xl p-4 border border-gray-100/80 shadow-sm flex flex-col gap-1.5"
                    >
                        {/* Label + icon row */}
                        <div className="flex items-center justify-between">
                            <span
                                style={{ ...inter, fontWeight: 500, fontSize: "12px" }}
                                className="text-slate-500"
                            >
                                {card.label}
                            </span>
                            <div className="w-7 h-7 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                                <Icon size={14} className="text-slate-400" />
                            </div>
                        </div>

                        {/* Value */}
                        {card.value ? (
                            <p
                                style={{ ...inter, fontWeight: 700, fontSize: "22px", letterSpacing: "-0.5px" }}
                                className="text-slate-900 leading-tight"
                            >
                                Đ {card.value}
                            </p>
                        ) : (
                            <p
                                style={{ ...inter, fontWeight: 700, fontSize: "22px" }}
                                className="text-slate-900 leading-tight"
                            >
                                Đ _
                            </p>
                        )}

                        {/* Sub-label */}
                        <p
                            style={{ ...inter, fontWeight: 400, fontSize: "11px" }}
                            className="text-slate-400"
                        >
                            {card.sub}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
