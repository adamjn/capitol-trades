// ===== Capitol Trades - Sample Data =====

const politicians = [
  {
    id: "P001",
    name: "Nancy Pelosi",
    party: "Democrat",
    chamber: "House",
    state: "CA",
    district: "11",
    committees: ["Financial Services", "Select Committee on Intelligence"],
    trades: 127,
    volume: "$15.2M",
    lastTraded: "2026-01-08",
    portfolio: [
      { ticker: "NVDA", company: "NVIDIA Corp", shares: "10,000", value: "$5.2M", change: "+125%" },
      { ticker: "MSFT", company: "Microsoft Corp", shares: "5,000", value: "$2.1M", change: "+45%" },
      { ticker: "GOOGL", company: "Alphabet Inc", shares: "8,000", value: "$1.4M", change: "+32%" },
      { ticker: "AMZN", company: "Amazon.com Inc", shares: "6,500", value: "$1.1M", change: "+28%" },
      { ticker: "AAPL", company: "Apple Inc", shares: "4,000", value: "$950K", change: "+15%" },
      { ticker: "PANW", company: "Palo Alto Networks", shares: "2,000", value: "$600K", change: "+55%" }
    ]
  },
  {
    id: "P002",
    name: "Dan Crenshaw",
    party: "Republican",
    chamber: "House",
    state: "TX",
    district: "2",
    committees: ["Energy and Commerce", "Homeland Security"],
    trades: 89,
    volume: "$4.8M",
    lastTraded: "2026-01-07",
    portfolio: [
      { ticker: "XOM", company: "Exxon Mobil", shares: "2,500", value: "$300K", change: "+12%" },
      { ticker: "CVX", company: "Chevron Corp", shares: "1,800", value: "$280K", change: "+8%" },
      { ticker: "PLTR", company: "Palantir Tech", shares: "5,000", value: "$150K", change: "+45%" },
      { ticker: "LMT", company: "Lockheed Martin", shares: "400", value: "$180K", change: "+18%" }
    ]
  },
  {
    id: "P003",
    name: "Tommy Tuberville",
    party: "Republican",
    chamber: "Senate",
    state: "AL",
    district: null,
    committees: ["Armed Services", "Agriculture"],
    trades: 156,
    volume: "$8.3M",
    lastTraded: "2026-01-09",
    portfolio: [
      { ticker: "BABA", company: "Alibaba Group", shares: "3,000", value: "$240K", change: "-15%" },
      { ticker: "INTC", company: "Intel Corp", shares: "5,000", value: "$150K", change: "-25%" },
      { ticker: "PYPL", company: "PayPal Holdings", shares: "2,000", value: "$120K", change: "-40%" },
      { ticker: "CLF", company: "Cleveland-Cliffs", shares: "6,000", value: "$100K", change: "+5%" }
    ]
  },
  {
    id: "P004",
    name: "Mark Kelly",
    party: "Democrat",
    chamber: "Senate",
    state: "AZ",
    district: null,
    committees: ["Armed Services", "Commerce"],
    trades: 42,
    volume: "$2.1M",
    lastTraded: "2026-01-05",
    portfolio: [
      { ticker: "TSM", company: "Taiwan Semi", shares: "1,500", value: "$180K", change: "+35%" },
      { ticker: "ASML", company: "ASML Holding", shares: "200", value: "$160K", change: "+22%" },
      { ticker: "NOC", company: "Northrop Grumman", shares: "300", value: "$140K", change: "+10%" }
    ]
  },
  {
    id: "P005",
    name: "Josh Gottheimer",
    party: "Democrat",
    chamber: "House",
    state: "NJ",
    district: "5",
    committees: ["Financial Services", "Homeland Security"],
    trades: 203,
    volume: "$21.5M",
    lastTraded: "2026-01-10",
    portfolio: [
      { ticker: "MSFT", company: "Microsoft Corp", shares: "8,000", value: "$3.4M", change: "+45%" },
      { ticker: "AAPL", company: "Apple Inc", shares: "10,000", value: "$2.3M", change: "+25%" },
      { ticker: "NVDA", company: "NVIDIA Corp", shares: "5,000", value: "$2.6M", change: "+120%" }
    ]
  },
  {
    id: "P006",
    name: "Marjorie Taylor Greene",
    party: "Republican",
    chamber: "House",
    state: "GA",
    district: "14",
    committees: ["Homeland Security", "Oversight"],
    trades: 67,
    volume: "$1.8M",
    lastTraded: "2026-01-06",
    portfolio: [
      { ticker: "DWAC", company: "Trump Media", shares: "2,000", value: "$80K", change: "-10%" },
      { ticker: "RUM", company: "Rumble Inc", shares: "5,000", value: "$35K", change: "-5%" }
    ]
  },
  {
    id: "P007",
    name: "Ted Cruz",
    party: "Republican",
    chamber: "Senate",
    state: "TX",
    district: null,
    committees: ["Commerce", "Judiciary", "Foreign Relations"],
    trades: 34,
    volume: "$950K",
    lastTraded: "2026-01-03",
    portfolio: [
      { ticker: "XOM", company: "Exxon Mobil", shares: "1,000", value: "$120K", change: "+15%" }
    ]
  },
  {
    id: "P008",
    name: "Alexandria Ocasio-Cortez",
    party: "Democrat",
    chamber: "House",
    state: "NY",
    district: "14",
    committees: ["Financial Services", "Oversight"],
    trades: 12,
    volume: "$125K",
    lastTraded: "2025-12-28",
    portfolio: []
  },
  {
    id: "P009",
    name: "Ro Khanna",
    party: "Democrat",
    chamber: "House",
    state: "CA",
    district: "17",
    committees: ["Armed Services", "Oversight"],
    trades: 78,
    volume: "$5.6M",
    lastTraded: "2026-01-09",
    portfolio: [
      { ticker: "GOOGL", company: "Alphabet Inc", shares: "5,000", value: "$850K", change: "+30%" },
      { ticker: "ADBE", company: "Adobe Inc", shares: "1,000", value: "$550K", change: "+12%" }
    ]
  },
  {
    id: "P010",
    name: "John Hickenlooper",
    party: "Democrat",
    chamber: "Senate",
    state: "CO",
    district: null,
    committees: ["Commerce", "Energy", "Small Business"],
    trades: 91,
    volume: "$7.2M",
    lastTraded: "2026-01-08",
    portfolio: [
      { ticker: "NEE", company: "NextEra Energy", shares: "3,000", value: "$210K", change: "+8%" }
    ]
  }
];

