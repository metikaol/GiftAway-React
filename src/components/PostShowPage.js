import React, { Component } from 'react';
import { InfoWindow } from 'react-google-maps'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


// React is default import.
// Component (which must import with {}) is named import.

// To export a default, React has to `export default React`
// To export a named import, React does `export { Component }`
// where `Component` is the name of a variable inside
// the React library.


import PostDetails from './PostDetails';
import AnswerForm from './AnswerForm';
import AnswerList from './AnswerList';
import CarouselIndexPage from './CarouselIndexPage';
import { Post, Answer } from '../lib/requests';

class PostShowPage extends Component {
  constructor (props) {
    super(props);


    this.state = {
      post: {},
      loading: true,
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.createAnswer.bind(this);
  }

  componentDidMount () {
    const postId = this.props.match.params.id;

    Post
      .one(postId)
      .then(
        post => {
          this.setState({
            post: post,
            loading: false
          })
        }
      )
  }

  deleteAnswer (answerId) {
    const {post} = this.state;
    const {answers} = post;

    this.setState({
      post: {
        ...post,
        // The order in which properties are spread or added to object
        // affect priority. Last is more important.
        answers: answers.filter(answer => answer.id !== answerId)
      }
    })
  }

  createAnswer (params, id) {
    const answerParams = {
      id: id,
      answer: params
    }

    Answer
      .create(answerParams)
      .then(data => {
        // const id = data.id
        // const { id } = data;

        // Components rendered by the <Route /> component
        // gain access to a .history than can be used to manipulate
        // history. Using allows to redirect a user to
        // a different rendering whichever component is there.
        // this.props.history.push(`/posts/${id}`);
        // reload the current page with updated data
        window.location.reload()
      })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render () {
    const { post, loading } = this.state;

    if (loading) {
      return (
        <main
          className="PostShowPage d-flex align-items-center justify-content-center"
          style={{
            margin: '0 1rem'
          }}
        >
          <h4>Loading...</h4>
        </main>
      );
    }

    if (!post.id) {
      return (
        <main
          className="PostShowPage d-flex align-items-center justify-content-center"
          style={{
            margin: '0 1rem'
          }}
        >
          <h2>Post doesn't exist!</h2>
        </main>
      )
    }
    // To pass props to React elements, set them with
    // "HTML attrbutes" inside JSX. Each attribute will
    // act as a property of the component's `props` object.

    // 1rem is == to the font-size of the root tag (<html> ...).
    return (
      // <InfoWindow
      //   onCloseClick={this.props.closeWindow}>
      //     <div>
      //       <Link to={`/posts/${post.id}`}>
      //         {post.title}
      //       </Link>
      //     </div>
      //   </InfoWindow>


      <main
        className="PostShowPage"
        style={{
          margin: '0 1rem'
        }}
        >
          <CarouselIndexPage
            images={post.albums}
          />
          <PostDetails {...post} />

          <Button outline color="primary" style={{ fontSize: 15}} onClick={this.toggle}>{this.props.buttonLabel}Contact Donator</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Reply</ModalHeader>
            <ModalBody>
              <AnswerForm onSubmit={values => this.createAnswer(values, post.id)}/>
          {/* <AnswerList
            answers={post.answers}
            onAnswerDeleteClick={this.deleteAnswer}
          /> */}
        </ModalBody>
      </Modal>

        </main>
      )
  }
}

export default PostShowPage;
