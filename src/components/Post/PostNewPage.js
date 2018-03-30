import React, {Component} from 'react';
import PostForm from './PostForm';

class PostNewPage extends Component {
  render() {
    return (<div className="col-md-8 col-md-offset-2">
      <br/>
      <PostForm history={this.props.history} match={this.props.match}/>
    </div>);
  }
}

export default PostNewPage;
