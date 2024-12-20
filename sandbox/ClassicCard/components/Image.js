import React from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";


export default function Image(props) {
	const classes = useStyles();
	return (
		<img
      className="lozad"
      // style={{
      //   height: 0,
    	// 	paddingTop: "56.25%" // 16:9
      // }}
      data-src={
        "https://image.thum.io/get/image/fit/500x400/3228-www.tipestry.com/" +
        props.url
      }
    />
  );
}


const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
}));