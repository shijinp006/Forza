import { ArrowRight } from "lucide-react";

const inter = { fontFamily: "Inter, sans-serif" };

export const StatCard = ({ stat, isActive, onClick }) => {
    const Icon = stat.icon;
    const SvgIcon = stat.svgIcon;

    return (
        <div
            onClick={onClick}
            className={`flex-1 min-w-[170px] bg-white rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-xs cursor-pointer transition-all ${isActive
                ? "border-2 border-violet-500 ring-2 ring-violet-200/60 shadow-sm"
                : "border border-gray-100 hover:border-violet-200"
                }`}
        >
            <div className="flex items-center justify-between">
                <span style={{ ...inter, fontWeight: 500, fontSize: "12px" }} className="text-[#424656]">
                    {stat.label}
                </span>
                <div className={`w-8 h-8 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0`}>
                    {SvgIcon ? (
                        <SvgIcon className="w-5 h-5" />
                    ) : Icon ? (
                        <Icon size={18} className={stat.iconColor} />
                    ) : null}
                </div>
            </div>
            <div>
                <p style={{ ...inter, fontWeight: 700, fontSize: "28px", lineHeight: "1.1" }} className={stat.valueColor}>
                    {stat.value}
                </p>
            </div>
            <div className="flex items-center justify-between">
                <span style={{ ...inter, fontWeight: 400, fontSize: "11px" }} className="text-[#726C6C] truncate">
                    {stat.sub}
                </span>
                {stat.hasArrow && (
                    <ArrowRight size={14} className={isActive ? "text-violet-600 font-bold" : "text-violet-500"} />
                )}
            </div>
        </div>
    );
};
