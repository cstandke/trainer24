import React, {Component} from "react";
import { Navbar, Nav, NavItem, NavLink, NavbarBrand, Form, Input, Button, NavbarToggler, Collapse } from "reactstrap"

// import "bootstrap";
import "@fortawesome/fontawesome-free";

class TheNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapsed: true };
  } 

  toggle() {
    this.setState(state => ({ collapsed: !state.collapsed }));
  }

  render() {
    return (
      <div>
        {/*  <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="#">Navbar</a>
      </nav> */}

        <Navbar expand="lg" dark color="primary">
          <NavbarToggler
            onClick={this.toggle}
            aria-controls="navbarContents"
            aria-expanded={!this.state.collapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </NavbarToggler>
          <NavbarBrand href="/">Trainer24</NavbarBrand>
          <Collapse navbar id="navbarContents" isOpen={!this.state.collapsed} >
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
              <NavItem>
                <NavLink href="dashboard">Dashboard</NavLink>
              </NavItem>
            </Nav>
          <Form inline className="my-2 my-lg-0">
            <Input className="mr-sm-2"
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
  };
}

export default TheNavbar;
