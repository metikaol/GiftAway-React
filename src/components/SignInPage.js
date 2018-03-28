import React, { Component } from 'react';
import { Token } from '../lib/requests';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col, Alert } from 'reactstrap';

class SignInPage extends Component {
  constructor (props) {
    super(props);

      this.state = {
        errors: []
      }

    this.createToken = this.createToken.bind(this);
  }

  createToken (event) {
    event.preventDefault();

    const { onSignIn = () => {} } = this.props;
    const formData = new FormData(event.currentTarget);

    Token
      .create({
        email: formData.get('email'),
        password: formData.get('password')
      })
      .then(data => {
        if (!data.errors) {
          localStorage.setItem('jwt', data.jwt);
          onSignIn()
          // .history is only available on props
          // because this component is rendered by a
          // route component.
          // (i.e. <Route route="/sign_in" component={SignInPage} />)
          this.props.history.push('/');
        } else {
          this.setState({
            errors: [{
              message: "Invalid username or password!"
            }]
          });
        }
      })
  }

  render () {
    const { errors } = this.state;
    return (
      <main
        className="SignInPage"
        // style={{margin: '0 1rem'}}
      >
        {
          errors.map(
            (e, i) => <Alert  color="danger" className="alert" key={i}>{e.message}</Alert>
          )
        }


        <Container style={{height: "500px"}}>
        <Row style={{height: "100%"}}>
        {/* <Col sm="12" md={{ size: 8, offset: 3 }}> */}
        <Col className="d-flex align-items-center justify-content-center">
        <Form inline onSubmit={this.createToken}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label style={{fontSize: 20, marginRight: 3}} htmlFor='email' hidden>Email</Label> <br />
            <Input type='email' id='email' style={{fontSize: 20}} name='email'placeholder="Email"/>
          </FormGroup>

          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label style={{fontSize: 20, marginRight: 3}} htmlFor='password' hidden>Password</Label> <br />
            <Input type='password' id='password' name='password'placeholder="Password" style={{fontSize: 20}} />
          </FormGroup>

          <FormGroup className="mb-2 ml-sm-2 mt-sm-2">
            <Button outline color="primary" style={{fontSize: 20}} input type='submit'>Sign In </Button>
          </FormGroup>
        </Form>
      </Col>
      </Row>
    </Container>
      </main>

    )
  }
}

export default SignInPage;
