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
            This section offers hands-on examples of key JavaScript array methods.
            Choose a method like map, filter, or reduce to see how it works in practice. Each example runs live and logs its output to the console, helping you understand the logic behind each transformation.
          </p>
        </Link>

        <Link to="/playground/play" className="section-item">
          <h3>Play</h3>
          <p>
            You can search, filter, and sort the dataset, test logic for custom conditions, and get insights through live data interaction—ideal for improving your JavaScript and data handling skills.
          </p>
        </Link>

        <Link to="/playground/userdeck" className="section-item">
          <h3>UserDeck</h3>
          <p>
            Manage and edit user data stored in localStorage. Add, update, or delete entries — changes are saved in your browser.
          </p>
        </Link>
      </div>
    </div>
  );
}
