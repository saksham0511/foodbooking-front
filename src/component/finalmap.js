import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '80%',
  height: '400px'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };
  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};
  render() {
    const {bookingDetails} = this.props
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{
         lat:bookingDetails.user.location.latitude,
         lng: bookingDetails.user.location.longitude
        }}
      >
        <Marker
         position={{
          lat: bookingDetails.user.location.latitude,
          lng: bookingDetails.user.location.longitude,
        }}
          onClick={this.onMarkerClick}
          name={'Drop Point'}
        />
         <Marker
         position={{
          lat: bookingDetails.hotelLocation.latitude,
          lng: bookingDetails.hotelLocation.longitude,
        }}
          onClick={this.onMarkerClick}
          name={'Pickup Point'}
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
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAW0Bn_OXc2Ng-_O0iGbCxgPQJ_I656iOY'
})(MapContainer);