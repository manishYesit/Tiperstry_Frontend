import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { nutralizeTitle } from "../../../../../utils";
import Avatar from "@material-ui/core/Avatar";

export default function Image({ title, topicId, url, embed = false }) {
  const classes = useStyles();
  let variant = "rounded";

  if (url.includes("redd.it") && !embed) {
    url = "https://new.tipestry.com/thumbnail?q=" + url;
  }

  if (embed) {
    return <img style={{ width: "100%", height: "450px", objectFit: "contain" }} src={url}></img>;
  } else
    return (
      <Avatar
        component="a"
        variant={variant}
        alt={title}
        href={"/topics/" + topicId + "/" + nutralizeTitle(title)}
        src={"https://image.thum.io/get/iphoneX/width/100/auth/3228-www.tipestry.com/" + url}
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
