import { shiftData, collectionDistribution, counterDetailsData } from "../../data/posData";

const inter = { fontFamily: "Inter, sans-serif" };

/* Donut segment data — circumference = 2π×38 ≈ 238.76 */
const SEGMENTS = [
    { color: "#22C55E", dashArray: "95.5 143.26", offset: "0" }, // Cash  40%
    { color: "#3B82F6", dashArray: "71.6 167.16", offset: "-95.5" }, // Card  30%
    { color: "#F97316", dashArray: "59.7 179.06", offset: "-167.1" }, // Bank  25%
    { color: "#EF4444", dashArray: "11.9 226.86", offset: "-226.8" }, // Credit 5%
];

export function ShiftOverview({ counter }) {
    const currentShiftData = (counter && counterDetailsData[counter]?.shiftData) || shiftData;
    const { employee } = currentShiftData;

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col gap-4 min-h-[520px] md:h-[520px]">

            {/* ── Top Row: Title + Denomination + Status ── */}
            <div className="flex items-center justify-between shrink-0 gap-1.5">
                <h2 style={{ ...inter, fontWeight: 700 }} className="text-slate-900 tracking-tight text-xs sm:text-base whitespace-nowrap">
                    {currentShiftData.shiftLabel}
                </h2>
                <div className="flex items-center gap-1.5 shrink-0">
                    <span style={{ ...inter, fontWeight: 500 }} className="text-slate-400 text-[10px] sm:text-xs whitespace-nowrap">
                        {currentShiftData.denomination}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100/80 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                        <span style={{ ...inter, fontWeight: 600 }} className="text-emerald-600 text-[9.5px] sm:text-[10.5px]">
                            {currentShiftData.status}
                        </span>
                    </span>
                </div>
            </div>

            {/* ── Two Inner Panels (stretched h-full to fill vertical space) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 h-full overflow-hidden">

                {/* ── Left Panel: Employee info & shift details ── */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex flex-col justify-between h-full shadow-2xs">
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
                        <div className="flex items-center justify-between">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-slate-400">
                                Log in
                            </span>
                            <span style={{ ...inter, fontWeight: 600, fontSize: "12.5px" }} className="text-slate-800">
                                {currentShiftData.logIn}
                            </span>
                        </div>

                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-slate-400">
                                Log out
                            </span>
                            <span style={{ ...inter, fontWeight: 500, fontSize: "12.5px" }} className="text-slate-400">
                                {currentShiftData.logOut}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-slate-400">
                                VOID Bills
                            </span>
                            <span style={{ ...inter, fontWeight: 600, fontSize: "12.5px" }} className="text-slate-800">
                                {currentShiftData.voidBills}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-slate-400">
                                Hold Bills
                            </span>
                            <span style={{ ...inter, fontWeight: 600, fontSize: "12.5px" }} className="text-slate-800">
                                {currentShiftData.holdBills}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-slate-400">
                                Cash in Hand
                            </span>
                            <span style={{ ...inter, fontWeight: 600, fontSize: "12.5px" }} className="text-slate-700">
                                ฿ {currentShiftData.cashInHand}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-slate-400">
                                Total Collection
                            </span>
                            <span style={{ ...inter, fontWeight: 600, fontSize: "12.5px" }} className="text-slate-700">
                                ฿ {currentShiftData.totalCollection}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span style={{ ...inter, fontWeight: 400, fontSize: "12.5px" }} className="text-slate-400">
                                Total Sale
                            </span>
                            <span style={{ ...inter, fontWeight: 700, fontSize: "13.5px" }} className="text-slate-900">
                                ฿ {currentShiftData.totalSale}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Right Panel: Collection Distribution Donut ── */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex flex-col justify-between items-center h-full shadow-2xs">
                    <h3 style={{ ...inter, fontWeight: 700, fontSize: "12.5px" }} className="text-slate-800 self-start">
                        Collection Distribution
                    </h3>

                    {/* Donut Chart */}
                    <div className="relative w-40 h-40 my-auto flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="12" fill="transparent" />
                            {SEGMENTS.map((seg, i) => (
                                <circle
                                    key={i}
                                    cx="50" cy="50" r="38"
                                    stroke={seg.color}
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={seg.dashArray}
                                    strokeDashoffset={seg.offset}
                                    strokeLinecap="round"
                                />
                            ))}
                        </svg>

                        {/* Donut Center */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span style={{ ...inter, fontSize: "9.5px", fontWeight: 400 }} className="text-slate-400">
                                Total Collected
                            </span>
                            <span style={{ ...inter, fontSize: "12px", fontWeight: 700 }} className="text-slate-800 mt-0.5">
                                ฿ 5608.00
                            </span>
                        </div>
                    </div>

                    {/* Legend with values */}
                    <div className="flex flex-col gap-2 w-full pt-3 border-t border-gray-100 shrink-0">
                        {collectionDistribution.map((item) => (
                            <div key={item.type} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full shrink-0"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span style={{ ...inter, fontSize: "11.5px", fontWeight: 400 }} className="text-slate-500">
                                        {item.label}
                                    </span>
                                </div>
                                <span style={{ ...inter, fontSize: "11.5px", fontWeight: 600 }} className="text-slate-700">
                                    ฿ {item.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
