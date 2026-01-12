
/**
 * Service for calculating analytics from trade data.
 */
const analytics = {
    /**
     * Parses amount string to number.
     * Handles "$1,000", "$1,001 - $15,000", etc.
     */
    parseAmount(amountStr) {
        if (!amountStr) return 0;
        // Remove currency symbol and commas
        const clean = amountStr.replace(/[$,]/g, '');

        // Handle ranges (e.g. "1001-15000")
        if (clean.includes('-')) {
            const parts = clean.split('-').map(p => parseFloat(p.trim()));
            // Return average of range
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                return (parts[0] + parts[1]) / 2;
            }
        }

        return parseFloat(clean) || 0;
    },

    /**
     * Formats number to K/M/B string.
     */
    formatVolume(num) {
        if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
        if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
        return `$${Math.round(num)}`;
    },

    /**
     * Aggregates trades to find top stocks.
     * @param {Array} trades - Array of trade objects.
     * @param {number} limit - Number of results (default 5).
     * @returns {Array} Sorted array of { ticker, company, volume, volumeStr }.
     */
    getTopStocksForPolitician(trades, limit = 5) {
        const map = new Map();

        trades.forEach(trade => {
            if (!trade.ticker) return;

            const vol = this.parseAmount(trade.amount);
            const current = map.get(trade.ticker) || {
                ticker: trade.ticker,
                company: trade.company || trade.ticker, // Fallback
                volume: 0
            };

            current.volume += vol;
            map.set(trade.ticker, current);
        });

        // Convert to array and sort
        const sorted = Array.from(map.values())
            .sort((a, b) => b.volume - a.volume)
            .slice(0, limit);

        // Format for display
        return sorted.map(item => ({
            ...item,
            volumeStr: this.formatVolume(item.volume)
        }));
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = analytics;
} else {
    window.analytics = analytics;
}
