# ♻️ WasteWise — Campus Waste Analytics & Awareness Platform

WasteWise is a data-driven web platform designed to analyze campus waste management patterns, highlight key disposal behaviors, and provide actionable insights and educational campaigns for sustainable campus living.

---

## 🌟 Key Features

- **Interactive Insights & Analytics Dashboard**: Visualizations of disposal habits, contamination points, and peak waste periods powered by survey data.
- **Awareness & Education Hub**: Comprehensive guides on proper sorting, recycling guidelines, and reducing single-use plastics.
- **Strategic Optimization & Campaign Plan**: Proposed bin relocation schemes, high-traffic collection optimization, and gamified engagement strategies.
- **Dataset Integration**: Direct parsing of student & faculty campus survey responses.
- **Theme Support**: Seamless Dark/Light theme switching with smooth transitions and modern UI aesthetics.

---

## 🏗️ Project Structure

```
WasteWise/
├── app/                  # React + Vite frontend application
│   ├── src/              # Application source code
│   │   ├── components/   # Dashboards, charts, navigation & UI modules
│   │   ├── context/      # Survey dataset & state providers
│   │   └── data/         # Processed survey insights & datasets
│   └── public/           # Static assets and CSV datasets
├── design-system/        # Design tokens and UI documentation
├── scripts/              # Data processing and transformation utilities
├── surveyData.json       # Parsed JSON representation of survey responses
├── WasteWise_PRD.md      # Product Requirements Document
└── .gitignore            # Git ignore configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Running Locally

1. Navigate to the `app` directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript & Vite
- **Styling**: Tailwind CSS & Lucide Icons
- **Visualizations**: Recharts
- **Animations**: Framer Motion
- **UI Primitives**: Radix UI components
