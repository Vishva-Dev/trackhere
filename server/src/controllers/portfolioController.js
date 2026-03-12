const prisma = require('../config/db');

const getSummary = async (req, res) => {
    try {
        const userId = req.user.userId;

        const assets = await prisma.asset.findMany({
            where: { userId },
        });

        if (!assets || assets.length === 0) {
            return res.status(200).json({
                totalInvested: 0,
                currentTotalValue: 0,
                totalProfitLoss: 0,
                assetAllocation: []
            });
        }

        let totalInvested = 0;
        let currentTotalValue = 0;
        let totalProfitLoss = 0;
        const allocationMap = {};

        assets.forEach(asset => {
            const investedValue = asset.quantity * asset.buyPrice;
            const currentValue = asset.quantity * asset.currentPrice;
            const profitLoss = (asset.currentPrice - asset.buyPrice) * asset.quantity;

            totalInvested += investedValue;
            currentTotalValue += currentValue;
            totalProfitLoss += profitLoss;

            if (!allocationMap[asset.assetType]) {
                allocationMap[asset.assetType] = 0;
            }
            allocationMap[asset.assetType] += currentValue;
        });

        // Formatting allocation to percentages
        const assetAllocation = Object.keys(allocationMap).map(type => {
            const value = allocationMap[type];
            const percentage = currentTotalValue > 0 ? (value / currentTotalValue) * 100 : 0;
            return {
                type,
                value,
                percentage: parseFloat(percentage.toFixed(2))
            };
        });

        res.status(200).json({
            totalInvested,
            currentTotalValue,
            totalProfitLoss,
            assetAllocation
        });

    } catch (error) {
        console.error('Portfolio summary error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getSummary,
};
