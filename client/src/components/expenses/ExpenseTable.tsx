export default function ExpenseTable({ expenses }: any) {

    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold mb-4">
                Recent Expenses
            </h2>

            <table className="w-full">

                <thead>
                    <tr className="border-b text-left">
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>

                    {expenses.map((e: any) => (
                        <tr key={e.id} className="border-b">

                            <td>{e.title}</td>
                            <td>₹{e.amount}</td>
                            <td>{e.category}</td>
                            <td>{new Date(e.date).toLocaleDateString()}</td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    )

}