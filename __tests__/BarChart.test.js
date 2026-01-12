
const BarChart = require('../js/components/BarChart');

describe('BarChart Component', () => {
    test('calculateWidths should return correct percentages', () => {
        const data = [
            { volume: 100 },
            { volume: 50 },
            { volume: 0 }
        ];
        // 100 is max. 
        // 100 -> 100%
        // 50 -> 50%
        // 0 -> 0%
        const widths = BarChart.calculateWidths(data);
        expect(widths).toEqual(['100%', '50%', '0%']);
    });

    test('calculateWidths should handle empty data', () => {
        expect(BarChart.calculateWidths([])).toEqual([]);
    });

    test('render should return HTML string with correct elements', () => {
        const data = [
            { ticker: 'AAPL', company: 'Apple', volumeStr: '$100M', volume: 100 }
        ];

        // Mock calculateWidths for isolation, or trust it if it's pure logic
        // We'll trust the logic for this integration test

        const html = BarChart.render(data);

        expect(html).toContain('<div class="bar-chart-container">');
        expect(html).toContain('AAPL');
        expect(html).toContain('Apple');
        expect(html).toContain('$100M');
        expect(html).toContain('width: 100%');
    });

    test('render should handle empty data', () => {
        const html = BarChart.render([]);
        expect(html).toBe('<div class="empty-state">No data available</div>');
    });
});
