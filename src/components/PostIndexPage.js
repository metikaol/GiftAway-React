import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import Field from './Field';
import { Post } from '../lib/requests';
import CarouselIndexPage from './CarouselIndexPage';
import SearchBox from './SearchBox';



// The React Component parent class is also available
// as a property of the React default import object.
class PostIndexPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: [],
      loading: true
    }

    // When using a method as a callback, we must bind
    // this to otherwise we won't have access to any properties
    // of `this` include the state, setState and the props.

    // `.bind()` is a method of functions that effectively
    // creates new function that is copy of the function
    // where `this` is bound permanently.
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
    // Everytime you want to change the state, use the this.setState()
    // method. This will notify React that it potentially needs
    // to update the DOM based on the new data in the state.

    // Modifying this.state directly will cause headaches and not
    // reflect any changes to the DOM.
    // DO NOT DO IT! 😱
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

  updatePosts (posts){
    this.setState({
      posts: posts
    })
  }

  render () {
    const { posts, loading } = this.state;
    // console.log('post', posts)

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
      <main
        className="PostIndexPage"
        style={{margin: '0 1rem',
                boder: "10px"
              }}
        >
          <h2>Posts</h2>
          <div>
          <SearchBox updatePosts={this.updatePosts}/>
          </div>

          <div>
          <ul>
            {
              posts.map(
                post => (
                  <Card body outline color="secondary">
                    <li key={post.id}>
                    <CarouselIndexPage
                    images ={post.albums}
                  />
                  <CardBody>
                    <CardTitle>
                    <Link to={`/posts/${post.id}`}>
                      {post.title}
                    </Link>
                    </CardTitle>
                    {/* <Field name="Author" value={post.author.full_name} /> */}
                    <Field name="Location" value={post.address} />
                    <button
                      data-id={post.id}
                      onClick={this.deletePost}
                    >Delete</button>
                    </CardBody>
                  </li>
                  </Card>


                )
              )
            }
          </ul>
        </div>
      </main>
      )
  }
}

export default PostIndexPage;
