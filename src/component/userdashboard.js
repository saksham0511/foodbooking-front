import React from "react";
import { httpRequest } from "../constant";
import { Link } from "react-router-dom";
export default class UserDashboard extends React.Component {
  state = {
    booking: {
      bookingNo: Math.floor(new Date().valueOf() * Math.random()),
      user: JSON.parse(localStorage.getItem("user")),
      bookingType: "",
      packageWt: "",
    },
    price: 0,
    discount: 0,
    distance: 0,
  };

  componentDidMount(){
    const distance = this.distanceCalculation();
    this.setState({distance : distance})
  }

  distanceCalculation = () => {

    const {latitude : bLat, longitude : bLong} =  JSON.parse(sessionStorage.getItem("hotel location"));

    const user = JSON.parse(localStorage.getItem("user"));
    const uLat = user.location.latitude;
    const uLong = user.location.longitude;
    return this.getDistanceBetweenPoints(uLat,uLong,bLat,bLong)
  }

 getDistanceBetweenPoints = (lat1, lng1, lat2, lng2) => {
    // The radius of the planet earth in meters
    let R = 6378137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(lng2 - lng1);
    let a = Math.sin(dLat / 2)
            *
            Math.sin(dLat / 2) 
            +
            Math.cos(degreesToRadians(lat1)) 
            * 
            Math.cos(degreesToRadians(lat1)) 
            *
            Math.sin(dLong / 2) 
            * 
            Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return parseFloat((distance * 0.001).toFixed(2));

   function degreesToRadians  (degree)  {
      return degree * (Math.PI / 180);
    }
} 
   
  totalPrice = () =>{
  return  (this.state.distance * 5) + this.state.price - (((this.state.distance * 5) + this.state.price) * this.state.discount) / 100;
  }

   
  saveBookingDetails = (event) => {
    let booking = this.state.booking;
    const {latitude : bLat, longitude : bLong} =  JSON.parse(sessionStorage.getItem("hotel location"));

    booking.hotelLocation = {
      latitude : bLat,
      longitude :bLong
    }
  

    booking.price = this.totalPrice();
   
    const data = httpRequest("/booking/create", booking);

    data
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          booking: {
            bookingNo: Math.floor(new Date().valueOf() * Math.random()),
            user: JSON.parse(localStorage.getItem("user")),
            bookingType: "",
            packageWt: "",
          },
          price: 0,
          discount: 0,
        });
        alert(
          "Booking successfull, we will inform you once our delivery boy pickup your order, thanks"
        );
        console.log(json);
        this.props.history.replace("/selecthotel");
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };

  setNewValue = (e) => {
    const { id, value } = e.target;

    let { booking } = { ...this.state };
    booking[id] = value;
    
        
    let price = this.state.price;
    if (id === "packageWt") {
      switch (value) {
        case "Small":
          price = 50 ;
          break;
        case "Medium":
          price = 100;
          break;
        case "Large":
          price = 150;
          break;

        default:
          break;
      }
    }
    let discount = this.state.discount;
    if (id === "bookingType") {
      switch (value) {
        case "Regular":
          discount = 20;
          break;
        case "Occasional":
          discount = 0;
          break;

        default:
          break;
      }
    }

    this.setState({ booking: booking, price: price, discount: discount });
  };

  logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.replace("/login");
  }

  render() {
    
    return (
      <div className="container">
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
        <div className="card">
          <div className="card-body">
            <form className="form">
              <strong>Booking Details</strong>

              <div className="formGroup">
                <label htmlFor="bookingNo">Booking No:</label>
                <input
                  id="bookingNo"
                  className="form-control"
                  value={this.state.booking?.bookingNo}
                  disabled
                />
              </div>

              <div className="formGroup">
                <label htmlFor="packageWt">Weight:</label>
                <select
                  id="packageWt"
                  className="custom-select"
                  value={this.state.booking?.packageWt}
                  onChange={(e) => this.setNewValue(e)}
                  required
                >
                  <option value="" />
                  <option value="Small">Small (Rs. 50)</option>
                  <option value="Medium">Medium (Rs. 100)</option>
                  <option value="Large">Large (Rs. 150) </option>
                </select>
              </div>

              <div className="formGroup">
                <label htmlFor="bookingType">Community:</label>
                <select
                  id="bookingType"
                  className="custom-select"
                  value={this.state.booking?.bookingType}
                  onChange={(e) => this.setNewValue(e)}
                  required
                >
                  <option value="" />
                  <option value="Regular">Regular (20% discount)</option>
                  <option value="Occasional">Occasional </option>
                </select>
              </div>

              <hr />

              <strong>User Details</strong>
              <div className="formGroup">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="number"
                  id="phone"
                  className="form-control"
                  pattern="[0-9]{10}"
                  value={this.state.booking?.user.phone}
                  onChange={(e) => this.setNewValue(e)}
                />
              </div>

              <hr />

              <strong>Pricing Details</strong>
              <div className="formGroup">
                <label className="float: left">
                  Price : Rs. {this.state.price}
                </label>
                <br />
                <label className="float: left">
                  Discount : {this.state.discount} %
                </label>
                <br/>
                <label className="float: left">
                  Delivery Charges (5 Rs. per km): Rs. {this.state.distance * 5} 
                </label>
                <br />
                <label className="float: left">
                  -----------------------------------
                </label>
                <br />
                <label className="float: left">
                  <strong>
                    Total Price : Rs.{" "}
                    {this.totalPrice()}
                  </strong>
                </label>
              </div>

              <div className="formGroup">
                <button
                  type="submit"
                  onClick={(e) => this.saveBookingDetails(e)}
                  className="btn btn-primary"
                >
                  Order Now
                </button>
              </div>
              <br />
              <div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
