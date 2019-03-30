import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true
    });
    this.service = service;
  }

  // order of arg need to be same as in BE
  signup = (username, password, firstname, lastname, email) => {
    return this.service
      .post("/signup", { username, password, email, firstname, lastname })
      .then(response => response.data);
  };

  login = (username, password) => {
    return this.service
      .post("/login", { username, password })
      .then(response => response.data);
  };

  logout = () => {
    return this.service.post("/logout", {}).then(response => response.data);
  };

  loggedin = () => {
    return this.service
      .get("/loggedin")
      .then(response => response.data)
      .catch(err => console.log("err from logged in", err));
  };
}

export default AuthService;
