# JavaScript & React Testing Playground

A comprehensive playground for testing and experimenting with JavaScript and React concepts. This project provides an interactive environment to practice JavaScript operations, React components, and web development techniques.

![JavaScript & React Testing Playground](https://via.placeholder.com/800x400?text=JS+and+React+Playground)

## 🚀 Purpose

This project serves as a sandbox for:
- Experimenting with React components and hooks
- Practicing data manipulation techniques
- Learning modern web development concepts

## ✨ Features

- **JavaScript Playground**
  - JavaScript refreshers and fundamentals (mockup)
  - Data manipulation examples (filtering, sorting, reducing)
  - API interaction demonstrations (using a local fake API)
  - Virtual company report (mock employee data, filter/sort/search employees)
  - UserDeck: CRUD system for users (localStorage, separate from API data)


## 🛠️ Technologies Used

- **Frontend**: React, React Router
- **Build Tool**: Vite
- **Styling**: CSS, Material UI (MUI) (currently using both; planning to upgrade fully to MUI soon)
- **API/Backend**: json-server (for local fake API during development)

## 📋 Project Structure

```
react25/
├── public/                    # Static assets (favicon, images, etc.)
├── src/
│   ├── assets/                # Images, SVGs, and other asset files
│   ├── components/            # Shared React components
│   │   ├── Breadcrumbs/       # Breadcrumb navigation component
│   │   │   ├── Breadcrumbs.css
│   │   │   └── Breadcrumbs.jsx
│   │   └── Header/            # Header (site navigation) component
│   │       ├── Header.css
│   │       └── Header.jsx
│   ├── data/                  # Static datasets for playgrounds
│   │   └── people.js
│   ├── pages/                 # Main app pages and playgrounds
│   │   ├── Home/              # Home page
│   │   │   ├── Home.css
│   │   │   └── Home.jsx
│   │   ├── JSPlayground/      # JavaScript playground section
│   │   │   ├── API/           # API interaction examples
│   │   │   │   ├── API.css
│   │   │   │   └── API.jsx
│   │   │   ├── Play/          # Data manipulation playground
│   │   │   │   ├── tabs/      # Tabs for different play experiments
│   │   │   │   │   ├── OverviewTab.css
│   │   │   │   │   ├── OverviewTab.jsx
│   │   │   │   │   ├── SearchTab.css
│   │   │   │   │   ├── SearchTab.jsx
│   │   │   │   │   └── TabTwo.jsx
│   │   │   │   ├── Play.css
│   │   │   │   └── Play.jsx
│   │   │   ├── JSPlayground.css
│   │   │   ├── JSPlayground.jsx
│   │   │   ├── Layout.jsx     # Layout for JSPlayground
│   │   │   ├── PlaygroundHome.css
│   │   │   ├── PlaygroundHome.jsx
│   │   │   ├── Refreshers.css
│   │   │   └── Refreshers.jsx # JS fundamentals refresher
│   │   └── ReactPlayground/   # React playground section
│   │       ├── ReactPlayground.css
│   │       └── ReactPlayground.jsx
│   ├── App.css                # Global styles
│   ├── App.jsx                # Main app component
│   ├── index.css              # Base styles
│   └── main.jsx               # App entry point
├── index.html                 # HTML template
├── package.json               # Project metadata and scripts
├── package-lock.json          # Dependency lock file
├── vite.config.js             # Vite configuration
├── .gitignore                 # Git ignore rules
├── eslint.config.js           # ESLint configuration
└── README.md                  # Project documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react25.git
   cd react25
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server and mock API together:
   ```bash
   npm run go
   ```
   This command uses [concurrently](https://www.npmjs.com/package/concurrently) to run both the Vite dev server and the mock API server (using `json-server` with `db.json`) at the same time.

   - To run only the frontend:
     ```bash
     npm run dev
     ```
   - To run only the mock API server:
     ```bash
     npm run serve
     ```

4. Open your browser and navigate to `http://localhost:5173`

## 🧪 How to Use

1. **Home Page**: Navigate to the home page to see an overview of the project.
2. **JS Playground**: Explore the JavaScript playground to test various JS operations:
   - Refreshers: Review JavaScript fundamentals
   - Play: Experiment with data manipulation on sample datasets
   - API: Test API interactions
3. **React Playground**: Experiment with React components and concepts.

## 📝 Examples

### JavaScript Data Manipulation

The playground includes examples of:
- Filtering and searching data
- Calculating averages and percentages
- Using array methods (map, reduce, filter)
- Working with Sets for unique values

### React Component Creation

Practice creating and using React components with:
- useState and useEffect hooks
- Conditional rendering
- Component composition
- Routing between different sections

## 🧩 Development Utilities

### concurrently

This project uses the [`concurrently`](https://www.npmjs.com/package/concurrently) package to streamline development:

- **What it does:**
  - Allows running multiple commands (such as the Vite dev server and a mock API server) simultaneously in one terminal window.
- **Why it's used:**
  - Simplifies the workflow by letting you start both frontend and backend (or other processes) together with a single command, making development faster and more convenient.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new JavaScript or React examples
- Improve existing code
- Enhance documentation
- Fix bugs

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
