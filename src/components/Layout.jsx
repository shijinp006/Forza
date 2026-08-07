import { useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export default function Layout() {
    const mainRef = useRef(null);

    useEffect(() => {
        const el = mainRef.current;
        if (!el) return;

        let current = el.scrollTop;
        let target = el.scrollTop;
        let rafId = null;
        const ease = 0.12;

        function animate() {
            current += (target - current) * ease;

            // Stop animating when close enough
            if (Math.abs(target - current) < 0.5) {
                current = target;
                el.scrollTop = current;
                rafId = null;
                return;
            }

            el.scrollTop = current;
            rafId = requestAnimationFrame(animate);
        }

        function onWheel(e) {
            e.preventDefault();

            // Sync current position in case of external scroll changes
            current = el.scrollTop;

            // Accumulate target
            target += e.deltaY * 1.5;

            // Clamp target to scrollable bounds
            const maxScroll = el.scrollHeight - el.clientHeight;
            target = Math.max(0, Math.min(target, maxScroll));

            if (!rafId) {
                rafId = requestAnimationFrame(animate);
            }
        }

        // Touch smooth scroll
        let touchStartY = 0;
        let touchCurrentY = 0;

        function onTouchStart(e) {
            touchStartY = e.touches[0].clientY;
            touchCurrentY = touchStartY;
            current = el.scrollTop;
            target = current;
        }

        function onTouchMove(e) {
            const y = e.touches[0].clientY;
            const delta = touchCurrentY - y;
            touchCurrentY = y;

            target += delta * 1.8;

            const maxScroll = el.scrollHeight - el.clientHeight;
            target = Math.max(0, Math.min(target, maxScroll));

            if (!rafId) {
                rafId = requestAnimationFrame(animate);
            }
        }

        el.addEventListener("wheel", onWheel, { passive: false });
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: true });

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            el.removeEventListener("wheel", onWheel);
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchmove", onTouchMove);
        };
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-[#EDEAFB]">
            <Sidebar />

            <main
                ref={mainRef}
                className="flex-1 h-screen overflow-y-auto"
                style={{ overscrollBehavior: "none" }}
            >
                <Outlet />
            </main>
        </div>
    );
}

