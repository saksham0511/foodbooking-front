import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./component/register";
import Login from "./component/login";
import UserDashboard from "./component/userdashboard";
import EmployeeDashboard from "./component/employeedashboard";
import BookingDetails from "./component/bookingdetails";
import SelectHotel from "./component/selecthotel";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // fetch("http://192.168.31.128:8080/user/");
  }
  render() {
    console.log(this);
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/bookingdetails" component={BookingDetails} />
          <Route exact path="/userdashboard" component={UserDashboard} />
          <Route
            exact
            path="/employeedashboard"
            component={EmployeeDashboard}
          />
          <Route exact path="/selecthotel" component={SelectHotel} />
        </Switch>
      </Router>
    );
  }
}
