import yfinance as yf
print("Imported yf")
t = yf.Ticker("MSFT")
print(t.info)
