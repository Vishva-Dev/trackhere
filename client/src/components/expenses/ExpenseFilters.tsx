export default function ExpenseFilters({ setMonth, setCategory }: any) {

    return (

        <div className="flex gap-3 mb-6">

            <select
                onChange={(e) => setMonth(e.target.value)}
                className="bg-white px-4 py-2 rounded-xl shadow"
            >

                <option value="">This Month</option>
                <option value="1">January</option>
                <option value="2">February</option>

            </select>

            <select
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white px-4 py-2 rounded-xl shadow"
            >

                <option value="">All Categories</option>
                <option>Food & Groceries</option>
                <option>Transportation</option>
                <option>Healthcare</option>

            </select>

        </div>

    )

}