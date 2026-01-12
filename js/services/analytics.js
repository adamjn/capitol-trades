
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

        const parseValue = (s) => {
            let val = parseFloat(s.replace(/[$,\s]/g, ''));
            if (isNaN(val)) return 0;

            const upper = s.toUpperCase();
            if (upper.includes('B')) val *= 1e9;
            else if (upper.includes('M')) val *= 1e6;
            else if (upper.includes('K')) val *= 1e3;

            return val;
        };

        // Handle ranges (e.g. "$1,001 - $15,000" or "$50K - $100K")
        if (amountStr.includes('-')) {
            const parts = amountStr.split('-').map(p => parseValue(p.trim()));
            if (parts.length === 2) {
                return (parts[0] + parts[1]) / 2;
            }
        }

        return parseValue(amountStr);
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
