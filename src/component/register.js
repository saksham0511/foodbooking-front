import React from "react";
import { httpRequest } from "../constant";
import { Link } from "react-router-dom";

import MapLocation from "./googlemap";

export default class Register extends React.Component {
  initalUserObj = {
    name: "",
    email: "",
    password: "",
    phone: "",
    community: "",
    message: "",
    location: {
      latitude: "",
      longitude: "",
    },
  };

  state = {
    user: this.props.user || { ...this.initalUserObj },
    isUpdateMode: this.props.mode,
    lat: "",
    lng: "",
  };

  handleCurrentLocation = (latitude, longitude) => {
    let { user } = { ...this.state };
    user.location["latitude"] = latitude;
    user.location["longitude"] = longitude;
    this.setState({ user: user });
    this.setState({ lat: latitude, lng: longitude });
  };

  setNewValue = (e) => {
    const { id, value } = e.target;

    let { user } = { ...this.state };
    user[id] = value;

    this.setState({ user: user });
  };

  saveDetails = (event) => {
    const data = httpRequest("/user/register", this.state.user);

    data
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "200") {
          console.log(result);
          this.setState({ user: this.initalUserObj });
          this.setState({
            message: "User is Successfully Registered !! Please Login",
          });
          localStorage.setItem("user", JSON.stringify(result.body));
        } else {
          this.setState({ message: result.message });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  };

  render() {
    let isUpdateMode = this.props.isUpdateMode;

    return (
      <React.Fragment>
        <form className="container-fluid">
          <div className="alert alert-success">
            <strong>{isUpdateMode ? "Update info" : "Register"}</strong>
          </div>

          <div className="formGroup">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={this.state.user.name}
              onChange={(e) => this.setNewValue(e)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={this.state.user.email}
              onChange={(e) => this.setNewValue(e)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={this.state.user.password}
              onChange={(e) => this.setNewValue(e)}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="phone">Phone:</label>
            <input
              type="number"
              id="phone"
              className="form-control"
              pattern="[0-9]{10}"
              value={this.state.user.phone}
              onChange={(e) => this.setNewValue(e)}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="community">Community:</label>
            <select
              id="community"
              className="custom-select"
              value={this.state.user.community}
              onChange={(e) => this.setNewValue(e)}
            >
              <option value="" />
              <option value="User">User</option>
              <option value="Delivery Boy">Delivery Boy</option>
            </select>
          </div>

          <div className="formGroup">
            <button
              type="submit"
              onClick={(e) => this.saveDetails(e)}
              className="btn btn-primary"
            >
              {isUpdateMode ? "Update User Details" : "Add New User"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => this.setState({ user: { ...this.initalUserObj } })}
            >
              Clear All Fields
            </button>
          </div>
        </form>
        <div>
          <label>Aready Have Account ?</label>
          <Link to="/login">Login</Link>
        </div>
        <div>{this.state.message}</div>
        <div style={{ marginLeft: 50 }}>
          <MapLocation onCurrentLocation={this.handleCurrentLocation} />
        </div>
      </React.Fragment>
    );
  }
}
