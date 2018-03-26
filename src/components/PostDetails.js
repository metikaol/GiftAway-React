import React from 'react';
import Field from './Field';
import { Jumbotron, Container } from 'reactstrap';


function PostDetails (props) {
  const {author = {}} = props;

  return (

      <div>
        <Jumbotron>
          <Container>
            <h1 className="display-3">{props.title}</h1>
            <p className="lead">{props.body}</p>
            Field name="Posted" value={props.created_at} />
            <p>By {author.first_name}</p>
          </Container>
        </Jumbotron>
      </div>
      //
      // <h2>{props.title}</h2>
      // <p>{props.body}</p>
      // <p>By {author.first_name}</p>
      // {/* <Field name="View Count" value={props.view_count} /> */}
      // <Field name="Posted" value={props.created_at} />
      // {/* <Field name="Updated At" value={props.updated_at} /> */}


  );
}

export default PostDetails;
