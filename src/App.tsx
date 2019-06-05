import React from 'react';
import './App.css';
import { Diagram, Footer } from "./components/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faReact } from "@fortawesome/free-brands-svg-icons";

const App: React.FC = () => {
  return (
      <div className="container">
          <nav className="navbar" role="navigation">
              <div className="navbar-brand">
                  <a className="navbar-item">
                      Fancy Sort Algos
                  </a>
              </div>
          </nav>
          <div className="App">
              <Diagram size={100}/>
              <Footer/>
          </div>
      </div>
  );
};

export default App;
