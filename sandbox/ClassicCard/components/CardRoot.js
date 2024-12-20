import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ThumbNails from "../../ThumbNails";
import Options from "./Options";
import moment from "moment";
import Image from "./Image";
import Gif from "./Gif";
import Site from "./Site";
import Vote from "./Vote";
import { toggleGift } from "../../../store/actions";
import { connect } from "react-redux";
import Favourite from "./Favourite";
import Comments from "./Comment";
import Youtube from "./Youtube";
import TipPost from "./TipPost";
import Share from "./Share";
import DisplayTips from "./DisplayTips";
import Divider from "@material-ui/core/Divider";
import { config } from "../../../../config";
import { nutralizeTitle } from "../../../util";
import TagButton from "../../TagButton"

const mapDispatchToProps = {
  toggleGift
};

const CardRoot = (props) => {
  const classes = useStyles();
  const { topic, toggleGift } = props;
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

  const handleRenderObject = (type) => {
    if (type === "gif") {
      return <Gif url={topic.url} />;
    } else if (type === "image") {
      return <Image url={topic.url} />;
    } else if (type === "site") {
      return <Site url={topic.url} />;
    } else if (type === "youtube") {
      return <Youtube videoId={topic.youtubeId} />
    } else if (type === "localImage") {
      return <Image url={topic.img} />;
    }
  }


  const handleTagRender = () => {
    return (
      topic.tags.map((tag, index) => (
        <TagButton key={index} name={tag} />
      ))
    )
  }

  return (
    <Card className={classes.root} elevation={0} >
      <CardHeader
        avatar={
          <ThumbNails
            name={topic.userId ? topic.userId.username : "Anonymous"}
          />
        }
        action={<Options />}
        component="div"
        classes={{
          content: classes.title
        }}
        title={
          <>
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
          </>
        }
        subheader={moment(topic.createdAt).fromNow()}
      />
      <CardContent>
        {/* post title */}
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

        {/* display text message for text type */}
        {topic.type === "text" && (
          <p className={classes.value}>
            {topic.message.split("\n").map(function(item, key) {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </p>
        )}
      </CardContent>
      <div className={classes.tag}>{handleTagRender()}</div>
      {handleRenderObject(topic.type)}

      {/* hide site url if site is null */}
      {topic.siteId && (
        <CardContent>
          {/* <Typography
            variant="body2"
            color="textSecondary"
            component="a"
            href={"/sites?s=" + topic.siteId.url}
            align="left"
          >
            {topic.url}
          </Typography> */}
          {/* site URL */}
          <a href={"/sites?s=" + topic.siteId.url}>({topic.siteId.url})</a>
        </CardContent>
      )}

      <CardActions disableSpacing>
        <Vote count={topic.votesCount} topicId={topic._id} />

        <Favourite topicId={topic._id} />

        <Comments count={topic.commentsCount} />

        <Share topicId={topic._id} />

        {/* check if it's not an anonymous post and show tip icon */}
        {topic.userId && <TipPost topicId={topic._id} />}
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
}


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    margin: theme.spacing(2, 0.5),
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)"
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  tag: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  value: {
    marginLeft: 2,
    margin: 1,
    fontSize: 14,
    color: theme.palette.grey[800],
    textAlign: "left"
  },
  titleLink: {
    textAlign: "left"
  }
}));


export default connect(null, mapDispatchToProps)(CardRoot)