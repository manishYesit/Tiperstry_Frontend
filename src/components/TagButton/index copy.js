import React from "react";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";



const TagButton = ({ name, handleDelete, handleClick }) => {
  const classes = useStyles();
  return (
    <Chip
      // variant="text"
      size="small"
      className={classes.root}
      avatar={<Avatar>#</Avatar>}
      label={name}
      component="a"
      href={"/hashtag/" + name}
      clickable
      color="primary"
    />
  );
};

export default TagButton;


const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    margin: "1px 2px",
    padding: "0px"
  },
  tag: {
    // borderRadius: "0 3px 3px 0",
    background: "#FFFFFF",
    // borderLeft: `3px solid ${palette.primary.main}`,
    fontWeight: "bold",
    padding: "2px 4px",
    margin: spacing(0.2)
  }
}));