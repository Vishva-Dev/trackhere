"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
    { name: "Food", value: 48 },
    { name: "Transport", value: 20 },
    { name: "Shopping", value: 12 },
    { name: "Healthcare", value: 12 },
]

const COLORS = ["#3b82f6", "#60a5fa", "#a78bfa", "#f59e0b"]

export default function ExpenseChart() {

    return (

        <div className="bg-white p-5 rounded-2xl shadow mb-6">

            <h3 className="font-semibold mb-4">
                Spending Categories
            </h3>

            <div className="h-52">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={50}
                            outerRadius={80}
                        >

                            {data.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}

                        </Pie>

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    )

}