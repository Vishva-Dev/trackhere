"use client"

import { useState } from "react"
import AddExpenseModal from "./AddExpenseModal"
import DeleteConfirmModal from "./DeleteConfirmModal"
import { categoryIcons } from "./categoryIcons"

export default function ExpenseList({ expenses, refresh }: any) {

    const [edit, setEdit] = useState<any>(null)
    const [deleteId, setDeleteId] = useState<any>(null)

    const deleteExpense = async () => {

        await fetch(`http://localhost:5000/expenses/${deleteId}`, {
            method: "DELETE"
        })

        setDeleteId(null)

        refresh()

    }

    return (

        <div className="space-y-3">

            {expenses.map((e: any) => (

                <div
                    key={e.id}
                    className="bg-white p-4 rounded-2xl shadow flex justify-between items-center"
                >

                    <div className="flex items-center gap-3">

                        <span className="text-2xl">
                            {categoryIcons[e.category] || "💰"}
                        </span>

                        <div>

                            <p className="font-semibold">{e.title}</p>
                            <p className="text-sm text-gray-500">{e.category}</p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4">

                        <p className="text-indigo-600 font-bold">
                            ₹{e.amount}
                        </p>

                        <button
                            onClick={() => setEdit(e)}
                            className="text-blue-600"
                        >
                            ✏️
                        </button>

                        <button
                            onClick={() => setDeleteId(e.id)}
                            className="text-red-600"
                        >
                            🗑
                        </button>

                    </div>

                </div>

            ))}


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