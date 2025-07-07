import React from 'react';
import { Link } from 'react-router-dom';
import './PlaygroundHome.css';

export default function PlaygroundHome() {
  return (
    <div className="playground-home">
      <div className="section-list">
        <Link to="/playground/refreshers" className="section-item">
          <h3>Refreshers</h3>
          <p>
            This section provides interactive examples of common JavaScript array methods.
            You can select a topic to see examples of how methods like map, filter, and reduce work.
            The examples will be logged to the console for you to explore.
          </p>
        </Link>

        <Link to="/playground/play" className="section-item">
          <h3>Play</h3>
          <p>
            The Play section allows you to interact with sample data and explore different ways to 
            visualize and manipulate it. You can view company statistics, search and filter employee 
            data, and more.
          </p>
        </Link>

        <Link to="/playground/API" className="section-item">
          <h3>API</h3>
          <p>
            [This section is coming soon]
          </p>
        </Link>
      </div>
    </div>
  );
}
