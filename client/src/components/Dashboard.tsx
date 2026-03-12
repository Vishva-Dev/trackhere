"use client";

import { useEffect, useState } from "react";
import { Wallet, TrendingUp, PieChart } from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {

    const [assets, setAssets] = useState([]);

    const totalInvestment = assets.reduce(
        (sum: any, a: any) => sum + a.buyPrice * a.quantity,
        0
    );

    const currentValue = assets.reduce(
        (sum: any, a: any) => sum + a.currentPrice * a.quantity,
        0
    );

    const profitLoss = currentValue - totalInvestment;

    const allocationMap: any = {};

    assets.forEach((a: any) => {
        const value = a.currentPrice * a.quantity;
        allocationMap[a.assetType] =
            (allocationMap[a.assetType] || 0) + value;
    });

    const allocationLabels = Object.keys(allocationMap);
    const allocationValues = Object.values(allocationMap);

    const chartData = {
        labels: allocationLabels,
        datasets: [
            {
                data: allocationValues,
                backgroundColor: [
                    "#2563eb",
                    "#16a34a",
                    "#f59e0b",
                    "#9333ea",
                    "#ea580c"
                ]
            }
        ]
    };

    return (

        <div className="p-8 bg-gray-50 min-h-screen">

            <h1 className="text-3xl font-bold mb-6">
                Portfolio Dashboard
            </h1>

            {/* Summary Cards */}

            <div className="grid md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
                    <Wallet className="text-blue-500" />
                    <div>
                        <p className="text-gray-500">Total Investment</p>
                        <h2 className="text-2xl font-bold">
                            ₹{totalInvestment}
                        </h2>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
                    <PieChart className="text-purple-500" />
                    <div>
                        <p className="text-gray-500">Current Value</p>
                        <h2 className="text-2xl font-bold">
                            ₹{currentValue}
                        </h2>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
                    <TrendingUp className="text-green-500" />
                    <div>
                        <p className="text-gray-500">Profit / Loss</p>
                        <h2 className="text-2xl font-bold text-green-600">
                            ₹{profitLoss}
                        </h2>
                    </div>
                </div>

            </div>

            {/* Assets + Chart */}

            <div className="grid md:grid-cols-2 gap-6">

                {/* Assets Table */}

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Your Assets
                    </h2>

                    <table className="w-full">

                        <thead>
                            <tr className="text-left text-gray-500">
                                <th>Asset</th>
                                <th>Type</th>
                                <th>Value</th>
                            </tr>
                        </thead>

                        <tbody>

                            {assets.map((a: any) => (
                                <tr key={a.id} className="border-t">
                                    <td className="py-3 font-medium">
                                        {a.assetName}
                                    </td>

                                    <td>
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                            {a.assetType}
                                        </span>
                                    </td>

                                    <td>
                                        ₹{a.currentPrice * a.quantity}
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Allocation Chart */}

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Asset Allocation
                    </h2>

                    <Doughnut data={chartData} />

                </div>

            </div>

        </div>

    );
}