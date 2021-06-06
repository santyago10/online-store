import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { WomanComponent } from './components/woman.component';
import { RouterComponent } from './components/router.component';
import { NavLink } from "react-router-dom";

function App() {
  return (
    <div>
        <RouterComponent/>
    </div>
  );
}

export default App;
