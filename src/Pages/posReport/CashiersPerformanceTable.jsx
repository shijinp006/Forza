import { cashiers } from "../../data/posData";
import DIcon from "../../assets/D.svg?react";
import CashierIcon from "../../assets/Cashier.svg?react";

const poppins = { fontFamily: "Poppins, sans-serif" };
const inter = { fontFamily: "Inter, sans-serif" };

export function CashiersPerformanceTable({ viewType, setViewType }) {
    return (
        <div>
            <h2 style={{ ...poppins, fontWeight: 700, fontSize: "18px" }} className="text-[#000000]">
                Performance Insights
            </h2>
            <p style={{ ...inter, fontWeight: 400, fontSize: "12px" }} className="text-[#515F73] mb-3">
                Operational performance across all counters and cashiers.
            </p>

            <div className="bg-[#F3F5F8] rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
                {/* Inner Header Row matching screenshot */}
                <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 border-b border-gray-200/80 bg-[#F3F5F8]">
                    <div className="flex items-center gap-2">
                        <h3 style={{ ...poppins, fontWeight: 600, fontSize: "14px" }} className="text-slate-900 tracking-tight">
                            Top Performing Cashiers
                        </h3>
                        <CashierIcon className="w-5 h-5 shrink-0" />
                    </div>

                    {/* Amount / QTY Pill Toggle */}
                    <div className="flex items-center bg-[#E6ECF5] p-1 rounded-xl text-xs gap-1">
                        <button
                            onClick={() => setViewType("Amount")}
                            style={{ ...poppins, fontWeight: 500, fontSize: "12px" }}
                            className={`px-3.5 py-1 rounded-lg transition cursor-pointer ${viewType === "Amount"
                                ? "bg-white text-slate-800 shadow-xs"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            Amount
                        </button>
                        <button
                            onClick={() => setViewType("QTY")}
                            style={{ ...poppins, fontWeight: 500, fontSize: "12px" }}
                            className={`px-3.5 py-1 rounded-lg transition cursor-pointer ${viewType === "QTY"
                                ? "bg-white text-slate-800 shadow-xs"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            QTY
                        </button>
                    </div>
                </div>

                {/* Table Container */}
                <div className="p-4 sm:p-5 bg-white">

                    {/* Table */}
                    <div className="overflow-auto max-h-[300px]" style={{ scrollbarWidth: "thin" }}>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className=" text-[10.5px] text-[#45464D] font-semibold tracking-wider">
                                    <th className="py-2.5 px-3">RANK</th>
                                    <th className="py-2.5 px-3">CASHIER</th>
                                    <th className="py-2.5 px-3">COUNTER</th>
                                    <th className="py-2.5 px-3">TOTAL INV.</th>
                                    <th className="py-2.5 px-3">SALES</th>
                                    <th className="py-2.5 px-3 text-right">ITEM QTY</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {cashiers.map((item) => (
                                    <tr key={item.rank} className="hover:bg-violet-50/50 transition cursor-pointer">
                                        <td style={{ ...inter, fontWeight: 600, fontSize: "12px" }} className="py-3 px-3 text-violet-600">
                                            {item.rank}
                                        </td>
                                        <td style={{ ...inter, fontWeight: 500, fontSize: "12px" }} className="py-3 px-3 text-[#191C1E]">
                                            {item.name}
                                        </td>
                                        <td style={{ ...inter, fontWeight: 400, fontSize: "12px" }} className="py-3 px-3 text-[#191C1E]">
                                            {item.counter}
                                        </td>
                                        <td style={{ ...inter, fontWeight: 400, fontSize: "12px" }} className="py-3 px-3 text-[#191C1E]">
                                            {item.invoices}
                                        </td>
                                        <td style={{ ...poppins, fontWeight: 700, fontSize: "12.5px" }} className="py-3 px-3 text-[#191C1E]">
                                            <span className="inline-flex items-center gap-1">
                                                <DIcon className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                                                {item.sales}
                                            </span>
                                        </td>
                                        <td style={{ ...inter, fontWeight: 500, fontSize: "12px" }} className="py-3 px-3 text-right text-[#191C1E]">
                                            {item.qty}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
