import { useState } from 'react';
import './Play.css';
import OverviewTab from './tabs/OverviewTab';
import SearchTab from './tabs/SearchTab';
import TabTwo from './tabs/TabTwo.jsx';

export default function Playground() {
  const [mode, setMode] = useState('overview');

  return (
    <>
      <div className="button-group">
        <button onClick={() => setMode('overview')}>Overview</button>
        <button onClick={() => setMode('search')}>Search</button>
        <button onClick={() => setMode('tab3')}>Tab 2</button>
      </div>

      <div className="resultsBox">
        {mode === 'overview' && <OverviewTab />}
        {mode === 'search' && <SearchTab />}
        {mode === 'tab3' && <TabTwo />}
      </div>
    </>
  );
}
