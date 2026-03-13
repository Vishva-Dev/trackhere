"use client"

import { useState } from "react"
import AddExpenseModal from "./AddExpenseModal"
import DeleteConfirmModal from "./DeleteConfirmModal"
import { categoryIcons } from "./categoryIcons"


// CALCULATE DAILY TOTAL

function calculateTotal(expenses: any[]) {

    return expenses.reduce((sum, e) => {

        return sum + Number(e.amount)

    }, 0)

}


// FORMAT DATE HEADER

function formatDateHeader(dateString: string) {

    const date = new Date(dateString)

    const day = date.getDate()

    const month = date
        .toLocaleString("en-US", { month: "short" })
        .toUpperCase()

    const year = date.getFullYear()

    return `${day} ${month} ${year}`

}



export default function ExpenseList({ expenses, refresh }: any) {

    const [edit, setEdit] = useState<any>(null)
    const [deleteId, setDeleteId] = useState<any>(null)


    // GROUP EXPENSES BY DATE

    const grouped: any = {}

    expenses.forEach((e: any) => {

        const key = formatDateHeader(e.date)

        if (!grouped[key]) grouped[key] = []

        grouped[key].push(e)

    })


    const deleteExpense = async () => {

        await fetch(`http://localhost:5000/expenses/${deleteId}`, {
            method: "DELETE"
        })

        setDeleteId(null)

        refresh()

    }



    return (

        <div className="space-y-6">

            {Object.keys(grouped).map((date) => {

                const total = calculateTotal(grouped[date])

                return (

                    <div key={date}>

                        {/* DATE HEADER WITH TOTAL */}

                        <div className="flex justify-between items-center mb-3">

                            <div className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                                {date}
                            </div>

                            <div className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-lg">
                                ₹{total.toLocaleString("en-IN")}
                            </div>

                        </div>



                        {/* EXPENSE ITEMS */}

                        {grouped[date].map((e: any) => (

                            <div
                                key={e.id}
                                className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center mb-3"
                            >

                                <div className="flex items-center gap-3">

                                    <span className="text-2xl">
                                        {categoryIcons[e.category] || "💰"}
                                    </span>

                                    <div>

                                        <p className="font-semibold">
                                            {e.title}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {e.category}
                                        </p>

                                    </div>

                                </div>


                                <div className="flex items-center gap-4">

                                    <p className="text-indigo-600 font-bold">
                                        ₹{e.amount}
                                    </p>

                                    <button
                                        onClick={() => setEdit(e)}
                                        className="text-orange-500 hover:scale-110"
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        onClick={() => setDeleteId(e.id)}
                                        className="text-red-500 hover:scale-110"
                                    >
                                        🗑
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )

            })}



            {/* EDIT MODAL */}

            {edit &&

                <AddExpenseModal
                    expense={edit}
                    close={() => setEdit(null)}
                    refresh={refresh}
                />

            }


            {/* DELETE MODAL */}

            {deleteId &&

                <DeleteConfirmModal
                    confirm={deleteExpense}
                    close={() => setDeleteId(null)}
                />

            }

        </div>

    )

}