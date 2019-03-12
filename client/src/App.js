import React, { Component } from "react";

import Homepage from "../src/components/Homepage";
import Navbar from "../src/components/Navbar";
// import logo from "./logo.svg";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Homepage />
        <Signup />
        <Switch>
          {/* <Route
            exact
            path="/signup"
            // render={() => <Signup getUser={this.getTheUser} />}
          /> */}
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
