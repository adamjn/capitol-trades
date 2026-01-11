# How to Deploy Capitol Trades for Free

This website is built with static technologies (HTML, CSS, JavaScript), which makes it perfect for free hosting on modern platforms. Use one of the methods below.

## Option 1: Netlify (Easiest - Drag & Drop)
**Best for:** Getting it online in 30 seconds without coding commands.

1.  Go to [Netlify.com](https://www.netlify.com/) and sign up (it's free).
2.  Once logged in, go to the **"Sites"** tab.
3.  On your computer, open the folder `C:\Users\qizhe\.gemini\capitol-trades`.
4.  **Drag and drop** the entire `capitol-trades` folder directly into the browser window on Netlify.
5.  Netlify will upload it and give you a live URL (e.g., `capitol-trades-randomname.netlify.app`) instantly.

## Option 2: Vercel (Professional)
**Best for:** Great performance and if you plan to update it often.

### Method A: Web Upload (Git required)
1.  Push your code to a GitHub repository.
2.  Go to [Vercel.com](https://vercel.com/) and login with GitHub.
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your `capitol-trades` repository.
5.  Click **"Deploy"**.

### Method B: Command Line (No Git required)
1.  Open your terminal in the project folder.
2.  Run `npx vercel` (you may need to log in).
3.  Press **Enter** through the default prompts.
4.  It will provide a production URL.

## Option 3: GitHub Pages
**Best for:** Developers who already use GitHub.

1.  Create a new repository on GitHub.
2.  Push your code to it:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
    git push -u origin main
    ```
3.  Go to the repository **Settings** -> **Pages**.
4.  Under **Source**, select `main` branch and `/ (root)` folder.
5.  Click **Save**. Your site will be live at `your-username.github.io/repo-name`.

---

### ⚠️ Important Note on "Automatic Daily Updates"
The **Automatic Daily Updates** feature we built using `update.bat` and Python **will not run automatically** on these static hosting platforms (Netlify/Vercel) because they only host the *files*, they don't run a backend server to execute Python scripts every day.

**To keep data updated on a free static host:**
1.  Keep the `update.bat` automation running on your **local computer**.
2.  When your local computer updates the `data.js` file (every day), you just need to **re-deploy** (or push to GitHub) to update the live website.
    *   *If using GitHub + Vercel/Netlify:* Just `git push` the changes, and the site updates automatically.
