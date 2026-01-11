import yfinance as yf
import json
import random
from datetime import datetime, timedelta

# Existing data arrays (In a real app, this would be a DB)
try:
    with open('data.json', 'r') as f:
        data_store = json.load(f)
except FileNotFoundError:
    # Initialize with the sample data structure if file doesn't exist
    # (Simplified for this script to just run)
    data_store = {
        "trades": [], 
        "politicians": [] # populated later
    }

# Mock function to simulate fetching new trades from House/Senate
def fetch_new_disclosures():
    print("Fetching latest disclosures from House/Senate...")
    # In reality, this would scrape 'disclosures-clerk.house.gov'
    # We will generate a mock trade to show "updates"
    
    tickers = ["NVDA", "MSFT", "AAPL", "AMZN", "GOOGL", "TSLA", "META", "AMD"]
    politicians = [
        {"id": "P001", "name": "Nancy Pelosi", "party": "Democrat"},
        {"id": "P002", "name": "Dan Crenshaw", "party": "Republican"},
        {"id": "P003", "name": "Tommy Tuberville", "party": "Republican"},
        {"id": "P005", "name": "Josh Gottheimer", "party": "Democrat"}
    ]
    
    new_trade = {
        "id": f"T{random.randint(1000, 9999)}",
        "politicianId": random.choice(politicians)["id"],
        "politician": "", # Filled below
        "party": "", # Filled below
        "chamber": "House",
        "state": "US",
        "ticker": random.choice(tickers),
        "company": "", # Filled by yfinance
        "type": random.choice(["buy", "sell"]),
        "amount": "$15K - $50K",
        "date": datetime.now().strftime("%Y-%m-%d"),
        "filedDate": datetime.now().strftime("%Y-%m-%d")
    }
    
    # Fill details
    p = next(p for p in politicians if p["id"] == new_trade["politicianId"])
    new_trade["politician"] = p["name"]
    new_trade["party"] = p["party"]
    
    return [new_trade]

def update_stock_prices(tickers):
    print(f"Updating prices for {len(tickers)} stocks...")
    data = {}
    
    # Fetch data in bulk
    joined_tickers = " ".join(tickers)
    try:
        stocks = yf.Tickers(joined_tickers)
        for ticker in tickers:
            try:
                info = stocks.tickers[ticker].info
                # Get the 24h change
                current = info.get('currentPrice', 0)
                previous = info.get('previousClose', 0)
                
                if previous and previous > 0:
                    change_pct = ((current - previous) / previous) * 100
                    sign = "+" if change_pct >= 0 else ""
                    data[ticker] = {
                        "price": current,
                        "change": f"{sign}{change_pct:.2f}%",
                        "name": info.get('shortName', ticker)
                    }
            except Exception as e:
                print(f"Error fetching {ticker}: {e}")
                data[ticker] = {"change": "0.00%", "name": ticker}
    except Exception as e:
         print(f"Batch fetch error: {e}")
         
    return data

def generate_js_file(top_stocks_1y, top_stocks_3y, top_stocks_6y):
    # This function rewrites the data.js file with updated numbers
    
    # In a real app, we'd read the existing JS, parse it, update it.
    # Here, for stability, we will Read the `data.js` as text and regex replace the specific Top Stock sections
    # or purely regenerate that part if we had a full DB.
    
    # Simpler approach: We will just generate the 'topStocks' variable modifications for now
    # to demonstrate the yfinance integration updating the % values.
    
    top_tickers = list(set([s["ticker"] for s in top_stocks_1y + top_stocks_3y + top_stocks_6y]))
    market_data = update_stock_prices(top_tickers)
    
    # Update only the 'change' fields in our lists
    def update_list(stock_list):
        for stock in stock_list:
            if stock["ticker"] in market_data:
                md = market_data[stock["ticker"]]
                stock["change"] = md.get("change", stock["change"])
                # Could also update company name if needed
        return stock_list

    updated_1y = update_list(top_stocks_1y)
    updated_3y = update_list(top_stocks_3y)
    updated_6y = update_list(top_stocks_6y)
    
    # Now read the existing data.js
    with open('data.js', 'r') as f:
        content = f.read()
        
    # We need to replace the const arrays. This is hacking the string.
    # Robust way: 
    import re
    
    def replace_array_in_js(name, new_data, js_content):
        # Create JSON string but formatted slightly to match our JS style (keys without quotes if simple)
        # Actually standard JSON is fine for JS arrays
        json_str = json.dumps(new_data, indent=2)
        # Fix keys to not have quotes to match style (optional, but looks better)
        # json_str = re.sub(r'"(\w+)":', r'\1:', json_str) 
        
        pattern = re.compile(f'const {name} = \[.*?\];', re.DOTALL)
        return pattern.sub(f'const {name} = {json_str};', js_content)

    content = replace_array_in_js('topStocks1Y', updated_1y, content)
    content = replace_array_in_js('topStocks3Y', updated_3y, content)
    content = replace_array_in_js('topStocks6Y', updated_6y, content)
    
    with open('data.js', 'w') as f:
        f.write(content)
        
    print("Successfully updated data.js with latest stock prices!")

