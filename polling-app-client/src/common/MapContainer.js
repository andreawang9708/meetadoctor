import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import React, { Component } from 'react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // this is just an example. Markers are fetched from BestLivings
      nyc: this.props.mapInfo,
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    }
    this.displayHostLink = this.displayHostLink.bind(this);
    this.displayMovieLink = this.displayMovieLink.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    console.log(this.state.nyc);
  }

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

  displayHostLink (address, rating, hospitalName, ranking){

    return (
      <div class="hostLink">

        <p>rating: {rating}</p>
        <p>address: {address} </p>
        <p>ranking: {ranking} </p>
      </div>
    );
  }

  displayMovieLink (link, scene){
    // additional icons: https://sites.google.com/site/gmapsdevelopment/
    return (
      <div class="imdmLink">
        <p>This place is used for a {scene} scene, please <a href = {link} target="popup">click here</a> for more: </p>
      </div>
    );

  }

  render() {
    const mapStyles = {
	  	width: '100%',
	  	height: '100%',
      overflowX: "hidden",
      overflowY: "hidden"
		};
    const containerStyle = {
      maxWidth: "92%",
      height: "350px"
     };
    return (


          <Map
            google={this.props.google}
            zoom={10}
            style={mapStyles}
            containerStyle={containerStyle}
            initialCenter={{ lat: 39.9526, lng: -75.1652}}  //center of philly
          >
              {this.state.nyc.map((info, index) => {
                if (info.film !== undefined){
                  console.log(info.film);
                  return (
                    <Marker key={index} id={index} position={{lat: info.latitude, lng: info.longitude}}
                      onClick = {this.onMarkerClick}
                      name = {'Part of "'+info.film + '" is filmed here!'}
                      subText = {this.displayMovieLink(info.imdb_link, info.scene_type)}
                      options = {{icon: {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}}}
                    />
                  );
                }
                else {
                  console.log(info.name);
                  return (
                    <Marker key={index+50} id={index+50} position={{lat: info.latitude, lng: info.longitude}}
                      onClick = {this.onMarkerClick}
                      name = {info.hospitalName}
                      subText = {this.displayHostLink(info.address, info.rating, info.hospitalName, info.ranking)}
                      options = {{icon: {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}}}
                    />
                  );
                }
              })}


            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
                <p>{this.state.selectedPlace.subText}</p>
              </div>
            </InfoWindow>
          </Map>

    );
  }
}

export default GoogleApiWrapper({
  // This is important! Do not leak it!
  apiKey: 'AIzaSyA0rycsA7bNG_uKcvXq7i5wIcYmOIalCQs'
})(MapContainer);
