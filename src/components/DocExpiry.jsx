import { useState } from "react";
import { stats, employees, vehicles, companyDocs, actionItems } from "../data/mockData";
import { TopBarHeader } from "../Pages/docExpiry/TopBarHeader";
import { StatCard } from "../Pages/docExpiry/StatCard";
import { EmployeesTab } from "../Pages/docExpiry/EmployeesTab";
import { VehiclesTab } from "../Pages/docExpiry/VehiclesTab";
import { CompanyDocsTab } from "../Pages/docExpiry/CompanyDocsTab";
import { OtherTab } from "../Pages/docExpiry/OtherTab";

const inter = { fontFamily: "Inter, sans-serif" };

export const DocExpiry = () => {
    const [activeTab, setActiveTab] = useState("Employees");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [dateFilter, setDateFilter] = useState("Today");

    const isDetailOpen = Boolean(selectedEmployee) && activeTab === "Employees";
    const isNoScroll = isDetailOpen;

    return (
        <div
            style={inter}
            className={`h-screen flex flex-col bg-[#EDEAFB] ${isNoScroll ? "overflow-hidden" : "overflow-auto"
                }`}
        >
            {/* ── TOP BAR HEADER ── */}
            <TopBarHeader dateFilter={dateFilter} setDateFilter={setDateFilter} />

            {/* ── PAGE TITLE ── */}
            <div className="px-4 sm:px-6 mt-4 mb-2 shrink-0">
                <h1 style={{ ...inter, fontWeight: 700, fontSize: "22px" }} className="text-gray-900">
                    Doc Expiry
                </h1>
            </div>

            {/* ── 4 INTERACTIVE STAT CARDS ── */}
            <div className="px-4 sm:px-6 mb-3 shrink-0">
                <div
                    className="flex gap-3 overflow-x-auto py-2.5 px-1"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {stats.map((stat) => (
                        <StatCard
                            key={stat.label}
                            stat={stat}
                            isActive={activeTab === stat.label}
                            onClick={() => {
                                setActiveTab(stat.label);
                                if (stat.label !== "Employees") setSelectedEmployee(null);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* ── MODULAR TAB VIEWS ── */}
            {activeTab === "Employees" && (
                <EmployeesTab
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                />
            )}

            {activeTab === "Vehicles" && (
                <VehiclesTab vehicles={vehicles} />
            )}

            {activeTab === "Company" && (
                <CompanyDocsTab companyDocs={companyDocs} />
            )}

            {activeTab === "Other" && (
                <OtherTab actionItems={actionItems} />
            )}
        </div>
    );
};