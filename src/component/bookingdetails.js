import React from "react";
import FinalMap from './finalmap'
import { httpRequest } from "../constant";


export default class BookingDetails extends React.Component {
  state = {
    orderPicked: false,
  };

  constructor(props) {
    super(props);
  }

  onOrderPicked = () => {
    this.setState({ orderPicked: true });

    //send email
    let detail = this.props.location.state.detail;
  };

  onDeliver = () => {
    //delete
    let detail = this.props.location.state.detail;

    const data = httpRequest("/booking/delete", detail);

    data
      .then((response) => response.json())
      .then((json) => {
        //redirect to home dashboard
        this.props.history.push("/employeedashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.props);
    let detail = this.props.location.state.detail;

    return (
      <div class="card">
        <div class="card-body">
          <strong>Booking Details</strong>
          <br />
          Booking No : {detail.bookingNo} <br />
          Booking Type: {detail.bookingType}
          <br />
          Package Wt: {detail.packageWt}
          <br />
          Price: {detail.price}
          <br />
          <hr />
          <strong>Customer Details</strong>
          <br />
          Name : {detail.user.name} <br />
          Phone: {detail.user.phone}
          <br />
          {!this.state.orderPicked ? (
            <div>
              <button className="btn btn-success" onClick={this.onOrderPicked}>
                Place this order
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => this.props.history.goBack()}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <hr />
              Thanks for picking this order. A confirmation SMS is sent to user.
              Press <strong>Deliver</strong> button once it is deliverd
              <br />
              <button className="btn btn-success" onClick={this.onDeliver}>
                Deliver
              </button>
            </div>
          )}
          <br />
          <br />
          <FinalMap bookingDetails = {detail} />
        </div>
      </div>
    );
  }
}
