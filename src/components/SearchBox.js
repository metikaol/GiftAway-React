import React, { Component } from 'react';
import SearchForm from './SearchForm';
import { Post } from '../lib/requests';


class SearchBox extends Component {
  constructor (props) {
    super(props)

    }


  createSearch (params) {
    const param1 = params.search1.split(" ").join("+")
    const param2 = params.search2.split(" ").join("+")
        // param = param.split(" ").join("+")
        // debugger
    Post
      .search(param1,param2)
      .then(posts => {
        console.log("posts in",posts)
        this.props.updatePosts(posts);
        //
        // this.setState({
        //   posts: posts,
        //   loading: false
        // console.log('posts',posts)
        // this.props.history.push(`/posts`);
        // this.props.history.push(`/map`);
        // window.location.reload()
      // })
    }
    )
  }



  render() {
  return (
    <div className="SearchBox col-md-8 col-md-offset-2">
      <h2>Search</h2>
      <SearchForm onSubmit={values => this.createSearch(values)}/>
      {/*  if this.state.products -> List of products that came back from the server */}
    </div>
  );
  }
}

export default SearchBox;
