import React, {Component} from 'react'
import {InfoWindow} from 'react-google-maps'
import {Link} from 'react-router-dom';
import CarouselMapPage from './CarouselMapPage'
import TimeAgo from 'react-timeago'

export class PlaceInfoWindow extends Component {
  render() {
    const {title, albums, id, created_at} = this.props

    return (<InfoWindow onCloseClick={this.props.closeWindow}>
      <div>
        <CarouselMapPage images={albums}/>
        <Link style={{
            fontSize: `25px`
          }} to={`/posts/${id}`}>
          {title}
        </Link><br/>
        <TimeAgo date={created_at}/>

      </div>
    </InfoWindow>);
  }
}

export default PlaceInfoWindow
