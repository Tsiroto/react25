import { useState } from 'react';
import './Play.css';
import OverviewTab from './tabs/OverviewTab';
import SearchTab from './tabs/SearchTab';

export default function Playground() {
  const [mode, setMode] = useState('overview');

  return (
    <>
      <div className="button-group">
        <button onClick={() => setMode('overview')}>Overview</button>
        <button onClick={() => setMode('search')}>Search</button>
      </div>

      <div className="resultsBox">
        {mode === 'overview' && <OverviewTab />}
        {mode === 'search' && <SearchTab />}
      </div>
    </>
  );
}
