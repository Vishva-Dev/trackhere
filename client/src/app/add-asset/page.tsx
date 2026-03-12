"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function AddAsset() {
    const [assetType, setAssetType] = useState('stock');
    const [assetName, setAssetName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [buyPrice, setBuyPrice] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [error, setError] = useState('');

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await api.post('/assets', {
                assetType,
                assetName,
                quantity: parseFloat(quantity),
                buyPrice: parseFloat(buyPrice),
                currentPrice: parseFloat(currentPrice),
            });
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to add asset');
        }
    };

    if (loading || !user) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 px-4">
            <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Add New Asset</h2>

                {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Asset Type</label>
                        <select
                            value={assetType}
                            onChange={e => setAssetType(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="stock">Stock</option>
                            <option value="crypto">Cryptocurrency</option>
                            <option value="cash">Cash / Forex</option>
                            <option value="real_estate">Real Estate</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Asset Name (e.g. AAPL, Bitcoin)</label>
                        <input
                            type="text"
                            required
                            value={assetName}
                            onChange={e => setAssetName(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                type="number"
                                step="any"
                                required
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Buy Price ($)</label>
                            <input
                                type="number"
                                step="any"
                                required
                                value={buyPrice}
                                onChange={e => setBuyPrice(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Current Price ($)</label>
                        <input
                            type="number"
                            step="any"
                            required
                            value={currentPrice}
                            onChange={e => setCurrentPrice(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="pt-4 flex justify-between">
                        <button
                            type="button"
                            onClick={() => router.push('/dashboard')}
                            className="w-1/3 bg-gray-100 text-gray-700 rounded-md py-2 px-4 hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition"
                        >
                            Save Asset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
