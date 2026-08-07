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
        <div style={inter} className="w-full sm:w-[300px] lg:w-[320px] h-auto shrink-0 bg-white rounded-2xl border border-gray-100 shadow-xs p-4 sm:p-5 flex flex-col">
            
            {/* Mobile Header with Calendar Toggle Button */}
            <div className="md:hidden flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                <h4 style={{ fontWeight: 700, fontSize: "15px" }} className="text-slate-800">
                    Upcoming Action Items
                </h4>
                <button
                    onClick={() => setShowMobileCalendar(!showMobileCalendar)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 text-xs font-semibold hover:bg-violet-100 transition cursor-pointer"
                >
                    <CalendarIcon size={14} />
                    <span>Calendar</span>
                    {showMobileCalendar ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
            </div>

            {/* Calendar Section (Always visible on desktop, toggleable on mobile) */}
            <div className={`${showMobileCalendar ? "block" : "hidden"} md:block pb-4 mb-4 border-b border-gray-100 md:border-b-0 md:pb-0 md:mb-0`}>
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

                <div className="grid grid-cols-7 gap-1 gap-y-2 text-center">
                    {days.map((item, idx) => {
                        const isSelected = item.isCurr && item.day === selectedDay;
                        return (
                            <div key={idx} className="flex flex-col items-center justify-center h-8">
                                <button
                                    onClick={() => {
                                        if (!item.isCurr) return;
                                        if (selectedDay === item.day) {
                                            setSelectedDay(null);
                                        } else {
                                            setSelectedDay(item.day);
                                        }
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

            {/* Upcoming Action Items Details List (Mobile View Only) */}
            <div className="md:hidden flex flex-col gap-3">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                        <span style={{ fontWeight: 600, fontSize: "12px" }} className="text-slate-500 uppercase tracking-wider">
                            Action List
                        </span>
                        {selectedDay !== null && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[11px] font-semibold">
                                Oct {selectedDay}
                                <button onClick={() => setSelectedDay(null)} className="p-0.5 hover:bg-violet-200 rounded-full transition cursor-pointer">
                                    <X size={10} />
                                </button>
                            </span>
                        )}
                    </div>
                    {selectedDay !== null ? (
                        <button onClick={() => setSelectedDay(null)} style={{ fontWeight: 500, fontSize: "12px" }} className="text-violet-600 cursor-pointer hover:underline">
                            Show All
                        </button>
                    ) : (
                        <span style={{ fontWeight: 500, fontSize: "12px" }} className="text-violet-600 cursor-pointer hover:underline">
                            View All
                        </span>
                    )}
                </div>

                {itemsToDisplay && itemsToDisplay.length > 0 ? (
                    itemsToDisplay.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-violet-50/50 transition">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-full bg-slate-200/80 text-slate-700 font-semibold text-xs flex items-center justify-center shrink-0 border border-slate-300/60">
                                    {item.initials}
                                </div>
                                <div className="min-w-0">
                                    <p style={{ fontWeight: 600, fontSize: "12.5px" }} className="text-slate-800 truncate">
                                        {item.name}
                                    </p>
                                    <p style={{ fontWeight: 400, fontSize: "11px" }} className="text-slate-400 truncate">
                                        {item.subtext}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right shrink-0 flex flex-col items-end gap-1">
                                <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded ${item.categoryBg}`}>
                                    {item.category}
                                </span>
                                <p style={{ fontSize: "11px", fontWeight: 600 }} className={item.statusColor}>
                                    {item.status}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-slate-400 text-xs bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                        No action items scheduled for Oct {selectedDay}, 2026.{" "}
                        <button onClick={() => setSelectedDay(null)} className="text-violet-600 font-medium underline hover:text-violet-700 cursor-pointer ml-1">
                            Show All
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
