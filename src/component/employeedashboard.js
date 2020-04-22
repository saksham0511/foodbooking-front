import React from "react";
import { httpRequest } from "../constant";
import MapContainer from "./multimarkermap";
import { Link } from "react-router-dom";
export default class Dashboard extends React.Component {
  state = {
    bookingType: "All",
    radius: undefined,
    bookingsToDisplay: [],
    stores: [
      { latitude: 12.971726, longitude: 77.750073 },
      { latitude: 12.979139, longitude: 77.751406 },
      { latitude: 12.983606, longitude: 77.753699 },
      { latitude: 12.987084, longitude: 77.75384 },
      { latitude: 12.956831, longitude: 77.702858 },
      { latitude: 12.956831, longitude: 77.702858 },
    ],
  };

  componentDidMount() {
    const data = httpRequest("/booking/fetchAll", {});

    data
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          bookings: [...json.body],
          bookingsToDisplay: [...json.body],
        });
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  filterBookingDetails = (event) => {
    const { bookingType, radius } = this.state;

    let bookingsToDisplay = [...this.state.bookings];
    if (bookingType === "Regular") {
      bookingsToDisplay = bookingsToDisplay.filter(
        (booking) => booking && booking.bookingType === "Regular"
      );
    } else if (bookingType === "Occasional") {
      bookingsToDisplay = bookingsToDisplay.filter(
        (booking) => booking && booking.bookingType === "Occasional"
      );
    }

    if (Boolean(radius)) {
      bookingsToDisplay = bookingsToDisplay.filter(
        (booking, index) => booking && this.inRadius(booking, radius, index)
      );
    }

    this.setState({ bookingsToDisplay: bookingsToDisplay });

    event.preventDefault();
  };

  inRadius = (booking, radius, index) => {
    // for testing purpose
    // const bLat = this.state.stores[index].latitude;
    // const bLong = this.state.stores[index].longitude;
    // actual coordiates
    const bLat = booking.user.location.latitude;
    const bLong = booking.user.location.longitude;

    const user = JSON.parse(localStorage.getItem("user"));
    const uLat = user.location.latitude;
    const uLong = user.location.longitude;
    return (
      Math.acos(
        Math.cos(toRadian(uLat)) *
          Math.cos(toRadian(bLat)) *
          Math.cos(toRadian(bLong) - toRadian(uLong)) +
          Math.sin(toRadian(uLat)) * Math.sin(toRadian(bLat))
      ) <=
      radius / 6371.0
    );

    function toRadian(degree) {
      return degree * (Math.PI / 180);
    }
  };

  logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.replace("/login");
  }

  render() {
    const { history } = this.props;
    return (
      <div class="container">
         <nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
          <a class="navbar-brand" href="#"> <Link
                  to={{
                    pathname: "/editprofile",
                    search: "?sort=name",
                    hash: "#the-hash",
                    state: { userDetails: true }
                  }}
                  >Edit Profile</Link></a>
                  <a className="btn btn-primary" onClick = {this.logout} role="button" style ={{marginInlineStart:"auto"}}>Logout</a>
        </nav>
        <form class="form-inline mt-3">
          <label htmlFor="bookingType">Booking Type</label>
          <select
            id="bookingType"
            className="custom-select"
            value={this.state.bookingType}
            onChange={(e) => this.setState({ bookingType: e.target.value })}
            required
          >
            <option value="All">All</option>
            <option value="Regular">Regular</option>
            <option value="Occasional">Occasional </option>
          </select>

          <label htmlFor="phone">Radius</label>
          <input
            type="number"
            id="radius"
            className="form-control"
            maxlength="10"
            value={this.state.radius}
            onChange={(e) => this.setState({ radius: e.target.value })}
          />

          <button
            type="submit"
            onClick={(e) => this.filterBookingDetails(e)}
            className="btn btn-success"
          >
            Filter
          </button>
        </form>

        <hr />
        <MapContainer
          markerToDisplay={this.state.bookingsToDisplay}
          history={history}
        />
      </div>
    );
  }
}
