import React, {Component} from 'react';
import {Token} from '../lib/requests';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {Container, Row, Col, Alert} from 'reactstrap';
import {Link} from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    }

    this.createToken = this.createToken.bind(this);
  }

  createToken(event) {
    event.preventDefault();

    const {
      onSignIn = () => {}
    } = this.props;
    const formData = new FormData(event.currentTarget);

    Token.create({email: formData.get('email'), password: formData.get('password')}).then(data => {
      if (!data.errors) {
        localStorage.setItem('jwt', data.jwt);
        onSignIn()

        this.props.history.push('/posts');
        window.location.reload()
      } else {
        this.setState({
          errors: [
            {
              message: "Invalid username or password!"
            }
          ]
        });
      }
    })
  }

  render() {
    const {errors} = this.state;
    return (<section id="cover" className="HomePage"
      // style={{margin: '0 1rem'}}
>

      <div id="cover-caption">
        <div className="container">
          <div className="col-sm-10 col-sm-offset-1">
            {errors.map((e, i) => <Alert color="danger" className="alert" key={i}>{e.message}</Alert>)}
            <h1 className="display-1">
              Welcome to GiftAway</h1>
            <h1 className="display-2">
              <em>
                Space for giving !!
              </em>
            </h1>

            <div className="row mt-4">
              <div className="col d-flex justify-content-center">
                <form onSubmit={this.createToken}>
                  <div className="form-inline">
                    <div className="form-group mr-3">
                      <label className="sr-only" htmlFor='email'>Email</label>
                      <br/>
                      <input type='email' id='email' style={{
                          fontSize: 20
                        }} className="form-control form-control-lg" name='email' placeholder="Email"/>
                    </div>

                    <div className="form-group">
                      <label className="sr-only" htmlFor='password'>Password
                      </label>
                      <br/>
                      <input type='password' id='password' style={{
                          fontSize: 20
                        }} className="form-control form-control-lg" name='password' placeholder="Password"/>
                    </div>
                  </div>

                  <br/>
                  <div className="form-inline">
                    <button className="btn btn-info mr-3" style={{
                        fontSize: 20
                      }} input="input" type='submit'>Sign In
                    </button>

                    <Link className="btn btn-info" style={{
                        fontSize: 20
                      }} to={`/sign_up`}>
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>)
  }
}

export default HomePage;
