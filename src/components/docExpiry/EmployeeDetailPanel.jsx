import { ArrowLeft, Mail, Phone, CreditCard, FileText } from "lucide-react";

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
        <div
            style={{ ...inter, scrollbarWidth: "thin", scrollbarColor: "#c4b5fd transparent" }}
            className="w-[310px] lg:w-[330px] shrink-0 bg-[#F5F2FE] rounded-[20px] border border-violet-200/60 shadow-xs p-3.5 flex flex-col h-full overflow-y-auto"
        >
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
                    className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition shadow-xs cursor-pointer shrink-0"
                >
                    <ArrowLeft size={15} strokeWidth={2.2} />
                </button>
            </div>

            <div className="border-t border-violet-200/50 my-2.5 shrink-0" />

            <div className="mb-2.5 shrink-0">
                <h3 style={{ fontWeight: 600, fontSize: "10px", letterSpacing: "0.05em" }} className="text-slate-400 uppercase mb-1.5">
                    CONTACT INFORMATION
                </h3>
                <div className="bg-white rounded-xl p-2.5 border border-violet-100/60 shadow-xs space-y-2">
                    <div className="flex items-center gap-2.5">
                        <div className="text-slate-700">
                            <Mail size={15} strokeWidth={1.8} />
                        </div>
                        <div>
                            <p style={{ fontSize: "10px", fontWeight: 400 }} className="text-slate-400 leading-tight">
                                Work Email
                            </p>
                            <p style={{ fontSize: "11.5px", fontWeight: 500 }} className="text-slate-800 break-all">
                                {emp.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <div className="text-slate-700">
                            <Phone size={15} strokeWidth={1.8} />
                        </div>
                        <div>
                            <p style={{ fontSize: "10px", fontWeight: 400 }} className="text-slate-400 leading-tight">
                                Mobile
                            </p>
                            <p style={{ fontSize: "11.5px", fontWeight: 500 }} className="text-slate-800">
                                {emp.mobile}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-2.5 shrink-0">
                <h3 style={{ fontWeight: 600, fontSize: "10px", letterSpacing: "0.05em" }} className="text-slate-400 uppercase mb-1.5">
                    EMPLOYMENT DETAILS
                </h3>
                <div className="bg-white rounded-xl p-2.5 border border-violet-100/60 shadow-xs grid grid-cols-2 gap-y-2 gap-x-3">
                    <div>
                        <p style={{ fontSize: "10px", fontWeight: 400 }} className="text-slate-400 leading-tight">
                            Department
                        </p>
                        <p style={{ fontSize: "11.5px", fontWeight: 600 }} className="text-slate-800 mt-0.5">
                            {emp.department}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: "10px", fontWeight: 400 }} className="text-slate-400 leading-tight">
                            Joined Date
                        </p>
                        <p style={{ fontSize: "11.5px", fontWeight: 600 }} className="text-slate-800 mt-0.5">
                            {emp.joinedDate}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: "10px", fontWeight: 400 }} className="text-slate-400 leading-tight">
                            Manager
                        </p>
                        <p style={{ fontSize: "11.5px", fontWeight: 600 }} className="text-slate-800 mt-0.5">
                            {emp.manager}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: "10px", fontWeight: 400 }} className="text-slate-400 leading-tight">
                            Base Salary
                        </p>
                        <p style={{ fontSize: "11.5px", fontWeight: 600 }} className="text-slate-800 mt-0.5">
                            {emp.salary}
                        </p>
                    </div>
                </div>
            </div>

            <div className="shrink-0">
                <h3 style={{ fontWeight: 600, fontSize: "10px", letterSpacing: "0.05em" }} className="text-slate-400 uppercase mb-1.5">
                    DOCUMENTS & COMPLIANCE
                </h3>

                <div className="bg-white rounded-xl p-2.5 border border-violet-100/60 flex items-center justify-between shadow-xs mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-5.5 bg-amber-700/80 rounded flex items-center justify-center text-white shrink-0 overflow-hidden relative shadow-xs">
                            <CreditCard size={12} />
                        </div>
                        <div>
                            <h4 style={{ fontSize: "11.5px", fontWeight: 600 }} className="text-slate-800">
                                Emirates ID
                            </h4>
                            <p style={{ fontSize: "9.5px", fontWeight: 400 }} className="text-slate-400">
                                {emp.emiratesId}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span style={{ fontSize: "9.5px", fontWeight: 600 }} className="text-emerald-500 block">
                            Valid
                        </span>
                        <span style={{ fontSize: "8.5px", fontWeight: 400 }} className="text-slate-400">
                            {emp.emiratesExp}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-2.5 border border-violet-100/60 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-5.5 bg-rose-200/90 rounded flex items-center justify-center text-rose-600 shrink-0 overflow-hidden relative border border-rose-300/40 shadow-xs">
                            <FileText size={12} />
                        </div>
                        <div>
                            <h4 style={{ fontSize: "11.5px", fontWeight: 600 }} className="text-slate-800">
                                Visa Status
                            </h4>
                            <p style={{ fontSize: "9.5px", fontWeight: 400 }} className="text-slate-400">
                                {emp.visaType}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span style={{ fontSize: "9.5px", fontWeight: 600 }} className="text-emerald-500 block">
                            Valid
                        </span>
                        <span style={{ fontSize: "8.5px", fontWeight: 400 }} className="text-slate-400">
                            {emp.visaExp}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
