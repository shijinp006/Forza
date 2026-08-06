/* ── POS Report Mock Data ── */

export const counters = ["All Counters", "C 1", "C 2", "C 3", "C 4", "C 5", "C 6"];

/* ── Bar chart data ── */
export const barData = [
    { id: "C 1", label: "C1", height: 70, amount: "฿ 18,240" },
    { id: "C 2", label: "C2", height: 30, amount: "฿ 8,156" },
    { id: "C 3", label: "C3", height: 52, amount: "฿ 14,120" },
    { id: "C 4", label: "C4", height: 42, amount: "฿ 11,450" },
    { id: "C 5", label: "C5", height: 44, amount: "฿ 12,230" },
    { id: "C 6", label: "C6", height: 0, amount: "฿ 0" },
];

/* ── Summary cards (top 3) ── */
export const summaryCards = [
    { label: "Current sale", value: "9,818.00", sub: "120 Invoices today", iconType: "receipt" },
    { label: "Sales Return", value: "9,818.00", sub: "120 Invoices today", iconType: "receipt" },
    { label: "Excess|Short", value: null, sub: "Show after Day Close", iconType: "scan" },
];

/* ── Shift 1 overview ── */
export const shiftData = {
    shiftLabel: "Shift 1 Overview",
    denomination: "Cash Denomination",
    status: "Active",
    employee: {
        name: "Muhammed Sahal",
        initials: "MS",
        shift: "Shift 1",
        id: "EMP-092",
    },
    logIn: "09:00 am",
    logOut: "--:-- pm",
    voidBills: 0,
    holdBills: 0,
    cashInHand: "2,243.00",
    totalCollection: "5,608.00",
    totalSale: "5,608.00",
};

/* ── Dynamic Counter Details Data (C1 - C6) ── */
export const counterDetailsData = {
    "C 1": {
        summaryCards: [
            { label: "Current sale", value: "32,100.00", sub: "140 Invoices today", iconType: "receipt" },
            { label: "Sales Return", value: "1,200.00", sub: "5 Invoices today", iconType: "receipt" },
            { label: "Excess|Short", value: null, sub: "Show after Day Close", iconType: "scan" },
        ],
        shiftData: {
            shiftLabel: "Counter 1 - Shift Overview",
            denomination: "Cash Denomination",
            status: "Active",
            employee: { name: "Ahmed", initials: "AH", shift: "Shift 1", id: "EMP-091" },
            logIn: "08:30 am",
            logOut: "--:-- pm",
            voidBills: 2,
            holdBills: 1,
            cashInHand: "3,210.00",
            totalCollection: "32,100.00",
            totalSale: "32,100.00",
        }
    },
    "C 2": {
        summaryCards: [
            { label: "Current sale", value: "29,750.00", sub: "160 Invoices today", iconType: "receipt" },
            { label: "Sales Return", value: "850.00", sub: "3 Invoices today", iconType: "receipt" },
            { label: "Excess|Short", value: null, sub: "Show after Day Close", iconType: "scan" },
        ],
        shiftData: {
            shiftLabel: "Counter 2 - Shift Overview",
            denomination: "Cash Denomination",
            status: "Active",
            employee: { name: "Bianca", initials: "BI", shift: "Shift 1", id: "EMP-092" },
            logIn: "09:00 am",
            logOut: "--:-- pm",
            voidBills: 1,
            holdBills: 4,
            cashInHand: "2,975.00",
            totalCollection: "29,750.00",
            totalSale: "29,750.00",
        }
    },
    "C 3": {
        summaryCards: [
            { label: "Current sale", value: "24,100.00", sub: "125 Invoices today", iconType: "receipt" },
            { label: "Sales Return", value: "400.00", sub: "2 Invoices today", iconType: "receipt" },
            { label: "Excess|Short", value: null, sub: "Show after Day Close", iconType: "scan" },
        ],
        shiftData: {
            shiftLabel: "Counter 3 - Shift Overview",
            denomination: "Cash Denomination",
            status: "Active",
            employee: { name: "Carlos", initials: "CA", shift: "Shift 1", id: "EMP-093" },
            logIn: "09:15 am",
            logOut: "--:-- pm",
            voidBills: 0,
            holdBills: 2,
            cashInHand: "2,410.00",
            totalCollection: "24,100.00",
            totalSale: "24,100.00",
        }
    },
    "C 4": {
        summaryCards: [
            { label: "Current sale", value: "18,900.00", sub: "98 Invoices today", iconType: "receipt" },
            { label: "Sales Return", value: "200.00", sub: "1 Invoice today", iconType: "receipt" },
            { label: "Excess|Short", value: null, sub: "Show after Day Close", iconType: "scan" },
        ],
        shiftData: {
            shiftLabel: "Counter 4 - Shift Overview",
            denomination: "Cash Denomination",
            status: "Active",
            employee: { name: "Dina", initials: "DI", shift: "Shift 1", id: "EMP-094" },
            logIn: "09:30 am",
            logOut: "--:-- pm",
            voidBills: 3,
            holdBills: 0,
            cashInHand: "1,890.00",
            totalCollection: "18,900.00",
            totalSale: "18,900.00",
        }
    },
    "C 5": {
        summaryCards: [
            { label: "Current sale", value: "14,500.00", sub: "82 Invoices today", iconType: "receipt" },
            { label: "Sales Return", value: "150.00", sub: "1 Invoice today", iconType: "receipt" },
            { label: "Excess|Short", value: null, sub: "Show after Day Close", iconType: "scan" },
        ],
        shiftData: {
            shiftLabel: "Counter 5 - Shift Overview",
            denomination: "Cash Denomination",
            status: "Active",
            employee: { name: "Eric", initials: "ER", shift: "Shift 1", id: "EMP-095" },
            logIn: "10:00 am",
            logOut: "--:-- pm",
            voidBills: 1,
            holdBills: 1,
            cashInHand: "1,450.00",
            totalCollection: "14,500.00",
            totalSale: "14,500.00",
        }
    },
    "C 6": {
        summaryCards: [
            { label: "Current sale", value: "0.00", sub: "0 Invoices today", iconType: "receipt" },
            { label: "Sales Return", value: "0.00", sub: "0 Invoices today", iconType: "receipt" },
            { label: "Excess|Short", value: null, sub: "Show after Day Close", iconType: "scan" },
        ],
        shiftData: {
            shiftLabel: "Counter 6 - Shift Overview",
            denomination: "Cash Denomination",
            status: "Offline",
            employee: { name: "Frank", initials: "FR", shift: "Shift 1", id: "EMP-096" },
            logIn: "--:-- am",
            logOut: "--:-- pm",
            voidBills: 0,
            holdBills: 0,
            cashInHand: "0.00",
            totalCollection: "0.00",
            totalSale: "0.00",
        }
    }
};

