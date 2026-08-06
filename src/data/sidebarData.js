import { Bell } from "lucide-react";

// Custom SVG icons from assets
import DashboardIcon from "../assets/Dashboard.svg?react";
import SalesIcon from "../assets/Sales.svg?react";
import PurchaseIcon from "../assets/Purchase.svg?react";
import InventoryIcon from "../assets/Inventory.svg?react";
import CounterIcon from "../assets/CounterReport.svg?react";
import TaxIcon from "../assets/TaxReport.svg?react";
import AccountIcon from "../assets/AccountReport.svg?react";
import DocIcon from "../assets/Doc.svg?react";
import SettingIcon from "../assets/Setting.svg?react";
import HelpIcon from "../assets/Help.svg?react";

/* ── Main Navigation Menus Data ── */
export const mainMenus = [
  { title: "Dashboard", Icon: DashboardIcon, path: "/" },
  { title: "Sales Analysis", Icon: SalesIcon, path: "/sales" },
  { title: "Purchase Analysis", Icon: PurchaseIcon, path: "/purchase" },
  { title: "Inventory", Icon: InventoryIcon, path: "/inventory" },
  { title: "Counter Report", Icon: CounterIcon, path: "/counter" },
  { title: "Tax Report", Icon: TaxIcon, path: "/tax" },
  { title: "Account report", Icon: AccountIcon, path: "/account" },
  { title: "Doc Expiry", Icon: DocIcon, path: "/doc-expiry" },
];

/* ── Bottom Navigation Menus Data ── */
export const bottomMenus = [
  { title: "Notifications", Icon: Bell, path: "/notifications" },
  { title: "Settings", Icon: SettingIcon, path: "/settings" },
  { title: "Help", Icon: HelpIcon, path: "/help" },
];
