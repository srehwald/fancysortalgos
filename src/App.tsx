import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Diagram } from "./components/";

const App: React.FC = () => {
  return (
    <div className="App">
      <Diagram size={100}/>
    </div>
  );
};

export default App;
