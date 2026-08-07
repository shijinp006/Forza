import { ArrowLeft, CreditCard, FileText } from "lucide-react";
import WorkEmailIcon from "../../assets/WorkEmail.svg?react";
import PhoneIcon from "../../assets/Phone.svg?react";

const inter = { fontFamily: "Inter, sans-serif" };

export const Avatar = ({ emp, size = "w-7 h-7" }) => {
    if (emp.avatar) {
        return (
            <img src={emp.avatar} alt={emp.name} className={`${size} rounded-lg object-cover shadow-xs`} />
        );
    }
    return (
        <div className={`${size} rounded-lg bg-[#8E8E93] text-white flex items-center justify-center shadow-xs`}>
            <span style={{ ...inter, fontWeight: 600, fontSize: "11px" }}>
                {emp.initials}
            </span>
        </div>
    );
};

export const EmployeeDetailPanel = ({ emp, onClose }) => {
    if (!emp) return null;

    return (
        /* Outer Wrapper: Fixed Centered Overlay on Mobile, Inline Block on Desktop */
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 md:static md:z-auto md:bg-transparent md:backdrop-blur-none md:p-0 md:block shrink-0">
            {/* Panel Card */}
            <div
                style={{ ...inter, scrollbarWidth: "thin", scrollbarColor: "#c4b5fd transparent" }}
                className="w-full max-w-[340px] max-h-[85vh] bg-[#F5F2FE] rounded-[22px] border border-violet-200/80 shadow-2xl p-4 flex flex-col overflow-y-auto mx-auto md:w-[310px] lg:w-[330px] md:max-w-none md:h-full md:max-h-none md:rounded-[20px] md:shadow-xs md:mx-0 md:p-3.5"
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-2.5 shrink-0">
                    <div className="flex items-center gap-3">
                        <Avatar emp={emp} size="w-11 h-11" />
                        <div>
                            <h2 style={{ fontWeight: 700, fontSize: "16px" }} className="text-slate-800 leading-tight">
                                {emp.name}
                            </h2>
                            <p style={{ fontWeight: 600, fontSize: "11px" }} className="text-slate-900 mt-0.5">
                                {emp.title || "Sales Executive"}
                            </p>
                            <span className="inline-block bg-[#E2E1EC] text-slate-600 font-semibold px-1.5 py-0.5 text-[10px] rounded mt-1">
                                {emp.id}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Close detail panel"
                        className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-600 flex items-center justify-center hover:bg-rose-500 hover:text-white transition shadow-xs cursor-pointer shrink-0"
                    >
                        <ArrowLeft size={15} strokeWidth={2.2} />
                    </button>
                </div>

                <div className="border-t border-violet-200/50 my-2.5 shrink-0" />

                {/* Contact Info */}
                <div className="mb-2.5 shrink-0">
                    <h3 style={{ fontWeight: 600, fontSize: "10px", letterSpacing: "0.05em" }} className="text-slate-400 uppercase mb-1.5">
                        CONTACT INFORMATION
                    </h3>
                    <div className="bg-white rounded-xl p-2.5 border border-violet-100/60 shadow-xs space-y-2">
                        <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                                <WorkEmailIcon className="w-4 h-4 text-violet-600" />
                            </div>
                            <div className="min-w-0">
                                <p style={{ fontWeight: 500, fontSize: "10px" }} className="text-slate-400">Work Email</p>
                                <p style={{ fontWeight: 600, fontSize: "11px" }} className="text-slate-800 truncate">
                                    {emp.name.toLowerCase().replace(/\s+/g, "")}@company.com
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                <PhoneIcon className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                                <p style={{ fontWeight: 500, fontSize: "10px" }} className="text-slate-400">Mobile</p>
                                <p style={{ fontWeight: 600, fontSize: "11px" }} className="text-slate-800">
                                    +971 50 123 4567
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Employment Details */}
                <div className="mb-2.5 shrink-0">
                    <h3 style={{ fontWeight: 600, fontSize: "10px", letterSpacing: "0.05em" }} className="text-slate-400 uppercase mb-1.5">
                        EMPLOYMENT DETAILS
                    </h3>
                    <div className="bg-white rounded-xl p-2.5 border border-violet-100/60 shadow-xs grid grid-cols-2 gap-2">
                        <div>
                            <p style={{ fontWeight: 500, fontSize: "10px" }} className="text-slate-400">Department</p>
                            <p style={{ fontWeight: 600, fontSize: "11px" }} className="text-slate-800">{emp.dept}</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 500, fontSize: "10px" }} className="text-slate-400">Joined Date</p>
                            <p style={{ fontWeight: 600, fontSize: "11px" }} className="text-slate-800">12 Mar 2023</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 500, fontSize: "10px" }} className="text-slate-400">Manager</p>
                            <p style={{ fontWeight: 600, fontSize: "11px" }} className="text-slate-800">Sarah Jenkins</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 500, fontSize: "10px" }} className="text-slate-400">Base Salary</p>
                            <p style={{ fontWeight: 600, fontSize: "11px" }} className="text-slate-800">8,000</p>
                        </div>
                    </div>
                </div>

                {/* Documents & Compliance */}
                <div className="shrink-0">
                    <h3 style={{ fontWeight: 600, fontSize: "10px", letterSpacing: "0.05em" }} className="text-slate-400 uppercase mb-1.5">
                        DOCUMENTS & COMPLIANCE
                    </h3>
                    <div className="bg-white rounded-xl p-2.5 border border-violet-100/60 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CreditCard size={13} className="text-violet-500" />
                                <div>
                                    <p style={{ fontWeight: 600, fontSize: "11px" }} className="text-slate-800">{emp.doc}</p>
                                    <p style={{ fontWeight: 500, fontSize: "10px" }} className="text-slate-400">Exp: {emp.expiry}</p>
                                </div>
                            </div>
                            <span style={{ fontWeight: 700, fontSize: "11px" }} className={emp.color}>
                                {emp.days}
                            </span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <FileText size={13} className="text-blue-500" />
                                <div>
                                    <p style={{ fontWeight: 600, fontSize: "11px" }} className="text-slate-800">Passport</p>
                                    <p style={{ fontWeight: 500, fontSize: "10px" }} className="text-slate-400">Exp: 14/08/2026</p>
                                </div>
                            </div>
                            <span style={{ fontWeight: 700, fontSize: "11px" }} className="text-emerald-600">
                                480 Days
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
