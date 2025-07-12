import { useState } from 'react';
import './Refreshers.css';

const topics = [
  { key: 'map', title: 'Array.map()', description: 'Transforms each item in an array and returns a new array.' },
  { key: 'filter', title: 'Array.filter()', description: 'Returns a new array with only items that match a condition.' },
  { key: 'reduce', title: 'Array.reduce()', description: 'Reduces an array to a single value (e.g., sum).' },
];

export default function JSRefreshers() {
  const [selected, setSelected] = useState(null);

  const handleClick = (key) => {
    setSelected(key);
    console.clear();

    // Run some code when a topic is selected
    if (key === 'map') {
      const nums = [1, 2, 3];
      const doubled = nums.map(n => n * 2);
      console.log('Original:', nums);
      console.log('Doubled:', doubled);
    }

    if (key === 'filter') {
      const items = [1, 2, 3, 4, 5];
      const evens = items.filter(n => n % 2 === 0);
      console.log('Original:', items);
      console.log('Evens:', evens);
    }

    if (key === 'reduce') {
      const prices = [10, 20, 30];
      const total = prices.reduce((sum, p) => sum + p, 0);
      console.log('Prices:', prices);
      console.log('Total:', total);
    }

  };

  return (
    <div className="refreshers-container">
      <h2>JS Refreshers</h2>
      <p>Select a topic to log an example in the console.</p>
      <ul className="topic-list">
        {topics.map(topic => (
          <li key={topic.key}>
            <button onClick={() => handleClick(topic.key)}>
              {topic.title}
            </button>
          </li>
        ))}
      </ul>
      {selected && (
        <div className="explanation">
          <h3>{topics.find(t => t.key === selected).title}</h3>
          <p>{topics.find(t => t.key === selected).description}</p>
          <p><em>Check the console for output.</em></p>
        </div>
      )}
    </div>
  );
}
