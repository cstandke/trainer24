import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: "",
      password: "",
      email: "",
      type: this.props.type
    };
    console.log(this.state.email);
  }

  render() {
    return (
      <div>
        <div className="container text-center">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <h2>Login</h2>

              <form className="form-signin" onSubmit={this.handleFormSubmit}>
                <img
                  class="mb-4"
                  src="https://images-na.ssl-images-amazon.com/images/I/41lCbd6yFlL.jpg"
                  alt=""
                  width="72"
                  height="72"
                />
                <div class="form-group">
                  <label>Username or Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    //or: this.state.email! wie geht das?
                    onChange={e => this.handleChange(e)}
                  />
                </div>

                <div class="form-group">
                  <label>Password:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">
                  Login
                </button>
              </form>
              <p>
                You don't have account yet?
                <Link to={"/"}>Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;