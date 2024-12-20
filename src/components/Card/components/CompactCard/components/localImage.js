import React from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { nutralizeTitle } from "../../../../../utils";
import { config } from "../../../../../../config";
import Avatar from "@material-ui/core/Avatar";

export default function LocalImage({ url, topicId, title }) {
  const classes = useStyles();
  let variant = "rounded";
  
  return (
    <Avatar
      component="a"
      variant={variant}
      alt={title}
      href={"/topics/" + topicId + "/" + nutralizeTitle(title)}
      src={config.getImage + url}
      className={classes.large}
    />
  );
}


const useStyles = makeStyles(({ spacing }) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  large: {
    width: spacing(9),
    height: spacing(9),
  },
}));


{/* <a href={"/topics/" + props.topicId + "/" + nutralizeTitle(props.title)}>
  <img
    className="lozad"
    style={{
      width: "100%",
    }}
    data-src={config.getImage + props.url}
  />
</a>; */}