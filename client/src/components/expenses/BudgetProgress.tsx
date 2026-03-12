export default function BudgetProgress() {

    return (

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">

            <h2 className="font-semibold mb-4">
                Monthly Budget
            </h2>

            <div className="mb-3">

                <div className="flex justify-between text-sm">
                    <span>Food</span>
                    <span>₹8000 / ₹10000</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">

                    <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "80%" }}
                    />

                </div>

            </div>

        </div>

    )

}