import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LadderBoard from "../../../components/LadderBoard";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import EmbedSite from "../../../components/EmbedSite";
import Action from "../../../components/EmbedSite/components/Action";
import AddComment from "./AddComment";
import Conversation from "./Conversation";
import Gif from "../../../components/EmbedSite/components/Gif";
import Typography from "@material-ui/core/Typography";
import TotalSite from "./TotalSite";
import { makeStyles } from "@material-ui/core/styles";
import { config } from "../../../../config";
import Linkify from "linkifyjs/react";
import { useRouter } from "next/router"
import dynamic from "next/dynamic";
import axios from "axios"
import TagButton from "../../../components/TagButton";
import Paper from "@material-ui/core/Paper";
import Body from "./body";
import Button from "@material-ui/core/Button";

import VoteBox from "./VoteBox";
import GroupCreate from "../../Home/components/CreateGroup";
import GroupPostCreate from "../../Home/components/CreateGroupPost";
import CryptocurrencyCreate from "../../Home/components/CreateCryptocurrency";

const SearchInput = dynamic(() => import("../../../components/SearchInput"), {
  ssr: false,
});

import GroupSidebar from "../../../containers/Group/components/GroupSidebar";
import PostJoinGroup from "../../../containers/Group/components/PostJoinGroup";

const Share = dynamic(() => import("../../../components/Share"), {
  ssr: false
});

const Notification = dynamic(() => import("../../../components/Notification"), {
  ssr: false,
});

const Report = dynamic(() => import("../../../components/Report"), {
  ssr: false,
});

const mapStateToProps = (state) => {
  return {
    topics: state.topics,
    user: state.user
  }
}

function Layout({ topics: { singleTopic }, user: { user } }) {
  const classes = useStyles();
  const router = useRouter();
  const [tips, setTips] = React.useState([]);
  const [bannedchecked, setBannedChecked] = React.useState(false);
  const [userjoined, setUserJoined] = React.useState(false);
  const [leavesuccess, setleaveSuccess] = React.useState(false);

  const joinGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        let group_joiningstatus = await axios.post(
          config.joingroup,
          {
            userId: user._id,
            groupId: singleTopic.groupId,
          },
          {
            headers: { "x-auth-token": token },
          }
        );

        if (group_joiningstatus.data.message.includes("Left")) {
          setUserJoined(false);
          setleaveSuccess(true);
        }
        else if (group_joiningstatus.data.message.includes("Joined")) {
          setUserJoined(true);
          setleaveSuccess(false);
        }

        // location.reload();
      }
    } catch (error) {
      console.error("join group error", error);
    }
  };


  const handleFetchTips = async () => {
    try {
      const tip = await axios.get(config.tipPost + "/" + router.query.topicId);

      setTips(tip.data);
    } catch (error) {
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

  if (!singleTopic) return null;

  return (
    <Grid container justify="center" style={{ padding: "5px 10px" }}>
      <Grid id="topicpagecontainer" item xs={8} sm={8} md={8} align="left">
        <Container maxWidth="md" className={classes.container}>
          {/* {
            singleTopic && singleTopic.groupId && (
              <div className={classes.groupsheader}>
                <img src={singleTopic.group.icon === null ? "/static/tipcoin.png" : config.getImage + singleTopic.group.icon} height={60} width={"auto"} />
                &nbsp;
                <h2 style={{ color: "black", fontSize: "32px", fontWeight: "600", lineHeight: "normal", width: "100%", textAlign: "center" }}><a style={{ color: "inherit", textDecoration: 'none' }} href={"/group/" + singleTopic.group.name.replace(" ", "-").replace("&", "%26")}>{singleTopic.group.name}</a></h2>

                {user && user._id != singleTopic.group.userId && (
                  <Button
                    onClick={joinGroup}
                    className={classes.joinbtn}
                    color="default"
                    variant="outlined"
                  >
                    {(singleTopic.group.members.includes(user._id) || userjoined) && !leavesuccess && "Leave"}
                    {((!singleTopic.group.members.includes(user._id) && !userjoined) || leavesuccess) && "Join"}
                  </Button>
                )}
              </div>
            )
          } */}

          <Grid container spacing={2} justify="center">

            {singleTopic && <EmbedSite topic={singleTopic} />}

            <Grid container spacing={2} justify="center">
              <Grid item xs={12} sm={12} md={12} align="left" style={{ marginTop: 10 }}>
                {singleTopic && singleTopic.message && (
                  <>
                    <Paper className={classes.paper}>
                      <Box marginTop={1}>
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
                          {singleTopic.url}
                        </Linkify>
                      </Box>
                      {/* tags  */}
                      {/* <Box className={classes.tag}>
                        {singleTopic.tags && singleTopic.tags.map((tag, index) => (
                          <TagButton key={index} name={tag} />
                        ))}
                      </Box> */}
                      {/* <Typography>{singleTopic.message}</Typography> */}

                      {/* message */}
                      {/* {singleTopic.message !== ""} */}
                      <Body description={singleTopic.message} />
                    </Paper>

                    {/* action buttons */}
                    {/* <Action
                      topicId={singleTopic._id}
                      title={singleTopic.title}
                      userId={singleTopic.userId}
                      downVotes={singleTopic.downVotes}
                      upVotes={singleTopic.upVotes}
                      commentsCount={singleTopic.commentsCount}
                      tips={tips}
                    /> */}
                    {/* <TotalSite url={singleTopic.url} type={singleTopic.type} /> */}

                  </>
                )}

              </Grid>
              {/* <Grid item xs={12} sm={12} md={4}>
                <LadderBoard item='1' single group={singleTopic.group} />
              </Grid> */}
              <Grid item xs={12} sm={12} md={12}>
                <AddComment topicId={singleTopic._id} />
                <Conversation />
              </Grid>
            </Grid>
            <Share />
            <Notification />
            <Report />

          </Grid>
        </Container>
      </Grid>

      <Grid id="groupsidebar_postpage" item xs={4} sm={4} md={4} align="left" style={{ paddingRight: '20px', paddingLeft: '25px', maxWidth: '450px' }}>
        <SearchInput />

        <VoteBox topic={singleTopic} />

        <GroupPostCreate user={user} group={singleTopic.group} />
        <GroupCreate user={user} />
        <CryptocurrencyCreate user={user} />

        {singleTopic && singleTopic.groupId && <PostJoinGroup group={singleTopic.group} user={user} />}

        <LadderBoard item='1' single group={singleTopic.group} />

        {singleTopic && singleTopic.groupId && <GroupSidebar group={singleTopic.group} user={user} />}
      </Grid>
    </Grid>
  );
}

export default connect(mapStateToProps)(Layout);

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 25,
  },
  root: {
    maxWidth: 500,
    margin: theme.spacing(2, 0.5),
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
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
  groupsheader: {
    width: "calc(100% + 16px)",
    marginLeft: "-8px",
    paddingLeft: "8px",
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: "14px"
  },
  joinbtn: {
    borderRadius: "50px",
    borderColor: "#58a5de",
    color: "#0079d3",
    padding: "2px 15px",
    marginLeft: "15px",
    textTransform: "capitalize",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));