const trades = [
  {
    id: "T001",
    politicianId: "P005",
    politician: "Josh Gottheimer",
    party: "Democrat",
    chamber: "House",
    state: "NJ",
    ticker: "NVDA",
    company: "NVIDIA Corporation",
    type: "buy",
    amount: "$100K - $250K",
    date: "2026-01-10",
    filedDate: "2026-01-10"
  },
  {
    id: "T002",
    politicianId: "P003",
    politician: "Tommy Tuberville",
    party: "Republican",
    chamber: "Senate",
    state: "AL",
    ticker: "AAPL",
    company: "Apple Inc",
    type: "sell",
    amount: "$50K - $100K",
    date: "2026-01-09",
    filedDate: "2026-01-10"
  },
  {
    id: "T003",
    politicianId: "P009",
    politician: "Ro Khanna",
    party: "Democrat",
    chamber: "House",
    state: "CA",
    ticker: "GOOGL",
    company: "Alphabet Inc",
    type: "buy",
    amount: "$15K - $50K",
    date: "2026-01-09",
    filedDate: "2026-01-09"
  },
  {
    id: "T004",
    politicianId: "P001",
    politician: "Nancy Pelosi",
    party: "Democrat",
    chamber: "House",
    state: "CA",
    ticker: "TSLA",
    company: "Tesla Inc",
    type: "buy",
    amount: "$250K - $500K",
    date: "2026-01-08",
    filedDate: "2026-01-09"
  },
  {
    id: "T005",
    politicianId: "P010",
    politician: "John Hickenlooper",
    party: "Democrat",
    chamber: "Senate",
    state: "CO",
    ticker: "MSFT",
    company: "Microsoft Corporation",
    type: "sell",
    amount: "$100K - $250K",
    date: "2026-01-08",
    filedDate: "2026-01-08"
  },
  {
    id: "T006",
    politicianId: "P002",
    politician: "Dan Crenshaw",
    party: "Republican",
    chamber: "House",
    state: "TX",
    ticker: "XOM",
    company: "Exxon Mobil Corporation",
    type: "buy",
    amount: "$50K - $100K",
    date: "2026-01-07",
    filedDate: "2026-01-08"
  },
  {
    id: "T007",
    politicianId: "P006",
    politician: "Marjorie Taylor Greene",
    party: "Republican",
    chamber: "House",
    state: "GA",
    ticker: "BTC",
    company: "Bitcoin (Grayscale)",
    type: "buy",
    amount: "$15K - $50K",
    date: "2026-01-06",
    filedDate: "2026-01-07"
  },
  {
    id: "T008",
    politicianId: "P004",
    politician: "Mark Kelly",
    party: "Democrat",
    chamber: "Senate",
    state: "AZ",
    ticker: "BA",
    company: "Boeing Company",
    type: "sell",
    amount: "$50K - $100K",
    date: "2026-01-05",
    filedDate: "2026-01-06"
  },
  {
    id: "T009",
    politicianId: "P003",
    politician: "Tommy Tuberville",
    party: "Republican",
    chamber: "Senate",
    state: "AL",
    ticker: "LMT",
    company: "Lockheed Martin Corp",
    type: "buy",
    amount: "$100K - $250K",
    date: "2026-01-05",
    filedDate: "2026-01-06"
  },
  {
    id: "T010",
    politicianId: "P001",
    politician: "Nancy Pelosi",
    party: "Democrat",
    chamber: "House",
    state: "CA",
    ticker: "CRM",
    company: "Salesforce Inc",
    type: "buy",
    amount: "$500K - $1M",
    date: "2026-01-04",
    filedDate: "2026-01-05"
  },
  {
    id: "T011",
    politicianId: "P007",
    politician: "Ted Cruz",
    party: "Republican",
    chamber: "Senate",
    state: "TX",
    ticker: "CVX",
    company: "Chevron Corporation",
    type: "buy",
    amount: "$15K - $50K",
    date: "2026-01-03",
    filedDate: "2026-01-04"
  },
  {
    id: "T012",
    politicianId: "P005",
    politician: "Josh Gottheimer",
    party: "Democrat",
    chamber: "House",
    state: "NJ",
    ticker: "META",
    company: "Meta Platforms Inc",
    type: "sell",
    amount: "$100K - $250K",
    date: "2026-01-03",
    filedDate: "2026-01-04"
  },
  {
    id: "T013",
    politicianId: "P002",
    politician: "Dan Crenshaw",
    party: "Republican",
    chamber: "House",
    state: "TX",
    ticker: "PLTR",
    company: "Palantir Technologies",
    type: "buy",
    amount: "$50K - $100K",
    date: "2026-01-02",
    filedDate: "2026-01-03"
  },
  {
    id: "T014",
    politicianId: "P009",
    politician: "Ro Khanna",
    party: "Democrat",
    chamber: "House",
    state: "CA",
    ticker: "AMZN",
    company: "Amazon.com Inc",
    type: "buy",
    amount: "$50K - $100K",
    date: "2026-01-02",
    filedDate: "2026-01-02"
  },
  {
    id: "T015",
    politicianId: "P008",
    politician: "Alexandria Ocasio-Cortez",
    party: "Democrat",
    chamber: "House",
    state: "NY",
    ticker: "SPY",
    company: "SPDR S&P 500 ETF",
    type: "buy",
    amount: "$1K - $15K",
    date: "2025-12-28",
    filedDate: "2025-12-30"
  },
  {
    id: "T016",
    politicianId: "P003",
    politician: "Tommy Tuberville",
    party: "Republican",
    chamber: "Senate",
    state: "AL",
    ticker: "RTX",
    company: "RTX Corporation",
    type: "buy",
    amount: "$50K - $100K",
    date: "2025-12-27",
    filedDate: "2025-12-28"
  },
  {
    id: "T017",
    politicianId: "P010",
    politician: "John Hickenlooper",
    party: "Democrat",
    chamber: "Senate",
    state: "CO",
    ticker: "NEE",
    company: "NextEra Energy Inc",
    type: "buy",
    amount: "$100K - $250K",
    date: "2025-12-26",
    filedDate: "2025-12-27"
  },
  {
    id: "T018",
    politicianId: "P001",
    politician: "Nancy Pelosi",
    party: "Democrat",
    chamber: "House",
    state: "CA",
    ticker: "GOOGL",
    company: "Alphabet Inc",
    type: "sell",
    amount: "$1M - $5M",
    date: "2025-12-23",
    filedDate: "2025-12-26"
  },
  {
    id: "T019",
    politicianId: "P006",
    politician: "Marjorie Taylor Greene",
    party: "Republican",
    chamber: "House",
    state: "GA",
    ticker: "DWAC",
    company: "Trump Media & Tech",
    type: "buy",
    amount: "$15K - $50K",
    date: "2025-12-20",
    filedDate: "2025-12-23"
  },
  {
    id: "T020",
    politicianId: "P004",
    politician: "Mark Kelly",
    party: "Democrat",
    chamber: "Senate",
    state: "AZ",
    ticker: "NOC",
    company: "Northrop Grumman Corp",
    type: "buy",
    amount: "$50K - $100K",
    date: "2025-12-19",
    filedDate: "2025-12-20"
  }
];

