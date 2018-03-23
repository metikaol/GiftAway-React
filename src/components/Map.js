import { Button, Fade } from 'reactstrap';
import SearchBox from './SearchBox';
import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'
import PlaceMarker from './PlaceMarker';
import { Maps } from '../lib/requests';
const DOMAIN = 'http://localhost:3000';






const GiftAwayMap = withGoogleMap(props => {
  return (
  <GoogleMap
    ref={props.onMapMounted}
    onZoomChanged={props.handleMapChanged}
    onDragEnd={props.handleMapChanged}
    onBoundsChanged={props.handleMapFullyLoaded}
    defaultCenter={props.center}
    defaultZoom={props.zoom}
    center={{
      lat: props.center.lat,
      lng: props.center.lng,
    }}
    >


    {
      props.places.length > 0 && props.places.map(place => (
        <PlaceMarker key={`place${place.id}`}
                     id={place.id}
                     lat={place.latitude}
                     lng={place.longitude}
                     title={place.title}
                     albums={place.albums}
                     />
      ))
    }
  </GoogleMap>
)});

class Map extends Component {
  constructor(props) {
    super(props)

    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }

    this.mapFullyLoaded = false

    this.zoom = 12

    this.state = {
      places: [],
      center: {
        lat: 49.246292,
        lng: -123.116226
      },
      fadeIn: false
    };

    this.toggle = this.toggle.bind(this);
  }

  handleMapChanged() {
    this.getMapBounds()
    this.setMapCenterPoint()
  }

  handleMapMounted(map) {
    this.map = map
  }

  handleMapFullyLoaded() {
    if (this.mapFullyLoaded)
      return

    this.mapFullyLoaded = true
    this.handleMapChanged()
    this.fetchPlacesFromApi()
  }

  setMapCenterPoint() {
    this.setState({
      center: {
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
      }
    })
  }

  fetchPlacesFromApi() {

    fetch(`${DOMAIN}/api/v1/posts?min_lng=${this.xMapBounds.min}&max_lng=${this.xMapBounds.max}&min_lat=${this.yMapBounds.min}&max_lat=${this.yMapBounds.max}`,
      { method: 'GET' },
      {
        headers: {
          'Authorization': localStorage.getItem('jwt')
        }
      })
      .then((response) => response.json())
      .then((response) => this.setState({ places: response }))
      .catch((response)=> console.log(response))
  }

  updatePosts (posts, latLng){
    this.setState({
      places: posts,
        center: {
          lat: latLng ? latLng.lat : this.state.center.lat,
          lng: latLng ? latLng.lng : this.state.center.lng,
        },
    })
  }


  getMapBounds() {
    var mapBounds = this.map.getBounds()
    var xMapBounds = mapBounds.b
    var yMapBounds = mapBounds.f

    this.xMapBounds.min = xMapBounds.b
    this.xMapBounds.max = xMapBounds.f

    this.yMapBounds.min = yMapBounds.f
    this.yMapBounds.max = yMapBounds.b
  }

  toggle() {
      this.setState({
          fadeIn: !this.state.fadeIn
      });
      console.log("toggle")
  }

  render() {
    const { places } = this.state;

    return(
      <div style={{width: `750px`, height: `750px`}}>

        <div>
            <Button color="primary" onClick={this.toggle}>Toggle Fade</Button>
            <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
              hello
            </Fade>
            {this.state.fadeIn ? (
              <SearchBox updatePosts={this.updatePosts.bind(this)}/>
            ) : (
              ""
            )}
        </div>


        {/* <ul>
          <li>lng: {this.state.center.lng}</li>
          <li>lat: {this.state.center.lat}</li>
          <li>xMapBounds.min: {this.xMapBounds.min}</li>
          <li>xMapBounds.max: {this.xMapBounds.max}</li>
          <li>yMapBounds.min: {this.yMapBounds.min}</li>
          <li>yMapBounds.max: {this.yMapBounds.max}</li>
        </ul> */}

        <GiftAwayMap
          onMapMounted={this.handleMapMounted.bind(this)}
          handleMapChanged={this.handleMapChanged.bind(this)}
          handleMapFullyLoaded={this.handleMapFullyLoaded.bind(this)}
          center={{lat: this.state.center.lat,
                   lng: this.state.center.lng
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
