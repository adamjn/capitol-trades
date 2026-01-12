# Superpowers TDD Plan: Capitol Trades Historical Data

## Phase 4: Execution Plan

### Task 1: Data Service Implementation
- **Objective**: Create a robust `fetch` wrapper to load static JSON data.
- **File**: `js/services/api.js` (New file for modularity)
- **Test**: `__tests__/api.test.js`
    - Mock `global.fetch`.
    - Test `fetchTopStocks('1Y')` -> calls `./data/top_stocks_1y.json`.
    - Test Error handling (network failure -> return empty array).

### Task 2: Bar Chart Component Engine
- **Objective**: Core logic for generating bar charts.
- **File**: `js/components/BarChart.js`
- **Test**: `__tests__/BarChart.test.js`
    - Test `calculateWidths(data)`: Input `[100, 50]` -> Output `['100%', '50%']`.
    - Test `render(data)`: Returns HTML string with correct classes and styles.

### Task 3: Homepage Integration
- **Objective**: Wire up the new Data Service and Bar Chart to `index.html`.
- **File**: `app.js` (Modify `switchVolumeTab` and `initHomepage`)
- **Integration Test**: `__tests__/integration_home.test.js`
    - Setup JSDOM with `index.html` structure.
    - Call `switchVolumeTab('3Y')`.
    - Assert `api.fetchTopStocks` was called.
    - Assert DOM updated with Bar Chart HTML.

### Task 4: Politician Filtering Logic
- **Objective**: Logic to extract "My Top Stocks" from the master trade list (client-side derivation).
- **File**: `js/services/analytics.js`
- **Test**: `__tests__/analytics.test.js`
    - Input: Array of 20 mixed trades.
    - Test `getTopStocksForPolitician(politicianId, '1Y')`.
    - Assert result is sorted by total volume, limited to top 5.

### Task 5: Politician Page Integration
- **Objective**: Add the "Trading History" card to `politician.html`.
- **File**: `politician.html` (Add container) & `app.js` (Add `renderPoliticianHistory`).
- **Integration Test**: `__tests__/integration_politician.test.js`
    - Setup JSDOM with `politician.html` structure.
    - Call `initPoliticianPage()`.
    - Assert `analytics.getTopStocksForPolitician` called.
    - Assert card rendered.

### Task 6: Styles & Polish
- **Objective**: Finalize CSS for the Bar Charts (Animations, Colors).
- **File**: `styles.css`
- **Verification**: Visual check (Browser) + CSS Syntax check.

---
**Ready to Execute?**
Confirm to start Task 1.
