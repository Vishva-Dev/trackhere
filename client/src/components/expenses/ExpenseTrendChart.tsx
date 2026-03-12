"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts"

const data = [
    { month: "Jan", amount: 12000 },
    { month: "Feb", amount: 15000 },
    { month: "Mar", amount: 11000 },
    { month: "Apr", amount: 18000 },
    { month: "May", amount: 16000 }
]

export default function ExpenseTrendChart() {

    return (

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-6">

            <h2 className="text-lg font-semibold mb-4">
                Monthly Spending Trend
            </h2>

            <div className="h-72">

                <ResponsiveContainer>

                    <LineChart data={data}>

                        <XAxis dataKey="month" />
                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#6366F1"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    )

}