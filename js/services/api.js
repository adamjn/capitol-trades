
/**
 * Service to handle data fetching from static JSON files.
 */
const api = {
    /**
     * Fetches top stocks by volume for a given period.
     * @param {string} period - '1Y', '3Y', or '6Y'
     * @returns {Promise<Array>} Array of stock objects or empty array on error.
     */
    async fetchTopStocks(period) {
        try {
            const response = await fetch(`./data/top_stocks_${period}.json`);
            if (!response.ok) {
                console.warn(`Failed to fetch data for ${period}: ${response.status}`);
                return [];
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching top stocks for ${period}:`, error);
            return [];
        }
    }
};

// Export for Node.js (Jest) and Browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
} else {
    window.api = api;
}
