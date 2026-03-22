# 🏴‍☠️ Gold Rush - Wild West Budget Dashboard

A fun, gamified budget tracking app themed like a Wild West gold rush! Watch your gold pile, catch bandits stealing your splurges, and compete on the wanted poster leaderboard.

## ✨ Features

- **Gold Pile Visualization**: Watch your monthly budget deplete visually as you spend
- **Budget Claims**: Organize spending into themed categories (Homestead, Provisions, Saloon & Fun, Transport)
- **Bandit Heist Animation**: When you splurge on non-essentials, pixelated bandits animate across the screen stealing your gold!
- **Wanted Poster Leaderboard**: Compete with friends - ranked by savings amount in authentic wild west wanted poster format
- **Plaid Bank Integration**: Connect your real bank account to auto-sync transactions (sandbox mode for testing)
- **Transaction Dispatch Feed**: See your recent transactions with automatic categorization

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A free Plaid account (for bank integration)

### Setup

1. **Clone/Navigate to the project**
   ```bash
   cd /Users/victoriaxiao/HooHacks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Sign up for free at [plaid.com](https://plaid.com)
   - Get your `PLAID_CLIENT_ID` and `PLAID_SECRET` (sandbox keys)
   - Add them to your `.env` file

4. **Start the backend server**
   ```bash
   npm start
   ```
   
   You should see:
   ```
   🏗️ Gold Rush server running on port 3001
   ```

5. **Open the dashboard**
   - Open `gold_rush_visual_dashboard.html` in your browser
   - Or run a simple HTTP server: `python3 -m http.server 8000` and visit `http://localhost:8000/gold_rush_visual_dashboard.html`

## 📋 How to Use

### Test Features Without Bank Connection

1. **Click splurge buttons** in the "Test Splurge Transactions" section
   - Watch bandits animate and steal gold
   - See your gold pile shrink in real-time
   - Transaction appears in the dispatches feed

2. **Add outlaws to the leaderboard**
   - Fill in the "Post a Wanted Notice" form
   - Enter outlaw name, budget, and amount saved
   - Click "Post" to add them to the wanted posters

### Connect a Real Bank Account

1. Click **"🏦 Connect Your Bank via Plaid"**
2. In Plaid's modal:
   - **For sandbox testing**: Use institution "Platypus Bank"
   - **Username**: `user_good`
   - **Password**: `pass_good`
3. Once linked, your transactions will auto-populate and the gold pile will reflect real spending

## 🎨 Design Highlights

- **Gold Pile**: Layered SVG with animated depletion
- **Wanted Posters**: Tilted, aged-paper aesthetic with rankings
- **Bandit Sprites**: Pixelated outlaws with ride-in animation
- **Color Scheme**: Warm golds (#ffd700, #d4af37) on dark wood backgrounds (#2c2416)
- **Typography**: Georgia serif font for authentic wild west feel

## 📱 Responsive Design

Works on desktop and tablet. Mobile is simplified for smaller screens.

## 🔗 File Structure

```
/Users/victoriaxiao/HooHacks/
├── gold_rush_visual_dashboard.html    # Main dashboard (open in browser)
├── server.js                           # Backend with Plaid integration
├── package.json                        # Node.js dependencies
├── .env.example                        # Template for environment variables
└── .env                                # Your actual credentials (don't commit!)
```

## 🔐 Security Notes

- **Never commit `.env` to GitHub** - it contains your Plaid keys
- Plaid never sees real bank credentials - just your transactions
- In production, use a real database to store access tokens (not in-memory)
- Consider adding user authentication for multi-user support

## 🚀 Future Enhancements

- Real-time spending alerts
- Budget goal tracking
- Multi-account support
- Mobile app version
- Integration with more financial institutions
- Recurring transaction detection
- Savings goals with milestone animations

## 💡 Plaid Sandbox Testing

Sandbox mode is perfect for development! You get:
- Fake bank accounts with pre-populated transactions
- No real banking credentials needed
- Instant connections
- Test data for all scenarios

When ready for production:
1. Apply for Plaid production access
2. Change `PlaidEnvironments.sandbox` → `PlaidEnvironments.production`
3. Use real banks instead of Platypus Bank

## 🎮 Easter Eggs

- Try clicking bandits rapidly to trigger multiple heists!
- Splurge enough times and your gold pile will be completely empty
- Different wanted poster rotations based on savings percentage

## 📞 Support

For issues:
1. Make sure the server is running on `http://localhost:3001`
2. Check that `.env` has valid Plaid credentials
3. Open browser console (F12) for network errors
4. Verify Node.js version: `node --version`

---

**Happy budgeting, prospector! 🤠⛏️**
