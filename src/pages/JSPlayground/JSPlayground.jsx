import { Link, Outlet } from 'react-router-dom';
import './JSPlayground.css';
// import { people } from '../../data/people';

export default function JSPlayground() {
  return (
    <div>
      {/* <h2>JS Playground</h2> */}
      <p>This is where we'll mess around with JavaScript.</p>
      <nav>
        <Link to="/js-playground/refreshers">→ Go to Refreshers</Link>
      </nav>
      <nav>
        <Link to="/js-playground/play/api">→ Go to API practice</Link>
      </nav>
      <Outlet />
    </div>
  );
}