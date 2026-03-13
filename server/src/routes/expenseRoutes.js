import express from "express"
import prisma from "../config/db.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// Apply authMiddleware to all routes
router.use(authMiddleware)

// GET all expenses for the authenticated user
router.get("/", async (req, res) => {
    try {
        const { period, category, year, date } = req.query
        const userId = req.userId

        let where = { userId }

        // 1. CATEGORY FILTER
        if (category && category !== "" && category !== "All Categories") {
            where.category = category
        }

        // 2. DATE RANGE CALCULATION
        const now = new Date()
        let startDate, endDate

        if (date) {
            const [y, m, d] = date.split("-").map(Number)
            startDate = new Date(y, m - 1, d, 0, 0, 0, 0)
            endDate = new Date(y, m - 1, d, 23, 59, 59, 999)
        } else if (period) {
            if (period === "today") {
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
                endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
            } else if (period === "week") {
                const day = now.getDay()
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day, 0, 0, 0, 0)
                endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - day), 23, 59, 59, 999)
            } else if (period === "month") {
                startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
            } else if (period === "year") {
                const y = year ? parseInt(year) : now.getFullYear()
                startDate = new Date(y, 0, 1, 0, 0, 0, 0)
                endDate = new Date(y, 11, 31, 23, 59, 59, 999)
            } else if (!isNaN(Number(period)) && Number(period) >= 1 && Number(period) <= 12) {
                const m = parseInt(period) - 1
                const y = year ? parseInt(year) : now.getFullYear()
                startDate = new Date(y, m, 1, 0, 0, 0, 0)
                endDate = new Date(y, m + 1, 0, 23, 59, 59, 999)
            }
        } else if (year) {
            const y = parseInt(year)
            startDate = new Date(y, 0, 1, 0, 0, 0, 0)
            endDate = new Date(y, 11, 31, 23, 59, 59, 999)
        }

        if (startDate && endDate) {
            where.date = {
                gte: startDate,
                lte: endDate
            }
        }

        const expenses = await prisma.expense.findMany({
            where,
            orderBy: {
                date: "desc"
            }
        })

        res.json(expenses)
    } catch (error) {
        console.error("Error fetching expenses:", error)
        res.status(500).json({ error: "Failed to fetch expenses" })
    }
})

// GET single expense by ID (verified ownership)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.userId

        const expense = await prisma.expense.findFirst({
            where: { 
                id: parseInt(id),
                userId: userId
            }
        })

        if (!expense) {
            return res.status(404).json({ error: "Expense not found or unauthorized" })
        }

        res.json(expense)
    } catch (error) {
        console.error("Error fetching expense:", error)
        res.status(500).json({ error: "Failed to fetch expense" })
    }
})

// POST create new expense
router.post("/", async (req, res) => {
    try {
        const { title, amount, category, subcategory, notes, date } = req.body
        const userId = req.userId

        console.log('--- Create Expense Debug ---');
        console.log('Payload:', { title, amount, category, userId });

        if (!amount || !category || !title) {
            console.warn('Create Expense: Missing required fields');
            return res.status(400).json({
                error: "Missing required fields: amount, category, title"
            })
        }

        const expense = await prisma.expense.create({
            data: {
                userId,
                title,
                amount: parseFloat(amount),
                category,
                subcategory: subcategory || null,
                notes: notes || null,
                date: date ? (() => { const [y, m, d] = date.split('-').map(Number); return new Date(y, m - 1, d, 12, 0, 0); })() : new Date()
            }
        })

        console.log('Create Expense: Success', expense.id);
        res.status(201).json(expense)
    } catch (error) {
        console.error("Error creating expense:", error.message);
        res.status(500).json({ error: "Failed to create expense" })
    }
})

// PUT update expense (verified ownership)
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { title, amount, category, subcategory, notes, date } = req.body
        const userId = req.userId

        // Check if expense exists and belongs to user
        const existingExpense = await prisma.expense.findFirst({
            where: { 
                id: parseInt(id),
                userId: userId
            }
        })

        if (!existingExpense) {
            return res.status(404).json({ error: "Expense not found or unauthorized" })
        }

        const updatedExpense = await prisma.expense.update({
            where: { id: parseInt(id) },
            data: {
                title: title || undefined,
                amount: amount ? parseFloat(amount) : undefined,
                category: category || undefined,
                subcategory: subcategory !== undefined ? (subcategory || null) : undefined,
                notes: notes !== undefined ? (notes || null) : undefined,
                date: date ? (() => { const [y, m, d] = date.split('-').map(Number); return new Date(y, m - 1, d, 12, 0, 0); })() : undefined
            }
        })

        res.json(updatedExpense)
    } catch (error) {
        console.error("Error updating expense:", error)
        res.status(500).json({ error: "Failed to update expense" })
    }
})

// DELETE expense (verified ownership)
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.userId

        const existingExpense = await prisma.expense.findFirst({
            where: { 
                id: parseInt(id),
                userId: userId
            }
        })

        if (!existingExpense) {
            return res.status(404).json({ error: "Expense not found or unauthorized" })
        }

        await prisma.expense.delete({
            where: { id: parseInt(id) }
        })

        res.status(204).send()
    } catch (error) {
        console.error("Error deleting expense:", error)
        res.status(500).json({ error: "Failed to delete expense" })
    }
})

export default router