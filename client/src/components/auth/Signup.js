import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      firstname: "",
      username: "",
      password: ""
    };
  }

  // handleFormSubmit = event => {
  //   event.preventDefault();

  //   const username = this.state.username;
  //     const password = this.state.password;
  //     const firstname = this.state.firstname;
  //     const lastname = this.state.lastname;

  //   axios
  //     .post("http://localhost:5000/api/signup", {
  //       username: username,
  //       password: password
  //     })
  //     .then(response => {
  //       this.setState({
  //         username: "",
  //         password: ""
  //       });
  //       this.props.getUser(response);
  //     })

  //     // this.service.signup(username, password)
  //     // .then( response => {
  //     //     this.setState({
  //     //         username: "",
  //     //         password: "",
  //     //     });
  //     //     // this.props.getUser(response)
  //     // })
  //     .catch(error => console.log(error));
  // };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <div className="container text-center">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <h2>Create your account</h2>

              <form className="form-signin" onSubmit={this.handleFormSubmit}>
                <img
                  class="mb-4"
                  src="https://images-na.ssl-images-amazon.com/images/I/41lCbd6yFlL.jpg"
                  alt=""
                  width="72"
                  height="72"
                />
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div class="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div class="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
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
                  Register
                </button>
              </form>
              <p>
                Already have account?
                {/* <Link to={"/"}> Login</Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;
