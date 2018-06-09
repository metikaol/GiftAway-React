import React from 'react'
import {Button, FormGroup, Label, Input} from 'reactstrap';

function AnswerForm(props) {
  const {
    onSubmit = () => {}
  } = props

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // See key => values from formData object
    // console.log(
    //   Array.from(formData.entries())
    // )
    onSubmit({contact: formData.get('contact'), body: formData.get('body')});
  }

  return (<form className="AnswerForm" onSubmit={handleSubmit}>

    <FormGroup>
      <Label htmlFor="body">Message</Label>
      <Input style={{ fontSize: 15 }} type="textarea" name="body" id="body"
        placeholder="Type message here"/>
    </FormGroup>

    <FormGroup>
      <Label htmlFor="contact">Contact Info</Label>
      <Input style={{ fontSize: 15}} type="contact" name="contact"
        id="contact" placeholder="Phone Number or Email Address"/>
    </FormGroup>

    <div>
      <Button outline="outline" color="info" style={{fontSize: 15}}
        input="input" type="submit">
        Submit
      </Button>
    </div>
  </form>)
}

export default AnswerForm;
