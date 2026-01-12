
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Mock dependencies
const mockApi = {
    fetchTopStocks: jest.fn()
};
const mockBarChart = {
    render: jest.fn()
};

describe('Homepage Integration', () => {
    let dom;
    let window;
    let document;

    beforeEach(() => {
        // Load index.html content
        const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
        dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
        window = dom.window;
        document = window.document;

        // Inject mocks
        window.api = mockApi;
        window.BarChart = mockBarChart;

        // Load app.js code
        // We can't just require it because it runs code on load? 
        // Actually app.js defines functions and adds an event listener.
        const appJs = fs.readFileSync(path.resolve(__dirname, '../app.js'), 'utf8');
        window.eval(appJs);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('switchVolumeTab should fetch data and render chart', async () => {
        const mockData = [{ ticker: 'AAPL', volume: 100 }];
        mockApi.fetchTopStocks.mockResolvedValue(mockData);
        mockBarChart.render.mockReturnValue('<div class="chart"></div>');

        // Initial state
        expect(document.getElementById('top-volume-list').innerHTML.trim()).toBe('<!-- Rendered by JS -->');

        // Trigger action
        await window.switchVolumeTab('3Y');

        // Assert API call
        expect(mockApi.fetchTopStocks).toHaveBeenCalledWith('3Y');

        // Assert Render call
        expect(mockBarChart.render).toHaveBeenCalledWith(mockData);

        // Assert DOM update
        expect(document.getElementById('top-volume-list').innerHTML).toBe('<div class="chart"></div>');

        // Assert Tab Active State
        const tabs = document.querySelectorAll('.timeline-tabs .tab-btn');
        // '3Y' is the 2nd button (index 1), assuming order 1Y, 3Y, 6Y
        // But verifying by text content is safer
        const btn3Y = Array.from(tabs).find(b => b.textContent === '3Y');
        expect(btn3Y.classList.contains('active')).toBe(true);
    });
});
