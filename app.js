// ===== Capitol Trades - Main Application Logic =====

// Navigation toggle
function initNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}

// Render trade card HTML
function renderTradeCard(trade) {
  const partyClass = trade.party.toLowerCase();
  return `
    <a href="politician.html?id=${trade.politicianId}" class="card trade-card">
      <div class="trade-type ${trade.type}">${trade.type}</div>
      <div class="trade-info">
        <h4>${trade.company}</h4>
        <span class="trade-ticker">${trade.ticker}</span>
      </div>
      <div class="trade-politician">
        <div class="trade-politician-name">${trade.politician}</div>
        <div class="trade-politician-meta">
          <span class="party-badge ${partyClass}">${trade.party === 'Democrat' ? 'D' : 'R'}</span>
          <span>${trade.chamber}</span>
          <span>${trade.state}</span>
        </div>
      </div>
      <div class="trade-amount">
        ${trade.amount}
        <div class="trade-date">${formatDate(trade.date)}</div>
      </div>
    </a>
  `;
}

// Render politician card HTML
function renderPoliticianCard(politician) {
  const partyClass = politician.party.toLowerCase();
  return `
    <a href="politician.html?id=${politician.id}" class="card politician-card">
      <div class="politician-header">
        <div class="politician-avatar">${getInitials(politician.name)}</div>
        <div>
          <div class="politician-name">${politician.name}</div>
          <div class="politician-meta">
            <span class="party-badge ${partyClass}">${politician.party}</span>
            <span>${politician.chamber}</span>
            <span>${politician.state}</span>
          </div>
        </div>
      </div>
      <div class="politician-stats">
        <div class="politician-stat">
          <div class="politician-stat-value">${politician.trades}</div>
          <div class="politician-stat-label">Trades</div>
        </div>
        <div class="politician-stat">
          <div class="politician-stat-value">${politician.volume}</div>
          <div class="politician-stat-label">Volume</div>
        </div>
        <div class="politician-stat">
          <div class="politician-stat-value">${formatDate(politician.lastTraded)}</div>
          <div class="politician-stat-label">Last Trade</div>
        </div>
      </div>
    </a>
  `;
}

// Render table row for trades
function renderTradeRow(trade) {
  const partyClass = trade.party.toLowerCase();
  const typeClass = trade.type;
  return `
    <tr>
      <td>${formatDate(trade.date)}</td>
      <td>
        <a href="politician.html?id=${trade.politicianId}" style="color: inherit;">
          ${trade.politician}
        </a>
      </td>
      <td><span class="party-badge ${partyClass}">${trade.party === 'Democrat' ? 'D' : 'R'}</span></td>
      <td>${trade.chamber}</td>
      <td>${trade.state}</td>
      <td><strong>${trade.ticker}</strong><br><small class="text-muted">${trade.company}</small></td>
      <td><span class="text-${typeClass} font-bold">${trade.type.toUpperCase()}</span></td>
      <td>${trade.amount}</td>
    </tr>
  `;
}

// Tab switching for volume list
window.switchVolumeTab = function (period) {
  // Update active tab state
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === period);
  });

  const volumeList = document.getElementById('top-volume-list');
  if (!volumeList) return;

  // Select data based on period
  let data = topStocks1Y; // Default to 1Y
  if (period === '3Y') data = topStocks3Y;
  if (period === '6Y') data = topStocks6Y;

  volumeList.innerHTML = data.map(stock => {
    const changeClass = stock.change.startsWith('+') ? 'positive' : 'negative';
    // Remove "Corp" or "Inc" for cleaner mobile view if needed, but keeping full for now
    return `
      <div class="top-list-item">
        <div class="rank-badge">${stock.rank}</div>
        <div class="stock-info">
          <div class="stock-ticker">${stock.ticker}</div>
          <div class="stock-name">${stock.company}</div>
        </div>
        <div class="stock-stat">
          <span class="stat-primary" title="Total Trading Volume">${stock.volume}</span>
          <span class="stat-change ${changeClass}" title="24h Price Change">${stock.change} (24h)</span>
        </div>
      </div>
    `;
  }).join('');
};

