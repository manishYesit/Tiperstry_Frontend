import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { shareToggle } from "../../../store/actions";
 

const mapDispatchToProps = {
  shareToggle
};

const Share = ({ shareToggle, title, topicId }) => {
  return (
  	<>
    {/* <IconButton
      aria-label="Share a post"
      size="small"
      onClick={() => shareToggle({ title, topicId })}
    >
      <ShareIcon />
    </IconButton> */}
    <Typography style={{ cursor: "pointer", color: "gray", fontSize: 12 }} onClick={() => shareToggle({ title, topicId })}>&emsp;share</Typography>
    </>
  );
};

export default connect(null, mapDispatchToProps)(Share);
