import React, { useEffect, useState } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import ModeComment from "@material-ui/icons/ModeComment";
import Favorite from "@material-ui/icons/Favorite";
import usePushingGutterStyles from "./PushingGutter";
import useLabelIconStyles from "./LabelIcon";
import useRowFlexStyles from "./RowFlex";
import Typography from "@material-ui/core/Typography";
import TagButton from "../../TagButton";
import FollowButton from "../../FollowButton";
import MoreVertOptions from "../../MoreVertOptions";
import Favourite from "../../ClassicCard/components/Favourite";
import Comments from "../../ClassicCard/components/Comment";
import TipPost from "../../ClassicCard/components/TipPost";
import Share from "../../ClassicCard/components/Share";
import Vote from "../../ClassicCard/components/Vote";
import ThumbNails from "../../ThumbNails";
import { nutralizeTitle } from "../../../util";
import moment from "moment";
import DisplayTips from "../../ClassicCard/components/DisplayTips";
import axios from "axios";
import { config } from "../../../../config";
import Hidden from "@material-ui/core/Hidden";


const ReviewCard = ({ topic }) => {
  const classes = useStyles();
  const gutterStyles = usePushingGutterStyles({ space: 1.5 });
  const labelStyles = useLabelIconStyles();
  const flexStyles = useRowFlexStyles();

	const [tips, setTips] = useState([]);


  const handleFetchTips = async () => {
    try {
      const tip = await axios.get(config.tipPost + "/" + topic._id);

      console.log("tiptip", tip);
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

  return (
    <Card className={classes.card} elevation={0}>
      <CardContent className={classes.content}>
        {/* header */}
        <Box mb={1} className={classes.boxRoot}>
          <div className={classes.headingRoot}>
            {/* <h3 className={classes.heading}>Aegen Ergon</h3>
            <Typography variant="caption">@aegen</Typography> */}
            <ThumbNails
              name={topic.userId ? topic.userId.username : "Anonymous"}
            />
            <div className={classes.headerAuthor}>
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
                  Anonymous
                </Typography>
              )}
              <Typography variant="caption">
                {moment(topic.createdAt).fromNow().replace("ago","").replace("minutes","min").replace("hours","h").replace("days","d")}
              </Typography>
            </div>
          </div>
          <div>{/* <FollowButton /> */}</div>
        </Box>

        {/* Title content */}
        {/* <p className={classes.body}>{topic.title}</p> */}
        <Typography
          // variant="h5"
          align="left"
          href={"/topics/" + topic._id + "/" + nutralizeTitle(topic.title)}
          color="primary"
          component="a"
          className={classes.titleLink}
        >
          {topic.title}
        </Typography>

        <Hidden smUp>
          <img
            // className={classes.smallMedia}
            className="lozad"
            style={{
              width: "100%",
              flexShrink: 0,
              // backgroundColor: palette.grey[200],
              borderRadius: 5,
              boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9"
            }}
            data-src={
              "https://image.thum.io/get/iphoneX/width/200/auth/3228-www.tipestry.com/" +
              topic.url
            }
          />
        </Hidden>
        <br />
        {/* site URL */}
        <a href={"/sites?s=" + topic.siteId.url}>({topic.siteId.url})</a>

        {/* handle Tags */}
        <Box className={classes.boxTag}>
          {topic.tags.map((tag, index) => (
            <TagButton key={index} name={tag} />
          ))}
        </Box>

        <Divider className={classes.divider} light />

        {/* bottom */}
        <div className={flexStyles.parent}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          {/* <Link
            className={cx(labelStyles.primaryLink, classes.textFooter)}
            // component={"button"}
            component={"a"}
            href={"/topics/" + topic._id + "/" + nutralizeTitle(topic.title)}
          >
            Read more <ArrowForwardIos className={labelStyles.icon} />
          </Link> */}
          {/* <div
            className={cx(
              flexStyles.rightChild,
              flexStyles.parent,
              gutterStyles.parent
            )}
          >
            <MoreVertOptions />

            <button type={"button"} className={labelStyles.link}>
              <ModeComment className={labelStyles.icon} /> 135
            </button>
            <button type={"button"} className={labelStyles.link}>
              <Favorite className={labelStyles.icon} /> 12
            </button>
          </div> */}
          <Vote count={topic.votesCount} topicId={topic._id} />

          <Favourite topicId={topic._id} />

          <Comments count={topic.commentsCount} />

          <Share topicId={topic._id} />

          {/* check if it's not an anonymous post and show tip icon */}
          {topic.userId && <TipPost topicId={topic._id} />}
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
      </CardContent>
      <Hidden smDown>
        <CardMedia
          className={classes.media}
          image={
            "https://image.thum.io/get/iphoneX/width/200/auth/3228-www.tipestry.com/" +
            topic.url
          }
        />
      </Hidden>
    </Card>
  );
};


const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    display: "flex",
    padding: spacing(2),
    borderRadius: 5,
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)"
    },
    margin: "10px auto"
  },
  media: {
    minWidth: "25%",
    maxWidth: "25%",
    flexShrink: 0,
    backgroundColor: palette.grey[200],
    borderRadius: 12,
    boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9"
  },
  boxRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headingRoot: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  headerAuthor: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "baseline",
    marginLeft: 10
  },
  rating: {
    verticalAlign: "text-top"
  },
  content: {
    padding: spacing(0, 2, 0, 0)
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginBottom: 0,
    marginRight: spacing(1.5),
    display: "inline-block"
  },
  body: {
    fontSize: 14,
    color: palette.grey[500]
  },
  divider: {
    margin: spacing(1, 0)
  },
  textFooter: {
    fontSize: 14
  },
  icon: {
    fontSize: "1.2rem",
    verticalAlign: "bottom"
  },
  boxTag: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  titleLink: {
    textAlign: "left"
  }
}));


export default ReviewCard;
