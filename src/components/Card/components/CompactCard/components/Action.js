import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Favourite from "../../Favourite";
import Comments from "../../Comment";
import Share from "../../Share";
import TipPost from "../../TipPost";
import Options from "../../Options";
import DisplayTopicTips from "./DisplayTopicTips";
import Broadcast from "./Broadcast";

import HeightIcon from "@material-ui/icons/Height";

export default function Action({ topicId, userId, commentsCount, title, topic, getTopicType, toggleExpanded }) {
  const classes = useStyles();
  const expandIconHeight = 20;

  return (
    <div className={classes.root}>
      {
        getTopicType(topic.type, topic) != "site" ? (
          <HeightIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              toggleExpanded(topic);
            }}
          />
        ) : (
          <div style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => { toggleExpanded(topic) }}>
            &nbsp;&nbsp;
            <svg width={expandIconHeight} height={expandIconHeight} xmlns="http://www.w3.org/2000/svg">
              <image
                href={`https://raw.githubusercontent.com/shreyakyesitlabs/public_assets/main/icons8-external-link.svg`}
                height={expandIconHeight} width={expandIconHeight}
              />
            </svg>
          </div>
        )
      }

      <Comments topicId={topicId} count={commentsCount} title={topic.title} />

      {/* <Favourite topicId={topicId} /> */}

      <Share topicId={topicId} title={title} />

      {userId && <TipPost topicId={topicId} />}

      {/* {userId && <Broadcast topicId={topicId} />} */}

      <Options topicId={topicId} userId={userId} topic={topic} />

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
    flexWrap: "wrap"
    // padding: theme.spacing(1, 0.5)
  }
}));
