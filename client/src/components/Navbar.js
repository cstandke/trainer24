import React from "react";

import "bootstrap";
import "@fortawesome/fontawesome-free";

const navBar = () => {
  return (
    <div>
      {/*  <nav className="navbar navbar-dark bg-primary">
         <a className="navbar-brand" href="#">Navbar</a>
     </nav> */}

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
        <a className="navbar-brand" href="#">
          Trainer24
        </a>

        <div className="collapse navbar-collapse" id="navbarContents">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="signup">
                Signup
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default navBar;
