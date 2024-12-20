import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { nutralizeTitle } from "../../../../../utils";
import clsx from "clsx";
import PinterestWidget from "./PinterestWidget";

export default function Pinterest({ url, width, topicId, title }) {
  const classes = useStyles();
  const [failure, setFailure] = React.useState(false);

  return (
    <>
      <PinterestWidget url={url} size="large" />

      {failure && (
        <a
          className={classes.root}
          href={"/topics/" + topicId + "/" + nutralizeTitle(title)}
        >
          <img
            className={classes.media}
            src={
              "//image.thum.io/get/iphoneX/noanimate/width/500/allowJPG/crop/700/hidePopovers/auth/3228-www.tipestry.com/" +
              url
            }
          />
        </a>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  media: {
    // width: "100%",
    display: "block",
    maxWidth: 500,
    maxHeight: 600,
    width: "auto",
    height: "auto",
  },
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));
