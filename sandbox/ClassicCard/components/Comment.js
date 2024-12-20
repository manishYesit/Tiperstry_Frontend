import React, { useState } from 'react'
import IconButton from "@material-ui/core/IconButton";
import Comment from "@material-ui/icons/Comment";
import Typography from "@material-ui/core/Typography";


const Comments = props => {
	const { count } = props;

	console.log(count == 0);
	
	return (
    <>
      <IconButton aria-label="comments">
        <Comment />
      </IconButton>
      <Typography>{count === 0 ? "" : count}</Typography>
    </>
  );
}


export default Comments;
