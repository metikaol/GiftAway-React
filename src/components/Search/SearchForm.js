import React, {Component} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = props.onSubmit;
    this.state = {
      search_location: ''
    }
    this.onChangeAddress = (address) => {
      this.setState({search_location: address});
      geocodeByAddress(this.state.search_location).then(results => getLatLng(results[0])).then((latLng) => {
        console.log('Success', latLng);
        this.setState({latLng: latLng});
      }).catch(error => console.error('Error', error))
    }
  };

  // props.onSubmit

  handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // See key => values from formData object
    // console.log(
    //   Array.from(formData.entries())
    // )
    this.onSubmit({search_item: formData.get('search_item'), search_location: formData.get('search_location'), latLng: this.state.latLng});
  }

  render() {
    // const cssClasses = {
    //   root: 'form-group',
    //   input: 'form-control',
    // }
    return (<Form className="SearchForm" onSubmit={this.handleSubmit}>
      <div className="form-group mt-3">
        {/* <label htmlFor="search_location">Search by location</label> <br /> */}
        <PlacesAutocomplete inputProps={{
            value: this.state.search_location,
            onChange: this.onChangeAddress,
            name: "search_location",
            placeholder: "Location"
          }}
          // classNames={cssClasses}
        />
      </div>

      <FormGroup>
        <input className="form-control" style={{
            fontSize: 15
          }} name="search_item" id="search_item" placeholder="  Item"/>
      </FormGroup>

      <Button className="mb-3" type="submit" outline style={{
          fontSize: 15
        }} value="Submit" color="info">Submit</Button>
    </Form>)
  }
}

export default SearchForm;
