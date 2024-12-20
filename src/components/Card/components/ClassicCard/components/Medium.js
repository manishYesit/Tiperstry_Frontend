import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { nutralizeTitle } from "../../../../../utils";
import clsx from "clsx";
import Iframe from "react-iframe";
import { api } from "../../../../../../config";

export default function Medium({ url, width, topicId, title }) {
  const classes = useStyles();
  const [failure, setFailure] = React.useState(false);

  return (
    <>
      <Iframe
        className="redditembed"
        url={api + "/topic/embed2/medium?url=" + url}
        width="100%"
        height="400px"
        id="myId"
        display="initial"
        position="relative"
      />
      {failure && (
        <a
          className={classes.rootclassName = "redditembed"}
          href={"/topics/" + topicId + "/" + nutralizeTitle(title)}
        >
          <img
            className={classes.media}
            src={"//image.thum.io/get/iphoneX/noanimate/width/500/allowJPG/crop/700/hidePopovers/auth/3228-www.tipestry.com/" + url}
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
