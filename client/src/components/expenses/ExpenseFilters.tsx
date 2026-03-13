"use client"

import { EXPENSE_CATEGORIES } from "./ExpenseCategories"
import CustomSelect from "./CustomSelect"

type Props = {
    setPeriod: (value: string) => void
    setCategory: (value: string) => void
    setYear: (value: number) => void
    setDate: (value: string) => void
    periodValue: string
    categoryValue: string
    yearValue: number
}

export default function ExpenseFilters({
    setPeriod,
    setCategory,
    setYear,
    setDate,
    periodValue,
    categoryValue,
    yearValue
}: Props) {

    const today = new Date().toISOString().split("T")[0]
    const currentYear = new Date().getFullYear()

    return (

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* PERIOD */}
            <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 ml-1">Period</label>
                <CustomSelect
                    compact
                    value={periodValue || "today"}
                    onChange={(val) => setPeriod(val)}
                    options={[
                        { label: "Today", value: "today" },
                        { label: "Weekly", value: "week" },
                        { label: "Monthly", value: "month" },
                        { label: "Yearly", value: "year" },
                        ...Array.from({ length: 12 }, (_, i) => ({
                            label: new Date(0, i).toLocaleString('en', { month: 'long' }),
                            value: String(i + 1)
                        }))
                    ]}
                />
            </div>

            {/* CATEGORY */}
            <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 ml-1">Type</label>
                <CustomSelect
                    compact
                    value={categoryValue}
                    onChange={(val) => setCategory(val)}
                    options={[
                        { label: "All", value: "" },
                        ...Object.keys(EXPENSE_CATEGORIES).map(c => ({ label: c, value: c })),
                        { label: "Others", value: "Others" }
                    ]}
                />
            </div>

            {/* YEAR */}
            <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 ml-1">Year</label>
                <CustomSelect
                    compact
                    value={String(yearValue)}
                    onChange={(val) => setYear(Number(val))}
                    options={["2025", "2026"]}
                />
            </div>

            {/* DATE */}
            <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 ml-1">Custom</label>
                <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 px-2 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all cursor-pointer text-[11px] font-bold h-10 w-full"
                />
            </div>
        </div>

    )

}