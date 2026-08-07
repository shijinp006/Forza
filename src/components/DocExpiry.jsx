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

    const filterByDate = (list, filter) => {
        if (!filter || filter === "All Time") return list;

        const getDays = (item) => {
            if (typeof item.days === "number") return item.days;
            if (item.daysLeft) {
                if (item.daysLeft.includes("0") || item.daysLeft.toLowerCase().includes("today")) return 0;
                if (item.daysLeft.toLowerCase().includes("overdue") || item.daysLeft.toLowerCase().includes("yesterday")) return -1;
                const match = item.daysLeft.match(/(\d+)/);
                if (match) return parseInt(match[1], 10);
            }
            if (item.status) {
                if (item.status.toLowerCase().includes("today")) return 0;
                if (item.status.toLowerCase().includes("yesterday")) return -1;
                const match = item.status.match(/(\d+)/);
                if (match) return parseInt(match[1], 10);
            }
            if (item.date) {
                if (item.date.toLowerCase() === "today") return 0;
                if (item.date.toLowerCase() === "yesterday") return -1;
            }
            return 15;
        };

        if (filter === "Today") return list.filter((item) => getDays(item) === 0);
        if (filter === "Yesterday") return list.filter((item) => getDays(item) === -1);
        if (filter === "Last 7 Days") return list.filter((item) => getDays(item) >= -1 && getDays(item) <= 7);
        if (filter === "Last 30 Days" || filter === "This Month") return list.filter((item) => getDays(item) >= -1 && getDays(item) <= 30);
        return list;
    };

    const filteredEmployees = filterByDate(employees, dateFilter);
    const filteredVehicles = filterByDate(vehicles, dateFilter);
    const filteredCompanyDocs = filterByDate(companyDocs, dateFilter);
    const filteredActionItems = filterByDate(actionItems, dateFilter);

    const dynamicStats = stats.map((s) => {
        let val = s.value;
        if (s.label === "Employees") val = String(filteredEmployees.length).padStart(2, "0");
        if (s.label === "Vehicles") val = String(filteredVehicles.length).padStart(2, "0");
        if (s.label === "Company") val = String(filteredCompanyDocs.length).padStart(2, "0");
        if (s.label === "Other") val = String(filteredActionItems.length).padStart(2, "0");
        return { ...s, value: val };
    });

    return (
        <div
            style={inter}
            className="min-h-screen flex flex-col bg-[#EDEAFB] pb-8"
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
                    {dynamicStats.map((stat) => (
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
                    employees={filteredEmployees}
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                />
            )}

            {activeTab === "Vehicles" && (
                <VehiclesTab vehicles={filteredVehicles} />
            )}

            {activeTab === "Company" && (
                <CompanyDocsTab companyDocs={filteredCompanyDocs} />
            )}

            {activeTab === "Other" && (
                <OtherTab actionItems={filteredActionItems} />
            )}
        </div>
    );
};