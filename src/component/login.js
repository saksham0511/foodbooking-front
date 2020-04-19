import React from "react";
import { httpRequest } from "../constant";
import { Link } from "react-router-dom";
export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    const data = httpRequest("/user/validate", {
      email: email,
      password: password,
    });

    data
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "200") {
          console.log("success");
          if (data.body.community == "User") {
            this.props.history.replace("/selecthotel");
          } else {
            this.props.history.replace("/employeedashboard");
          }
        } else {
          this.setState({ error: data.message });
        }
      })
      .catch((err) => console.log("error", err));

    event.preventDefault();
  };

  render() {
    const { error } = this.state;
    return (
      <React.Fragment>
        <form className="container-fluid" onSubmit={this.handleSubmit}>
          <div className="imgcontainer">
            <img src="\login.jpg" alt="Avatar" className="avatar" />
          </div>

          <div className="formGroup">
            <label for="email">Email address:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              id="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label for="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              id="pwd"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div>
          <label>Do not Have Account ?</label>
          <Link to="/register">Register</Link>
        </div>
        <div>{error}</div>
      </React.Fragment>
    );
  }
}
