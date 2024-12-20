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
    maxWidth: 900,
    maxHeight: 600,
    width: "auto",
    height: "auto",
    [breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));