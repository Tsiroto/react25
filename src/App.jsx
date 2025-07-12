import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './App.css';

import Header from './components/Header/Header';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

import Home from './pages/Home/Home';
import PlaygroundLayout from './pages/JSPlayground/Layout';
import JSRefreshers from './pages/JSPlayground/Refreshers/Refreshers.jsx';
import Play from './pages/JSPlayground/Play/Play';
import PlaygroundHome from './pages/JSPlayground/PlaygroundHome';
import UserDeck from './pages/JSPlayground/UserDeck/UserDeck';

function App() {

  const location = useLocation();

useEffect(() => {
  document.body.className = '';

  if (location.pathname === '/') {
    document.body.classList.add('home-page');
  } else if (location.pathname.startsWith('/playground')) {
    document.body.classList.add('playground');
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
      <Breadcrumbs />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/playground" element={<PlaygroundLayout />}>
            <Route index element={<PlaygroundHome />} />
            <Route path="refreshers" element={<JSRefreshers />} />
            <Route path="play" element={<Play />} />
            <Route path="UserDeck" element={<UserDeck />} />
          </Route>

        </Routes>

      </main>
    </>
  );
}

export default App;
