
const api = require('../js/services/api');

describe('API Service', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        // Suppress console output during tests
        jest.spyOn(console, 'warn').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test('fetchTopStocks should call correct endpoint for 1Y', async () => {
        const mockData = [{ ticker: 'AAPL', volume: 1000 }];
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockData
        });

        const result = await api.fetchTopStocks('1Y');

        expect(global.fetch).toHaveBeenCalledWith('./data/top_stocks_1Y.json');
        expect(result).toEqual(mockData);
    });

    test('fetchTopStocks should call correct endpoint for 3Y', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => []
        });

        await api.fetchTopStocks('3Y');
        expect(global.fetch).toHaveBeenCalledWith('./data/top_stocks_3Y.json');
    });

    test('fetchTopStocks should return empty array on failure', async () => {
        global.fetch.mockRejectedValue(new Error('Network error'));

        const result = await api.fetchTopStocks('1Y');

        expect(result).toEqual([]);
        // Should log error, but we won't test console.error here to keep it clean
    });

    test('fetchTopStocks should return empty array on non-ok response', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404
        });

        const result = await api.fetchTopStocks('1Y');

        expect(result).toEqual([]);
    });
});
