import React from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Favourite from "../../Card/components/Favourite";
import Vote from "../../Card/components/Vote";
import Comments from "../../Card/components/Comment";
import Share from "../../Card/components/Share";
import TipPost from "../../Card/components/TipPost";
import DisplayTips from "../../Card/components/ClassicCard/components/DisplayTips";
import Options from "../../Card/components/Options";
import dynamic from "next/dynamic";
import Broadcast from "../../Card/components/ClassicCard/components/Broadcast";

const Action = ({
  topicId,
  userId,
  downVotes,
  upVotes,
  commentsCount,
  tips,
  title,
  topic,
}) => {
  const classes = useStyles();
	
  return (
    <Paper className={classes.root}>
      <Vote topicId={topicId} downVotes={downVotes} upVotes={upVotes} />
      <Comments topicId={topicId} count={commentsCount} title={title}/>
      <Favourite topicId={topicId} />

      <Share topicId={topicId} title={title} />

      {userId && <TipPost topicId={topicId} />}
      
      {/* <Broadcast topicId={topicId} /> */}

      <Options userId={userId} topicId={topicId} topic={topic} />
      
      <DisplayTips topicId={topicId} />
    </Paper>
  );
};

Action.defaultProps = {
  tips: null,
};

export default Action;

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 500,
    // marginTop: 10,
    width: "100%",
    display: "flex",
    boxShadow: "0px 0px 0px 0px",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    // padding: theme.spacing(1, 0.5),
    // "&:hover": {
    //   boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
    //   // transform: "scale(1.04)"
    //   transform: "scale(1.01)",
    // },
  },
}));
