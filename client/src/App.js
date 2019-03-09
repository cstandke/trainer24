import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';

// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free';

import Homepage from '../src/components/Homepage';
import Navbar from '../src/components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Homepage/>
      </div>
    );
  }
}

export default App;
