import { shiftData, collectionDistribution, counterDetailsData, cashiers, getTypeColor } from "../../data/posData";
import DIcon from "../../assets/D.svg?react";

const inter = { fontFamily: "Inter, sans-serif" };

/* Donut segment data — circumference = 2π×38 ≈ 238.76 */

export function ShiftOverview({ counter }) {
    const currentShiftData = (counter && counterDetailsData[counter]?.shiftData) || shiftData;
    const { employee } = currentShiftData;

    let calculatedTotal = 0;
    if (currentShiftData?.totalCollection) {
        calculatedTotal = parseFloat(String(currentShiftData.totalCollection).replace(/[^0-9.]/g, "")) || 0;
    } else if (!counter || counter === "All Counters") {
        calculatedTotal = cashiers.reduce((acc, c) => {
            const num = parseFloat(String(c.sales).replace(/[^0-9.]/g, "")) || 0;
            return acc + num;
        }, 0);
    } else {
        const normalizedActive = counter.replace(/\s+/g, "").toUpperCase();
        const match = cashiers.find((c) => c.counter.replace(/\s+/g, "").toUpperCase() === normalizedActive);
        if (match) {
            calculatedTotal = parseFloat(String(match.sales).replace(/[^0-9.]/g, "")) || 0;
        }
    }

    const totalCollectedFormatted = calculatedTotal.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm flex flex-col gap-4 h-auto md:h-[520px] overflow-y-auto">

            {/* ── Top Row: Title + Denomination + Status ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between shrink-0 gap-2">
                <h2 style={{ ...inter, fontWeight: 700 }} className="text-slate-900 tracking-tight text-sm sm:text-base md:text-lg">
                    {currentShiftData.shiftLabel}
                </h2>
                <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto shrink-0">
                    <span style={{ ...inter, fontWeight: 500 }} className="text-slate-400 text-xs sm:text-xs">
                        {currentShiftData.denomination}
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100/80 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                        <span style={{ ...inter, fontWeight: 600 }} className="text-emerald-600 text-[10px] sm:text-[10.5px]">
                            {currentShiftData.status}
                        </span>
                    </span>
                </div>
            </div>

            {/* ── Two Inner Panels (stretched h-full to fill vertical space) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 h-full overflow-hidden">

                {/* ── Left Panel: Employee info & shift details ── */}
                <div className="bg-white rounded-2xl border border-[#C6C6CD] p-4 sm:p-5 flex flex-col justify-between h-full shadow-2xs">
                    {/* Employee info */}
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                        <div
                            className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0"
                            style={{ ...inter, fontWeight: 700, fontSize: "13px", color: "#6366F1" }}
                        >
                            {employee.initials}
                        </div>
                        <div>
                            <p style={{ ...inter, fontWeight: 700, fontSize: "13px" }} className="text-slate-800 leading-tight">
                                {employee.name}
                            </p>
                            <p style={{ ...inter, fontWeight: 400, fontSize: "11px" }} className="text-slate-400 leading-tight mt-0.5">
                                {employee.shift} • ID: {employee.id}
                            </p>
                        </div>
                    </div>

                    {/* Shift metrics rows */}
                    <div className="flex flex-col justify-between flex-1 pt-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#E0E3E5]">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "14.5px" }} className="text-[#566166]">
                                Log in
                            </span>
                            <span style={{ ...inter, fontWeight: 400, fontSize: "14.5px" }} className="text-[#000000]">
                                {currentShiftData.logIn}
                            </span>
                        </div>

                        <div className="flex items-center justify-between pb-2 border-b border-[#E0E3E5]">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "14.5px" }} className="text-[#566166]">
                                Log out
                            </span>
                            <span style={{ ...inter, fontWeight: 400, fontSize: "14.5px" }} className="text-[#000000]">
                                {currentShiftData.logOut}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-[#566166]">
                                VOID Bills
                            </span>
                            <span style={{ ...inter, fontWeight: 600, fontSize: "12.5px" }} className="text-[#2B2F34]">
                                {currentShiftData.voidBills}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-[#566166]">
                                Hold Bills
                            </span>
                            <span style={{ ...inter, fontWeight: 600, fontSize: "12.5px" }} className="text-[#2B2F34]">
                                {currentShiftData.holdBills}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-[#566166]">
                                Cash in Hand
                            </span>
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-[#2B2F34] inline-flex items-center gap-1">
                                <DIcon className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                                {currentShiftData.cashInHand}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-[#566166]">
                                Total Collection
                            </span>
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-[#2B2F34] inline-flex items-center gap-1">
                                <DIcon className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                                {currentShiftData.totalCollection}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-[#566166]">
                                Total Sale
                            </span>
                            <span style={{ ...inter, fontWeight: 600, fontSize: "13.5px" }} className="text-[#2B2F34] inline-flex items-center gap-1">
                                <DIcon className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                                {currentShiftData.totalSale}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Right Panel: Collection Distribution Donut ── */}
                <div className="bg-white rounded-2xl border border-[#C6C6CD] p-4 sm:p-5 flex flex-col justify-between items-center h-full shadow-2xs ">
                    <h3 style={{ ...inter, fontWeight: 700, fontSize: "12.5px" }} className="text-slate-800 self-start">
                        Collection Distribution
                    </h3>

                    {/* Donut Chart */}
                    <div className="relative w-48 h-48 sm:w-52 sm:h-52 my-auto flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="13" fill="transparent" />
                            {(() => {
                                const C = 2 * Math.PI * 38;
                                let accumOffset = 0;
                                return collectionDistribution.map((item) => {
                                    const p = Number(item.percentage) || 0;
                                    const color = item.color || getTypeColor(item.type, p);
                                    const dashLength = Math.max(0, (p / 100) * C - (p > 0 ? 4 : 0));
                                    const gapLength = C - dashLength;
                                    const offset = accumOffset;
                                    accumOffset -= (p / 100) * C;
                                    return (
                                        <circle
                                            key={item.type}
                                            cx="50" cy="50" r="38"
                                            stroke={color}
                                            strokeWidth="13"
                                            fill="transparent"
                                            strokeDasharray={`${dashLength.toFixed(1)} ${gapLength.toFixed(1)}`}
                                            strokeDashoffset={offset.toFixed(1)}
                                            strokeLinecap="round"
                                        />
                                    );
                                });
                            })()}
                        </svg>

                        {/* Donut Center */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span style={{ ...inter, fontSize: "12.5px", fontWeight: 400 }} className="text-[#585C62]">
                                Total Collected
                            </span>
                            <span style={{ ...inter, fontSize: "16px", fontWeight: 700 }} className="text-slate-800 mt-0.5 inline-flex items-center gap-1">
                                <DIcon className="w-4 h-4 text-slate-800 shrink-0" />
                                <span>{totalCollectedFormatted}</span>
                            </span>
                        </div>
                    </div>

                    {/* Legend with values */}
                    <div className="flex flex-col gap-2 w-full pt-3 border-t border-gray-100 shrink-0">
                        {collectionDistribution.map((item) => {
                            const p = Number(item.percentage) || 0;
                            const color = item.color || getTypeColor(item.type, p);
                            return (
                                <div key={item.type} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-2.5 h-2.5 rounded-full shrink-0"
                                            style={{ backgroundColor: color }}
                                        />
                                        <span style={{ ...inter, fontSize: "12.5px", fontWeight: 400 }} className="text-[#515F73]">
                                            {item.type} ({p}%)
                                        </span>
                                    </div>
                                    <span style={{ ...inter, fontSize: "12.5px", fontWeight: 400 }} className="text-[#2B2F34] inline-flex items-center gap-0.5">
                                        <DIcon className="w-3.5 h-3.5 text-[#2B2F34] shrink-0" />
                                        <span>{item.amount}</span>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
