const prisma = require('../config/db');

// Add a new asset
const createAsset = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { assetType, assetName, quantity, buyPrice, currentPrice } = req.body;

        if (!assetType || !assetName || quantity === undefined || buyPrice === undefined || currentPrice === undefined) {
            return res.status(400).json({ error: 'All asset fields are required' });
        }

        const asset = await prisma.asset.create({
            data: {
                userId,
                assetType,
                assetName,
                quantity: parseFloat(quantity),
                buyPrice: parseFloat(buyPrice),
                currentPrice: parseFloat(currentPrice),
            },
        });

        res.status(201).json(asset);
    } catch (error) {
        console.error('Create asset error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all assets for the logged-in user
const getAssets = async (req, res) => {
    try {
        const userId = req.user.userId;

        const assets = await prisma.asset.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json(assets);
    } catch (error) {
        console.error('Get assets error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an asset (must belong to the user)
const updateAsset = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const { assetType, assetName, quantity, buyPrice, currentPrice } = req.body;

        // Check if asset exists and belongs to user
        const existingAsset = await prisma.asset.findUnique({ where: { id: parseInt(id) } });

        if (!existingAsset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        if (existingAsset.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized to update this asset' });
        }

        const updatedAsset = await prisma.asset.update({
            where: { id: parseInt(id) },
            data: {
                assetType: assetType || existingAsset.assetType,
                assetName: assetName || existingAsset.assetName,
                quantity: quantity !== undefined ? parseFloat(quantity) : existingAsset.quantity,
                buyPrice: buyPrice !== undefined ? parseFloat(buyPrice) : existingAsset.buyPrice,
                currentPrice: currentPrice !== undefined ? parseFloat(currentPrice) : existingAsset.currentPrice,
            },
        });

        res.status(200).json(updatedAsset);
    } catch (error) {
        console.error('Update asset error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete an asset (must belong to the user)
const deleteAsset = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        // Check ownership
        const existingAsset = await prisma.asset.findUnique({ where: { id: parseInt(id) } });

        if (!existingAsset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        if (existingAsset.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized to delete this asset' });
        }

        await prisma.asset.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Asset deleted successfully' });
    } catch (error) {
        console.error('Delete asset error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createAsset,
    getAssets,
    updateAsset,
    deleteAsset,
};
