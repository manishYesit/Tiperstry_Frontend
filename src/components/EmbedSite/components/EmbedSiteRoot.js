import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Iframe from "./Iframe";
import Image from './Image';
import LocalImage from "./LocalImage";
import Youtube from "../../Card/components/ClassicCard/components/Youtube";
import Twitter from "../../Card/components/ClassicCard/components/Twitter";
import Facebook from "../../Card/components/ClassicCard/components/Facebook";
import Gif from "./Gif";
import { config } from "../../../../config";
import Instagram from '../../Card/components/ClassicCard/components/Instagram';
import Reddit from '../../Card/components/ClassicCard/components/Reddit';
import Pinterest from '../../Card/components/ClassicCard/components/Pinterest';
import Medium from '../../Card/components/ClassicCard/components/Medium';

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
      {topic && topic.type === 'facebook' && <Facebook url={topic.url} title={topic.title} topicId={topic._id} />}
      {topic && topic.type === "twitter" && <Twitter url={topic.url} />}
      {topic && topic.type === "instagram" && <Instagram url={topic.url} width={600} title={topic.title} topicId={topic._id} />}
      {topic && topic.type === "reddit" && <Reddit url={topic.url} width={'100%'} title={topic.title} topicId={topic._id} />}
      {topic && topic.type === "pinterest" && <Pinterest url={topic.url} width={'100%'} title={topic.title} topicId={topic._id} />}
      {topic && topic.type === "medium" && <Medium url={topic.url} width={'100%'} title={topic.title} topicId={topic._id} />}
    </div>
  );
}

const useStyles = makeStyles(({ spacing }) => ({
	root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTop: "0.5px solid transparent",
    marginBottom:"20px",
    backgroundColor:"white"
	}
}));
