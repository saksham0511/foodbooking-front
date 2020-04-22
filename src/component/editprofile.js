import React from "react";
import { httpRequest } from "../constant";
import { Link } from "react-router-dom";

import MapLocation from "./googlemap";

export default class EditProfile extends React.Component {
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
    user: JSON.parse(localStorage.getItem("user")),
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
  componentDidMount(){
 //   setUserValue(this.state.user)
  }

  saveDetails = (event) => {
    const data = httpRequest("/user/register", this.state.user);

    data
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "200") {
          console.log(result);
          this.setState({ user: this.initalUserObj });
          localStorage.setItem("user", JSON.stringify(result.body));
          if (result.body.community == "User") {
            this.props.history.replace("/userdashboard");
          } else {
            this.props.history.replace("/employeedashboard");
          }
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
        <form className="container">
          <div className="alert alert-success">
            <strong>Update Information</strong>
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
              disabled={true}
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
              disabled={true}
            >
              <option value="" />
              <option value="User">User</option>
              <option value="Delivery Boy">Delivery Boy</option>
            </select>
          </div>
          <br />
          <div className="formGroup">
            <button
              type="submit"
              onClick={(e) => this.saveDetails(e)}
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </form>
        <div>
        </div>
        <div>{this.state.message}</div>
        <div style={{ marginLeft: 50 }}>
        {/*  <MapLocation onCurrentLocation={this.handleCurrentLocation} />  */}
        </div>
      </React.Fragment>
    );
  }
}
