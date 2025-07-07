# JavaScript & React Testing Playground

A comprehensive playground for testing and experimenting with JavaScript and React concepts. This project provides an interactive environment to practice JavaScript operations, React components, and web development techniques.

![JavaScript & React Testing Playground](https://via.placeholder.com/800x400?text=JS+and+React+Playground)

## 🚀 Purpose

This project serves as a sandbox for:
- Testing JavaScript operations and methods
- Experimenting with React components and hooks
- Practicing data manipulation techniques
- Learning modern web development concepts

## ✨ Features

- **JavaScript Playground**
  - JavaScript refreshers and fundamentals
  - Data manipulation examples (filtering, sorting, reducing)
  - API interaction demonstrations

- **React Playground**
  - Component creation and composition
  - State management with hooks
  - React Router implementation

- **Interactive UI**
  - Clean, responsive interface
  - Multiple tabs for different experiments
  - Real-time results display

## 🛠️ Technologies Used

- **Frontend**: React, React Router
- **Build Tool**: Vite
- **Styling**: CSS
- **Data**: Sample datasets for experimentation

## 📋 Project Structure

```
react25/
├── public/                    # Static assets
├── src/
│   ├── assets/                # Images, fonts, etc. (currently empty)
│   ├── components/            # Shared components
│   │   ├── Breadcrumbs/
│   │   │   ├── Breadcrumbs.css
│   │   │   └── Breadcrumbs.jsx
│   │   └── Header/
│   │       ├── Header.css
│   │       └── Header.jsx
│   ├── data/                  # Static datasets
│   │   └── people.js
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.css
│   │   │   └── Home.jsx
│   │   ├── JSPlayground/
│   │   │   ├── API/
│   │   │   │   ├── API.css
│   │   │   │   └── API.jsx
│   │   │   ├── Play/
│   │   │   │   ├── tabs/
│   │   │   │   │   ├── OverviewTab.css
│   │   │   │   │   ├── OverviewTab.jsx
│   │   │   │   │   ├── SearchTab.css
│   │   │   │   │   ├── SearchTab.jsx
│   │   │   │   │   └── TabTwo.jsx
│   │   │   │   ├── Play.css
│   │   │   │   └── Play.jsx
│   │   │   ├── JSPlayground.css
│   │   │   ├── JSPlayground.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── PlaygroundHome.css
│   │   │   ├── PlaygroundHome.jsx
│   │   │   ├── Refreshers.css
│   │   │   └── Refreshers.jsx
│   │   └── ReactPlayground/
│   │       ├── ReactPlayground.css
│   │       └── ReactPlayground.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
├── eslint.config.js
└── README.md
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

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
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

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new JavaScript or React examples
- Improve existing code
- Enhance documentation
- Fix bugs

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
