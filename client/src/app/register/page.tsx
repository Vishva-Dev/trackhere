"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await api.post('/auth/register', { name, email, password });
            
            if (response.data?.user && response.data?.token) {
                login(response.data.user, response.data.token);
                router.push('/expenses');
            } else {
                setError('Unexpected response from server');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to register');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#fcfdfe] p-6 overflow-hidden">
            {/* AMBIENT BACKGROUND ELEMENTS */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-100/50 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-violet-50/50 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-[400px] w-full relative z-10">
                {/* LOGO AREA */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-lg shadow-indigo-100/50 mb-3 border border-indigo-50 relative group">
                        <div className="absolute inset-0 bg-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <span className="text-2xl relative z-10">🚀</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Create <span className="text-indigo-600">Account</span></h1>
                    <p className="text-slate-400 text-sm font-medium mt-1">Start tracking your wealth today</p>
                </div>

                {/* REGISTER CARD */}
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/40 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                    
                    {error && (
                        <div className="bg-red-50/80 backdrop-blur-sm text-red-500 p-3.5 rounded-xl mb-6 text-xs font-bold flex items-center gap-2 border border-red-100 animate-shake">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 ml-1">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                placeholder="Your name"
                                onChange={e => setName(e.target.value)}
                                className="w-full bg-slate-50/50 border border-slate-200 text-slate-700 p-3.5 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 focus:bg-white transition-all font-bold placeholder:text-slate-300 text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                placeholder="name@example.com"
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-slate-50/50 border border-slate-200 text-slate-700 p-3.5 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 focus:bg-white transition-all font-bold placeholder:text-slate-300 text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-widest font-black text-slate-400 ml-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                placeholder="••••••••"
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-slate-50/50 border border-slate-200 text-slate-700 p-3.5 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-400 focus:bg-white transition-all font-bold placeholder:text-slate-300 text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all text-base disabled:opacity-50 disabled:translate-y-0"
                        >
                            {isLoading ? "Creating Account..." : "Join Now"}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-50 text-center">
                        <p className="text-slate-400 font-bold text-xs">
                            Already have an account?{" "}
                            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
