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
import OfferDetail from "./components/OfferDetail";
import ProfilePageEdit from "./components/ProfilePageEdit";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  setTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  render() {
    this.fetchUser();
    return (
      <div className="App">
        <NavBar
          userInSession={this.state.loggedInUser}
          setUser={this.setTheUser}
        />
        <Switch>
          {/* <Route exact path="/" render={() => (
          loggedIn ? (
             <Redirect to="/dashboard"/>
              ) : (
               <Homepage/>
              )
            )}/> */}
          {/* <Route exact path="/" component={Homepage} /> */}
          <Route
            exact
            path="/login"
            render={() => <Login setUser={this.setTheUser} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup setUser={this.setTheUser} />}
          />
          {/* <Route
            exact
            path="/dashboard"
            render={() => <Dashboard userInSession={this.state.loggedInUser} />}
          /> */}
          <Route
            exact
            path="/dashboard"
            render={() =>
              // don't use this to redirect users ->
              this.state.loggedInUser ? (
                <Dashboard userInSession={this.state.loggedInUser} />
              ) : (
                <h1>Loading...</h1>
              )
            }
          />
          <Route
            exact
            path="/createoffer"
            render={() => (
              <CreateOffer userInSession={this.state.loggedInUser} />
            )}
          />
          <Route
            exact
            path="/profile"
            render={() =>
              // don't use this to redirect users ->
              this.state.loggedInUser ? (
                <ProfilePage userInSession={this.state.loggedInUser} />
              ) : (
                <h1>Loading...</h1>
              )
            }
          />
          <Route exact path="/OfferDetail/:id" component={OfferDetail} />
          <Route
            exact
            path="/profile/edit"
            render={() =>
              // don't use this to redirect users ->
              this.state.loggedInUser ? (
                <ProfilePageEdit userInSession={this.state.loggedInUser} />
              ) : (
                <h1>Loading...</h1>
              )
            }
          />
          <Route exact path="/" component={Homepage} />
        </Switch>
      </div>
    );
  }
}

export default App;
