import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'
import PlaceMarker from './PlaceMarker';

const GiftAwayMap = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={props.center}
    defaultZoom={props.zoom}>
    {props.places}
  </GoogleMap>
));

class Map extends Component {
  constructor(props) {
    super(props)

    this.zoom = 14

    this.state = {
      lat: 49.246292,
      lng: -123.116226
    };
  }

  render() {
    const {lat, lng} = this.state;
    const places = [<PlaceMarker lat={lat} lng={lng} title={"hi"}/>]

    return(
      <div style={{width: `750px`, height: `750px`}}>
        <GiftAwayMap
          center={{
            lat: lat,
            lng: lng
          }}
          places={places}
          zoom={this.zoom}
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
      </div>
    );
  }
}

export default Map
