"use client"

import React, { useMemo } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const CATEGORY_COLORS: { [key: string]: string } = {
    "Food & Groceries": "#6366f1", // Indigo
    "Housing & Utilities": "#8b5cf6", // Violet
    "Transportation": "#ec4899", // Pink
    "Healthcare": "#f43f5e", // Rose
    "Education": "#f97316", // Orange
    "Clothing & Personal Care": "#eab308", // Yellow
    "Entertainment & Leisure": "#22c55e", // Green
    "Technology & Communication": "#06b6d4", // Cyan
    "Financial Services": "#3b82f6", // Blue
    "Miscellaneous": "#94a3b8", // Slate
    "Others": "#cbd5e1", // Light Slate
}

export default function ExpenseChart({ expenses = [] }: { expenses: any[] }) {
    const isArray = Array.isArray(expenses)
    
    // 1. Calculate Monthly Total (Fixed to current month, even if filtered)
    // The parent passes expenses. If filtered, we can't derive the FULL month total 
    // without a separate API. However, we'll sum what we have correctly.
    const monthlyTotal = useMemo(() => {
        if (!isArray) return 0
        return expenses.reduce((acc, exp) => acc + Number(exp.amount || 0), 0)
    }, [expenses, isArray])

    // 2. Prepare Category Totals for chart
    const categoryTotals: { [key: string]: number } = {}
    if (isArray) {
        expenses.forEach(exp => {
            const cat = exp.category || "Others"
            categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(exp.amount || 0)
        })
    }

    // 3. Prepare data for Recharts
    const data = Object.keys(categoryTotals).map(cat => ({
        name: cat,
        value: categoryTotals[cat]
    })).sort((a, b) => b.value - a.value)

    const chartData = data.filter(d => d.value > 0)
    const legendData = chartData // Hide 0 value categories as requested

    return (
        <div className="white-card p-6 mb-6">
            <div className="flex flex-col items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                <div className="w-10 h-1.5 bg-indigo-600 rounded-full mb-1"></div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest text-center">
                    Spending Overview
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Chart Section */}
                <div className="relative h-[250px] w-[250px] shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData.length > 0 ? chartData : [{ name: "None", value: 1 }]}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={105}
                                paddingAngle={chartData.length > 1 ? 4 : 0}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={8}
                            >
                                {chartData.length > 0 ? (
                                    chartData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={CATEGORY_COLORS[entry.name] || "#cbd5e1"} 
                                            className="outline-none hover:opacity-80 transition-opacity"
                                        />
                                    ))
                                ) : (
                                    <Cell fill="#f1f5f9" />
                                )}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#fff', 
                                    borderRadius: '16px', 
                                    border: 'none',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    fontWeight: 'bold'
                                }}
                                formatter={(value: any) => `₹${Number(value).toLocaleString()}`}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Total Selected</span>
                        <span className="text-2xl font-black text-slate-900 mt-0.5">
                            ₹{monthlyTotal.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Legend Section */}
                <div className="flex-1 w-full max-w-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        {legendData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div 
                                        className="w-3 h-3 rounded-full shrink-0 shadow-sm" 
                                        style={{ backgroundColor: CATEGORY_COLORS[item.name] || "#cbd5e1" }}
                                    />
                                    <span className="text-xs text-slate-600 font-bold truncate">
                                        {item.name}
                                    </span>
                                </div>
                                <span className="text-xs font-black text-slate-900 ml-2">
                                    ₹{item.value.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                    {legendData.length === 0 && (
                        <div className="text-center py-6 text-slate-400 italic text-xs">
                            No active spending categories
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}