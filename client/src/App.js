import React, { Component } from "react";

import Homepage from "../src/components/Homepage";
import Navbar from "../src/components/Navbar";
// import logo from "./logo.svg";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };
  render() {
    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route
            exact
            path="/signup"
            render={() => <Signup getUser={this.getTheUser} />}
          />
          {/* <Route exact path="/signup" component={Signup} /> */}
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