# Mock Data definition (Same as in data.js to start with)
# We redefine them here to simulated "Database"
ts1y = [
  {"rank": 1, "ticker": "MSFT", "company": "Microsoft Corp", "volume": "$120.5M", "change": "+0.24%"},
  {"rank": 2, "ticker": "NVDA", "company": "NVIDIA Corp", "volume": "$95.2M", "change": "+0.10%"},
  {"rank": 3, "ticker": "GOOGL", "company": "Alphabet Inc", "volume": "$65.8M", "change": "+0.96%"},
  {"rank": 4, "ticker": "AMZN", "company": "Amazon.com Inc", "volume": "$58.4M", "change": "+0.43%"},
  {"rank": 5, "ticker": "AAPL", "company": "Apple Inc", "volume": "$45.2M", "change": "+0.13%"},
  {"rank": 6, "ticker": "AVGO", "company": "Broadcom Inc", "volume": "$32.7M", "change": "+1.2%"},
  {"rank": 7, "ticker": "PANW", "company": "Palo Alto Networks", "volume": "$28.3M", "change": "-0.5%"},
  {"rank": 8, "ticker": "INTC", "company": "Intel Corp", "volume": "$22.1M", "change": "-1.8%"},
  {"rank": 9, "ticker": "NFLX", "company": "Netflix Inc", "volume": "$18.6M", "change": "+2.4%"},
  {"rank": 10, "ticker": "TSLA", "company": "Tesla Inc", "volume": "$15.9M", "change": "+2.11%"}
]

ts3y = [
  {"rank": 1, "ticker": "MSFT", "company": "Microsoft Corp", "volume": "$340.2M", "change": "+0.24%"},
  {"rank": 2, "ticker": "NVDA", "company": "NVIDIA Corp", "volume": "$280.5M", "change": "+0.10%"},
  {"rank": 3, "ticker": "AAPL", "company": "Apple Inc", "volume": "$195.8M", "change": "+0.13%"},
  {"rank": 4, "ticker": "GOOGL", "company": "Alphabet Inc", "volume": "$165.3M", "change": "+0.96%"},
  {"rank": 5, "ticker": "AMZN", "company": "Amazon.com Inc", "volume": "$142.7M", "change": "+0.43%"},
  {"rank": 6, "ticker": "PANW", "company": "Palo Alto Networks", "volume": "$78.4M", "change": "-0.5%"},
  {"rank": 7, "ticker": "INTC", "company": "Intel Corp", "volume": "$65.2M", "change": "-1.8%"},
  {"rank": 8, "ticker": "AVGO", "company": "Broadcom Inc", "volume": "$62.9M", "change": "+1.2%"},
  {"rank": 9, "ticker": "NFLX", "company": "Netflix Inc", "volume": "$48.3M", "change": "+2.4%"},
  {"rank": 10, "ticker": "BRK.B", "company": "Berkshire Hathaway", "volume": "$42.1M", "change": "+0.8%"}
]

ts6y = [
  {"rank": 1, "ticker": "MSFT", "company": "Microsoft Corp", "volume": "$580.4M", "change": "+0.24%"},
  {"rank": 2, "ticker": "NVDA", "company": "NVIDIA Corp", "volume": "$420.1M", "change": "+0.10%"},
  {"rank": 3, "ticker": "AAPL", "company": "Apple Inc", "volume": "$350.6M", "change": "+0.13%"},
  {"rank": 4, "ticker": "AMZN", "company": "Amazon.com Inc", "volume": "$290.8M", "change": "+0.43%"},
  {"rank": 5, "ticker": "GOOGL", "company": "Alphabet Inc", "volume": "$275.4M", "change": "+0.96%"},
  {"rank": 6, "ticker": "WFC", "company": "Wells Fargo", "volume": "$120.5M", "change": "+1.1%"},
  {"rank": 7, "ticker": "GS", "company": "Goldman Sachs", "volume": "$110.2M", "change": "+0.7%"},
  {"rank": 8, "ticker": "AVGO", "company": "Broadcom Inc", "volume": "$95.8M", "change": "+1.2%"},
  {"rank": 9, "ticker": "VST", "company": "Vistra Corp", "volume": "$85.3M", "change": "-0.2%"},
  {"rank": 10, "ticker": "LCII", "company": "LCI Industries", "volume": "$52.4M", "change": "+0.5%"}
]

if __name__ == "__main__":
    print(f"--- Capitol Trades Updater {datetime.now()} ---")
    generate_js_file(ts1y, ts3y, ts6y)
    print("Done.")
