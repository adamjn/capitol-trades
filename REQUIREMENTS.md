# Frozen Requirements: Historical Data & Tabs

## 1. Core Feature
Display top stocks by traded volume over different historical periods (1 Year, 3 Years, 6 Years).

## 2. Locations
- **Homepage**: Replace/Upgrade the existing "Top Traded by Volume" lists with a rich bar-chart widget.
- **Politician Profile**: Add a NEW card "Trading History" showing that specific politician's top stocks over the same periods.

## 3. Data Architecture (The "API")
- **Backend Strategy**: "Static API".
- **Implementation**: A Python script (`update_data.py` or new `generate_history.py`) will pre-calculate aggregations and save them as:
    - `data/top_stocks_1y.json`
    - `data/top_stocks_3y.json`
    - `data/top_stocks_6y.json`
    - `data/politicians/{id}_history.json` (Optional optimization, or we filter client-side if data size allows). -> *Decision: Client-side filter from main data for Politicians to avoid thousands of files, but pre-computed JSON for global top lists.*

## 4. UI/UX Specifications
- **Tabs**: Pill-shaped toggle [1Y | 3Y | 6Y].
- **Visualization**: CSS-only Bar Charts.
    - **Label**: Ticker + Company Name.
    - **Bar**: Width proportional to volume.
    - **Value**: Formatted currency (e.g., "$5.2M").
- **Interaction**: Clicking a bar navigates to `trades.html` filtered by that Ticker.

## 5. Technical Stack
- **Frontend**: Vanilla JS (ES6+), CSS3 (Variables, Flexbox).
- **Testing**: Jest (for logic), JSDOM (for UI component verification).
