# FACON

**Track calories like money.**

FACON is a calorie tracker that treats your daily calorie target as a spendable wallet. Every meal you log is a transaction that draws down your balance, so staying within budget feels like managing money rather than counting numbers.

Everything runs in the browser. There is no backend and no signup, and your data is saved locally.

## Features

- **Calorie Wallet**: your daily target shown as a liquid-filled orb with an animated odometer balance. It drains as you log and turns into a warning state when you overspend.
- **Drag to spend**: drag a food from the quick tray onto the orb to log it (keyboard accessible with Enter or Space).
- **Living sky background**: the sky shifts from clear to golden haze to storm as your budget is used up.
- **Smart targets**: BMR via the Mifflin-St Jeor equation, TDEE from your activity level, and a goal of cut (-500), maintain, or bulk (+300).
- **Food database**: 148 built-in foods, with a strong selection of Indian dishes (biryani, curries, breads, street food, sweets, drinks) plus common international items.
- **Custom foods**: add your own food with calories and macros.
- **Servings**: log in half-serving steps.
- **Macro tracking**: protein, carbs, and fat progress bars against daily targets.
- **Hydration**: water tracker with an 8-glass daily goal.
- **Gamification**: XP, levels (every 500 XP), daily streaks, and achievement badges.
- **Analytics**: weekly calories vs budget, 7-day average, days on budget, today's macro split, and a weekly trend chart.
- **Onboarding**: a 5-step setup that calculates your plan in under a minute.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Recharts](https://recharts.org/) for charts
- [Lucide React](https://lucide.dev/) for icons
- Plain CSS (glassmorphism styling, injected from the component)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (LTS recommended)

### Installation

```bash
git clone https://github.com/<your-username>/facon.git
cd facon
npm install
```

If you are setting this up from scratch around `Facon.jsx`:

```bash
npm create vite@latest facon -- --template react
cd facon
npm install
npm install recharts lucide-react
```

Copy `Facon.jsx` into `src/`, then replace `src/main.jsx` with:

```jsx
import { createRoot } from "react-dom/client";
import App from "./Facon.jsx";

createRoot(document.getElementById("root")).render(<App />);
```

### Run the dev server

```bash
npm run dev
```

Open the printed address, normally <http://localhost:5173>.

### Build for production

```bash
npm run build
npm run preview
```

The production files are written to `dist/` and can be hosted on any static host (Netlify, Vercel, GitHub Pages, and so on).

## How the Numbers Work

| Value | Formula |
| --- | --- |
| BMR | `10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5` (male) or `− 161` (female) |
| TDEE | `BMR × activity multiplier` (1.2 to 1.9) |
| Daily budget | TDEE, minus 500 for cut, plus 300 for bulk |
| Protein target | `2.2 × body weight (kg)` grams |
| Carb target | 45% of the daily budget, divided by 4 |
| Fat target | 25% of the daily budget, divided by 9 |

## Data and Privacy

All data stays on your device in the browser's `localStorage` under these keys:

- `cb_profile`
- `cb_logs`
- `cb_water`
- `cb_stats`

Nothing is sent to a server. To reset the app, clear the site's data in your browser.

## Project Structure

```
facon/
├── src/
│   ├── Facon.jsx    # The entire app (components, styles, food database)
│   └── main.jsx     # React entry point
├── index.html
├── package.json
└── README.md
```

## Customising

- **Add foods**: append entries to the `FOOD_DB` array in `Facon.jsx` with `id`, `name`, `calories`, `protein`, `carbs`, `fat`, and `icon`.
- **Add badges**: extend the `BADGES` array with a `check` function that reads the stats object.
- **Change colours**: edit the `C` palette object near the top of the file.

## Disclaimer

FACON provides estimates for general informational purposes only. It is not medical or nutritional advice. Speak to a qualified professional before making significant changes to your diet.

## License

Add your preferred license here (for example, MIT).
