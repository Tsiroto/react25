import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import JSPlayground from './pages/JSPlayground/JSPlayground';
import ReactPlayground from './pages/ReactPlayground/ReactPlayground';
import JSPlaygroundLayout from './pages/JSPlayground/Layout';
import JSRefreshers from './pages/JSPlayground/Refreshers';
import Play from './pages/JSPlayground/Play/Play';
import API from './pages/JSPlayground/Play/API';

function App() {

  const location = useLocation();

useEffect(() => {
  document.body.className = '';

  if (location.pathname === '/') {
    document.body.classList.add('home-page');
  } else if (location.pathname.startsWith('/js-playground')) {
    document.body.classList.add('js-playground');
  } else if (location.pathname.startsWith('/react-playground')) {
    document.body.classList.add('react-playground');
  }
}, [location.pathname]);

  return (
    <>
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/react-playground" element={<ReactPlayground />} />

          <Route path="/js-playground" element={<JSPlaygroundLayout />}>
            <Route index element={<Navigate to="refreshers" replace />} />
            <Route path="refreshers" element={<JSRefreshers />} />
            <Route path="play" element={<Play />} />
            <Route path="play/API" element={<API />} />
          </Route>

        </Routes>

      </main>
    </>
  );
}

export default App;