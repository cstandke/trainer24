import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  Form,
  Input,
  Button
} from "reactstrap";

import AuthService from "./auth/AuthService";

// import "bootstrap";
import "@fortawesome/fontawesome-free";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    });
  };

  render() {
    console.log(this.state.loggedInUser);
    if (!this.state.loggedInUser) {
      return (
        <div>
          {/*  <nav className="navbar navbar-dark bg-primary">
                <a className="navbar-brand" href="#">Navbar</a>
            </nav> */}
          <Navbar expand="lg" dark color="primary">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarContents"
              aria-controls="navbarContents"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <NavbarBrand href="/">Trainer24</NavbarBrand>

            <div className="collapse navbar-collapse" id="navbarContents">
              <Nav navbar className="mr-auto mt-2 mt-lg-0">
                <NavItem active>
                  <NavLink href="/">
                    Home <span className="sr-only">(current)</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="signup">Signup</NavLink>
                </NavItem>
              </Nav>
              <Form inline className="my-2 my-lg-0">
                <Input
                  control
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
            </div>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div>
          {/*  <nav className="navbar navbar-dark bg-primary">
              <a className="navbar-brand" href="#">Navbar</a>
          </nav> */}
          <Navbar expand="lg" dark color="primary">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarContents"
              aria-controls="navbarContents"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <NavbarBrand href="/">Trainer24</NavbarBrand>

            <div className="collapse navbar-collapse" id="navbarContents">
              <Nav navbar className="mr-auto mt-2 mt-lg-0">
                <NavItem active>
                  <NavLink href="/">
                    Home <span className="sr-only">(current)</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  {/* <NavLink href="login">Login
                  </NavLink> */}
                  {/* <NavLink to="/"> */}
                  <Button onClick={() => this.logoutUser()}>Logout</Button>
                  {/* </NavLink> */}
                </NavItem>
              </Nav>
              <Form inline className="my-2 my-lg-0">
                <Input
                  control
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
            </div>
          </Navbar>
        </div>
      );
    }
  }
}

export default NavBar;
