import React, { Component } from 'react';
import axiosClient from '../lib/axiosClient';
import './Index.css';

class PostForm extends Component {
  state = {
    selectedPostCoverFiles: [],
    submitFormProgress: 0,
    isSubmittingForm: false,
    didFormSubmissionComplete: false,
    post: {
      id: this.props.match.params.id,
      title: '',
      body: '',
      errors: {}
    }
  };

  componentWillMount() {
    if (this.props.match.params.id) {
      axiosClient.get(`/posts/${this.props.match.params.id}`).then(response => {
        // if (!response.ok) {
        //   console.log('inside error', response.);
        //   //handler errors
        // } else {
          // console.log(response.data);
          this.setState({
            selectedPostCoverFiles: response.data.cover_photos,
            post: {
              id: response.data.id,
              title: response.data.title,
              body: response.data.body,
              errors: {}
            }
          });
        // }
      });
    }
  }

  getNumberOfSelectedFiles() {
    return this.state.selectedPostCoverFiles.filter(el => {
      return el._destroy !== true;
    }).length;
  }

  render() {
    return (
      <div className="PostForm">
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              onChange={e => this.handlePostTitleChange(e)}
              value={this.state.post.title}
              className="form-control"
            />
            {this.renderPostTitleInlineError()}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              type="text"
              onChange={e => this.handlePostDescriptionChange(e)}
              value={this.state.post.body}
              className="form-control"
            />
            {this.renderPostDescriptionInlineError()}
          </div>
          <div className="form-group">
            <label>Covers</label>
            {this.renderUploadCoversButton()}
            {this.renderSelectedPostCoverFiles()}
          </div>
          {this.renderUploadFormProgress()}
          <button
            disabled={this.state.isSubmittingForm}
            onClick={e => this.handleFormSubmit()}
            className="btn btn-primary">
            {this.state.isSubmittingForm ? 'Saving...' : 'Save'}
          </button>
          &nbsp;
          <button
            disabled={this.state.isSubmittingForm}
            onClick={e => this.handleCancel()}
            className="btn btn-default">
            Cancel
          </button>
        </form>
        <br />
      </div>
    );
  }

  renderUploadCoversButton() {
    let numberOfSelectedCovers = this.getNumberOfSelectedFiles();
    return (
      <div>
        <input
          name="covers[]"
          ref={field => (this.postCoversField = field)}
          type="file"
          disabled={this.state.isSubmittingForm}
          multiple={true}
          accept="image/*"
          style={{
            width: 0.1,
            height: 0.1,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
          }}
          id="post_covers"
          onChange={e => this.handlePostCoversChange(e)}
          className="form-control"
        />
        <label
          disabled={this.state.isSubmittingForm}
          className="btn btn-success"
          htmlFor="post_covers">
          <span className="glyphicon glyphicon-cloud-upload" />
          &nbsp; &nbsp;
          {numberOfSelectedCovers === 0
            ? 'Upload Files'
            : `${numberOfSelectedCovers} file${numberOfSelectedCovers !== 1
                ? 's'
                : ''} selected`}
        </label>
      </div>
    );
  }

  renderSelectedPostCoverFiles() {
    let fileDOMs = this.state.selectedPostCoverFiles.map((el, index) => {
      if (el._destroy) {
        return null;
      }

      return (
        <li key={index}>
          <div className="photo">
            <img
              width={150}
              src={el.id ? el.url : URL.createObjectURL(el)}
              style={{ alignSelf: 'center' }}
            />
            <div
              className="remove"
              onClick={() => this.removeSelectedPostCoverFile(el, index)}>
              <span style={{ top: 2 }} className="glyphicon glyphicon-remove" />
            </div>
          </div>
          <div className="file-name">
            {el.name}
          </div>
        </li>
      );
    });

    return (
      <ul className="selected-covers">
        {fileDOMs}
      </ul>
    );
  }

