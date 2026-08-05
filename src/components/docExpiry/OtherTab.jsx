import { CalendarWidget } from "./CalendarWidget";

const inter = { fontFamily: "Inter, sans-serif" };

export const OtherTab = ({ actionItems }) => {
    return (
        <div className="px-4 sm:px-6 pb-8 flex flex-col md:flex-row gap-5 items-start ">
            {/* Left: Action Items Table */}
            <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden w-full">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 style={{ ...inter, fontWeight: 700, fontSize: "15px" }} className="text-slate-800">
                        Upcoming Action Items
                    </h2>
                    <button style={{ ...inter, fontWeight: 500, fontSize: "12px" }} className="text-violet-600 hover:underline cursor-pointer">
                        View All
                    </button>
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
                            {actionItems.map((item, idx) => (
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right: Calendar Widget */}
            <CalendarWidget />
        </div>
    );
};
