import './App.css';
import { Route } from "react-router-dom";
import React from "react";

import Start from "./components/Start.jsx";
import Navbar from './components/Navbar';
import Dogs from './components/Dogs';
import Details from "./components/Details"
import Add from './components/Add';


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Start}/>
      <Route path={["/dogs", "/add"]} component={Navbar}/>
      <Route exact path="/dogs" component={Dogs}/>
      <Route path="/dogs/:id" component={Details}/>
      <Route path="/add" component={Add}/>
    </div>
  );
}

export default App;