/* ── Collection distribution (shown inside Shift Overview) ── */
export const collectionDistribution = [
    { type: "Cash", percentage: 40, color: "#22C55E", label: "Cash (40%)", amount: "2,243.00" },
    { type: "Card", percentage: 30, color: "#3B82F6", label: "Card (30%)", amount: "1,682.40" },
    { type: "Bank", percentage: 15, color: "#F97316", label: "Bank (15%)", amount: "841.20" },
    { type: "Credit", percentage: 5, color: "#EF4444", label: "Credit (5%)", amount: "280.40" },
];

/* ── Cashiers performance ── */
export const cashiers = [
    { rank: "#1", name: "Ahmed", counter: "C1", invoices: "07", sales: "฿ 32,100", qty: "140" },
    { rank: "#2", name: "Bianca", counter: "C2", invoices: "07", sales: "฿ 29,750", qty: "160" },
    { rank: "#3", name: "Carlos", counter: "C3", invoices: "05", sales: "฿ 24,100", qty: "125" },
    { rank: "#4", name: "Dina", counter: "C4", invoices: "04", sales: "฿ 18,900", qty: "98" },
];

/* ── Live terminals (All Counters view) ── */
export const terminals = [
    { name: "Counter 2", time: "2 min ago", invoices: 28, amount: "8,156.00", isOnline: true },
    { name: "Counter 3", time: "Just now", invoices: 45, amount: "4,156.00", isOnline: true },
    { name: "Counter 4", time: "Just now", invoices: 25, amount: "3,156.00", isOnline: true },
    { name: "Counter 5", time: "1 hour ago", invoices: 12, amount: "1,256.00", isOnline: true },
    { name: "Counter 6", time: "Offline", invoices: 0, amount: "0.00", isOnline: false },
];

/* ── Live Invoices (Specific Counter view) ── */
export const liveInvoices = [
    { id: "Invoice #124657612", time: "2 min ago", items: 28, amount: "8,156.00", method: "CASH" },
    { id: "Invoice #124657614", time: "30 min ago", items: 42, amount: "12,000.00", method: "CASH" },
    { id: "Invoice #124657613", time: "10 min ago", items: 15, amount: "3,750.00", method: "CASH" },
    { id: "Invoice #124657615", time: "1 hr ago", items: 5, amount: "1,200.00", method: "CASH" },
];
