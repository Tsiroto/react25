import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={isHome ? 'site-header dark' : 'site-header'}>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/playground">Playground</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
