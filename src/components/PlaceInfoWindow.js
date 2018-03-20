import React, { Component } from 'react'
import { InfoWindow } from 'react-google-maps'
import CarouselIndexPage from './CarouselIndexPage'

export class PlaceInfoWindow extends Component {
  render() {
    const {title, albums} = this.props

    return(
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div>
          <CarouselIndexPage
            images={albums}
          />
          <h1>{title}</h1>
        </div>
      </InfoWindow>
    );
  }
}

export default PlaceInfoWindow