// Top Stocks Data - 1 Year
const topStocks1Y = [
  { rank: 1, ticker: "MSFT", company: "Microsoft Corp", volume: "$120.5M", change: "+0.24%" },
  { rank: 2, ticker: "NVDA", company: "NVIDIA Corp", volume: "$95.2M", change: "+0.10%" },
  { rank: 3, ticker: "GOOGL", company: "Alphabet Inc", volume: "$65.8M", change: "+0.96%" },
  { rank: 4, ticker: "AMZN", company: "Amazon.com Inc", volume: "$58.4M", change: "+0.43%" },
  { rank: 5, ticker: "AAPL", company: "Apple Inc", volume: "$45.2M", change: "+0.13%" },
  { rank: 6, ticker: "AVGO", company: "Broadcom Inc", volume: "$32.7M", change: "+1.2%" },
  { rank: 7, ticker: "PANW", company: "Palo Alto Networks", volume: "$28.3M", change: "-0.5%" },
  { rank: 8, ticker: "INTC", company: "Intel Corp", volume: "$22.1M", change: "-1.8%" },
  { rank: 9, ticker: "NFLX", company: "Netflix Inc", volume: "$18.6M", change: "+2.4%" },
  { rank: 10, ticker: "TSLA", company: "Tesla Inc", volume: "$15.9M", change: "+2.11%" }
];

