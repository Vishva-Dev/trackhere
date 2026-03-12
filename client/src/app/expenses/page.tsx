"use client"

import { useState, useEffect } from "react"

import ExpenseChart from "@/components/expenses/ExpenseCharts"
import ExpenseFilters from "@/components/expenses/ExpenseFilters"
import ExpenseList from "@/components/expenses/ExpenseList"
import AddExpenseModal from "@/components/expenses/AddExpenseModal"

export default function ExpensesPage() {

    const [expenses, setExpenses] = useState([])
    const [month, setMonth] = useState("")
    const [category, setCategory] = useState("")
    const [openModal, setOpenModal] = useState(false)

    const loadExpenses = async () => {

        let url = "http://localhost:5000/expenses?"

        if (month) url += "month=" + month + "&"
        if (category) url += "category=" + category

        const res = await fetch(url)
        const data = await res.json()

        setExpenses(data)

    }

    useEffect(() => {

        loadExpenses()

    }, [month, category])

    return (

        <div className="max-w-md mx-auto p-4">

            <h1 className="text-2xl font-bold mb-4">
                Expense Tracker
            </h1>

            <ExpenseChart />

            <ExpenseFilters
                setMonth={setMonth}
                setCategory={setCategory}
            />

            <ExpenseList expenses={expenses}
                refresh={loadExpenses} />

            <button
                onClick={() => setOpenModal(true)}
                className="fixed bottom-8 right-8 bg-indigo-600 text-white w-14 h-14 rounded-full text-2xl shadow-lg"
            >
                +
            </button>

            {openModal &&
                <AddExpenseModal
                    close={() => setOpenModal(false)}
                    refresh={loadExpenses}
                />
            }

        </div>



    )

}

