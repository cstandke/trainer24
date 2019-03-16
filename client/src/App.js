import React, { Component } from "react";
import Homepage from "../src/components/Homepage";
import NavBar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Dashboard from "./components/protected/Dashboard";

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

  render() {
    return (
      <div className="App">
        <NavBar
          userInSession={this.state.loggedInUser}
          getUser={this.getTheUser}
        />

        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" render={() => <Login getUser={this.getTheUser} />}          />
          <Route exact path="/signup" render={() => <Signup getUser={this.getTheUser} />}/>
          <Route exact path="/dashboard" component={Dashboard}/>
        </Switch>
      </div>
    );
  }
}

export default App;
