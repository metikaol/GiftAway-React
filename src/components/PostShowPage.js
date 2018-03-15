import React, { Component } from 'react';
// React is default import.
// Component (which must import with {}) is named import.

// To export a default, React has to `export default React`
// To export a named import, React does `export { Component }`
// where `Component` is the name of a variable inside
// the React library.

import PostDetails from './PostDetails';
import AnswerForm from './AnswerForm';
import AnswerList from './AnswerList';
import { Post, Answer } from '../lib/requests';

class PostShowPage extends Component {
  constructor (props) {
    // When class based component is first initialize, the
    // `props` are passed to the constructor. When inside constructor
    // and only when inside, you should use `props` without `this.`.
    super(props);
    // When overriding the Component's constructor, we must
    // always use `super(props);` to call the constructor of
    // the Component class. This configures our component such
    // as setting the `props` on `this`.

    this.state = {
      post: {},
      loading: true
    };

    this.delete = this.delete.bind(this);
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

  delete () {
    this.setState({
      post: {}
    });
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

  render () {
    const { post, loading } = this.state;

    if (loading) {
      return (
        <main
          className="PostShowPage"
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
          className="PostShowPage"
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
      <main
        className="PostShowPage"
        style={{
          margin: '0 1rem'
        }}
        >
          <PostDetails {...post} />
          <button
            onClick={this.delete}
          >
            Delete
          </button>
          <h3>Answers</h3>
          <AnswerForm onSubmit={values => this.createAnswer(values, post.id)}/>
          <AnswerList
            answers={post.answers}
            onAnswerDeleteClick={this.deleteAnswer}
          />
        </main>
      )
  }
}

export default PostShowPage;
