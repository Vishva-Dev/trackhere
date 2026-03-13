"use client"

import { useState, useRef, useEffect } from "react"

type Option = {
    label: string
    value: string
    icon?: string
}

type Props = {
    label?: string
    value: string
    options: string[] | Option[]
    onChange: (value: string) => void
    placeholder?: string
    className?: string
    compact?: boolean
}

export default function CustomSelect({
    value,
    options,
    onChange,
    placeholder = "Select...",
    className = "",
    compact = false
}: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const normalizedOptions: Option[] = options.map(opt => 
        typeof opt === "string" ? { label: opt, value: opt } : opt
    )

    const selectedOption = normalizedOptions.find(opt => opt.value === value)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between bg-slate-50 border ${isOpen ? 'border-indigo-400 ring-4 ring-indigo-50' : 'border-slate-200'} text-slate-700 ${compact ? 'px-3 h-10 rounded-xl' : 'px-3 h-12 rounded-2xl'} w-full cursor-pointer transition-all font-bold text-sm`}
            >
                <span className={!selectedOption ? "text-slate-300" : ""}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-[60] mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 max-h-[280px] overflow-y-auto animate-in fade-in zoom-in duration-200">
                    {normalizedOptions.length === 0 ? (
                        <div className="p-3 text-slate-400 text-xs italic text-center">No options available</div>
                    ) : (
                        normalizedOptions.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value)
                                    setIsOpen(false)
                                }}
                                className={`flex items-center p-3 rounded-xl cursor-pointer transition-colors text-sm font-bold ${
                                    value === opt.value 
                                    ? "bg-indigo-50 text-indigo-600" 
                                    : "text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                {opt.label}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
