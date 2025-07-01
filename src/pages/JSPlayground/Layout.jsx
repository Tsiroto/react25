import {Outlet, Link} from 'react-router-dom';

export default function JSPlaygroundLayout() {
  return (
    <div>
      <nav style={{ padding: 0 }}>
        <ul>
          <li><Link to="/js-playground/refreshers">Refreshers</Link></li>
          <li><Link to="/js-playground/play">Play</Link></li>
          <li><Link to="/js-playground/play/api">API</Link></li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  )
}