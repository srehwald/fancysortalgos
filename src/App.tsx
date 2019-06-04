import React from 'react';
import './App.css';
import { Diagram } from "./components/";

const App: React.FC = () => {
  return (
      <div>
          <nav className="navbar" role="navigation">
              <div className="navbar-brand">
                  <a className="navbar-item">
                      Fancy Sort Algos
                  </a>
              </div>
          </nav>
          <div className="App">
              <Diagram size={100}/>
          </div>
      </div>
  );
};

export default App;
