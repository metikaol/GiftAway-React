import React, {Component} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = props.onSubmit;
    this.state = {
      search2: ''
    }
    this.onChangeAddress = (address) => {
      this.setState({search2: address});
      geocodeByAddress(this.state.search2).then(results => getLatLng(results[0])).then((latLng) => {
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
    this.onSubmit({search1: formData.get('search1'), search2: formData.get('search2'), latLng: this.state.latLng});
  }

  render() {
    // const cssClasses = {
    //   root: 'form-group',
    //   input: 'form-control',
    // }
    return (<Form className="SearchForm" onSubmit={this.handleSubmit}>
      <div className="form-group">
        {/* <label htmlFor="search2">Search by location</label> <br /> */}
        <PlacesAutocomplete inputProps={{
            value: this.state.search2,
            onChange: this.onChangeAddress,
            name: "search2",
            placeholder: "Location"
          }}
          // classNames={cssClasses}
        />
      </div>

      <FormGroup>
        <input className="form-control" style={{
            fontSize: 15
          }} name="search1" id="search1" placeholder="  Item"/>
      </FormGroup>

      <Button type="submit" outline="outline" style={{
          fontSize: 15
        }} value="Submit" color="primary">Submit</Button>
    </Form>)
  }
}

export default SearchForm;
