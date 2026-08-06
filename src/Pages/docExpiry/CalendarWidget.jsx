import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const inter = { fontFamily: "Inter, sans-serif" };

export const CalendarWidget = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1));
    const [selectedDay, setSelectedDay] = useState(12);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = firstDayIndex - 1; i >= 0; i--) {
        days.push({ day: prevMonthDays - i, isCurr: false });
    }

    const eventDays = [3, 10, 15, 18, 22];

    for (let d = 1; d <= totalDaysInMonth; d++) {
        days.push({
            day: d,
            isCurr: true,
            hasDot: month === 9 && year === 2026 && eventDays.includes(d),
        });
    }

    return (
        <div style={inter} className="w-[280px] lg:w-[300px] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-xs p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <span style={{ fontWeight: 600, fontSize: "14px" }} className="text-slate-800">
                    {monthNames[month]} {year}
                </span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={prevMonth}
                        aria-label="Previous Month"
                        className="p-1 rounded hover:bg-violet-50 text-gray-500 hover:text-violet-600 transition cursor-pointer"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={nextMonth}
                        aria-label="Next Month"
                        className="p-1 rounded hover:bg-violet-50 text-gray-500 hover:text-violet-600 transition cursor-pointer"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <span key={i} style={{ fontSize: "11px", fontWeight: 500 }} className="text-gray-400">
                        {d}
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
                {days.map((item, idx) => {
                    const isSelected = item.isCurr && item.day === selectedDay;
                    return (
                        <div key={idx} className="flex flex-col items-center justify-center h-8">
                            <button
                                onClick={() => {
                                    if (item.isCurr) setSelectedDay(item.day);
                                }}
                                disabled={!item.isCurr}
                                style={{ fontSize: "12px", fontWeight: isSelected ? 600 : 400 }}
                                className={`w-7 h-7 flex items-center justify-center rounded-lg transition cursor-pointer ${isSelected
                                        ? "bg-violet-600 text-white font-semibold shadow-xs ring-2 ring-violet-200"
                                        : item.isCurr
                                            ? "text-slate-700 hover:bg-violet-50 hover:text-violet-600"
                                            : "text-gray-300 cursor-not-allowed"
                                    }`}
                            >
                                {item.day}
                            </button>
                            {item.hasDot && !isSelected && (
                                <span className="w-1 h-1 rounded-full bg-rose-500 -mt-1" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
