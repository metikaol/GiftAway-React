import React from 'react';
import Field from '../Field';
import TimeAgo from 'react-timeago'


function PostDetails (props) {
  const {author = {}} = props;

  return (

      <div>
            <h4 className="display-4"><strong>{props.title}</strong></h4>
            <p className="lead">{props.body}</p>
            <small><strong> By {author.first_name} : </strong></small>
            <TimeAgo date={props.created_at} />
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
