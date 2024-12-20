import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { nutralizeTitle } from "../../../../../utils";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TagButton from "../../../../TagButton";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import Action from "./Action";
import TopicVote from "./TopicVote";
import Youtube from "./Youtube";
import Youtube2 from "../../ClassicCard/components/Youtube";
import Twitter from "./Twitter";
import Twitter2 from "../../ClassicCard/components/Twitter";
import Facebook from "./Facebook";
import Facebook2 from "../../ClassicCard/components/Facebook";
import LocalImage from "./localImage";
import Image from "./Image";
import Gif from "./Gif";
import Site from "./Site";
import Iframe from "../../../../EmbedSite/components/Iframe";

import { withTranslation } from "../../../../../../i18n";
import Linkify from "linkifyjs/react";

import Instagram from "../../ClassicCard/components/Instagram";
import Reddit from "../../ClassicCard/components/Reddit";
import Pinterest from "../../ClassicCard/components/Pinterest";
import Medium from "../../ClassicCard/components/Medium";

import { isMobile } from "react-device-detect";

import { config } from "../../../../../../config";
import { useRouter } from "next/router";

const Compact = ({ topic, i18n, t }) => {
  const classes = useStyles();
  const router = useRouter();
  const [expanded, setExpanded] = useState("false");
  const [thumbloaded, setThumbloaded] = useState(false);
  const [stopspinner, setStopspinner] = useState(true);

  React.useEffect(() => {
    if (!thumbloaded) {
      setTimeout(function () {
        setStopspinner(true);
      }, 5000);
    }
  });

  function getTopicType(type, topicdata) {
    if (topicdata == "default") {
      let nondefault = ["instagram", "reddit", "medium"];
      if (nondefault.includes(type)) {
        type = "site";
      }
    } else if (topicdata.url != null) {
      if (topicdata.url.includes("twitter.com")) {
        type = "twitter";
      } else if (topicdata.url.includes("redd.it") && topicdata.url.includes(".gif")) {
        type = "site";
      } else if (topicdata.url.includes("redgifs.com")) {
        type = "redgifs";
      } else if (topicdata.url.includes("facebook.com")) {
        type = "facebook";
      } else if (topicdata.url.includes("reddit.com")) {
        type = "reddit";
      } else if (topicdata.url.includes("instagram.com")) {
        type = "instagram";
      } else if (topicdata.url.includes("medium.com")) {
        type = "medium";
      } else if (topicdata.url.includes("pinterest.com")) {
        type = "pinterest";
      } else if (topicdata.url.includes("youtu.be") || topicdata.url.includes("youtube.com")) {
        type = "youtube";
      } else if (topicdata.url.includes(".jpg") || topicdata.url.includes(".png") || topicdata.url.includes(".webp") || topicdata.url.includes(".jpeg")) {
        type = "image";
      } else if (topicdata.url.includes(".gif")) {
        type = "gif";
      } else {
        type = "site";
      }
    } else {
      type = "localImage";
    }

    return type;
  }

  const loadURLNewTab = (topic) => {
    window.open(topic.url, "_blank");
    return;
  };

  const handleRenderObject = (type, topicdata = undefined) => {
    type = getTopicType(type, topicdata);

    if (type === "gif") {
      if (topicdata == "default")
        return <Gif url={topic.url} topicId={topic._id} title={topic.title} />;
      else
        return (
          <Gif
            embed={true}
            url={topic.url}
            topicId={topic._id}
            title={topic.title}
          />
        );
    } else if (type === "image") {
      if (topicdata == "default") {
        if (topic.imgThumbnail) {
          return (<LocalImage url={topic.imgThumbnail} topicId={topic._id} title={topic.title} />);
        } else {
          return (<Image url={topic.url} topicId={topic._id} title={topic.title} />);
        }
      } else {
        return (<Image embed={true} url={topic.url} topicId={topic._id} title={topic.title} />);
      }
    } else if (type === "site") {
      if (topic.imgThumbnail) {
        return (<LocalImage url={topic.imgThumbnail} topicId={topic._id} title={topic.title} />);
      } else {
        return <Site url={topic.url} topicId={topic._id} title={topic.title} />;
      }
    } else if (type === "youtube") {
      if (topicdata == "default")
        return (
          <Youtube url={topic.url} topicId={topic._id} title={topic.title} />
        );
      else
        return (
          <Youtube2
            videoId={topic.youtubeId}
            url={topic.url}
            topicId={topic._id}
            title={topic.title}
          />
        );
    } else if (type === "twitter") {
      if (topicdata == "default")
        return (
          <Twitter url={topic.url} topicId={topic._id} title={topic.title} />
        );
      else
        return (
          <Twitter2 url={topic.url} topicId={topic._id} title={topic.title} />
        );
    } else if (type === "facebook") {
      if (topicdata == "default")
        return (
          <Facebook url={topic.url} topicId={topic._id} title={topic.title} />
        );
      else return <Facebook2 url={topic.url} />;
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
    } else if (type === "redgifs") {
      return <Iframe url={topic.url} root={true} />
    } else if (type === "pinterest") {
      return <Pinterest url={topic.url} />;
    } else if (type === "medium") {
      return <Medium url={topic.url} />;
    } else if (type === "localImage" || type === "localGif") {
      if (topicdata == "default") {
        return (
          <LocalImage
            url={topic.imgThumbnail ? topic.imgThumbnail : topic.img}
            topicId={topic._id}
            title={topic.title}
          />
        );
      } else
        return (
          <a href={"/topics/" + topic._id + "/" + nutralizeTitle(topic.title)}>
            <img
              style={{
                maxWidth: "100%",
                height: "450px",
              }}
              src={config.getImage + topic.img}
            />
          </a>
        );
    }
  };

  const toggleExpanded = (topic) => {
    setThumbloaded(false);
    setExpanded(!expanded);
  };

  const expandIconHeight = 20;

  return (
    <>
      <Paper className={classes.root}>
        {router.pathname && router.pathname !== "/p/[username]" && !isMobile && (
          <TopicVote
            topictitle={topic.title}
            id={topic._id}
            topicId={topic._id}
            downVotes={topic.downVotes}
            upVotes={topic.upVotes}
          />
        )}
        <div
          style={{
            backgroundImage:
              ["twitter", "facebook", "reddit", "medium"].includes(
                topic.type
              ) || stopspinner
                ? ""
                : "url('https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className={classes.Thumbnail}
        >
          {handleRenderObject(topic.type, "default")}
          {router.pathname && router.pathname !== "/p/[username]" && isMobile && (
            <TopicVote
              topictitle={topic.title}
              id={topic._id}
              topicId={topic._id}
              downVotes={topic.downVotes}
              upVotes={topic.upVotes}
            />
          )}
        </div>
        <div className={classes.header}>
          <div className={classes.header}>
            <div style={{ display: "inline-block", textAlign: "left" }}>
              <a
                href={
                  "/topics/" + topic._id + "/" + nutralizeTitle(topic.title)
                }
                className={classes.titleLink}
              >
                <Linkify
                  tagName="span"
                  options={{
                    format: {
                      url: function (value) {
                        return value.length > 50
                          ? value.slice(0, 50) + "…"
                          : value;
                      },
                    },
                  }}
                >
                  {topic.title}
                </Linkify>
              </a>
              {topic.tags.map((tag) => (
                <TagButton key={tag} name={tag} classnames={classes.user} />
              ))}{" "}
              {/* <div style={{ float: "right", width: "100%" }}>
                {topic.issticky && topic.groupId && (
                  <img src={"/static/pin-green.png"} width={20} height={20} />
                )}
              </div> */}
            </div>
            <div>
              <div className={classes.secondTier}>
                {topic.issticky && topic.groupId && (
                  <Typography
                    className={classes.user}
                    style={{ paddingRight: 2, display: router.pathname == "/" ? (topic.issticky ? 'none' : 'flex') : 'flex' }}
                  >
                    <img src={"/static/pin-green.png"} width={15} height={15} />
                  </Typography>
                )}

                {topic.promoted && topic.promoted == true && (
                  <Typography style={{ color: "blue", marginRight: ".2rem", fontSize: 12 }}>
                    PROMOTED{" "}
                  </Typography>
                )}
                {"   "}
                {topic.userId ? (
                  <Typography
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
                    {"  "}
                  </Typography>
                ) : (
                  <>
                    <Typography
                      align="left"
                      className={classes.user}
                      color="primary"
                    >
                      {t("Anonymous")}
                      {"  "}
                    </Typography>{" "}
                  </>
                )}
                &nbsp;
                {
                  topic.groupId && topic.group && router.pathname && router.pathname !== "/group/[groupname]" && (
                    <>
                      in /<a style={{ color: "#369", textDecoration: "none" }} href={
                        "/group/" + topic.group.name.replaceAll(" ", "-").replaceAll("&", "%26")
                      }>{topic.group.name}</a>
                      &nbsp;
                    </>
                  )
                }

                <Typography
                  align="left"
                  className={classes.user}
                  style={{ textTransform: "none", fontWeight: 400 }}
                  variant="overline"
                >
                  {moment(topic.createdAt)
                    .locale(
                      typeof i18n.language !== "undefined"
                        ? i18n.language == "cn"
                          ? "zh_cn"
                          : i18n.language
                        : "en"
                    )
                    .fromNow()
                    // .replace("ago", "")
                    // .replace("minutes", "min")
                    // .replace("hours", "h")
                    // .replace("days", "d")
                  }
                </Typography>
                &nbsp;
                {/* {topic.tags.map((tag) => (
                  <TagButton key={tag} name={tag} classnames={classes.user} />
                ))}{" "} */}
                {/* hide site url if site is null */}
                {topic.siteId && (
                  <a
                    className={classes.user} style={{ color: "#888" }}
                    href={"/domain?s=" + topic.siteId.url}
                  >
                    ({topic.siteId.url})
                  </a>
                )}
              </div>
            </div>
            <div>
              <Action
                getTopicType={getTopicType}
                toggleExpanded={toggleExpanded}
                topic={topic}
                topicId={topic._id}
                userId={topic.userId}
                downVotes={topic.downVotes}
                upVotes={topic.upVotes}
                title={topic.title}
                commentsCount={topic.commentsCount}
              />
            </div>
          </div>
        </div>
      </Paper>
      {expanded ? (
        <></>
      ) : getTopicType(topic.type, topic) == "site" ? (
        <div style={{ display: "none" }}>{loadURLNewTab(topic)}</div>
      ) : (
        <div
          style={{
            width: "100%",
            backgroundColor: "white",
            marginTop: "-8px",
            backgroundImage:
              (thumbloaded &&
                ["twitter", "facebook", "reddit", "medium"].includes(
                  topic.type
                )) ||
                stopspinner
                ? ""
                : "url('https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className={classes.object}
        >
          {handleRenderObject(topic.type, topic)}
        </div>
      )}
    </>
  );
};

export default withTranslation()(Compact);

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: 0,
    margin: "4px 0px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderRadius: 0,
    backgroundColor: "#FFF",
    boxShadow: "none"
  },
  header: {
    display: "flex",
    flexDirection: "column",
  },
  tag: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  secondTier: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    fontSize: 12,
  },
  action: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: spacing(1),
  },
  VoteRoot: {
    display: "flex",
    flexDirection: "column",
    padding: spacing(0.5, 1),
  },
  Thumbnail: {
    padding: spacing(0.5, 1),
  },
  object: {
    minHeight: 100,
    minWidth: "100%",
    alignItems: "center",
  },
  titleLink: {
    textAlign: "left",
    textDecoration: "none",
    color: "#00f",
    fontSize: 16,
    width: "100%",
    // fontWeight: "500",
    fontFamily: "verdana,arial,helvetica,sans-serif",
  },
  user: {
    fontSize: 12,
    textDecoration: "none",
  },
  large: {
    width: spacing(9),
    height: spacing(9),
  },
}));
