import React from 'react';
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
  );
}

export default PostDetails;
