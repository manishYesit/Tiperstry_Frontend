import React from 'react';
import Typography from "@material-ui/core/Typography";
import { nutralizeTitle } from "../../../utils"
import makeStyles from "@material-ui/core/styles/makeStyles"
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import Comment from "@material-ui/icons/Comment";
import TagButton from "../../../components/TagButton"
import Paper from "@material-ui/core/Paper";
import ThumbNails from "../../../components/ThumbNails"
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import Action from "./Action";
import TopicVote from './TopicVote';


const Topics = ({ topic }) => {
	const classes = useStyles();
	return (
    <Paper className={classes.root}>
      <TopicVote
        topicId={topic._id}
        downVotes={topic.downVotes}
        upVotes={topic.upVotes}
      />
      <div className={classes.Thumbnail}>
        <Avatar
          alt={topic.title}
          src={
            "https://image.thum.io/get/iphoneX/width/100/auth/3228-www.tipestry.com/" +
            topic.url
          }
          className={classes.large}
        />
      </div>
      <div className={classes.header}>
        <div>
          <a
            // align="left"
            href={"/topics/" + topic._id + "/" + nutralizeTitle(topic.title)}
            // color="primary"
            // component="a"
            className={classes.titleLink}
          >
            {topic.title}
          </a>
        </div>

        <div>
          <div className={classes.secondTier}>
            {topic.userId ? (
              <Typography
                color="primary"
                component="a"
                className={classes.user}
                href={"/p/" + topic.userId.username}
              >
                @{topic.userId.username}
                {"  "}
              </Typography>
            ) : (
              <Typography align="left" className={classes.user} color="primary">
                Anonymous{"  "}
              </Typography>
            )}
            &nbsp;
            <Typography
              align="left"
              className={classes.user}
              variant="overline"
            >
              {moment(topic.createdAt).fromNow()}
            </Typography>
            &nbsp;
            {/* <div className={classes.tag}> */}
            {topic.tags.map(tag => (
              <TagButton key={tag} name={tag} />
            ))}
            {/* </div> */}
          </div>
        </div>
        <div className={classes.bottom}>
          <Action
            topicId={topic._id}
            userId={topic.userId}
            downVotes={topic.downVotes}
            upVotes={topic.upVotes}
            title={topic.title}
            commentsCount={topic.commentsCount}
          />
        </div>
      </div>
    </Paper>
  );
}

export default Topics



const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(1.5, 0.3),
    // margin: spacing(0.5),
    margin: spacing(1, 0),
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderRadius: 0
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  tag: {
    display: "flex",
    alignItems: "flex-start",
    // justifyContent: "flex-start",
    flexDirection: "row"
    // flexWrap: "wrap"
  },
  secondTier: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  action: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: spacing(1)
  },
  VoteRoot: {
    display: "flex",
    flexDirection: "column",
    // margin: spacing(1, 2),
    padding: spacing(0.5, 1)
  },
  Thumbnail: {
    padding: spacing(0.5, 1)
  },
  titleLink: {
    textAlign: "left",
    textDecoration: "none",
    color: "#3c3c3c",
    fontSize: 15
  },
  user: {
    fontSize: 11
  },
  large: {
    width: spacing(9),
    height: spacing(9)
  }
}));