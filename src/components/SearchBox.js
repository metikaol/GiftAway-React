import React, { Component } from 'react';
import SearchForm from './SearchForm';


class SearchBox extends Component {

  createSearch (params) {
    const searchParams = {
      search: params
    }

    Post
      .all(searchParams)
      .then(data => {

        window.location.reload()
      })
  }



  render() {
  return (
    <div className="PostNew col-md-8 col-md-offset-2">
      <h2>Search</h2>
      <SearchForm onSubmit={values => this.createSearch(values)}/>
    </div>
  );
  }
}

export default PostNewPage;
