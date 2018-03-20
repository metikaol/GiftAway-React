import React, { Component } from 'react'
import { InfoWindow } from 'react-google-maps'
import { Link } from 'react-router-dom';
import CarouselIndexPage from './CarouselIndexPage'

export class PlaceInfoWindow extends Component {
  render() {
    const {title, albums,id} = this.props

    return(
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div>
          <CarouselIndexPage
            images={albums}
          />
          <Link style={{fontSize: `25px`}} to={`/posts/${id}`}>
            {title}
          </Link>
        </div>
      </InfoWindow>
    );
  }
}

export default PlaceInfoWindow
