import React, { Component } from 'react';
import PostForm from './PostForm';
import { Post } from '../lib/requests';

class PostNewPage extends Component {
  constructor (props) {
    super(props);
    this.createPost = this.createPost.bind(this);
  }

  createPost (postParams) {
    Post
      .create(postParams)
      .then(data => {
        // const id = data.id
        const { id } = data;

        // Components rendered by the <Route /> component
        // gain access to a .history than can be used to manipulate
        // history. Using allows to redirect a user to
        // a different rendering whichever component is there.
        this.props.history.push(`/posts/${id}`);
      })
  }

  render () {
    return (
      <main
        className="PostNewPage"
        style={{margin: '0 1rem'}}
      >
        <h1>New Post</h1>
        <PostForm
          onSubmit={this.createPost}
        />
      </main>
    );
  }
}

export default PostNewPage;
