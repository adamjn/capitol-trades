
/**
 * Component to render Bar Charts for financial data.
 */
const BarChart = {
    /**
     * Calculates width percentages relative to the maximum volume.
     * @param {Array} data - Array of objects with 'volume' property.
     * @returns {Array} Array of width strings (e.g. '100%').
     */
    calculateWidths(data) {
        if (!data || data.length === 0) return [];

        const maxVolume = Math.max(...data.map(d => d.volume || 0));

        if (maxVolume === 0) return data.map(() => '0%');

        return data.map(d => {
            const percentage = Math.round(((d.volume || 0) / maxVolume) * 100);
            return `${percentage}%`;
        });
    },

    /**
     * Renders the Bar Chart HTML.
     * @param {Array} data - Array of stock objects.
     * @returns {string} HTML string.
     */
    render(data) {
        if (!data || data.length === 0) {
            return '<div class="empty-state">No data available</div>';
        }

        const widths = this.calculateWidths(data);

        const barsHtml = data.map((item, index) => {
            return `
            <div class="bar-row">
                <div class="bar-label">
                    <span class="bar-ticker">${item.ticker}</span>
                    <span class="bar-company">${item.company}</span>
                </div>
                <div class="bar-track">
                    <div class="bar-fill" style="width: ${widths[index]}"></div>
                    <span class="bar-value">${item.volumeStr}</span>
                </div>
            </div>
            `;
        }).join('');

        return `<div class="bar-chart-container">${barsHtml}</div>`;
    }
};

// Export Logic
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BarChart;
} else {
    window.BarChart = BarChart;
}
