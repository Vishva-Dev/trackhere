"use client"

import { useState, useEffect } from "react"

import api from "@/lib/api"

import ExpenseChart from "@/components/expenses/ExpenseCharts"
import ExpenseFilters from "@/components/expenses/ExpenseFilters"
import ExpenseList from "@/components/expenses/ExpenseList"
import AddExpenseModal from "@/components/expenses/AddExpenseModal"
import UserMenu from "@/components/UserMenu"

export default function ExpensesPage() {

    const today = new Date().toISOString().split("T")[0]
    const currentYear = new Date().getFullYear()

    const [expenses, setExpenses] = useState<any[]>([])

    const [period, setPeriod] = useState("today")
    const [category, setCategory] = useState("")
    const [year, setYear] = useState(currentYear)
    const [date, setDate] = useState("")

    const handlePeriodChange = (value: string) => {
        setPeriod(value)
        setDate("")
    }

    const handleDateChange = (value: string) => {
        setDate(value)
        setPeriod("")
    }

    const onAddSuccess = () => {
        setPeriod("today")
        setDate("")
        loadExpenses()
    }

    const [openModal, setOpenModal] = useState(false)


    const loadExpenses = async () => {

        const params = new URLSearchParams()

        if (date) {
            // Date filter — don't send period
            params.set("date", date)
        } else if (period) {
            // Period filter — send period + year (year matters for specific months)
            params.set("period", period)
            params.set("year", String(year))
        }

        if (category) {
            params.set("category", category)
        }

        try {
            const res = await api.get(`/expenses?${params.toString()}`)
            const data = res.data

            if (Array.isArray(data)) {
                setExpenses(data)
            } else {
                console.error("API error or invalid data format:", data)
                setExpenses([])
            }
        } catch (error) {
            console.error("Failed to load expenses:", error)
            setExpenses([])
        }

    }


    useEffect(() => {

        loadExpenses()

    }, [period, category, year, date])


    return (
        <div className="min-h-screen py-10 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                <header className="mb-24 relative flex items-center justify-center">
                    {/* Centered Brand */}
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">
                            Track<span className="text-indigo-600">Here</span>
                        </h1>
                        <div className="mt-3 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">Financial Intelligence</p>
                        </div>
                    </div>

                    {/* Right-Aligned User Profile */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <UserMenu />
                    </div>
                </header>

                <div className="space-y-8">
                    <ExpenseChart expenses={expenses} />

                    <div className="white-card p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                            <h3 className="text-slate-700 font-extrabold text-sm uppercase tracking-wider">Quick Filters</h3>
                        </div>
                        <ExpenseFilters
                            setPeriod={handlePeriodChange}
                            setCategory={setCategory}
                            setYear={setYear}
                            setDate={handleDateChange}
                            periodValue={period}
                            categoryValue={category}
                            yearValue={year}
                        />
                    </div>

                    <ExpenseList
                        expenses={expenses}
                        refresh={loadExpenses}
                    />
                </div>

                {/* Floating Add Button */}
                <button
                    onClick={() => setOpenModal(true)}
                    className="fixed bottom-10 right-10 bg-indigo-600 text-white w-16 h-16 rounded-2xl text-3xl shadow-xl hover:shadow-indigo-200 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center font-black"
                >
                    +
                </button>

                {openModal &&
                    <AddExpenseModal
                        close={() => setOpenModal(false)}
                        refresh={onAddSuccess}
                    />
                }
            </div>
        </div>
    )

}