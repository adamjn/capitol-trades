
const analytics = require('../js/services/analytics');

describe('Analytics Service', () => {
    const mockTrades = [
        { ticker: 'AAPL', company: 'Apple', amount: '$1,000', type: 'Purchase' },
        { ticker: 'AAPL', company: 'Apple', amount: '$2,000', type: 'Purchase' },
        { ticker: 'MSFT', company: 'Microsoft', amount: '$5,000', type: 'Purchase' },
        { ticker: 'GOOGL', company: 'Google', amount: '$500', type: 'Sale' }
    ];

    test('getTopStocksForPolitician should aggregate volume correctly', () => {
        // Mock helper to parse currency string "$1,000" -> 1000
        // We assume the service handles this.

        const result = analytics.getTopStocksForPolitician(mockTrades);

        // Expected: MSFT (5000), AAPL (3000), GOOGL (500)
        expect(result[0].ticker).toBe('MSFT');
        expect(result[0].volume).toBe(5000);

        expect(result[1].ticker).toBe('AAPL');
        expect(result[1].volume).toBe(3000);

        expect(result[2].ticker).toBe('GOOGL');
    });

    test('getTopStocksForPolitician should limit results', () => {
        // Create 10 distinct trades
        const manyTrades = Array.from({ length: 10 }, (_, i) => ({
            ticker: `T${i}`, amount: '$100', type: 'Purchase'
        }));

        const result = analytics.getTopStocksForPolitician(manyTrades, 5);
        expect(result).toHaveLength(5);
    });
});
