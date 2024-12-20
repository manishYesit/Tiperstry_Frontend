import React from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { nutralizeTitle } from "../../../../../utils";
import clsx from "clsx";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";

export default function Twitter({ url }) {
  const classes = useStyles();
  const pathname = new URL(url).hostname;
  const improved = pathname.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  url = url.replace(/\?s=[0-9|A-z|a-z]*/, "");
  const arr = url.split("/");
  
  return (
    <div style={{ width: "100%" }}>
      {arr[4] === "status" && (
        <TwitterTweetEmbed tweetId={arr[arr.length - 1]} />
      )}
      {arr.length === 4 && (
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={arr[arr.length - 1]}
          options={{ height: 600, width: 500 }}
        />
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  media: {
    // width: "100%",
    display: "block",
    maxWidth: 1200,
    maxHeight: 600,
    width: "auto",
    height: "auto",
  },
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));