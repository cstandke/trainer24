import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "./AuthService.js";
import { Alert } from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      redirect: false,
      errorMessage: ""
    };
    this.service = new AuthService();
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;
    this.service
      .login(username, password)
      .then(response => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response);
        this.setRedirect();
      })
      .catch(error => {
        console.log(error.response);
        this.setState({ errorMessage: error.response.data.message });
        console.log(error);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
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
                    //or: this.state.email!
                    onChange={e => this.handleChange(e)}
                  />
                </div>

                <div class="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
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
              <hr />
              {this.state.errorMessage && (
                <Alert color="warning">{this.state.errorMessage}</Alert>
              )}
              <p>
                You don't have account yet?
                <Link to={"/signup"}>Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
