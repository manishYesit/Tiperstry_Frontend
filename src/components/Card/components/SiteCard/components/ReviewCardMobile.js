import React, { useEffect, useState } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import usePushingGutterStyles from "./PushingGutter";
import useLabelIconStyles from "./LabelIcon";
import useRowFlexStyles from "./RowFlex";
import Typography from "@material-ui/core/Typography";
import TagButton from "../../../../TagButton";
import Options from "../../Options";

import Favourite from "../../Favourite";
import Comments from "../../Comment";
import TipPost from "../../TipPost";
import Share from "../../Share";
import Vote from "../../Vote";
import ThumbNails from "../../../../ThumbNails";
import { nutralizeTitle } from "../../../../../utils";
import moment from "moment";
import DisplayTips from "../../DisplayTips";
import axios from "axios";
import { config } from "../../../../../../config";
import Hidden from "@material-ui/core/Hidden";
import FollowButton from "../../../../FollowButton";
import { connect } from "react-redux";
import { withTranslation } from "../../../../../../i18n";
import Linkify from "linkifyjs/react";
import Broadcast from "../../CompactCard/components/Broadcast";

const mapStateToProps = (state) => ({
  user: state.user,
});

const ReviewCard = ({ topic, user, i18n, t }) => {
  const classes = useStyles();
  const gutterStyles = usePushingGutterStyles({ space: 1.5 });
  const labelStyles = useLabelIconStyles();
  const flexStyles = useRowFlexStyles();

  const [tips, setTips] = useState([]);

  const handleFetchTips = async () => {
    try {
      const tip = await axios.get(config.tipPost + "/" + topic._id);

      setTips(tip.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const tips = setTimeout(() => {
      handleFetchTips();
    }, 2000);
    return () => {
      clearTimeout(tips);
    };
  }, []);

  const handleTagRender = () => {
    return topic.tags.map((tag, index) => <TagButton key={index} name={tag} />);
  };

  return (
    <Paper className={classes.root} elevation={0}>
      <Box mb={1} className={classes.boxRoot}>
        <div className={classes.headingRoot}>
          <ThumbNails
            name={topic.userId ? topic.userId.username : "Anonymous"}
            url={topic.userId && topic.userId.img}
          />

          <div className={classes.headerAuthor}>
            {topic.promoted && topic.promoted == true && (
              <Typography style={{ color: "blue", marginRight: ".2rem" }}>
                PROMOTED{" "}
              </Typography>
            )}
            {topic.userId ? (
              <Typography
                align="left"
                color="primary"
                component="a"
                href={"/p/" + topic.userId.username}
              >
                @{topic.userId.username}
              </Typography>
            ) : (
              <Typography align="left" color="primary">
                {t("Anonymous")}
              </Typography>
            )}
            <Typography variant="caption">
              {moment(topic.createdAt)
                .locale(
                  typeof i18n.language !== "undefined"
                    ? i18n.language == "cn"
                      ? "zh_cn"
                      : i18n.language
                    : "en"
                )
                .fromNow()}
            </Typography>
          </div>
        </div>
        {user.user && (
          <div className={classes.option}>
            {topic.userId && user.user._id !== topic.userId._id && (
              <FollowButton userId={topic.userId._id} />
            )}
            <Options userId={topic.userId} topicId={topic._id} topic={topic} />
          </div>
        )}
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div className={classes.contentBody}>
          <Typography
            variant="h5"
            align="left"
            href={"/topics/" + topic._id + "/" + nutralizeTitle(topic.title)}
            color="primary"
            component="a"
            className={classes.titleLink}
          >
            <Linkify tagName="span">{topic.title}</Linkify>
          </Typography>

          {topic.groupId && topic.group && (
            <>
              <b>
                in /
                <a
                  style={{ color: "inherit", textDecoration: "none" }}
                  href={
                    "/group/" +
                    topic.group.name.replaceAll(" ", "-").replaceAll("&", "%26")
                  }
                >
                  {topic.group.name}
                </a>
              </b>
              &nbsp;
            </>
          )}
          {/* handle Tags */}
          <div className={classes.tag}>{handleTagRender()}</div>
          <br />
          {/* site URL */}
          <a href={"/domain?s=" + topic.url}>
            ({topic.url.substring(0, 20)}...)
          </a>
        </div>

        <a
          href={"/topics/" + topic._id + "/" + nutralizeTitle(topic.title)}
          target="_blank"
          style={{
            backgroundImage: topic.imgThumbnail ? `url(${config.getImage + topic.imgThumbnail})` : `url(https://image.thum.io/get/iphoneX/width/200/auth/3228-www.tipestry.com/${topic.url})`,
          }}
          className={classes.media}
        >
        </a>
      </Box>
      <Divider className={classes.divider} light />

      {/* bottom */}
      <div className={flexStyles.parent}>
        <Vote
          // count={topic.votesCount}
          downVotes={topic.downVotes}
          upVotes={topic.upVotes}
          topicId={topic._id}
        />

        <Comments
          count={topic.commentsCount}
          topicId={topic._id}
          title={topic.title}
        />

        <Favourite topicId={topic._id} />

        <Share topicId={topic._id} title={topic.title} />

        {/* check if it's not an anonymous post and show tip icon */}
        {topic.userId && user.user && topic.userId._id !== user.user._id && (
          <TipPost topicId={topic._id} />
        )}

        {user.user && user.user._id && <Broadcast topicId={topic._id} />}
      </div>
      {/* check if the array is not empty */}
      {typeof tips[0] !== "undefined" && (
        <>
          <Divider />
          <CardActions disableSpacing>
            <DisplayTips
              topicId={topic._id}
              tips={tips}
              handleSetTips={setTips}
            />
          </CardActions>
        </>
      )}
    </Paper>
  );
};

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: spacing(2),
    margin: spacing(2, 0),
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: spacing(2),
    borderRadius: 5,
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)",
    },
    margin: "10px auto",
  },
  media: {
    // minWidth: "25%",
    // maxWidth: "25%",
    minWidth: 150,
    minHeight: 150,
    flexShrink: 0,
    backgroundColor: palette.grey[200],
    backgroundPosition: "center top",
    borderRadius: 12,
    boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  boxRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingRoot: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerAuthor: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "baseline",
    marginLeft: 10,
  },
  rating: {
    verticalAlign: "text-top",
  },
  content: {
    // padding: spacing(0, 2, 0, 0),
    width: "80%",
    [breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginBottom: 0,
    marginRight: spacing(1.5),
    display: "inline-block",
  },
  body: {
    fontSize: 14,
    color: palette.grey[500],
  },
  divider: {
    margin: spacing(1, 0),
  },
  textFooter: {
    fontSize: 14,
  },
  icon: {
    fontSize: "1.2rem",
    verticalAlign: "bottom",
  },
  boxTag: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  titleLink: {
    textAlign: "left",
    textDecoration: "none",
    color: "black",
    fontSize: 16,
  },
  option: {
    display: "flex",
    alignItems: "center",
  },
  contentBody: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-start"
  },
  tag: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

export default connect(mapStateToProps)(withTranslation()(ReviewCard));
