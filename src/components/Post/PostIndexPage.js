import { Card, CardBody,
    Collapse, Button, CardFooter } from 'reactstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../lib/requests';
import CarouselIndexPage from './CarouselIndexPage';
import SearchBox from '../Search/SearchBox';
import LocationIcon from '../../images/location_icon.png';
import TimeAgo from 'react-timeago'



// The React Component parent class is also available
// as a property of the React default import object.
class PostIndexPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: [],
      loading: true,
      collapse: false
    }

    // When using a method as a callback, we must bind
    // this to otherwise we won't have access to any properties
    // of `this` include the state, setState and the props.

    // `.bind()` is a method of functions that effectively
    // creates new function that is copy of the function
    // where `this` is bound permanently.
    this.toggle = this.toggle.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.addPost = this.addPost.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
  }

  componentDidMount () {
    Post
      .all()
      .then(
        posts => {
          this.setState({
            posts: posts,
            loading: false
          });
        }
      );
  }

  deletePost (event) {
    const {currentTarget} = event
    // console.log(currentTarget.dataset.id)

    const {posts} = this.state;
    const postId = parseInt(currentTarget.dataset.id, 10);
    // console.log(postId)
    // To delete a post, will have to update the state
    // to version of the state where that post is no longer
    // present.
    this.setState({
      posts: posts
        .filter(post => post.id !== postId)
    })

    Post
    .delete(postId)
    this.props.history.push(`/posts`)
  }

  addPost (newPost) {
    const {posts} = this.state;

    // 👇 hack because we don't have authors
    newPost.author = {full_name: 'Dr. Zoidberg'}
    this.setState({
      posts: [
        newPost,
        ...posts
      ]
    })
  }

  handleEdit(postId) {
  this.props.history.push(`/posts/${postId}/edit`);
  }

  updatePosts (posts){
    this.setState({
      posts: posts
    })
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }


  render () {
    const { posts, loading } = this.state;
    const { user } = this.props;

    if (loading) {
      return (
        <main
          className="PostIndexPage"
          style={{margin: '0 1rem'}}
        >
          <h2>Posts</h2>
          <h4>Loading...</h4>
        </main>
      )
    }


    return (
          <main className="container mt-3">


            <Button className="ml-3" outline color="info" onClick={this.toggle} style={{ marginBottom: '1rem', fontSize: 15 }}>Search</Button>
            <Collapse isOpen={this.state.collapse}>
              <Card>
                <CardBody>
                  <SearchBox updatePosts={this.updatePosts}/>
                </CardBody>
              </Card>
            </Collapse>


          {/* <h2>Posts</h2> */}
          <div className="indexCard d-flex flex-wrap">
                {
                  posts.map(
                    post => (
                      <div key={post.id} className="card blog">
                        <div className="card-body">

                        <CarouselIndexPage
                        images ={post.albums}
                      />

                        <Link className="ml-2" style={{fontSize: 20}} to={`/posts/${post.id}`}>
                          {post.title}
                        </Link>

                        {/* <Field name="Author" value={post.author.full_name} /> */}
                        <p className="ml-2"><img width="35px" height="35px" className="rounded" src={LocationIcon} /> {post.address}</p>
                        <TimeAgo className="ml-2" date={post.created_at} />
                        {/* <p>{post.author.id}</p>
                        <p>{user.id}</p> */}
                        {post.author.id === user.id ?
                          <div className="card-body ">
                            <button className="btn btn-outline-danger btn-lg ml-2"
                              data-id={post.id}
                              onClick={this.deletePost}
                              >Delete</button>
                              <button
                                onClick={e => this.handleEdit(post.id)}
                                className="btn btn-outline-secondary ml-3 btn-lg">
                                Edit
                              </button>
                          </div>
                          : ''}
                    </div>
                  </div>
                    )
                  )
                }
          </div>
      </main>

      )
  }
}

export default PostIndexPage;
