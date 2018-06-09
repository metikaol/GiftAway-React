import React, {Component} from 'react';
import PostForm from './PostForm';

class PostEditPage extends Component {
  render() {
    return (
      <div className="PostEdit col-md-8 col-md-offset-2">
        <br/>
        <PostForm history={this.props.history} match={this.props.match}/>
      </div>
    );
  }
}

export default PostEditPage;
