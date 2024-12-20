import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Iframe from "./Iframe";
import Image from './Image';
import LocalImage from "./LocalImage";
import Youtube from "../../Card/components/ClassicCard/components/Youtube";
import Twitter from "../../Card/components/ClassicCard/components/Twitter";
import Gif from "./Gif";
import { config } from "../../../../config";


export default function EmbedSiteRoot({ topic }) {
	const classes = useStyles();

	return (
    <div className={classes.root}>
      {topic && topic.type === "site" && <Iframe url={topic.url} />}
      {topic && topic.type === "gif" && <Gif url={topic.url} />}
      {topic && topic.type === "localGif" && (
        <Gif url={config.getImage + topic.img} />
      )}
      {topic && topic.type === "image" && <Image url={topic.url} />}
      {topic && topic.type === "localImage" && <LocalImage img={topic.img} />}
      {topic && topic.type === "youtube" && (
        <Youtube videoId={topic.youtubeId} height="600px" />
      )}
      {topic && topic.type === "twitter" && <Twitter url={topic.url} />}
    </div>
  );
}


const useStyles = makeStyles(({ spacing }) => ({
	root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTop: "0.5px solid #b5b5b59e",
    padding: spacing(0.5, 0)
	}
}));