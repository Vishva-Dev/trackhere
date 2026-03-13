"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

export default function UserMenu() {
    const { user, logout } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const initial = user?.name ? user.name.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : "?")

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-700 text-white font-black flex items-center justify-center shadow-[0_8px_30px_rgb(79,70,229,0.15)] hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all text-lg border-2 border-white ring-8 ring-slate-50/30"
            >
                {initial}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white/95 backdrop-blur-3xl border border-white/50 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden z-[100] animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-400">
                    {/* PREMIUM GRADIENT HEADER - COMPACTED */}
                    <div className="relative p-4 bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-700">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                        
                        <div className="relative flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black flex items-center justify-center text-sm shadow-inner">
                                {initial}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white text-sm font-black tracking-tight truncate underline-offset-4 decoration-indigo-300">{user?.name || "Member"}</h3>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                                    <span className="text-[8px] font-black text-white/80 uppercase tracking-widest">Active Session</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACCOUNT INFO - COMPACTED */}
                    <div className="px-5 py-3 border-b border-slate-50">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Account Email</p>
                        <p className="text-[11px] font-bold text-slate-500 truncate">{user?.email}</p>
                    </div>
                    
                    {/* ACTION AREA - COMPACTED */}
                    <div className="p-2">
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-black text-white bg-slate-900 hover:bg-red-500 rounded-xl transition-all duration-200 group active:scale-[0.97]"
                        >
                            Logout
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                            </svg>
                        </button>
                    </div>

                    <div className="py-2 bg-slate-50/50 text-center border-t border-slate-100/30">
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">TrackHere Secure</p>
                    </div>
                </div>
            )}
        </div>
    )
}
