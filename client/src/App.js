import React, { Component } from "react";
import Homepage from "../src/components/Homepage";
import NavBar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Dashboard from "./components/protected/Dashboard";
import ProfilePage from "./components/ProfilePage";
import AuthService from "./components/auth/AuthService";
import CreateOffer from "./components/protected/courses/CreateOffer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  //keep this for now
  // for alternative with first checking if user is logged in
  // fetchUser() {
  //   if (this.state.loggedInUser === null) {
  //     this.service
  //       .loggedin()
  //       .then(response => {
  //         this.setState({
  //           loggedInUser: response
  //         });
  //       })
  //       .catch(err => {
  //         this.setState({
  //           loggedInUser: false
  //         });
  //       });
  //   }
  // }

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
          {/* <Route exact path="/" render={() => (
          loggedIn ? (
             <Redirect to="/dashboard"/>
              ) : (
               <Homepage/>
              )
            )}/> */}
          <Route exact path="/" component={Homepage} />
          <Route
            exact
            path="/login"
            render={() => <Login getUser={this.getTheUser} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup getUser={this.getTheUser} />}
          />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/createoffer" component={CreateOffer} />
          <Route exact path="/profile" component={ProfilePage} />
        </Switch>
      </div>
    );

    //Keep this for now: if using fetchUser

    // this.fetchUser();
    // if (this.state.loggedInUser) {
    //   return (
    //     <div className="App">
    //       <NavBar
    //         userInSession={this.state.loggedInUser}
    //         getUser={this.getTheUser}
    //       />
    //       <Switch>
    //         <Route exact path="/" component={Homepage} />
    //         {/* adapt this*/}
    //         {/* <Route exact path="/dashboard/:id" component={Dashboard}/> */}
    //       </Switch>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div className="App">
    //       <NavBar
    //         userInSession={this.state.loggedInUser}
    //         getUser={this.getTheUser}
    //       />
    //       <Switch>
    //         <Route exact path="/" component={Homepage} />
    //         {/* adapt this*/}
    //         {/* <Route exact path="/dashboard/:username" component={Dashboard}/> */}
    //         <Route
    //           exact
    //           path="/signup"
    //           // by using render we allow passing props down to Signup component.
    //           render={() => <Signup getUser={this.getTheUser} />}
    //         />
    //         <Route
    //           exact
    //           path="/login"
    //           render={() => <Login getUser={this.getTheUser} />}
    //         />
    //       </Switch>
    //     </div>
    //   );
    // }
  }
}

export default App;
