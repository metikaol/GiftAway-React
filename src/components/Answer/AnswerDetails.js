import React from 'react';
import Field from '../Field';
import TimeAgo from 'react-timeago'

function AnswerDetails (props) {
  const {onDeleteClick = () => {}} = props;
  // 1em is equal to the font size of the parent tag.
  const style = {
    borderLeft: 'medium solid black',
    padding: '0 0.75em'
  };

  return (
    <div
      className="AnswerDetails"
      style={style}
    >
      <p>Message: {props.body}</p>
      <p>Contact Info: {props.contact}</p>
      <p>By {props.author_full_name}</p>
      <TimeAgo date={props.created_at} />
      <br/>
      <button className="btn btn-outline-danger"
        onClick={() => onDeleteClick(props.id)}
      >Delete</button>
      <hr/>
    </div>
  )
}

export default AnswerDetails;
