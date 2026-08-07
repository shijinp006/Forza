import { SquarePen } from "lucide-react";
import { cashiers } from "../../data/posData";

const poppins = { fontFamily: "Poppins, sans-serif" };
const inter = { fontFamily: "Inter, sans-serif" };

export function CashiersPerformanceTable({ viewType, setViewType }) {
    return (
        <div>
            <h2 style={{ ...poppins, fontWeight: 700, fontSize: "18px" }} className="text-slate-900">
                Performance Insights
            </h2>
            <p style={{ ...inter, fontWeight: 400, fontSize: "12px" }} className="text-slate-500 mb-3">
                Operational performance across all counters and cashiers.
            </p>

            <div className="bg-[#F6F5FC] rounded-2xl border border-[#C6C6CD] p-4 sm:p-5 shadow-xs">
                {/* Inner Header Row */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <h3 style={{ ...poppins, fontWeight: 700, fontSize: "14px" }} className="text-slate-800">
                            Top Performing Cashiers
                        </h3>
                        <SquarePen size={14} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                    </div>

                    {/* Amount / QTY Pill Toggle */}
                    <div className="flex items-center bg-gray-200/70 p-0.5 rounded-xl text-xs">
                        <button
                            onClick={() => setViewType("Amount")}
                            style={{ ...poppins, fontWeight: 600, fontSize: "11px" }}
                            className={`px-3 py-1 rounded-lg transition cursor-pointer ${viewType === "Amount" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500"
                                }`}
                        >
                            Amount
                        </button>
                        <button
                            onClick={() => setViewType("QTY")}
                            style={{ ...poppins, fontWeight: 600, fontSize: "11px" }}
                            className={`px-3 py-1 rounded-lg transition cursor-pointer ${viewType === "QTY" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500"
                                }`}
                        >
                            QTY
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div data-lenis-prevent className="overflow-auto max-h-[300px]" style={{ scrollbarWidth: "thin" }}>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200/60 text-[10.5px] text-slate-400 font-semibold tracking-wider">
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
                                    <td style={{ ...inter, fontWeight: 500, fontSize: "12px" }} className="py-3 px-3 text-slate-800">
                                        {item.name}
                                    </td>
                                    <td style={{ ...inter, fontWeight: 400, fontSize: "12px" }} className="py-3 px-3 text-slate-600">
                                        {item.counter}
                                    </td>
                                    <td style={{ ...inter, fontWeight: 400, fontSize: "12px" }} className="py-3 px-3 text-slate-600">
                                        {item.invoices}
                                    </td>
                                    <td style={{ ...poppins, fontWeight: 700, fontSize: "12.5px" }} className="py-3 px-3 text-slate-900">
                                        {item.sales}
                                    </td>
                                    <td style={{ ...inter, fontWeight: 500, fontSize: "12px" }} className="py-3 px-3 text-right text-slate-700">
                                        {item.qty}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
