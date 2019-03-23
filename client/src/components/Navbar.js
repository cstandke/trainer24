import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  Form,
  Input,
  Button,
  NavbarToggler,
  Collapse
} from "reactstrap";

import AuthService from "./auth/AuthService";
import "@fortawesome/fontawesome-free";

class TheNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapsed: true,
      loggedInUser: null
    };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.setUser(null);
    });
  };

  toggle() {
    this.setState(state => ({ collapsed: !state.collapsed }));
  }

  logoutButton() {
    if (this.state.loggedInUser) {
      return (
        <NavItem>
          <Button onClick={() => this.logoutUser()}>Logout</Button>
        </NavItem>
      );
    } else return null;
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {/*  <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="#">Navbar</a>
      </nav> */}

        <Navbar expand="lg" dark color="primary" sticky="top">
          <NavbarToggler
            onClick={this.toggle}
            aria-controls="navbarContents"
            aria-expanded={!this.state.collapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </NavbarToggler>
          <NavbarBrand href="/">Trainer24</NavbarBrand>
          <Collapse navbar id="navbarContents" isOpen={!this.state.collapsed}>
            <Nav navbar className="mr-auto mt-2 mt-lg-0">
              <NavItem active>
                <NavLink href="/">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="login">Login</NavLink>
              </NavItem>
              {this.logoutButton()}
              <NavItem>
                <NavLink href="signup">Signup</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="dashboard">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="profile">My Profile</NavLink>
              </NavItem>
            </Nav>
            <Form inline className="my-2 my-lg-0">
              <Input
                className="mr-sm-2"
                // className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button
                outline
                color="success"
                className="my-2 my-sm-0"
                type="submit"
              >
                Search
              </Button>
            </Form>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default TheNavbar;
