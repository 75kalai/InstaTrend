import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <div className='app-container'>
      <App />
      <div className="screen-limiter">
        <h3>Your device is not supported since screen size is too small.</h3>
      </div>
    </div>
  </React.StrictMode>
);

