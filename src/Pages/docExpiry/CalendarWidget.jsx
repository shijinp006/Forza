import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ChevronDown, ChevronUp, X } from "lucide-react";

const inter = { fontFamily: "Inter, sans-serif" };

export const CalendarWidget = ({
    actionItems,
    filteredActionItems,
    selectedDay: propSelectedDay,
    setSelectedDay: propSetSelectedDay,
}) => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1));
    const [internalSelectedDay, setInternalSelectedDay] = useState(null);
    const [showMobileCalendar, setShowMobileCalendar] = useState(false);

    const selectedDay = propSelectedDay !== undefined ? propSelectedDay : internalSelectedDay;
    const setSelectedDay = propSetSelectedDay || setInternalSelectedDay;

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

    const getItemDay = (item) => {
        if (item.day) return item.day;
        if (item.date === "Today") return 12;
        if (item.date === "Yesterday") return 11;
        const match = item.date?.match(/Oct\s+(\d+)/i);
        return match ? parseInt(match[1], 10) : null;
    };

    const eventDays = actionItems
        ? actionItems.map(getItemDay).filter(Boolean)
        : [3, 10, 12, 15, 18, 22];

    const days = [];

    for (let i = firstDayIndex - 1; i >= 0; i--) {
        days.push({ day: prevMonthDays - i, isCurr: false });
    }

    for (let d = 1; d <= totalDaysInMonth; d++) {
        days.push({
            day: d,
            isCurr: true,
            hasDot: month === 9 && year === 2026 && eventDays.includes(d),
        });
    }

    const itemsToDisplay = filteredActionItems || (
        selectedDay
            ? actionItems?.filter((item) => getItemDay(item) === selectedDay)
            : actionItems
    );

    return (
        <div style={inter} className="w-full sm:w-[300px] lg:w-[320px] lg:h-[500px] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-xs p-4 sm:p-5 flex flex-col">
            {/* Calendar Section */}
            <div className="block pb-4 border-b border-gray-100 md:border-b-0 md:pb-0">
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
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                        <span key={d} style={{ fontWeight: 500, fontSize: "11.5px" }} className="text-slate-400">
                            {d}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                    {days.map((item, i) => {
                        const isSelected = selectedDay === item.day && item.isCurr;
                        return (
                            <button
                                key={i}
                                onClick={() => {
                                    if (item.isCurr) {
                                        setSelectedDay(isSelected ? null : item.day);
                                    }
                                }}
                                disabled={!item.isCurr}
                                style={{ fontWeight: isSelected ? 700 : 500, fontSize: "12px" }}
                                className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center relative transition cursor-pointer ${
                                    !item.isCurr
                                        ? "text-gray-300 cursor-default"
                                        : isSelected
                                        ? "bg-violet-600 text-white shadow-xs"
                                        : "text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                                }`}
                            >
                                {item.day}
                                {item.hasDot && !isSelected && (
                                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-violet-600" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
