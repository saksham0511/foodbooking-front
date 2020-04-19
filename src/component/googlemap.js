import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import CurrentLocation from "./Map";

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const { onCurrentLocation } = this.props;
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
        onCurrentLocation={onCurrentLocation}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={"current location"}
          draggable={true}
          animation={window.google.maps.Animation.DROP}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAW0Bn_OXc2Ng-_O0iGbCxgPQJ_I656iOY",
})(MapContainer);
