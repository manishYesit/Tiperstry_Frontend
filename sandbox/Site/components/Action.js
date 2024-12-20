import React from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Favourite from "../../../components/Card/components/Favourite";
import Comments from "../../../components/Card/components/Comment";
import Share from "../../../components/Card/components/Share";
import TipPost from "../../../components/Card/components/TipPost";
import Options from "../../../components/Card/components/Options";
import DisplayTopicTips from "./DisplayTopicTips";

export default function Action({ topicId, userId, commentsCount, title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Comments topicId={topicId} count={commentsCount} />

      <Favourite topicId={topicId} />

      <Share topicId={topicId} title={title} />

      {userId && <TipPost topicId={topicId} />}

      <Options />

      <DisplayTopicTips topicId={topicId} />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    // width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    // padding: theme.spacing(1, 0.5)
  }
}));
