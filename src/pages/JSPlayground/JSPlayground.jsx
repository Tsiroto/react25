import { Link, Outlet } from 'react-router-dom';
import './JSPlayground.css';
// import { people } from '../../data/people';

export default function Playground() {
  return (
    <div>
      {/* <h2>Playground</h2> */}
      <p>This is where we'll mess around with JavaScript.</p>
      <nav>
        <Link to="/playground/refreshers">→ Go to Refreshers</Link>
      </nav>
      <nav>
        <Link to="/playground/API">→ Go to API practice</Link>
      </nav>
      <Outlet />
    </div>
  );
}