// Top Stocks Data - 3 Years
const topStocks3Y = [
  { rank: 1, ticker: "MSFT", company: "Microsoft Corp", volume: "$340.2M", change: "+0.24%" },
  { rank: 2, ticker: "NVDA", company: "NVIDIA Corp", volume: "$280.5M", change: "+0.10%" },
  { rank: 3, ticker: "AAPL", company: "Apple Inc", volume: "$195.8M", change: "+0.13%" },
  { rank: 4, ticker: "GOOGL", company: "Alphabet Inc", volume: "$165.3M", change: "+0.96%" },
  { rank: 5, ticker: "AMZN", company: "Amazon.com Inc", volume: "$142.7M", change: "+0.43%" },
  { rank: 6, ticker: "PANW", company: "Palo Alto Networks", volume: "$78.4M", change: "-0.5%" },
  { rank: 7, ticker: "INTC", company: "Intel Corp", volume: "$65.2M", change: "-1.8%" },
  { rank: 8, ticker: "AVGO", company: "Broadcom Inc", volume: "$62.9M", change: "+1.2%" },
  { rank: 9, ticker: "NFLX", company: "Netflix Inc", volume: "$48.3M", change: "+2.4%" },
  { rank: 10, ticker: "BRK.B", company: "Berkshire Hathaway", volume: "$42.1M", change: "+0.8%" }
];

