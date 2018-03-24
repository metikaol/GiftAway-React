import React from 'react';
import Field from './Field';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';


function PostDetails (props) {
  const {author = {}} = props;

  return (
    <div>


      <h2>{props.title}</h2>
      <p>{props.body}</p>
      <p>By {author.full_name}</p>
      <Field name="View Count" value={props.view_count} />
      <Field name="Created At" value={props.created_at} />
      <Field name="Updated At" value={props.updated_at} />

    </div>
  );
}

export default PostDetails;
