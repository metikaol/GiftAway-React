import { Collapse, Button, CardBody, Card } from 'reactstrap';
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
      collapse: false
    };
    this.toggle = this.toggle.bind(this);
  }
    toggle() {
      this.setState({ collapse: !this.state.collapse });
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

  render() {
    const { places } = this.state;

    return(
      <div style={{width: `1200px`, height: `550px`, marginLeft: "125px"}}>

        <div>
          <Button outline color="primary" onClick={this.toggle} style={{ marginBottom: '1rem', fontSize: 15 }}>Search</Button>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <SearchBox updatePosts={this.updatePosts.bind(this)}/>
              </CardBody>
            </Card>
          </Collapse>
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
