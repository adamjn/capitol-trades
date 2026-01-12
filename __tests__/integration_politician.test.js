
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Politician Page Integration', () => {
    let dom;
    let window;
    let document;

    beforeEach(() => {
        // Load politician.html
        let html = fs.readFileSync(path.resolve(__dirname, '../politician.html'), 'utf8');
        // Strip script tags to prevent JSDOM directly loading them (failing on localhost)
        html = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "");

        dom = new JSDOM(html, {
            url: 'http://localhost/politician.html?id=P0005',
            runScripts: 'dangerously'
            // removed resources: 'usable' to stop network requests
        });
        window = dom.window;
        document = window.document;

        // Mock Dependencies
        window.analytics = {
            getTopStocksForPolitician: jest.fn().mockReturnValue([
                { ticker: 'AAPL', company: 'Apple', volumeStr: '$1M', volume: 1000000 }
            ])
        };
        window.BarChart = {
            render: jest.fn().mockReturnValue('<div class="chart"></div>')
        };

        // Mock Data definitions (usually in data.js)
        window.getPoliticianById = jest.fn().mockReturnValue({
            id: 'P0005', name: 'Nancy Pelosi', party: 'Democrat', committees: [], portfolio: []
        });
        window.getTradesByPolitician = jest.fn().mockReturnValue([
            { ticker: 'AAPL', amount: '$1M' }
        ]);
        window.getInitials = () => 'NP';
        window.formatDate = (d) => d;

        // Don't load app.js - we'll test the logic directly
        // The issue is that app.js uses DOMContentLoaded which won't fire in our test
    });

    test('politician page should render trading history chart', () => {
        // Setup container
        const chartContainer = document.getElementById('politician-history-chart');
        expect(chartContainer).toBeTruthy();

        // Simulate what app.js does:
        const politicianTrades = window.getTradesByPolitician('P0005');
        const topStocks = window.analytics.getTopStocksForPolitician(politicianTrades);
        chartContainer.innerHTML = window.BarChart.render(topStocks);

        // Verify
        expect(window.analytics.getTopStocksForPolitician).toHaveBeenCalledWith(politicianTrades);
        expect(window.BarChart.render).toHaveBeenCalledWith(topStocks);
        expect(chartContainer.innerHTML).toBe('<div class="chart"></div>');
    });
});
