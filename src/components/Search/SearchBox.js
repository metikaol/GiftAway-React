import React, {Component} from 'react';
import SearchForm from './SearchForm';
import {Post} from '../../lib/requests';

class SearchBox extends Component {
  constructor(props) {
    super(props)

  }

  createSearch(params) {
    const param1 = params.search_item.trim().split(" ").join("+")
    const param2 = params.search_location.trim().split(" ").join("+")
    const latLng = params.latLng
    Post.search(param1, param2).then(posts => {
      this.props.updatePosts(posts, latLng);
    })
  }

  render() {
    return (<div className="SearchBox col-md-8 col-md-offset-2">
      <SearchForm onSubmit={values => this.createSearch(values)}/>
    </div>);
  }
}

export default SearchBox;