// Homepage initialization
function initHomepage() {
  // Render stats
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    statsBar.innerHTML = `
      <div class="stat-item">
        <div class="stat-value">${stats.totalTrades}</div>
        <div class="stat-label">Total Trades</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${stats.totalPoliticians}</div>
        <div class="stat-label">Politicians Tracked</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${stats.totalVolume}</div>
        <div class="stat-label">Total Volume</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${stats.avgTradesPerDay}</div>
        <div class="stat-label">Avg. Trades/Day</div>
      </div>
    `;
  }

  // Render latest trades
  const tradesList = document.getElementById('latest-trades');
  if (tradesList) {
    const latestTrades = trades.slice(0, 5);
    tradesList.innerHTML = latestTrades.map(renderTradeCard).join('');
  }

  // Render featured politicians
  const politiciansGrid = document.getElementById('featured-politicians');
  if (politiciansGrid) {
    const featuredPoliticians = politicians.slice(0, 4);
    politiciansGrid.innerHTML = featuredPoliticians.map(renderPoliticianCard).join('');
  }

  // Initial render of Top Stocks by Volume (1Y default)
  switchVolumeTab('1Y');

  // Render Top Stocks by Popularity
  const popularityList = document.getElementById('top-popularity-list');
  if (popularityList) {
    popularityList.innerHTML = topStocksByPopularity.map(stock => {
      return `
        <div class="top-list-item">
          <div class="rank-badge">${stock.rank}</div>
          <div class="stock-info">
            <div class="stock-ticker">${stock.ticker}</div>
            <div class="stock-name">${stock.company}</div>
          </div>
          <div class="stock-stat">
            <span class="stat-primary">${stock.members} Members</span>
            <span class="stat-secondary">
              <span class="text-democrat">${stock.partySplit.D} D</span> / 
              <span class="text-republican">${stock.partySplit.R} R</span>
            </span>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Trades page initialization
function initTradesPage() {
  const tableBody = document.getElementById('trades-table-body');
  const partyFilter = document.getElementById('party-filter');
  const chamberFilter = document.getElementById('chamber-filter');
  const typeFilter = document.getElementById('type-filter');
  const searchInput = document.getElementById('search-input');

  let filteredTrades = [...trades];

  function applyFilters() {
    filteredTrades = trades.filter(trade => {
      const partyMatch = !partyFilter.value || trade.party === partyFilter.value;
      const chamberMatch = !chamberFilter.value || trade.chamber === chamberFilter.value;
      const typeMatch = !typeFilter.value || trade.type === typeFilter.value;
      const searchTerm = searchInput.value.toLowerCase();
      const searchMatch = !searchTerm ||
        trade.ticker.toLowerCase().includes(searchTerm) ||
        trade.company.toLowerCase().includes(searchTerm) ||
        trade.politician.toLowerCase().includes(searchTerm);

      return partyMatch && chamberMatch && typeMatch && searchMatch;
    });

    renderTrades();
  }

  function renderTrades() {
    if (tableBody) {
      if (filteredTrades.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="8" class="text-center text-muted" style="padding: 3rem;">
              No trades found matching your filters.
            </td>
          </tr>
        `;
      } else {
        tableBody.innerHTML = filteredTrades.map(renderTradeRow).join('');
      }
    }
  }

  // Add event listeners
  if (partyFilter) partyFilter.addEventListener('change', applyFilters);
  if (chamberFilter) chamberFilter.addEventListener('change', applyFilters);
  if (typeFilter) typeFilter.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  // Initial render
  renderTrades();
}

