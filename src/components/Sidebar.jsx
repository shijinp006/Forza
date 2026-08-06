import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, ChevronRight, ChevronLeft, Menu } from "lucide-react";
import { mainMenus, bottomMenus } from "../data/sidebarData";

// Custom SVG logos from assets
import ForzaLogo from "../assets/Ficon.svg?react";
import ForzaText from "../assets/ForzaTexticon.svg?react";

/* ── Active gradient ──────────────────── */
const activeGradient = {
  background: "linear-gradient(90deg, #DCE4FF 0%, #6F57DE 50%, #DCE4FF 100%) ",
  color: "white",
};

/* ── Typography base ──────────────────── */
const poppins500 = {
  fontFamily: "Poppins, sans-serif",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0%",
  color: "#8E8E93",
};

/* ── SvgIcon wrapper — applies active colour via CSS filter ── */
function SvgIcon({ Icon, isActive, isLucide }) {
  if (isLucide) {
    return (
      <Icon
        size={18}
        strokeWidth={1.8}
        className={`shrink-0 ${isActive ? "text-white" : "text-slate-400"}`}
      />
    );
  }
  return (
    <span
      className="shrink-0 flex items-center justify-center"
      style={{
        width: 18,
        height: 18,
        // When active, tint strokes white via CSS filter
        filter: isActive
          ? "brightness(0) invert(1)"
          : "none",
        transition: "filter 0.2s",
      }}
    >
      <Icon width={18} height={18} style={{ display: "block" }} />
    </span>
  );
}

/* ── MenuItem ───────────────────────── */
function MenuItem({ item, isActive, onClick, collapsed }) {
  const { Icon, title } = item;
  // Bell is a lucide component, the rest are SVG components
  const isLucide = Icon === Bell;

  return (
    <button
      onClick={() => onClick(item)}
      title={collapsed ? title : undefined}
      className={[
        "relative w-full h-11 rounded-xl flex items-center transition-all duration-200 cursor-pointer gap-3 px-3",
        collapsed ? "lg:justify-center lg:px-2" : "",
        isActive ? "shadow-sm" : "hover:bg-violet-50",
      ].join(" ")}
      style={isActive ? activeGradient : {}}
    >
      <SvgIcon Icon={Icon} isActive={isActive} isLucide={isLucide} />
      <span
        style={isActive ? { ...poppins500, color: "#fff" } : poppins500}
        className={`align-middle whitespace-nowrap ${collapsed ? "hidden lg:hidden max-lg:inline-block" : "inline-block"}`}
      >
        {title}
      </span>
    </button>
  );
}

/* ── Sidebar ──────────────────────────── */
export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleOpen = () => setMobileOpen(true);
    window.addEventListener("open-sidebar", handleOpen);
    return () => window.removeEventListener("open-sidebar", handleOpen);
  }, []);

  const handleMenuClick = (item) => {
    if (item.path) navigate(item.path);
    if (window.innerWidth < 1024) setMobileOpen(false);
  };

  const isActive = (item) => {
    if (item.path === "/") return location.pathname === "/";
    return location.pathname.startsWith(item.path);
  };

  return (
    <>

      {/* Mobile backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      />

      {/* Sidebar panel */}
      <aside
        style={{ borderRadius: "16px" }}
        className={[
          "fixed lg:relative top-0 left-0 h-screen",
          collapsed ? "lg:w-[68px] w-[280px] max-w-[280px]" : "w-[280px] max-w-[280px]",
          "bg-white flex flex-col overflow-hidden",
          "transition-all duration-300 ease-in-out z-[60]",
          "shadow-[0_2px_24px_rgba(111,87,222,0.10)]",
          "border border-gray-100",
          mobileOpen ? "translate-x-0 flex" : "-translate-x-full hidden lg:flex lg:translate-x-0",
        ].join(" ")}
      >
        {/* ─── LOGO ROW ─── */}
        <div className={`flex items-center py-5 px-5 justify-between ${collapsed ? "lg:justify-center lg:px-4" : ""}`}>
          <div className="flex items-center gap-10">
            {/* Custom F logo from assets */}
            <span className="shrink-0 flex items-center" style={{ width: 36, height: 36 }}>
              <ForzaLogo width={36} height={36} style={{ display: "block" }} />
            </span>
            <span className={`flex items-center ${collapsed ? "hidden lg:hidden max-lg:inline-flex" : "inline-flex"}`} style={{ height: 24 }}>
              <ForzaText height={55} style={{ display: "block" }} />
            </span>
          </div>

          {/* Collapse / expand (desktop) */}
          {!collapsed ? (
            <button
              onClick={() => {
                if (window.innerWidth < 1024) setMobileOpen(false);
                else setCollapsed(true);
              }}
              aria-label="Collapse sidebar"
              className="hidden lg:flex p-1 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
          ) : (
            <button
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
              className="hidden lg:flex p-1 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Close on mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="lg:hidden p-1 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
        </div>


        {/* ─── MAIN NAV — scrollable ─── */}
        <div
          className={`flex-1 min-h-0 overflow-y-auto mt-4 pb-2 px-5 ${collapsed ? "lg:px-2" : ""}`}
          style={{ scrollbarWidth: "thin", scrollbarColor: "#c4b5fd transparent" }}
        >
          <nav className="flex flex-col gap-0.5  ">
            {mainMenus.map((item) => (
              <MenuItem
                key={item.title}
                item={item}
                isActive={isActive(item)}
                onClick={handleMenuClick}
                collapsed={collapsed}
              />
            ))}
          </nav>
        </div>

        {/* ─── BOTTOM — always pinned ─── */}
        <div className="shrink-0">
          {/* Dashed separator */}
          <div className="mx-4 border-t border-gray-200 " />

          {/* Bottom nav */}
          <nav className={`flex flex-col gap-0.5 mt-3 ${collapsed ? "px-2" : "px-8"}`}>
            {bottomMenus.map((item) => (
              <MenuItem
                key={item.title}
                item={item}
                isActive={isActive(item)}
                onClick={handleMenuClick}
                collapsed={collapsed}
              />
            ))}
          </nav>

          {/* Dashed separator */}
          <div className="mx-4 mt-3 border-t border-gray-200" />

          {/* ─── PROFILE ─── */}
          <div className={`py-4 ${collapsed ? "px-2" : "px-3"}`}>
            <div
              className={`flex items-center rounded-xl px-2 py-2 gap-3 hover:bg-violet-50 transition-colors cursor-pointer ${collapsed ? "justify-center" : "justify-between"
                }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/80?img=47"
                  className="h-9 w-9 rounded-full object-cover shrink-0 ring-2 ring-violet-100"
                  alt="Angel Delulu"
                />
                {!collapsed && (
                  <div>
                    <p
                      style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px", fontWeight: 400 }}
                      className="text-slate-400 leading-4"
                    >
                      Great to see you!
                    </p>
                    <h4
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "13px" }}
                      className="text-slate-700 leading-5"
                    >
                      Angel Delulu
                    </h4>
                  </div>
                )}
              </div>
              {!collapsed && <ChevronRight size={15} className="text-slate-400 shrink-0" />}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
