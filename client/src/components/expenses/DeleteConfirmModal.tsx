"use client"

export default function DeleteConfirmModal({
    close,
    confirm
}: any) {

    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-[380px] text-center scale-in-center relative">
                
                {/* CLOSE BUTTON */}
                <button
                    onClick={close}
                    className="absolute right-3 top-3 text-slate-400 hover:text-red-500 transition-all p-2 hover:bg-red-50 rounded-full z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    ⚠️
                </div>

                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                    Delete Expense?
                </h2>
                <p className="text-slate-500 text-sm font-medium mb-8">
                    This action cannot be undone. Are you sure you want to remove this record?
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={confirm}
                        className="flex-[2] bg-red-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-red-100 hover:bg-red-700 hover:-translate-y-0.5 active:scale-95 transition-all"
                    >
                        Delete
                    </button>

                    <button
                        onClick={close}
                        className="flex-1 bg-slate-50 text-slate-500 font-bold py-3.5 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100 active:scale-95"
                    >
                        Cancel
                    </button>
                </div>

            </div>

        </div>

    )

}