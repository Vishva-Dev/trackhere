import express from "express"
import prisma from "../lib/prisma.js"

const router = express.Router()

/* ---------------------------
   ADD EXPENSE
---------------------------- */

router.post("/add", async (req, res) => {

    try {

        const { title, amount, category, subcategory, custom, date, notes } = req.body

        const expense = await prisma.expense.create({
            data: {
                title,
                amount: parseFloat(amount),
                category,
                subcategory,
                custom,
                notes,
                date: new Date(date)
            }
        })

        res.json(expense)

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: "Failed to add expense" })

    }

})


/* ---------------------------
   GET EXPENSES
---------------------------- */

router.get("/", async (req, res) => {

    try {

        const { month, category } = req.query

        let where = {}

        if (category) {
            where.category = category
        }

        if (month) {

            const start = new Date(month + "-01")
            const end = new Date(start)
            end.setMonth(end.getMonth() + 1)

            where.date = {
                gte: start,
                lt: end
            }

        }

        const expenses = await prisma.expense.findMany({
            where,
            orderBy: { date: "desc" }
        })

        res.json(expenses)

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: "Failed to fetch expenses" })

    }

})


/* ---------------------------
   DELETE EXPENSE
---------------------------- */

router.delete("/:id", async (req, res) => {

    try {

        const id = parseInt(req.params.id)

        await prisma.expense.delete({
            where: { id }
        })

        res.json({ message: "Expense deleted successfully" })

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: "Failed to delete expense" })

    }

})


/* ---------------------------
   UPDATE EXPENSE
---------------------------- */

router.put("/:id", async (req, res) => {

    try {

        const id = parseInt(req.params.id)

        const { title, amount, category, subcategory, custom, date, notes } = req.body

        const expense = await prisma.expense.update({

            where: { id },

            data: {
                title,
                amount: parseFloat(amount),
                category,
                subcategory,
                custom,
                notes,
                date: new Date(date)
            }

        })

        res.json(expense)

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: "Failed to update expense" })

    }

})


export default router