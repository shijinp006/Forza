import { useState } from "react";
import { Search } from "lucide-react";
import { Avatar, EmployeeDetailPanel } from "./EmployeeDetailPanel";
import { PaginationFooter } from "./PaginationFooter";
import { FilterSelect } from "./FilterSelect";
import { departmentOptions, expiryTypeOptions } from "../../data/docExpiryData";
import SortIcon from "../../assets/Sort.svg?react";

const inter = { fontFamily: "Inter, sans-serif" };

export const EmployeesTab = ({ employees, selectedEmployee, setSelectedEmployee }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [deptFilter, setDeptFilter] = useState("All Departments");
    const [expiryTypeFilter, setExpiryTypeFilter] = useState("All Expiry Type");
    const [empPage, setEmpPage] = useState(1);

    const filteredEmployees = employees.filter((emp) => {
        const matchesSearch =
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.doc.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDept =
            deptFilter === "All Departments" || emp.dept === deptFilter;

        const matchesExpiryType =
            expiryTypeFilter === "All Expiry Type" || emp.doc === expiryTypeFilter;

        return matchesSearch && matchesDept && matchesExpiryType;
    });

    const empItemsPerPage = 8;
    const totalEmpPages = Math.max(1, Math.ceil(filteredEmployees.length / empItemsPerPage));
    const currentEmpPage = Math.min(empPage, totalEmpPages);
    const empStartIndex = (currentEmpPage - 1) * empItemsPerPage;
    const empEndIndex = Math.min(empStartIndex + empItemsPerPage, filteredEmployees.length);
    const paginatedEmployees = filteredEmployees.slice(empStartIndex, empEndIndex);

    const isDetailOpen = Boolean(selectedEmployee);

    return (
        <div
            className={
                isDetailOpen
                    ? "flex-1 min-h-0 px-4 sm:px-6 pb-4 flex gap-3 overflow-hidden"
                    : "px-4 sm:px-6 pb-8"
            }
        >
            <div
                className={
                    isDetailOpen
                        ? "flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden flex flex-col h-full"
                        : "bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden"
                }
            >
                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-2 px-3.5 py-2.5 border-b border-gray-100 shrink-0 relative z-20">
                    <div className="relative">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Employee..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setEmpPage(1);
                            }}
                            style={{ ...inter, fontSize: "12px" }}
                            className="pl-7 pr-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 w-[160px]"
                        />
                    </div>

                    {/* Filter dropdowns + Sliders icon button (next to pills on mobile, far right on desktop) */}
                    <div className="flex items-center gap-2 shrink-0 sm:flex-1 relative z-30">
                        <FilterSelect
                            value={deptFilter}
                            onChange={(val) => {
                                setDeptFilter(val);
                                setEmpPage(1);
                            }}
                            options={departmentOptions}
                        />

                        <FilterSelect
                            value={expiryTypeFilter}
                            onChange={(val) => {
                                setExpiryTypeFilter(val);
                                setEmpPage(1);
                            }}
                            align="right"
                            options={expiryTypeOptions}
                        />

                        {/* Desktop spacer to push filter button to the far right end */}
                        <div className="hidden sm:block flex-1" />

                        {/* Filter Icon Button using Sort.svg */}
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setDeptFilter("All Departments");
                                setExpiryTypeFilter("All Expiry Type");
                                setEmpPage(1);
                            }}
                            title="Reset Filters"
                            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer shrink-0 hover:opacity-80 transition"
                        >
                            <SortIcon className="w-8 h-8" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div
                    className={
                        isDetailOpen
                            ? "flex-1 min-h-0 overflow-y-auto"
                            : "overflow-x-auto"
                    }
                    style={isDetailOpen ? { scrollbarWidth: "thin", scrollbarColor: "#c4b5fd transparent" } : {}}
                >
                    <table className="w-full text-left border-collapse">
                        <thead className={isDetailOpen ? "sticky top-0 bg-gray-50 z-10 shadow-xs" : ""}>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-3.5 py-2.5 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">EMPLOYEE</th>
                                <th className="px-3.5 py-2.5 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">ID</th>
                                <th className="px-3.5 py-2.5 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">DEPARTMENT</th>
                                <th className="px-3.5 py-2.5 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">
                                    {isDetailOpen ? "VISA EXPIRY" : "EXPIRY DATE"}
                                </th>
                                {!isDetailOpen && (
                                    <th className="px-3.5 py-2.5 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">DOC TYPE</th>
                                )}
                                <th className="px-3.5 py-2.5 text-right font-semibold text-[10.5px] text-gray-400 tracking-wider">DAYS REM.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedEmployees.length > 0 ? (
                                paginatedEmployees.map((emp) => {
                                    const isSelected = selectedEmployee?.id === emp.id;
                                    return (
                                        <tr
                                            key={emp.id}
                                            onClick={() => setSelectedEmployee(isSelected ? null : emp)}
                                            className={`border-b border-gray-50 transition-colors cursor-pointer ${isSelected
                                                ? "bg-[#ECE6FF]"
                                                : "hover:bg-violet-50/70"
                                                }`}
                                        >
                                            <td className="px-3.5 py-2">
                                                <div className="flex items-center gap-2">
                                                    <Avatar emp={emp} />
                                                    <span style={{ ...inter, fontWeight: 500, fontSize: "12px" }} className="text-gray-800 truncate">
                                                        {emp.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-3.5 py-2">
                                                <span style={{ ...inter, fontWeight: 400, fontSize: "12px" }} className="text-gray-500">
                                                    {emp.id}
                                                </span>
                                            </td>
                                            <td className="px-3.5 py-2">
                                                <span style={{ ...inter, fontWeight: 400, fontSize: "12px" }} className="text-gray-500 truncate block">
                                                    {emp.dept}
                                                </span>
                                            </td>
                                            <td className="px-3.5 py-2">
                                                <span style={{ ...inter, fontWeight: 500, fontSize: "12px" }} className="text-gray-700 whitespace-nowrap">
                                                    {emp.date}
                                                </span>
                                            </td>
                                            {!isDetailOpen && (
                                                <td className="px-3.5 py-2">
                                                    <span style={{ ...inter, fontWeight: 400, fontSize: "12px" }} className="text-gray-500">
                                                        {emp.doc}
                                                    </span>
                                                </td>
                                            )}
                                            <td className="px-3.5 py-2 text-right">
                                                <span style={{ ...inter, fontWeight: 700, fontSize: "12.5px" }} className={emp.color}>
                                                    {emp.days}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-xs">
                                        No employees found matching criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <PaginationFooter
                    currentPage={currentEmpPage}
                    totalPages={totalEmpPages}
                    totalItems={filteredEmployees.length}
                    startIndex={empStartIndex}
                    endIndex={empEndIndex}
                    onPageChange={(p) => setEmpPage(p)}
                />
            </div>

            {selectedEmployee && (
                <EmployeeDetailPanel
                    emp={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                />
            )}
        </div>
    );
};
