import { summaryCards, counterDetailsData } from "../../data/posData";
import DIcon from "../../assets/D.svg?react";
import SalesIcon from "../../assets/Sales.svg?react";
import ShortIcon from "../../assets/Short.svg?react";

const inter = { fontFamily: "Inter, sans-serif" };

export function SummaryCards({ activeCounter }) {
    const cards = (activeCounter && counterDetailsData[activeCounter]?.summaryCards) || summaryCards;

    const getCardIcon = (card) => {
        const label = card.label?.toLowerCase() || "";
        if (label.includes("excess") || label.includes("short")) {
            return <ShortIcon className="w-4 h-4 text-slate-500" />;
        }
        return <SalesIcon className="w-4 h-4 text-slate-500" />;
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {cards.map((card) => {
                return (
                    <div
                        key={card.label}
                        className="bg-white rounded-2xl p-4 border border-gray-100/80 shadow-sm flex flex-col gap-1.5"
                    >
                        {/* Label + icon row */}
                        <div className="flex items-center justify-between">
                            <span
                                style={{ ...inter, fontWeight: 500, fontSize: "12px" }}
                                className="text-[#424656"
                            >
                                {card.label}
                            </span>
                            <div className="w-7 h-7 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                                {getCardIcon(card)}
                            </div>
                        </div>

                        {/* Value */}
                        {card.value ? (
                            <p
                                style={{ ...inter, fontWeight: 700, fontSize: "22px", letterSpacing: "-0.5px" }}
                                className="text-slate-900 leading-tight flex items-center gap-1"
                            >
                                <DIcon className="w-5 h-5 text-slate-900 shrink-0" />
                                <span>{card.value}</span>
                            </p>
                        ) : (
                            <p
                                style={{ ...inter, fontWeight: 700, fontSize: "22px" }}
                                className="text-slate-900 leading-tight flex items-center gap-1"
                            >
                                <DIcon className="w-5 h-5 text-slate-900 shrink-0" />
                                <span>_</span>
                            </p>
                        )}

                        {/* Sub-label */}
                        <p
                            style={{ ...inter, fontWeight: 400, fontSize: "11px" }}
                            className="text-[#424656]"
                        >
                            {card.sub}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
