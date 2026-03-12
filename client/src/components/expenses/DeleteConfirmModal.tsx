"use client"

export default function DeleteConfirmModal({
    close,
    confirm
}: any) {

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded-2xl shadow w-[350px] text-center">

                <h2 className="text-xl font-semibold mb-6">
                    Delete Expense?
                </h2>

                <div className="flex justify-center gap-4">

                    <button
                        onClick={confirm}
                        className="bg-red-600 text-white px-5 py-2 rounded-lg"
                    >
                        Yes
                    </button>

                    <button
                        onClick={close}
                        className="bg-gray-200 px-5 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>

    )

}