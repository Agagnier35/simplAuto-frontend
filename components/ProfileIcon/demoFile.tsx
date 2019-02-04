import _ from "lodash";

import {
  default as React,
  Component,
} from "react";

import Helmet from "react-helmet";

import {
  GoogleMapLoader,
  withGoogleMap,
  GoogleMap,
  Marker,
  SearchBox,
  InfoWindow,
} from "google-maps-react";

// mobx
import {observer} from 'mobx-react'
import {observable} from 'mobx'

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 */
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={3}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    onClick={props.onMapClick}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Customized your placeholder"
      inputStyle={INPUT_STYLE}
    />
    ...
  </GoogleMap>
));

const Browse = observer(class Browse extends Component {

  constructor(props) {
    super(props)

    this.populateMap(this.props.properties);

    // this.state ONLY FOR vars, not for functions.
    // if i need to change state, use this.setState({})  
    this.state = observable({
      bounds: null,
      center: {
        lat: 25.363882,
        lng: -80.044922,
      },
      properties: this.props.properties,
      markers: [],
    });

    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
  }

  didFinishLoadingMarkers(markers) {
    this.setState({markers: markers});
  }

  //... removed this code to make it all easier to read...

  // test

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
    console.log('handleBoundsChanged')
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
    console.log('handleSearchBoxMounted')
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
    console.log('handlePlacesChanged')
    this.setState({
      center: mapCenter,
      markers,
    });
  }
  // end test

  render() {
    return (
      <div className='container-fluid full-height'>
        <div className='row full-height'>
          <div className='col-xs-6 full-height map-position'>
            <GettingStartedGoogleMap
              containerElement={
                <div style={{ height: `100%` }} />
              }
              mapElement={
                <div style={{ height: `100%`, position: `static` }} />
              }
              center={this.state.center}
              onMapMounted={this.handleMapMounted}
              onMapClick={this.handleMapClick}
              markers={this.state.markers}
              onMarkerClick={this.handleMarkerClick}
              onBoundsChanged={this.handleBoundsChanged}
              onSearchBoxMounted={this.handleSearchBoxMounted}
              bounds={this.state.bounds}
              onPlacesChanged={this.handlePlacesChanged}
            />
          </div>
          <div className='col-xs-6 full-height pull-right'>
            <h1>Browse All Properties</h1>
            {this.props.properties.map(function(property, i) {
              return (
                <div key={i}>
                  <a href={'housing_applications/' + property.id}>{property.name}</a>
                </div>
              )
            }, this)}
          </div>
        </div>
      </div>
    );
  }
})

export default Browse

ReactOnRails.register({ Browse });