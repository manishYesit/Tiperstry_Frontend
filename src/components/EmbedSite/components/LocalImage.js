import React from 'react';
import { config } from "../../../../config";
import { makeStyles } from "@material-ui/core/styles";


export default function LocalImage(props) {
  const classes = useStyles()
	return (
    <img
      className={classes.root}
      src={
        config.getImage +
        props.img
      }
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    maxHeight: "75vh"
  }
}));