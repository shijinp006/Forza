import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function Layout() {
    const mainRef = useRef(null);

    useEffect(() => {
        if (!mainRef.current) return;

        const lenis = new Lenis({
            wrapper: mainRef.current,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            syncTouch: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-[#EDEAFB]">
            <Sidebar />

            <main ref={mainRef} className="flex-1 overflow-y-auto h-screen">
                <Outlet />
            </main>
        </div>
    );
}