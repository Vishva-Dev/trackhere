"use client"

import { useState, useEffect } from "react"
import { EXPENSE_CATEGORIES } from "./ExpenseCategories"

export default function AddExpenseModal({
    close,
    refresh,
    expense
}: any) {

    const editing = !!expense

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("")
    const [notes, setNotes] = useState("")

    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState<any>({})

    useEffect(() => {

        if (expense) {

            setTitle(expense.title)
            setCategory(expense.category)
            setSubcategory(expense.subcategory)
            setAmount(expense.amount)
            setDate(expense.date?.slice(0, 10))
            setNotes(expense.notes)

        }

    }, [expense])


    const validate = () => {

        let newErrors: any = {}

        if (!title.trim()) newErrors.title = "Title is required"

        if (!category) newErrors.category = "Category required"

        if (category === "Other" && !subcategory)
            newErrors.subcategory = "Custom category required"

        if (!amount || Number(amount) < 0)
            newErrors.amount = "Valid amount required"

        if (!date) newErrors.date = "Date required"

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }


    const submit = async () => {

        if (!validate()) return

        const url = editing
            ? `http://localhost:5000/expenses/${expense.id}`
            : `http://localhost:5000/expenses/add`

        const method = editing ? "PUT" : "POST"

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                category,
                subcategory,
                amount,
                date,
                notes
            })
        })

        refresh()

        setSuccess(true)

    }


    const reset = () => {

        setTitle("")
        setCategory("")
        setSubcategory("")
        setAmount("")
        setDate("")
        setNotes("")
        setErrors({})

    }


    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-[420px] rounded-2xl p-6 shadow-xl">

                {success ? (

                    <div className="text-center">

                        <div className="text-green-500 text-4xl mb-3">
                            ✔
                        </div>

                        <h2 className="text-xl font-semibold mb-6">
                            Expense Added Successfully
                        </h2>

                        <div className="flex justify-center gap-4">

                            <button
                                onClick={() => {
                                    setSuccess(false)
                                    reset()
                                }}
                                className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
                            >
                                Add Another
                            </button>

                            <button
                                onClick={close}
                                className="bg-gray-200 px-5 py-2 rounded-lg"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                ) : (

                    <>
                        {/* HEADER */}

                        <div className="relative mb-6 text-center">

                            <h2 className="text-2xl font-bold text-indigo-600">

                                {editing ? "Edit Expense" : "Add Expense"}

                            </h2>

                            <button
                                onClick={close}
                                className="absolute right-0 top-0 text-gray-400 text-xl"
                            >
                                ✕
                            </button>

                        </div>


                        <div className="space-y-3">

                            {/* TITLE */}

                            <label className="font-medium">
                                Title <span className="text-red-500">*</span>
                            </label>

                            <input
                                value={title}
                                onChange={(e) => {
                                    const clean = e.target.value.replace(/[^A-Za-z0-9\s]/g, "")
                                    setTitle(clean)
                                }}
                                className="border rounded-lg p-2 w-full"
                            />

                            {errors.title &&
                                <p className="text-red-500 text-sm">{errors.title}</p>
                            }


                            {/* CATEGORY */}

                            <label className="font-medium">
                                Category <span className="text-red-500">*</span>
                            </label>

                            <select
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                    setSubcategory("")
                                }}
                                className="border rounded-lg p-2 w-full"
                            >

                                <option value="">Select Category</option>

                                {Object.keys(EXPENSE_CATEGORIES).map((c) => (
                                    <option key={c}>{c}</option>
                                ))}

                                <option>Other</option>

                            </select>

                            {errors.category &&
                                <p className="text-red-500 text-sm">{errors.category}</p>
                            }


                            {/* SUBCATEGORY */}

                            <label className="font-medium">

                                {category === "Other"
                                    ? <>Custom Category <span className="text-red-500">*</span></>
                                    : "Sub-category"}

                            </label>

                            {category !== "Other" ? (

                                <select
                                    value={subcategory}
                                    onChange={(e) => setSubcategory(e.target.value)}
                                    className="border rounded-lg p-2 w-full"
                                >

                                    <option value="">Select SubCategory</option>

                                    {EXPENSE_CATEGORIES[
                                        category as keyof typeof EXPENSE_CATEGORIES
                                    ]?.map((s) => (
                                        <option key={s}>{s}</option>
                                    ))}

                                </select>

                            ) : (

                                <input
                                    placeholder="Enter custom category"
                                    value={subcategory}
                                    onChange={(e) => setSubcategory(e.target.value)}
                                    className="border rounded-lg p-2 w-full"
                                />

                            )}

                            {errors.subcategory &&
                                <p className="text-red-500 text-sm">{errors.subcategory}</p>
                            }


                            {/* AMOUNT */}

                            <label className="font-medium">
                                Amount <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="border rounded-lg p-2 w-full"
                            />

                            {errors.amount &&
                                <p className="text-red-500 text-sm">{errors.amount}</p>
                            }


                            {/* DATE */}

                            <label className="font-medium">
                                Date <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="border rounded-lg p-2 w-full"
                            />

                            {errors.date &&
                                <p className="text-red-500 text-sm">{errors.date}</p>
                            }


                            {/* NOTES */}

                            <label className="font-medium">
                                Notes
                            </label>

                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="border rounded-lg p-2 w-full"
                            />

                        </div>


                        {/* BUTTONS */}

                        <div className="flex justify-center gap-4 mt-6">

                            <button
                                onClick={submit}
                                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
                            >
                                {editing ? "Save Changes" : "Add Expense"}
                            </button>

                            <button
                                onClick={reset}
                                className="bg-yellow-200 text-yellow-800 px-6 py-2 rounded-lg"
                            >
                                Reset
                            </button>

                        </div>
                    </>
                )}

            </div>

        </div>

    )

}