import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ThumbNails from "../../../../ThumbNails";
import Options from "../../Options";
import moment from "moment";
import Image from "./Image";
import Gif from "./Gif";
import Site from "./Site";
import Vote from "../../Vote";
import { toggleGift } from "../../../../../store/actions";
import { connect } from "react-redux";
import Favourite from "../../Favourite";
import Comments from "../../Comment";
import Youtube from "./Youtube";
import Twitter from "./Twitter";
import Facebook from "./Facebook";
import TipPost from "../../TipPost";
import Share from "../../Share";
import DisplayTips from "../../DisplayTips";
import Divider from "@material-ui/core/Divider";
import { config } from "../../../../../../config";
import { nutralizeTitle } from "../../../../../utils";
import TagButton from "../../../../TagButton";
import FollowButton from "../../../../FollowButton";
import LocalImage from "./localImage";
import { withTranslation } from "../../../../../../i18n";
import Linkify from "linkifyjs/react";
import Instagram from "./Instagram";
import Reddit from "./Reddit";
import Pinterest from "./Pinterest";
import Medium from "./Medium";
import Iframe from "../../../../../../src/components/EmbedSite/components/Iframe";
import Broadcast from "./Broadcast";
import { useRouter } from "next/router";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  toggleGift,
};

const CardRoot = ({ topic, user, i18n, t }) => {
  const classes = useStyles();
  const [tips, setTips] = useState([]);
  const router = useRouter();

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

  const handleRenderObject = (type, topicdata) => {
    if (topicdata.url) {
      if (topicdata.url.includes("twitter.com")) type = "twitter";
      else if (topicdata.url.includes("reddit.com")) type = "reddit";
      else if (topicdata.url.includes("facebook.com")) type = "facebook";
      else if (topicdata.url.includes("instagram.com")) type = "instagram";
      else if (topicdata.url.includes("medium.com")) type = "medium";
      else if (topicdata.url.includes("pinterest.com")) type = "pinterest";
      else if (
        topicdata.url.includes("youtu.be") ||
        topicdata.url.includes("youtube.com")
      )
        type = "youtube";
      else if (topicdata.url.includes(".gif")) type = "gif";
      else if (topicdata.url.toLowerCase().includes(".mp4")) type = "mp4";
      else if (
        topicdata.url.toLowerCase().includes(".png") ||
        topicdata.url.toLowerCase().includes(".jpg") ||
        topicdata.url.toLowerCase().includes(".jpeg") ||
        topicdata.url.toLowerCase().includes(".webp")
      )
        type = "image";
      else type = "site";
    }

    if (type === "gif") {
      return <Gif url={topic.url} topicId={topic._id} title={topic.title} />;
    } else if (type === "image") {
      return <Image url={topic.url} topicId={topic._id} title={topic.title} />;
    } else if (type === "site") {
      return <Site url={topic.url} topicId={topic._id} title={topic.title} />;
    } else if (type === "mp4") {
      return <Iframe url={topic.url} topicId={topic._id} title={topic.title} />;
    } else if (type === "youtube") {
      return <Youtube videoId={topic.youtubeId} height="400px" />;
    } else if (type === "facebook") {
      return <Facebook url={topic.url} />;
    } else if (type === "twitter") {
      return <Twitter url={topic.url} />;
    } else if (type === "instagram") {
      return (
        <Instagram
          url={topic.url}
          width={500}
          topicId={topic._id}
          title={topic.title}
        />
      );
    } else if (type === "reddit") {
      return <Reddit url={topic.url} />;
    } else if (type === "pinterest") {
      return <Pinterest url={topic.url} />;
    } else if (type === "medium") {
      return <Medium url={topic.url} />;
    } else if (type === "localImage" || type === "localGif") {
      return (
        <LocalImage url={topic.img} topicId={topic._id} title={topic.title} />
      );
    } else {
      return <div>CANNOT RENDER</div>;
    }
  };

  const handleTagRender = () => {
    return topic.tags.map((tag, index) => <TagButton key={index} name={tag} />);
  };

  return (
    <Card className={classes.root} elevation={0}>
      <CardHeader
        avatar={
          <ThumbNails
            name={topic.userId ? topic.userId.username : "Anonymous"}
            url={topic.userId && topic.userId.img}
          />
        }
        action={
          user.user && (
            <span className={classes.option}>
              {topic.userId && user.user._id !== topic.userId._id && (
                <FollowButton userId={topic.userId._id} />
              )}
              <Options
                userId={topic.userId}
                topicId={topic._id}
                topic={topic}
              />
            </span>
          )
        }
        component="div"
        classes={{
          content: classes.title,
        }}
        title={
          <div className={classes.titleStyles}>
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
                className={classes.user}
                href={topic.userId.isDeleted ? "#" : "/p/" + topic.userId.username}
              >
                {topic.userId.isDeleted ? (
                  <>
                    {"[Deleted]"}
                  </>
                ) : (
                  <>
                    @{topic.userId.username}
                  </>
                )}
              </Typography>
            ) : (
              <Typography align="left" color="primary">
                {t("Anonymous")}
              </Typography>
            )}
          </div>
        }
        subheader={moment(topic.createdAt)
          .locale(
            typeof i18n.language !== "undefined"
              ? i18n.language == "cn"
                ? "zh_cn"
                : i18n.language
              : "en"
          )
          .fromNow()
          .replace("ago", "")
          .replace("minutes", "min")
          .replace("hours", "h")
          .replace("days", "d")}
      />

      <CardContent className={classes.content}>
        {/* post title */}
        <Typography
          variant="h5"
          align="left"
          href={"/topics/" + topic._id + "/" + nutralizeTitle(topic.title)}
          component="a"
          className={classes.titleLink}
        >
          <Linkify
            tagName="span"
            options={{
              format: {
                url: function (value) {
                  return value.length > 50 ? value.slice(0, 50) + "…" : value;
                },
              },
            }}
          >
            {topic.title}
          </Linkify>
        </Typography>
        <br />
        {
          topic.groupId && topic.group && router.pathname && router.pathname !== "/group/[groupname]" && (
            <>
              <b>in /<a style={{ color: "inherit", textDecoration: "none" }} href={
                "/group/" + topic.group.name.replaceAll(" ", "-").replaceAll("&", "%26")
              }>{topic.group.name}</a></b>
              &nbsp;
            </>
          )
        }

        <div className={classes.tag}>{handleTagRender()}</div>

        {/* display text message for text type */}
        {topic.type === "text" && (
          <p className={classes.value}>
            {topic.message.split("\n").map(function (item, key) {
              return (
                <span key={key}>
                  <Linkify
                    options={{
                      format: {
                        url: function (value) {
                          return value.length > 50
                            ? value.slice(0, 50) + "…"
                            : value;
                        },
                      },
                    }}
                    tagName="span"
                  >
                    {item}
                  </Linkify>
                  <br />
                </span>
              );
            })}
          </p>
        )}
      </CardContent>

      {topic.type !== "text" && (
        <div className={classes.object}>
          {handleRenderObject(topic.type, topic)}
        </div>
      )}

      {/* hide site url if site is null */}
      {topic.siteId && (
        <CardContent>
          <a className={classes.link} href={"/domain?s=" + topic.siteId.url}>
            ({topic.siteId.url})
          </a>
        </CardContent>
      )}

      <CardActions disableSpacing style={{ flexWrap: "wrap" }}>
        <Vote
          downVotes={topic.downVotes}
          upVotes={topic.upVotes}
          topicId={topic._id}
        />

        <Comments count={topic.commentsCount} topicId={topic._id} title={topic.title} />

        <Favourite topicId={topic._id} />

        <Share topicId={topic._id} title={topic.title} />

        {/* check if it's not an anonymous post and show tip icon */}
        {topic.userId && user.user && topic.userId._id !== user.user._id && (
          <TipPost topicId={topic._id} />
        )}

        {topic.userId && <Broadcast topicId={topic._id} />}
      </CardActions>

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
    </Card>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(CardRoot));

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: theme.spacing(2, 0.5),
  },
  object: {
    minHeight: 100,
    minWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  tag: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  titleStyles: { display: "flex", flexDIrection: "row" },
  value: {
    marginLeft: 2,
    margin: 1,
    fontSize: 14,
    color: theme.palette.grey[800],
    textAlign: "left",
  },
  titleLink: {
    textAlign: "left",
    textDecoration: "none",
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  option: {
    display: "flex",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    lineHeight: "10px",
  },
  link: {
    textDecoration: "none",
    display: "flex",
  },
  user: {
    textDecoration: "none",
  },
}));
