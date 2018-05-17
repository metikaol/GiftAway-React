import React, { Component } from 'react';
import { User } from '../lib/requests';
import FormErrors from './FormErrors';



class SignUpPage extends Component {
  constructor (props) {
    super(props);

      this.state = {
        errors: []
      }
      this.handleSubmit = this.handleSubmit.bind(this)
    }


  handleSubmit(event) {
    event.preventDefault();
    const { onSignUp = () => {} } = this.props;
    const formData = new FormData(event.currentTarget);

    User.create({
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      contact_number: formData.get('contact_number'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation')
    }).then(data => {
      if (data.jwt) {
        const jwt = data.jwt;
        localStorage.setItem('jwt', jwt);
        onSignUp();
        this.props.history.push('/posts');
        window.location.reload()
      }else {
        this.setState({
          errors: data
      })
     }
    });
  }

  render () {
    const { errors } = this.state;

    return (
      <div className="SignUp container mt-5">
        <h1 className="mt-5 mb-4">Create Account</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="first_name">First Name</label>
            <input className="form-control" name="first_name" id="first_name" />
            <FormErrors forField="first_name" errors={errors} />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input className="form-control" name="last_name" id="last_name" />
            <FormErrors forField="last_name" errors={errors} />
          </div>
          <div>
            <label htmlFor="contact_number">Contact Number</label>
            <input className="form-control" name="contact_number" id="contact_number" />
            <FormErrors forField="contact_number" errors={errors} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input className="form-control" type="email" name="email" id="email" />
            <FormErrors forField="email" errors={errors} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input className="form-control" type="password" name="password" id="password" />
            <FormErrors forField="password" errors={errors} />
          </div>
          <div>
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input className="form-control"
              type="password"
              name="password_confirmation"
              id="password_confirmation"
            />
            <FormErrors forField="password_confirmaiton" errors={errors} />
          </div>
          <input className="btn btn-outline-info mt-5" style={{ fontSize: 20}} type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default SignUpPage;
