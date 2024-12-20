import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import { parse } from "tldjs";
import { config } from "../../../../config";
import EmbedSiteRoot from "../components/EmbedSiteRoot";

export default function Iframe(props) {
  const { url } = props;
  const root = props.root ?? false;

  const parsedDomain = parse(url);

  let domain = "";
  if (parsedDomain.domain != null) {
    domain = parsedDomain.domain.split(".")[0];
  } else {
    // domain = url.split("://")[1];
  }

  const youtubeId = url.split("=")[1];

  const classes = useStyles();
  const [loadable, setLoadable] = useState("");

  const error = (err) => { };

  useEffect(() => {
    handleLoadable();
  }, []);

  const handleLoadable = async () => {
    try {
      if (
        checkForExtension(url) == "png" ||
        checkForExtension(url) == "jpeg" ||
        checkForExtension(url) == "jpg"
      ) {
        setLoadable("img");
      } else if (
        [
          "twitter",
          "facebook",
          "youtube",
          "instagram",
          "reddit",
          // "medium",
          "pinterest",
        ].includes(domain)
      ) {
        setLoadable("embeddable");
      } else {
        const load = await axios.get(config.validateUrl + "?url=" + url);

        setLoadable(load.data.loadable ? "load" : "thum");
      }
    } catch (error) {
    }
  };

  const checkForExtension = (filename) => {
    const ext = /.+\.(.+)$/.exec(filename);

    return ext ? ext[1] : null;
  };

  return (
    <>
      {loadable === "load" && (
        <iframe
          id="frame"
          className={root ? classes.frameRoot : classes.frame}
          src={url}
          onLoad={error}
          allow="fullscreen"
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      )}
      {loadable === "thum" && (
        <a href={props.url} className={classes.root} target="_blank">
          <img
            className={classes.large}
            src={"//image.thum.io/get/width/900/crop/900/png/auth/3228-www.tipestry.com/" + props.url}
          />
        </a>
      )}
      {loadable === "embeddable" && (
        <EmbedSiteRoot
          id="frame"
          topic={{ url: url, type: domain, youtubeId }}
        />
      )}
      {loadable === "img" && (
        <a href={props.url} className={classes.root} target="_blank">
          <img className={classes.large} src={props.url} />
        </a>
      )}
    </>
  );
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  frame: {
    width: "100%",
    height: 600,
    marginTop: 20,
  },
  frameRoot: {
    width: "85%",
    height: 500,
    display: "block",
    margin: 'auto',
    marginTop: 20,
  },
  large: {
    display: "block",
    maxWidth: "50%",
    width: "auto",
    objectFit: "contain",
    [breakpoints.down("xs")]: {
      maxHeight: 350,
      width: "100%",
    },
  },
}));
