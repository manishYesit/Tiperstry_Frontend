import React, { useState } from 'react'
import IconButton from "@material-ui/core/IconButton";
import Comment from "@material-ui/icons/Comment";
import Typography from "@material-ui/core/Typography";
import { setToggleComment } from "../../../store/actions"
import { connect } from "react-redux";

import { nutralizeTitle } from "../../../utils";

const mapDispatchToProps = {
  setToggleComment
};

const Comments = ({ count, topicId, setToggleComment,title="" }) => {
  const handleOpen = () => {
    let commentlink = "/topics/" + topicId + "/" + nutralizeTitle(title);
    location.href = commentlink;
    // setToggleComment({
    //   openComment: true,
    //   commentId: null,
    //   topicId,
    //   type: "comment"
    // });
  };

  return (
    <>
      <Typography style={{ fontSize: 12, color: 'gray' }}>&emsp;{count === 0 ? "0" : count}</Typography>
      <Typography style={{ cursor: "pointer", color: "gray", fontSize: 12 }} onClick={handleOpen}>&nbsp;comments</Typography>
      {/* <IconButton aria-label="comments" size="small" onClick={handleOpen}>
        <Comment />
        comments
      </IconButton> */}
    </>
  );
};


export default connect(null, mapDispatchToProps)(Comments);
