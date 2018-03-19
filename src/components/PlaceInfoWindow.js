import React, { Component } from 'react'
import { InfoWindow } from 'react-google-maps'

export class PlaceInfoWindow extends Component {
  render() {
    const {title} = this.props

    return(
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div>
          <h1>{title}</h1>
        </div>
      </InfoWindow>
    );
  }
}

export default PlaceInfoWindow
