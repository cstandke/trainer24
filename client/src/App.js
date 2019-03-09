import React, { Component } from "react";
// import logo from "./logo.svg";
// import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Signup />
        {/* <Switch> */}
        {/* <Route
            exact
            path="/signup"
            // render={() => <Signup getUser={this.getTheUser} />}
          /> */}
        {/* <Route exact path="/projects" component={Signup} /> */}
        {/* </Switch> */}
      </div>
    );
  }
}

export default App;
