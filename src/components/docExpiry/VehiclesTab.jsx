import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PaginationFooter } from "./PaginationFooter";

const inter = { fontFamily: "Inter, sans-serif" };

export const VehiclesTab = ({ vehicles }) => {
    const [vehicleSearch, setVehicleSearch] = useState("");
    const [vehicleTypeFilter, setVehicleTypeFilter] = useState("All Vehicle Types");
    const [vehicleStatusFilter, setVehicleStatusFilter] = useState("All Expiry Status");
    const [vehiclePage, setVehiclePage] = useState(1);

    const filteredVehicles = vehicles.filter((v) => {
        const matchesSearch =
            v.number.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
            v.model.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
            v.driver.toLowerCase().includes(vehicleSearch.toLowerCase());

        const matchesType =
            vehicleTypeFilter === "All Vehicle Types" || v.type === vehicleTypeFilter;

        const matchesStatus =
            vehicleStatusFilter === "All Expiry Status" || v.status === vehicleStatusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    const vehicleItemsPerPage = 5;
    const totalVehiclePages = Math.max(1, Math.ceil(filteredVehicles.length / vehicleItemsPerPage));
    const currentVehiclePage = Math.min(vehiclePage, totalVehiclePages);
    const vehStartIndex = (currentVehiclePage - 1) * vehicleItemsPerPage;
    const vehEndIndex = Math.min(vehStartIndex + vehicleItemsPerPage, filteredVehicles.length);
    const paginatedVehicles = filteredVehicles.slice(vehStartIndex, vehEndIndex);

    return (
        <div className="px-4 sm:px-6 pb-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-2.5 px-4 py-3 border-b border-gray-100">
                    <div className="relative">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Vehicle ID..."
                            value={vehicleSearch}
                            onChange={(e) => {
                                setVehicleSearch(e.target.value);
                                setVehiclePage(1);
                            }}
                            style={{ ...inter, fontSize: "12px" }}
                            className="pl-7 pr-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 w-[170px]"
                        />
                    </div>

                    <select
                        value={vehicleTypeFilter}
                        onChange={(e) => {
                            setVehicleTypeFilter(e.target.value);
                            setVehiclePage(1);
                        }}
                        style={{ ...inter, fontSize: "12px" }}
                        className="px-3 py-1.5 rounded-lg bg-[#E2E1EC] text-slate-700 font-medium border-0 focus:ring-2 focus:ring-violet-200 cursor-pointer"
                    >
                        <option value="All Vehicle Types">All Vehicle Types</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Truck">Truck</option>
                    </select>

                    <select
                        value={vehicleStatusFilter}
                        onChange={(e) => {
                            setVehicleStatusFilter(e.target.value);
                            setVehiclePage(1);
                        }}
                        style={{ ...inter, fontSize: "12px" }}
                        className="px-3 py-1.5 rounded-lg bg-[#E2E1EC] text-slate-700 font-medium border-0 focus:ring-2 focus:ring-violet-200 cursor-pointer"
                    >
                        <option value="All Expiry Status">All Expiry Status</option>
                        <option value="Expiring Soon">Expiring Soon</option>
                        <option value="Valid">Valid</option>
                    </select>

                    <div className="flex-1" />

                    <button
                        onClick={() => {
                            setVehicleSearch("");
                            setVehicleTypeFilter("All Vehicle Types");
                            setVehicleStatusFilter("All Expiry Status");
                            setVehiclePage(1);
                        }}
                        title="Reset Vehicle Filters"
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-violet-600 transition cursor-pointer"
                    >
                        <SlidersHorizontal size={14} />
                    </button>
                </div>

                {/* Vehicles Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">VEHICLE NUMBER</th>
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">MODEL</th>
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">DRIVER ASSIGNED</th>
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">INSURANCE EXPIRY</th>
                                <th className="px-4 py-3 text-left font-semibold text-[10.5px] text-gray-400 tracking-wider">REG EXPIRY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedVehicles.length > 0 ? (
                                paginatedVehicles.map((v, idx) => (
                                    <tr key={idx} className="border-b border-gray-50 hover:bg-violet-50/40 transition-colors">
                                        <td className="px-4 py-3.5">
                                            <span className="inline-block bg-slate-100 border border-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded text-xs">
                                                {v.number}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div>
                                                <p style={{ ...inter, fontWeight: 600, fontSize: "13px" }} className="text-slate-800">
                                                    {v.model}
                                                </p>
                                                <p style={{ ...inter, fontWeight: 400, fontSize: "11px" }} className="text-slate-400">
                                                    {v.subtext}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-2.5">
                                                <img src={v.avatar} alt={v.driver} className="w-7 h-7 rounded-full object-cover" />
                                                <span style={{ ...inter, fontWeight: 500, fontSize: "13px" }} className="text-slate-800">
                                                    {v.driver}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span style={{ ...inter, fontWeight: 400, fontSize: "13px" }} className="text-slate-600">
                                                {v.insuranceExp}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span style={{ ...inter, fontWeight: 400, fontSize: "13px" }} className="text-slate-600">
                                                {v.regExp}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-xs">
                                        No vehicles found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <PaginationFooter
                    currentPage={currentVehiclePage}
                    totalPages={totalVehiclePages}
                    totalItems={filteredVehicles.length}
                    startIndex={vehStartIndex}
                    endIndex={vehEndIndex}
                    onPageChange={(p) => setVehiclePage(p)}
                />
            </div>
        </div>
    );
};
