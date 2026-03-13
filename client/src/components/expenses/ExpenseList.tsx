"use client"

import { useState } from "react"
import api from "@/lib/api"
import AddExpenseModal from "./AddExpenseModal"
import DeleteConfirmModal from "./DeleteConfirmModal"
import { categoryIcons } from "./categoryIcons"

function calculateTotal(expenses: any[]) {
    return expenses.reduce((sum, e) => sum + Number(e.amount), 0)
}

function formatDateHeader(dateString: string) {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase()
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
}

export default function ExpenseList({ expenses, refresh }: any) {
    const [edit, setEdit] = useState<any>(null)
    const [deleteId, setDeleteId] = useState<any>(null)

    const grouped: any = {}
    expenses.forEach((e: any) => {
        const key = formatDateHeader(e.date)
        if (!grouped[key]) grouped[key] = []
        grouped[key].push(e)
    })

    const deleteExpense = async () => {
        try {
            await api.delete(`/expenses/${deleteId}`)
            setDeleteId(null)
            refresh()
        } catch (error) {
            console.error("Failed to delete expense:", error)
        }
    }

    return (
        <div className="space-y-8 pb-32">
            {expenses.length === 0 && (
                <div className="white-card py-20 text-center border-dashed border-slate-200 bg-slate-50/50">
                    <div className="text-6xl mb-6 grayscale opacity-20">📊</div>
                    <p className="text-xl text-slate-400 font-extrabold mb-1">Clean Slate</p>
                    <p className="text-slate-400 text-sm">Add an expense to populate your trends</p>
                </div>
            )}

            {Object.keys(grouped).map((date) => {
                const total = calculateTotal(grouped[date])
                const isToday = new Date().toDateString() === new Date(date).toDateString()

                return (
                    <div key={date} className="mb-12 last:mb-0">
                        {/* Header Badge */}
                        <div className="flex items-center justify-between mb-6 px-1">
                             <div className="flex items-center gap-3 ml-2">
                                <div className={`w-1 h-3 rounded-full ${isToday ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
                                <h3 className="font-extrabold text-slate-500 tracking-tight text-[10px] uppercase tracking-widest">
                                    {date}
                                </h3>
                             </div>
                             <div className="bg-white border border-slate-100 text-indigo-600 font-black text-xs px-4 py-2 rounded-xl shadow-sm border-indigo-50">
                                 ₹{total.toLocaleString()}
                             </div>
                        </div>

                        {/* Expense Items */}
                        <div className="grid gap-4">
                            {grouped[date].map((e: any) => (
                                <div key={e.id} className="white-card group hover:border-indigo-100 hover:shadow-md transition-all p-4 flex items-center justify-between cursor-pointer border-slate-100 overflow-hidden">
                                    {/* Left: Icon & Details */}
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-2xl border border-slate-100 group-hover:bg-white transition-colors shrink-0">
                                            {categoryIcons[e.category] || "💸"}
                                        </div>
                                        <div className="min-w-0 pr-4">
                                            <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors text-[15px] leading-tight mb-2 truncate">{e.title}</h4>
                                            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none truncate">{e.category}</p>
                                        </div>
                                    </div>

                                    {/* Right: Amount & Actions */}
                                    <div className="flex items-center gap-8 shrink-0">
                                        <div className="font-black text-emerald-600 text-[16px] tracking-tight">
                                            ₹{parseFloat(e.amount).toLocaleString()}
                                        </div>
                                        <div className="flex gap-4">
                                            <button 
                                                onClick={(e_stop) => { e_stop.stopPropagation(); setEdit(e); }}
                                                className="w-8 h-8 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg hover:bg-white hover:border-indigo-200 border border-transparent transition-all shadow-sm shadow-indigo-100 text-xs"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                onClick={(e_stop) => { e_stop.stopPropagation(); setDeleteId(e.id); }}
                                                className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-white hover:border-red-200 border border-transparent transition-all shadow-sm shadow-red-100 text-xs"
                                                title="Delete"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}

            {edit &&
                <AddExpenseModal
                    expense={edit}
                    close={() => setEdit(null)}
                    refresh={refresh}
                />
            }

            {deleteId &&
                <DeleteConfirmModal
                    confirm={deleteExpense}
                    close={() => setDeleteId(null)}
                />
            }
        </div>
    )
}