import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "90%",
  height: "100%",
};

export class SelectHotel extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    markerToDisplay: [
      { latitude: 26, longitude: 73 },
      { latitude: 12.979139, longitude: 77.751406 },
      { latitude: 12.983606, longitude: 77.753699 },
      { latitude: 12.987084, longitude: 77.75384 },
      { latitude: 12.956831, longitude: 77.702858 },
      { latitude: 12.956831, longitude: 77.702858 },
    ],
    userDetails: {},
  };

  displayMarkers = () => {
    const { markerToDisplay } = this.state;

    return markerToDisplay.map((detail, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            // Actual co-ordinates
            // lat: detail.user.location.latitude,
            // lng: detail.user.location.longitude,
            // for testing purpose
            lat: detail.latitude,
            lng: detail.longitude,
          }}
          onClick={() => this.onMarkerClick(detail)}
          name={"Drop Location"}
        />
      );
    });
  };

  onMarkerClick = (detail, props, marker, e) => {
    console.log("props", this.props);
    sessionStorage.setItem("hotel location", JSON.stringify(detail));
    this.props.history.push({
      pathname: "/userdashboard",
      search: "",
      state: { detail: detail },
    });

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <div style ={{textAlign:"center"}}>
      <label><strong><h2>Choose a desirable Pick-up point</h2></strong></label>
      <br />
      <div style ={{padding : "0px 5% 0px 5%"}} >
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{
          lat: 12.9862559,
          lng: 77.7566411,
        }}
      >
        {this.displayMarkers()}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
      </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAW0Bn_OXc2Ng-_O0iGbCxgPQJ_I656iOY",
})(SelectHotel);
