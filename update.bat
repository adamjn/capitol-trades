@echo off
cd /d "C:\Users\qizhe\.gemini\capitol-trades"

echo [1/3] Fetching latest stock data...
python update_data.py

echo [2/3] saving changes to Git...
git add data.js
git commit -m "Daily data update"

echo [3/3] Publishing to live website...
git push origin main

echo.
echo ========================================================
echo  SUCCESS! Your website is being updated on Vercel now.
echo ========================================================
timeout /t 10
