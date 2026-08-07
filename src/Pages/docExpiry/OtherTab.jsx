import { useState } from "react";
import { CalendarWidget } from "./CalendarWidget";
import { X } from "lucide-react";

const inter = { fontFamily: "Inter, sans-serif" };

export const OtherTab = ({ actionItems }) => {
    const [selectedDay, setSelectedDay] = useState(null);

    const getItemDay = (item) => {
        if (item.day) return item.day;
        if (item.date === "Today") return 12;
        if (item.date === "Yesterday") return 11;
        const match = item.date?.match(/Oct\s+(\d+)/i);
        return match ? parseInt(match[1], 10) : null;
    };

    const filteredItems = selectedDay
        ? actionItems.filter((item) => getItemDay(item) === selectedDay)
        : actionItems;

    return (
        <div className="px-4 sm:px-6 pb-8 flex flex-col md:flex-row gap-5 items-start">
            {/* Left: Action Items Table (Visible on Mobile with X-axis scroll & Desktop) */}
            <div className="w-full flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden h-auto min-h-[500px] order-2 md:order-1">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <h2 style={{ ...inter, fontWeight: 700, fontSize: "15px" }} className="text-[#2B2F34]">
                            Upcoming Action Items
                        </h2>
                    </div>
                    {selectedDay !== null ? (
                        <button
                            onClick={() => setSelectedDay(null)}
                            style={{ ...inter, fontWeight: 500, fontSize: "12px" }}
                            className="text-violet-600 hover:underline cursor-pointer"
                        >
                            Show All
                        </button>
                    ) : (
                        <button
                            style={{ ...inter, fontWeight: 500, fontSize: "12px" }}
                            className="text-[#5949BE] hover:underline cursor-pointer"
                        >
                            View All
                        </button>
                    )}
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[550px]">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-[#585C62] tracking-wider">EMPLOYEE / EVENT</th>
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-[#585C62] tracking-wider">CATEGORY</th>
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-[#585C62] tracking-wider">DATE</th>
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-[#585C62] tracking-wider">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, idx) => (
                                    <tr key={idx} className="border-b border-gray-50 hover:bg-violet-50/40 transition-colors">
                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs flex items-center justify-center border border-slate-200 shrink-0">
                                                    {item.initials}
                                                </div>
                                                <div>
                                                    <p style={{ ...inter, fontWeight: 600 }} className="text-[#2B2F34] text-[11px] sm:text-[13px] whitespace-nowrap">
                                                        {item.name}
                                                    </p>
                                                    <p style={{ ...inter, fontWeight: 400 }} className="text-[#585C62] text-[10px] sm:text-[11px] whitespace-nowrap">
                                                        {item.subtext}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            <span className={`inline-block font-medium px-2.5 py-0.5 rounded text-[10px] sm:text-xs whitespace-nowrap ${item.categoryBg}`}>
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            <span style={{ ...inter, fontWeight: 500 }} className="text-[#2B2F34] text-[11px] sm:text-[12.5px] whitespace-nowrap">
                                                {item.date}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            <span style={{ ...inter }} className={`${item.statusColor} text-[11px] sm:text-[12.5px] whitespace-nowrap`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-slate-400 text-sm">
                                        No action items found for Oct {selectedDay}, 2026.{" "}
                                        <button
                                            onClick={() => setSelectedDay(null)}
                                            className="text-violet-600 underline font-medium hover:text-violet-700 ml-1 cursor-pointer"
                                        >
                                            Show all items
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right: Calendar Widget (First on mobile order-1, second on desktop order-2) */}
            <div className="w-full md:w-auto order-1 md:order-2">
                <CalendarWidget
                    actionItems={actionItems}
                    filteredActionItems={filteredItems}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                />
            </div>
        </div>
    );
};
