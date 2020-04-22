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
    success : false
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
            success: true,
          });
          localStorage.setItem("user", JSON.stringify(result.body));
        } else {
          this.setState({ message: result.message, success: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  };

  render() {
    let isUpdateMode = this.props.isUpdateMode;
    const {success} = this.state;

    return (
      <React.Fragment>
        <form className="container">
          <div className="alert alert-success" style = {{textAlign:"center"}}>
            <strong><h3>{isUpdateMode ? "Update info" : "Register"}</h3></strong>
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
          <br />
          <div className="formGroup text-center">
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
        <div class = "text-center">
          <label>Aready Have Account ?</label>
          <Link to="/login">Login</Link>
        </div>
        <div className ={success ? "text-success" : "text-danger"} style ={{textAlign: "center"}}>{this.state.message}</div>
        <div style={{padding: "0px 200px 0px 200px" }}>
          <MapLocation onCurrentLocation={this.handleCurrentLocation} />
        </div>
      </React.Fragment>
    );
  }
}
