"use client"

import { useState, useEffect } from "react"
import { EXPENSE_CATEGORIES } from "./ExpenseCategories"
import CustomSelect from "./CustomSelect"

import api from "@/lib/api"

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

        if (!title.trim())
            newErrors.title = "Title is required"

        if (!category)
            newErrors.category = "Category required"

        if (category === "Others" && !subcategory)
            newErrors.subcategory = "Custom category required"

        if (!amount || Number(amount) < 0)
            newErrors.amount = "Valid amount required"

        if (!date)
            newErrors.date = "Date required"

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }


    const submit = async () => {

        if (!validate()) return

        const endpoint = editing
            ? `/expenses/${expense.id}`
            : `/expenses`

        const payload = {
            title,
            category,
            subcategory,
            amount: parseFloat(amount),
            date,
            notes
        }

        try {
            if (editing) {
                await api.put(endpoint, payload)
            } else {
                await api.post(endpoint, payload)
            }

            refresh()
            setSuccess(true)
        } catch (error) {
            console.error("Failed to save expense:", error)
            setErrors({ submit: "Failed to save. Please try again." })
        }

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

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white w-full max-w-[440px] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] relative">

                {success ? (
                    <div className="p-10 text-center flex flex-col items-center justify-center min-h-[300px] animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 text-4xl shadow-sm border border-emerald-100/50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                            {editing ? "Updated Successfully" : "Expense Added Successfully"}
                        </h2>
                        <p className="text-slate-500 font-medium mb-10 text-sm">
                            Your financial records have been synchronized.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[280px]">
                            {!editing && (
                                <button
                                    onClick={() => {
                                        setSuccess(false)
                                        reset()
                                    }}
                                    className="flex-1 bg-indigo-600 text-white font-black py-3.5 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
                                >
                                    Add Another
                                </button>
                            )}
                            <button
                                onClick={close}
                                className="flex-1 bg-slate-50 text-slate-600 font-bold py-3.5 rounded-2xl hover:bg-slate-100 border border-slate-100 transition-all active:scale-95 text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : (

                    <>

                        {/* CLOSE BUTTON - REPOSITIONED TO CORNER */}
                        <button
                            onClick={close}
                            className="absolute right-3 top-3 text-slate-400 hover:text-red-500 transition-all p-2 hover:bg-red-50 rounded-full z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-8 flex flex-col flex-1 overflow-hidden">
                            {/* HEADER */}
                            <div className="relative mb-6 text-center shrink-0">
                                <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-4"></div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                    {editing ? "Update" : "Add"} <span className="text-indigo-600">Expense</span>
                                </h2>
                            </div>

                        <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-6 scrollbar-hide">
                            {/* TITLE */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1">
                                    Expense Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={title}
                                    placeholder="e.g. Monthly Grocery"
                                    onChange={(e) => {
                                        const clean = e.target.value.replace(/[^A-Za-z0-9\s]/g, "")
                                        setTitle(clean)
                                    }}
                                    className="bg-slate-50 border border-slate-200 text-slate-700 p-3 rounded-2xl w-full outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-bold placeholder:text-slate-300"
                                />
                                {errors.title && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.title}</p>}
                            </div>


                            <div className="grid grid-cols-2 gap-4">
                                {/* CATEGORY */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1">
                                        Main Category <span className="text-red-500">*</span>
                                    </label>
                                    <CustomSelect
                                        value={category}
                                        onChange={(val) => {
                                            setCategory(val)
                                            setSubcategory("")
                                        }}
                                        options={[...Object.keys(EXPENSE_CATEGORIES), "Others"]}
                                        placeholder="Select"
                                    />
                                    {errors.category && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.category}</p>}
                                </div>

                                {/* SUBCATEGORY */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1">Subtype</label>
                                    {category !== "Others" ? (
                                        <CustomSelect
                                            value={subcategory}
                                            onChange={(val) => setSubcategory(val)}
                                            options={EXPENSE_CATEGORIES[category as keyof typeof EXPENSE_CATEGORIES] || []}
                                            placeholder="Select"
                                        />
                                    ) : (
                                        <input
                                            placeholder="Specify..."
                                            value={subcategory}
                                            onChange={(e) => setSubcategory(e.target.value)}
                                            className="bg-slate-50 border border-slate-200 text-slate-700 p-3 rounded-2xl w-full outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-bold"
                                        />
                                    )}
                                    {errors.subcategory && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.subcategory}</p>}
                                </div>
                            </div>


                            <div className="grid grid-cols-2 gap-4">
                                {/* AMOUNT */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1">
                                        Amount (₹) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={amount}
                                        placeholder="0.00"
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="bg-slate-50 border border-slate-200 text-slate-900 p-3 rounded-2xl w-full outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-black text-lg"
                                    />
                                    {errors.amount && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.amount}</p>}
                                </div>

                                {/* DATE */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1">
                                        Expense Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="bg-slate-50 border border-slate-200 text-slate-700 px-3 rounded-2xl w-full outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-bold cursor-pointer h-12 text-sm"
                                    />
                                    {errors.date && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.date}</p>}
                                </div>
                            </div>


                            {/* NOTES */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1">Additional Notes</label>
                                <textarea
                                    value={notes}
                                    placeholder="Brief description..."
                                    rows={2}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 text-slate-700 p-3 rounded-2xl w-full outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-semibold resize-none"
                                />
                            </div>
                        </div>


                        {/* ACTION BUTTONS */}
                        <div className="flex items-center gap-3 mt-8 shrink-0">
                            <button
                                onClick={submit}
                                className="flex-1 bg-indigo-600 text-white font-black py-3.5 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all"
                            >
                                {editing ? "Save Changes" : "Save Expense"}
                            </button>
                            <button
                                onClick={reset}
                                className="flex-1 bg-white hover:bg-slate-50 text-slate-400 font-bold py-3.5 rounded-2xl transition-all active:scale-95 border-2 border-slate-100 hover:border-slate-200"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    </>
                )}

            </div>

        </div>

    )

}