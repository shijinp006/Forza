import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export default function Layout() {
    const mainRef = useRef(null);

    return (
        <div className="flex h-screen overflow-hidden bg-[#EDEAFB]">
            <Sidebar />

            <main ref={mainRef} className="flex-1 overflow-y-auto h-screen scroll-smooth">
                <Outlet />
            </main>
        </div>
    );
}