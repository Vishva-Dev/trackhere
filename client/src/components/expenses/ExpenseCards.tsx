export default function ExpenseCards(){

return(

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

<div className="bg-white p-4 rounded-xl shadow">
<p className="text-gray-500 text-sm">Total Spent</p>
<h2 className="text-2xl font-bold">₹28,400</h2>
</div>

<div className="bg-white p-4 rounded-xl shadow">
<p className="text-gray-500 text-sm">Top Category</p>
<h2 className="text-2xl font-bold">Food</h2>
</div>

<div className="bg-white p-4 rounded-xl shadow">
<p className="text-gray-500 text-sm">Transactions</p>
<h2 className="text-2xl font-bold">36</h2>
</div>

</div>

)

}