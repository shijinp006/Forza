import { useState } from "react";
import { Search, LayoutGrid, Building2, CreditCard, Shield } from "lucide-react";
import { PaginationFooter } from "./PaginationFooter";

const inter = { fontFamily: "Inter, sans-serif" };

export const CompanyDocsTab = ({ companyDocs }) => {
    const [companySearch, setCompanySearch] = useState("");
    const [companyPage, setCompanyPage] = useState(1);

    const filteredCompanyDocs = companyDocs.filter((doc) => {
        return (
            doc.name.toLowerCase().includes(companySearch.toLowerCase()) ||
            doc.idNumber.toLowerCase().includes(companySearch.toLowerCase()) ||
            doc.authority.toLowerCase().includes(companySearch.toLowerCase())
        );
    });

    const companyItemsPerPage = 5;
    const totalCompanyPages = Math.max(1, Math.ceil(filteredCompanyDocs.length / companyItemsPerPage));
    const currentCompanyPage = Math.min(companyPage, totalCompanyPages);
    const compStartIndex = (currentCompanyPage - 1) * companyItemsPerPage;
    const compEndIndex = Math.min(compStartIndex + companyItemsPerPage, filteredCompanyDocs.length);
    const paginatedCompanyDocs = filteredCompanyDocs.slice(compStartIndex, compEndIndex);

    return (
        <div className="px-4 sm:px-6 pb-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                {/* Header Row */}
                <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">
                    <h2 style={{ ...inter, fontWeight: 700, fontSize: "16px" }} className="text-slate-800 shrink-0">
                        Document Repository
                    </h2>
                    <div className="relative">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={companySearch}
                            onChange={(e) => {
                                setCompanySearch(e.target.value);
                                setCompanyPage(1);
                            }}
                            style={{ ...inter, fontSize: "12.5px" }}
                            className="pl-9 pr-4 py-2 rounded-xl bg-[#EFF3FA] text-slate-700 placeholder-slate-400 border border-transparent focus:outline-none focus:bg-white focus:ring-2 focus:ring-violet-200 focus:border-violet-300 w-[240px] transition-all"
                        />
                    </div>
                </div>

                {/* Company Docs Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-5 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">DOCUMENT NAME</th>
                                <th className="px-5 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">ID NUMBER</th>
                                <th className="px-5 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">AUTHORITY</th>
                                <th className="px-5 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">ISSUE DATE</th>
                                <th className="px-5 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">EXPIRY DATE</th>
                                <th className="px-5 py-3 text-right font-semibold text-[10.5px] text-gray-400 tracking-wider">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedCompanyDocs.length > 0 ? (
                                paginatedCompanyDocs.map((doc, idx) => (
                                    <tr key={idx} className="border-b border-gray-50 hover:bg-violet-50/40 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8.5 h-8.5 rounded-xl bg-[#E5E9F8] text-[#5949BE] flex items-center justify-center shrink-0 shadow-2xs">
                                                    {doc.iconType === "building" ? (
                                                        <Building2 size={17} />
                                                    ) : doc.iconType === "card" ? (
                                                        <CreditCard size={17} />
                                                    ) : doc.iconType === "shield" ? (
                                                        <Shield size={17} />
                                                    ) : (
                                                        <LayoutGrid size={17} />
                                                    )}
                                                </div>
                                                <div>
                                                    <p style={{ ...inter, fontWeight: 600, fontSize: "13px" }} className="text-slate-800">
                                                        {doc.name}
                                                    </p>
                                                    <p style={{ ...inter, fontWeight: 400, fontSize: "11px" }} className="text-slate-400">
                                                        {doc.subtext}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span style={{ ...inter, fontWeight: 600, fontSize: "13px" }} className="text-slate-800">
                                                {doc.idNumber}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span style={{ ...inter, fontWeight: 400, fontSize: "13px" }} className="text-slate-600">
                                                {doc.authority}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span style={{ ...inter, fontWeight: 400, fontSize: "13px" }} className="text-slate-600">
                                                {doc.issueDate}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span style={{ ...inter, fontWeight: 700, fontSize: "13px" }} className="text-rose-600">
                                                {doc.expiryDate}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <span className="inline-block bg-rose-50 text-rose-600 font-semibold px-2.5 py-1 rounded-full text-xs">
                                                • {doc.daysLeft}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-5 py-8 text-center text-gray-400 text-xs">
                                        No documents found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <PaginationFooter
                    currentPage={currentCompanyPage}
                    totalPages={totalCompanyPages}
                    totalItems={filteredCompanyDocs.length}
                    startIndex={compStartIndex}
                    endIndex={compEndIndex}
                    onPageChange={(p) => setCompanyPage(p)}
                />
            </div>
        </div>
    );
};
