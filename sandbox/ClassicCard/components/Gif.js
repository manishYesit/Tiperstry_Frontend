import React from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";


export default function Gif(props) {
	// const classes = useStyles();
	return <img className="lozad" data-src={props.url} />;
}


const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
}));