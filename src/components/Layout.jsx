import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export default function Layout() {
    return (
        <div className="flex h-screen overflow-hidden bg-[#EDEAFB]">
            <Sidebar />

            <main className="flex-1 h-screen overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}

