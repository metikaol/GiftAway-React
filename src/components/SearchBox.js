import React, { Component } from 'react';
import SearchForm from './SearchForm';
import { Post } from '../lib/requests';




class SearchBox extends Component {
  constructor (props) {
    super(props)

    }


  createSearch (params) {
    const param1 = params.search1.trim().split(" ").join("+")
    const param2 = params.search2.trim().split(" ").join("+")
    const latLng = params.latLng
    Post
      .search(param1,param2)
      .then(posts => {
        this.props.updatePosts(posts, latLng);

        // this.props.history.push(`/posts`);
        // window.location.reload()
    }
    )
  }



  render() {
  return (
    <div className="SearchBox col-md-8 col-md-offset-2">
      <SearchForm onSubmit={values => this.createSearch(values)}/>
    </div>
  );
  }
}

export default SearchBox;
