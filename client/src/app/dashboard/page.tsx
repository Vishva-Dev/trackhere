"use client";

import Link from "next/link";
import {
    Wallet,
    Receipt,
    Calculator,
    PieChart,
    TrendingUp,
    Landmark,
    CreditCard
} from "lucide-react";

export default function FinancialHub() {

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-12">

            <div className="max-w-7xl mx-auto">

                {/* HERO HEADER */}

                <div className="relative mb-16 text-center">

                    {/* Decorative Background Shapes */}

                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
                    <div className="absolute -top-10 right-0 w-40 h-40 bg-indigo-300 rounded-full blur-3xl opacity-40"></div>
                    <div className="absolute top-16 left-1/2 w-28 h-28 bg-purple-200 rounded-full blur-2xl opacity-40"></div>

                    {/* Header */}

                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight relative z-10">

                        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            TrackHere
                        </span>

                        <span className="text-gray-700"> - Your Financial Hub</span>

                    </h1>

                    {/* Subtitle */}

                    <p className="text-gray-700 text-xl mt-6 max-w-3xl mx-auto leading-relaxed relative z-10">

                        Manage your finances, investments and spending in one place

                    </p>

                    {/* Divider */}

                    <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>

                </div>

                {/* SUMMARY CARDS */}

                <div className="grid md:grid-cols-4 gap-6 mb-14">

                    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg shadow-gray-200">

                        <div className="flex items-center gap-3 mb-2">
                            <Landmark className="text-blue-600" />
                            <p className="text-gray-500">Net Worth</p>
                        </div>

                        <h2 className="text-2xl font-bold">
                            ₹4,00,000
                        </h2>

                    </div>


                    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg shadow-gray-200">

                        <div className="flex items-center gap-3 mb-2">
                            <CreditCard className="text-green-600" />
                            <p className="text-gray-500">Monthly Spending</p>
                        </div>

                        <h2 className="text-2xl font-bold">
                            ₹30,000
                        </h2>

                    </div>


                    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg shadow-gray-200">

                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="text-purple-600" />
                            <p className="text-gray-500">Investments</p>
                        </div>

                        <h2 className="text-2xl font-bold">
                            ₹2,50,000
                        </h2>

                    </div>


                    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg shadow-gray-200">

                        <div className="flex items-center gap-3 mb-2">
                            <Wallet className="text-orange-600" />
                            <p className="text-gray-500">Savings</p>
                        </div>

                        <h2 className="text-2xl font-bold">
                            ₹1,50,000
                        </h2>

                    </div>

                </div>


                {/* WIDGETS */}

                <div className="grid md:grid-cols-2 gap-8">

                    <Link href="/investments">

                        <div className="bg-blue-50 p-10 rounded-3xl shadow-lg shadow-gray-200 hover:shadow-xl transition cursor-pointer">

                            <div className="flex items-center gap-6">

                                <div className="bg-blue-100 p-4 rounded-xl">
                                    <Wallet className="text-blue-600" size={32} />
                                </div>

                                <div>

                                    <h2 className="text-2xl font-semibold">
                                        Investment Tracker
                                    </h2>

                                    <p className="text-gray-600 mt-2">
                                        Track stocks, crypto, gold and other investments
                                    </p>

                                </div>

                            </div>

                        </div>

                    </Link>


                    <Link href="/expenses">

                        <div className="bg-green-50 p-10 rounded-3xl shadow-lg shadow-gray-200 hover:shadow-xl transition cursor-pointer">

                            <div className="flex items-center gap-6">

                                <div className="bg-green-100 p-4 rounded-xl">
                                    <Receipt className="text-green-600" size={32} />
                                </div>

                                <div>

                                    <h2 className="text-2xl font-semibold">
                                        Expense Tracker
                                    </h2>

                                    <p className="text-gray-600 mt-2">
                                        Monitor daily spending and manage budgets
                                    </p>

                                </div>

                            </div>

                        </div>

                    </Link>


                    <Link href="/calculators">

                        <div className="bg-purple-50 p-10 rounded-3xl shadow-lg shadow-gray-200 hover:shadow-xl transition cursor-pointer">

                            <div className="flex items-center gap-6">

                                <div className="bg-purple-100 p-4 rounded-xl">
                                    <Calculator className="text-purple-600" size={32} />
                                </div>

                                <div>

                                    <h2 className="text-2xl font-semibold">
                                        Finance Calculator
                                    </h2>

                                    <p className="text-gray-600 mt-2">
                                        EMI, SIP and financial planning tools
                                    </p>

                                </div>

                            </div>

                        </div>

                    </Link>


                    <Link href="/portfolio">

                        <div className="bg-orange-50 p-10 rounded-3xl shadow-lg shadow-gray-200 hover:shadow-xl transition cursor-pointer">

                            <div className="flex items-center gap-6">

                                <div className="bg-orange-100 p-4 rounded-xl">
                                    <PieChart className="text-orange-600" size={32} />
                                </div>

                                <div>

                                    <h2 className="text-2xl font-semibold">
                                        My Portfolio
                                    </h2>

                                    <p className="text-gray-600 mt-2">
                                        View your portfolio performance and allocation
                                    </p>

                                </div>

                            </div>

                        </div>

                    </Link>

                </div>

            </div>

        </div>

    );
}