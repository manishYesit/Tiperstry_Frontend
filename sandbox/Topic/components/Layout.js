import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LadderBoard from "../../../components/LadderBoard";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import EmbedSite from "../../../components/EmbedSite";
import Action from "../../../components/EmbedSite/components/Action";
import SectionHeader from "./SectionHeader";
import Conversation from "./Conversation";
import Gif from "../../../components/EmbedSite/components/Gif";
import Typography from "@material-ui/core/Typography";
import TotalSite from "./TotalSite";
import { makeStyles } from "@material-ui/core/styles";
import { config } from "../../../../config";
import Linkify from "linkifyjs/react";
import { useRouter } from "next/router"
import axios from "axios"
import TagButton from "../../../components/TagButton";
import Paper from "@material-ui/core/Paper";



const mapStateToProps = (state) => {
  return {
    topics: state.topics
  }
}


function Layout({ topics: { singleTopic } }) {
  const classes = useStyles();
  const router = useRouter();
  const [tips, setTips] = React.useState([]);

  const handleFetchTips = async () => {
    try {
      const tip = await axios.get(config.tipPost + "/" + router.query.topicId);

      // console.log("tiptip", tip);
      setTips(tip.data);
    } catch (error) {
      // console.log("error", error);
      // console.log("error", error.response);
    }
  };

  React.useEffect(() => {
    const tips = setTimeout(() => {
      handleFetchTips();
    }, 2000);
    return () => {
      clearTimeout(tips);
    };
  }, []);



	return (
    <Container maxWidth="md" style={{ marginTop: 100 }}>
      {singleTopic && <EmbedSite topic={singleTopic} />}

      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={12} md={8} align="left">
          {singleTopic && (
            <>
              <Paper className={classes.paper}>
                <Box marginTop={1}>
                  <Typography
                    align="left"
                    component="a"
                    href={singleTopic.url}
                    variant="caption"
                    color="primary"
                    target="_blank"
                    className={classes.link}
                  >
                    {singleTopic.url}
                  </Typography>
                </Box>
                {/* tags  */}
                <Box className={classes.tag}>
                  {singleTopic.tags && singleTopic.tags.map((tag, index) => (
                    <TagButton key={index} name={tag} />
                  ))}
                </Box>
                {/* <Typography>{singleTopic.message}</Typography> */}

                {/* message */}
                {singleTopic.message !== "" && (
                  <Box mt={2}>
                    <p className={classes.value}>
                      {singleTopic.message
                        .split("\n")
                        .map(function (item, key) {
                          return (
                            <span key={key}>
                              {/* {item} */}
                              <Linkify tagName="span">{item}</Linkify>
                              <br />
                            </span>
                          );
                        })}
                    </p>
                  </Box>
                )}
              </Paper>

              {/* action buttons */}
              <Action
                topicId={singleTopic._id}
                userId={singleTopic.userId}
                downVotes={singleTopic.downVotes}
                upVotes={singleTopic.upVotes}
                commentsCount={singleTopic.commentsCount}
                tips={tips}
              />
              <TotalSite url={singleTopic.url} type={singleTopic.type} />
              <SectionHeader topicId={singleTopic._id} />
            </>
          )}
          <Conversation />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <LadderBoard item='1' single />
        </Grid>
      </Grid>
    </Container>
  );
}


export default connect(mapStateToProps)(Layout);


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: theme.spacing(2, 0.5),
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)",
    },
  },
  value: {
    marginLeft: 2,
    marginTop: theme.spacing(1),
    margin: 1,
    fontSize: 14,
    color: theme.palette.grey[800],
    textAlign: "left",
  },
  tag: {
    // marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  link: {
    textDecoration: "none",
    fontSize: 14,
    paddingTop: theme.spacing(1),
  },
  paper: {
    boxShadow: "0px 0px 0px 0px",
    padding: theme.spacing(1),
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)",
    },
  },
}));
