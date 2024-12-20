import React from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";


export default function Gif(props) {
	const classes = useStyles();
	return <img className={classes.media} src={props.url} />;
}


const useStyles = makeStyles(({ breakpoints }) => ({
  media: {
    display: "block",
    maxWidth: "100%",
    width: 'auto',
    objectFit:"contain",
    maxHeight: 600,
    [breakpoints.down("sm")]: {
      width: "100%",
      maxHeight: 500
    }
  },
}));