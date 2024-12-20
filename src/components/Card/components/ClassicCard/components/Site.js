import React from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { nutralizeTitle } from "../../../../../utils";


export default function Site(props) {
	const classes = useStyles();
	return (
    <a href={"/topics/" + props.topicId + "/" + nutralizeTitle(props.title)} >
    <img
      className="lozad"
      style={{
        backgroundPosition: "top",
        width: "100%"
      }}
      data-src={
        "//image.thum.io/get/iphoneX/noanimate/width/500/allowJPG/crop/700/hidePopovers/auth/3228-www.tipestry.com/" +
        props.url
      }
    />
    </a>
  );
}


const useStyles = makeStyles(theme => ({
  // media: {
  //   height: 0,
  //   paddingTop: "56.25%" // 16:9
  // },
}));