// Top Stocks Data - 6 Years
const topStocks6Y = [
  { rank: 1, ticker: "MSFT", company: "Microsoft Corp", volume: "$580.4M", change: "+0.24%" },
  { rank: 2, ticker: "NVDA", company: "NVIDIA Corp", volume: "$420.1M", change: "+0.10%" },
  { rank: 3, ticker: "AAPL", company: "Apple Inc", volume: "$350.6M", change: "+0.13%" },
  { rank: 4, ticker: "AMZN", company: "Amazon.com Inc", volume: "$290.8M", change: "+0.43%" },
  { rank: 5, ticker: "GOOGL", company: "Alphabet Inc", volume: "$275.4M", change: "+0.96%" },
  { rank: 6, ticker: "WFC", company: "Wells Fargo", volume: "$120.5M", change: "+1.1%" },
  { rank: 7, ticker: "GS", company: "Goldman Sachs", volume: "$110.2M", change: "+0.7%" },
  { rank: 8, ticker: "AVGO", company: "Broadcom Inc", volume: "$95.8M", change: "+1.2%" },
  { rank: 9, ticker: "VST", company: "Vistra Corp", volume: "$85.3M", change: "-0.2%" },
  { rank: 10, ticker: "LCII", company: "LCI Industries", volume: "$52.4M", change: "+0.5%" }
];

const topStocksByPopularity = [
  { rank: 1, ticker: "MSFT", company: "Microsoft Corp", members: 58, partySplit: { D: 30, R: 28 }, partyClass: "mixed" },
  { rank: 2, ticker: "AAPL", company: "Apple Inc", members: 52, partySplit: { D: 35, R: 17 }, partyClass: "democrat" },
  { rank: 3, ticker: "NVDA", company: "NVIDIA Corp", members: 45, partySplit: { D: 25, R: 20 }, partyClass: "mixed" },
  { rank: 4, ticker: "GOOGL", company: "Alphabet Inc", members: 41, partySplit: { D: 32, R: 9 }, partyClass: "democrat" },
  { rank: 5, ticker: "AMZN", company: "Amazon.com Inc", members: 39, partySplit: { D: 28, R: 11 }, partyClass: "democrat" },
  { rank: 6, ticker: "XOM", company: "Exxon Mobil", members: 34, partySplit: { D: 4, R: 30 }, partyClass: "republican" },
  { rank: 7, ticker: "TSLA", company: "Tesla Inc", members: 30, partySplit: { D: 10, R: 20 }, partyClass: "republican" },
  { rank: 8, ticker: "JPM", company: "JPMorgan Chase", members: 27, partySplit: { D: 13, R: 14 }, partyClass: "mixed" },
  { rank: 9, ticker: "DIS", company: "Walt Disney Co", members: 25, partySplit: { D: 18, R: 7 }, partyClass: "democrat" },
  { rank: 10, ticker: "PFE", company: "Pfizer Inc", members: 22, partySplit: { D: 11, R: 11 }, partyClass: "mixed" }
];

// Statistics
const stats = {
  totalTrades: trades.length,
  totalPoliticians: politicians.length,
  totalVolume: "$67.5M",
  avgTradesPerDay: "12.4"
};

// Helper functions
function getPoliticianById(id) {
  return politicians.find(p => p.id === id);
}

function getTradesByPolitician(politicianId) {
  return trades.filter(t => t.politicianId === politicianId);
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2);
}
