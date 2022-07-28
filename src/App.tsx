import React from 'react';
import './App.css';

// React Router DOM Imports
import { BrowserRouter as Router } from 'react-router-dom';

import { AppRoutes } from './routes/Routes';

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