// Politicians page initialization
function initPoliticiansPage() {
  const politiciansGrid = document.getElementById('politicians-grid');
  const partyFilter = document.getElementById('party-filter');
  const chamberFilter = document.getElementById('chamber-filter');
  const searchInput = document.getElementById('search-input');

  let filteredPoliticians = [...politicians];

  function applyFilters() {
    filteredPoliticians = politicians.filter(politician => {
      const partyMatch = !partyFilter.value || politician.party === partyFilter.value;
      const chamberMatch = !chamberFilter.value || politician.chamber === chamberFilter.value;
      const searchTerm = searchInput.value.toLowerCase();
      const searchMatch = !searchTerm ||
        politician.name.toLowerCase().includes(searchTerm) ||
        politician.state.toLowerCase().includes(searchTerm);

      return partyMatch && chamberMatch && searchMatch;
    });

    renderPoliticians();
  }

  function renderPoliticians() {
    if (politiciansGrid) {
      if (filteredPoliticians.length === 0) {
        politiciansGrid.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-state-icon">🔍</div>
            <p>No politicians found matching your filters.</p>
          </div>
        `;
      } else {
        politiciansGrid.innerHTML = filteredPoliticians.map(renderPoliticianCard).join('');
      }
    }
  }

  // Add event listeners
  if (partyFilter) partyFilter.addEventListener('change', applyFilters);
  if (chamberFilter) chamberFilter.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  // Initial render
  renderPoliticians();
}

// Politician profile page initialization
function initPoliticianPage() {
  // Get politician ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const politicianId = urlParams.get('id');

  if (!politicianId) {
    window.location.href = 'politicians.html';
    return;
  }

  const politician = getPoliticianById(politicianId);

  if (!politician) {
    window.location.href = 'politicians.html';
    return;
  }

  const politicianTrades = getTradesByPolitician(politicianId);
  const partyClass = politician.party.toLowerCase();

  // Update page title
  document.title = `${politician.name} - Capitol Trades`;

  // Render profile header
  const profileHeader = document.getElementById('profile-header');
  if (profileHeader) {
    profileHeader.innerHTML = `
      <div class="container">
        <div class="profile-content">
          <div class="profile-avatar">${getInitials(politician.name)}</div>
          <div class="profile-info">
            <h1>${politician.name}</h1>
            <div class="profile-meta">
              <span class="party-badge ${partyClass}">${politician.party}</span>
              <span class="profile-stat">📍 ${politician.chamber} - ${politician.state}${politician.district ? ` District ${politician.district}` : ''}</span>
              <span class="profile-stat">📊 ${politician.trades} Trades</span>
              <span class="profile-stat">💰 ${politician.volume} Volume</span>
            </div>
            <div class="committees-list">
              ${politician.committees.map(c => `<span class="committee-badge">${c}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render portfolio table
  const portfolioTableBody = document.getElementById('politician-portfolio-body');
  if (portfolioTableBody) {
    if (!politician.portfolio || politician.portfolio.length === 0) {
      portfolioTableBody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-muted" style="padding: 3rem;">
            No public portfolio data available for this politician.
          </td>
        </tr>
      `;
    } else {
      portfolioTableBody.innerHTML = politician.portfolio.map(hold => {
        const changeClass = hold.change.startsWith('+') ? 'text-buy' : 'text-sell';
        return `
          <tr>
            <td><strong>${hold.ticker}</strong><br><small class="text-muted">${hold.company}</small></td>
            <td>${hold.shares}</td>
            <td>${hold.value}</td>
            <td class="${changeClass} font-bold">${hold.change}</td>
          </tr>
        `;
      }).join('');
    }
  }

  // Render trades table
  const tradesTableBody = document.getElementById('politician-trades-body');
  if (tradesTableBody) {
    if (politicianTrades.length === 0) {
      tradesTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-muted" style="padding: 3rem;">
            No trades found for this politician.
          </td>
        </tr>
      `;
    } else {
      tradesTableBody.innerHTML = politicianTrades.map(trade => `
        <tr>
          <td>${formatDate(trade.date)}</td>
          <td><strong>${trade.ticker}</strong><br><small class="text-muted">${trade.company}</small></td>
          <td><span class="text-${trade.type} font-bold">${trade.type.toUpperCase()}</span></td>
          <td>${trade.amount}</td>
          <td>${formatDate(trade.filedDate)}</td>
        </tr>
      `).join('');
    }
  }
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
  initNav();

  const path = window.location.pathname;

  if (path.endsWith('index.html') || path.endsWith('/') || path === '') {
    initHomepage();
  } else if (path.endsWith('trades.html')) {
    initTradesPage();
  } else if (path.endsWith('politicians.html')) {
    initPoliticiansPage();
  } else if (path.endsWith('politician.html')) {
    initPoliticianPage();
  }
});