  renderUploadFormProgress() {
    if (this.state.isSubmittingForm === false) {
      return null;
    }

    return (
      <div className="progress">
        <div
          className={
            'progress-bar progress-bar-info progress-bar-striped' +
            (this.state.submitFormProgress < 100 ? 'active' : '')
          }
          role="progressbar"
          aria-valuenow={this.state.submitFormProgress}
          areaValuemin="0"
          areaValuemax="100"
          style={{ width: this.state.submitFormProgress + '%' }}>
          {this.state.submitFormProgress}% Complete
        </div>
      </div>
    );
  }

  removeSelectedPostCoverFile(cover, index) {
    let { selectedPostCoverFiles } = this.state;
    if (cover.id) {
      selectedPostCoverFiles[index]._destroy = true;
    } else {
      selectedPostCoverFiles.splice(index, 1);
    }

    this.setState({
      selectedPostCoverFiles: selectedPostCoverFiles
    });
  }

  handlePostCoversChange() {
    let selectedFiles = this.postCoversField.files;
    let { selectedPostCoverFiles } = this.state;
    for (let i = 0; i < selectedFiles.length; i++) {
      selectedPostCoverFiles.push(selectedFiles.item(i));
    } //end for

    this.setState(
      {
        selectedPostCoverFiles: selectedPostCoverFiles
      },
      () => {
        this.postCoversField.value = null;
      }
    );
  }

  handlePostTitleChange(e) {
    let { post } = this.state;
    post.title = e.target.value;
    this.setState({ post: post });
  }

  handlePostDescriptionChange(e) {
    let { post } = this.state;
    post.body = e.target.value;
    this.setState({ post: post });
  }

  renderPostTitleInlineError() {
    if (this.state.post.errors.title) {
      return (
        <div className="inline-error alert alert-danger">
          {this.state.post.errors.title.join(', ')}
        </div>
      );
    } else {
      return null;
    }
  }

  renderPostDescriptionInlineError() {
    if (this.state.post.errors.body) {
      return (
        <div className="inline-error alert alert-danger">
          {this.state.post.errors.body.join(', ')}
        </div>
      );
    } else {
      return null;
    }
  }

  handleCancel() {
    this.props.history.push('/posts');
  }

  buildFormData() {
    let formData = new FormData();
    formData.append('post[title]', this.state.post.title);
    formData.append('post[body]', this.state.post.body);

    let { selectedPostCoverFiles } = this.state;
    for (let i = 0; i < selectedPostCoverFiles.length; i++) {
      let file = selectedPostCoverFiles[i];
      if (file.id) {
        if (file._destroy) {
          formData.append(`post[albums_attributes][${i}][id]`, file.id);
          formData.append(`post[albums_attributes][${i}][_destroy]`, '1');
        }
      } else {
        formData.append(
          `post[albums_attributes][${i}][photo]`,
          file,
          file.name
        );
      }
    }

    return formData;
  }

  submitForm() {
    let submitMethod = this.state.post.id ? 'patch' : 'post';
    let url = this.state.post.id
      ? `/posts/${this.state.post.id}.json`
      : '/posts.json';

    axiosClient
      [submitMethod](url, this.buildFormData(), {
        onUploadProgress: progressEvent => {
          let percentage = progressEvent.loaded * 100.0 / progressEvent.total;
          this.setState({
            submitFormProgress: percentage
          });
        }
      })
      .then(response => {
        this.setState({
          didFormSubmissionComplete: true
        });
        this.props.history.push('/posts');
      })
      .catch(error => {
        let { post } = this.state;
        post.errors = error.response.data;
        this.setState({
          isSubmittingForm: false,
          submitFormProgress: 0,
          post: post
        });
      });
  }

  handleFormSubmit() {
    let { post } = this.state;
    post.errors = {};
    this.setState(
      {
        isSubmittingForm: true,
        post: post
      },
      () => {
        this.submitForm();
      }
    );
  }
}

export default PostForm;
