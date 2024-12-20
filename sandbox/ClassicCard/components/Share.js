import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";


const Share = props => {
	const { topicId } = props;
	
	const handleShare = () => {
		
		
	}

  return (
    <>
      <IconButton aria-label="Tip a post" onClick={handleShare}>
        <ShareIcon />
      </IconButton>
    </>
  );
};

export default Share;
