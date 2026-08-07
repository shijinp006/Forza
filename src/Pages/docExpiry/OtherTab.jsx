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
            {/* Left: Action Items Table (Desktop View) */}
            <div className="hidden md:block flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden w-full h-auto min-h-[500px]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <h2 style={{ ...inter, fontWeight: 700, fontSize: "15px" }} className="text-slate-800">
                            Upcoming Action Items
                        </h2>
                        {selectedDay !== null && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">
                                Oct {selectedDay}, 2026
                                <button
                                    onClick={() => setSelectedDay(null)}
                                    className="p-0.5 hover:bg-violet-200 rounded-full transition cursor-pointer"
                                    title="Clear filter"
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        )}
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
                            className="text-violet-600 hover:underline cursor-pointer"
                        >
                            View All
                        </button>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">EMPLOYEE / EVENT</th>
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">CATEGORY</th>
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">DATE</th>
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, idx) => (
                                    <tr key={idx} className="border-b border-gray-50 hover:bg-violet-50/40 transition-colors">
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs flex items-center justify-center border border-slate-200">
                                                    {item.initials}
                                                </div>
                                                <div>
                                                    <p style={{ ...inter, fontWeight: 600, fontSize: "13px" }} className="text-slate-800">
                                                        {item.name}
                                                    </p>
                                                    <p style={{ ...inter, fontWeight: 400, fontSize: "11px" }} className="text-slate-400">
                                                        {item.subtext}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className={`inline-block font-medium px-2.5 py-0.5 rounded text-xs ${item.categoryBg}`}>
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span style={{ ...inter, fontWeight: 500, fontSize: "12.5px" }} className="text-slate-700">
                                                {item.date}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span style={{ ...inter, fontSize: "12.5px" }} className={item.statusColor}>
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

            {/* Right: Calendar Widget (with integrated details for mobile view) */}
            <CalendarWidget
                actionItems={actionItems}
                filteredActionItems={filteredItems}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
            />
        </div>
    );
};
