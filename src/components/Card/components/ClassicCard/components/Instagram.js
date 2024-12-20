import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { nutralizeTitle } from "../../../../../utils";
import clsx from "clsx";
import InstagramEmbed from "react-instagram-embed";

// var instagram_appid = "1689071004617044";
import { fbAppID, instagramClientToken } from "../../../../../../config";

export default function Instagram({ url, width, topicId, title }) {
  const classes = useStyles();
  const [failure, setFailure] = React.useState(false);

  return (
    <>
      <InstagramEmbed
        url={url}
        maxWidth={width}
        // clientAccessToken="1689071004617044|02e4291e4952b9f243e96ccb0c7856c4"
        clientAccessToken={fbAppID + "|" + instagramClientToken}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={(err) => {
          setFailure(true);
        }}
      />
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
