import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import { toggleGift, setElementId, setGiftType } from "../../../store/actions";
import { connect } from "react-redux";

const mapDispatchToProps = {
  toggleGift,
  setGiftType,
  setElementId
};

const TipPost = props => {
  const classes = useStyles();
	const { toggleGift, commentId, setElementId, setGiftType } = props;
  
	const handleTipping = () => {
    // console.log("commentId", commentId);
    
    setGiftType("comment");
    setElementId(commentId);
    toggleGift();
	}

  return (
    <IconButton size="small" aria-label="Tip a post" onClick={handleTipping}>
      <img
        src="/static/icons/moneybag.svg"
        alt="comments"
        width="20"
        height="20"
        style={{ color: "#1F7BD8" }}
      />
    </IconButton>
  );
};


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    margin: theme.spacing(2, 0.5),
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)"
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column"
  }
}));

export default connect(null, mapDispatchToProps)(TipPost);
