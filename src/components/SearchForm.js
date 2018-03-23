import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class SearchForm extends Component {

  constructor(props) {
    super(props);
      this.onSubmit = props.onSubmit;
      this.state = { search2: '' }
      this.onChangeAddress = (address) => {
        this.setState({ search2: address });
        geocodeByAddress(this.state.search2)
          .then(results => getLatLng(results[0]))
          .then(
            (latLng) => { console.log('Success', latLng);
            this.setState({latLng: latLng});
         })
          .catch(error => console.error('Error', error))
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
    this.onSubmit({
      search1: formData.get('search1'),
      search2: formData.get('search2'),
      latLng: this.state.latLng,
    });
  }

  render () {
    return (
    <form
      className="SearchForm"
      onSubmit={this.handleSubmit}
    >
      <div>
        <label htmlFor="search2">Search by location</label> <br />
        <PlacesAutocomplete inputProps={{
          value: this.state.search2,
          onChange: this.onChangeAddress,
          name: "search2",
        }}/>
        {/* <input name="search2" id="search2" /> */}
      </div>

      <div>
        <label htmlFor="search1">Search by specific Item</label> <br />
        <input name="search1" id="search1" cols="60" rows="4" />
      </div>

      <div>
        <input type="submit" value="Submit"/>
      </div>
    </form>
    )
  }
}

export default SearchForm;
