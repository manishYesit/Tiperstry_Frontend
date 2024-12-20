import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import Card from "../../../components/Card";

import { connect } from "react-redux";
import Hidden from "@material-ui/core/Hidden";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import { config } from "../../../../config";

import Button from "@material-ui/core/Button";
import axios from "axios";

import Nsfwmodal from "./Nsfwmodal";
("./Nsfwmodal");

import GroupSidebar from "./GroupSidebar";
import GroupCreate from "../../Home/components/CreateGroup";
import GroupPostCreate from "../../Home/components/CreateGroupPost";
import CryptocurrencyCreate from "../../Home/components/CreateCryptocurrency";

const SearchInput = dynamic(() => import("../../../components/SearchInput"), {
  ssr: false,
});
const AuthSortOptions = dynamic(
  () => import("../../../components/SortOptions/auth"),
  {
    ssr: false,
  }
);
const SortOptions = dynamic(() => import("../../../components/SortOptions/"), {
  ssr: false,
});
const LadderBoardModal = dynamic(
  () => import("../../../components/LadderBoardModal"),
  {
    ssr: false,
  }
);
const LadderBoard = dynamic(() => import("../../../components/LadderBoard"), {
  ssr: false,
});
const ProfileCard = dynamic(() => import("../../../components/ProfileCard"), {
  ssr: false,
});
const SiteInfo = dynamic(() => import("../../../components/SiteInfo"), {
  ssr: false,
});

const mapStateToProps = ({ topics, user }) => {
  return {
    topics,
    user,
  };
};

function Layout({
  topics: { topics, loading },
  user: { user },
  group,
  viewstyle,
}) {
  topics = topics.filter(function (el) {
    return el != null;
  });

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
            groupId: group._id,
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

  function openModeratorView() {
    location.href = "?viewtype=moderator";
  }

  const classes = useStyles();
  const [nsfwyes, setNsfwYes] = React.useState(true);

  return (
    <Container maxWidth="lg" className={classes.root}>
      {/* <div className={classes.groupsheader}>
        <a href="">
          <img
            src={
              !group.icon.includes("/null") ? group.icon : "/static/tipcoin.png"
            }
            height={60}
            width={"auto"}
          />
        </a>
        &nbsp;
        <h2
          style={{
            color: "black",
            fontSize: "32px",
            fontWeight: "600",
            lineHeight: "normal",
            width: "100%",
            textAlign: "center",
          }}
        >
          <a href="" style={{ color: "inherit", textDecoration: "none" }}>
            {group.name}
          </a>
        </h2>
        {user && user._id != group.userId && (
          <Button
            onClick={joinGroup}
            className={classes.joinbtn}
            color="default"
            variant="outlined"
          >
            {(group.members.includes(user._id) || userjoined) && !leavesuccess && "Leave"}
            {((!group.members.includes(user._id) && !userjoined) || leavesuccess) && "Join"}
          </Button>
        )}
      </div> */}

      <Hidden only={["sm", "xs"]}>
        <Grid container spacing={3} className={classes.resetWidth}>
          {/* <Grid item xs={12} sm={12} md={3}>
            <GroupSidebar group={group} user={user} />
          </Grid> */}
          <Grid item xs={8} sm={8} md={8} justify="center" align="left" style={{ padding: 'unset' }}>
            {/* <SearchInput /> */}
            {/* {user ? (
              <AuthSortOptions group={group} />
            ) : (
              <SortOptions group={group} />
            )} */}
            {loading ? (
              <Box
                width="100%"
                mt={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress size={40} color="primary" />
              </Box>
            ) : (
              <Card topics={topics} />
            )}
          </Grid>
          <Grid item xs={4} sm={4} md={4} style={{ padding: 'unset' }}>
            <div className={classes.sideRoot}>
              <div>
                {/* {user && <ProfileCard user={user} />} */}

                {viewstyle == "normal" &&
                  (user._id == group.userId || user.isAdmin ||
                    group.moderators.some(
                      (moderator) => moderator.identity == user._id
                    )) && (
                    <div>
                      <Button
                        style={{ backgroundColor: "#b1d1f0", width: "100%" }}
                        onClick={openModeratorView}
                      >
                        Switch to moderator view
                      </Button>
                    </div>
                  )
                }

                <SearchInput />
                <GroupPostCreate user={user} group={group} />
                <GroupCreate user={user} />
                <CryptocurrencyCreate user={user} />

                <div className={classes.groupsheader}>
                  <a href="">
                    <img
                      src={
                        !group.icon.includes("/null") ? group.icon : "/static/tipcoin.png"
                      }
                      height={60}
                      width={"auto"}
                    />
                  </a>
                  &nbsp;
                  <h2
                    style={{
                      color: "black",
                      fontSize: "32px",
                      fontWeight: "600",
                      lineHeight: "normal",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <a href="" style={{ color: "inherit", textDecoration: "none" }}>
                      {group.name}
                    </a>
                  </h2>
                  {user && user._id != group.userId && (
                    <Button
                      onClick={joinGroup}
                      className={classes.joinbtn}
                      color="default"
                      variant="outlined"
                    >
                      {(group.members.includes(user._id) || userjoined) && !leavesuccess && "Leave"}
                      {((!group.members.includes(user._id) && !userjoined) || leavesuccess) && "Join"}
                    </Button>
                  )}
                </div>

                {/* <LadderBoard item="1" single group={group} /> */}
                <GroupSidebar group={group} user={user} />
                <SiteInfo />
              </div>
            </div>
          </Grid>
        </Grid>
      </Hidden>

      <Hidden only={["md", "lg", "xl"]}>
        <SearchInput />
        {user ? (
          <AuthSortOptions group={group} />
        ) : (
          <SortOptions group={group} />
        )}
        <Card topics={topics} />
      </Hidden>
      {/* <LadderBoardModal /> */}

      {group && group.is_nsfw && (
        <Nsfwmodal opened={nsfwyes} setNsfwYes={setNsfwYes} />
      )}
    </Container>
  );
}

export default connect(mapStateToProps)(Layout);

const useStyles = makeStyles((theme) => {
  const breakpoints = theme.breakpoints;
  return {
    root: {
      marginTop: '5px',
      [breakpoints.down("xs")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
      maxWidth: '100%',
    },
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    marginTop: {
      marginTop: theme.spacing(1),
    },
    resetWidth: {
      [breakpoints.down("xs")]: {
        width: "100vw",
        margin: 0,
      },
      margin: 0,
    },
    sideRoot: {
      position: "relative",
      maxWidth: '400px',
    },
    displayFlex: {
      display: "flex",
    },
    spaceBetween: {
      justifyContent: "space-between",
    },
    buttonLineHeight: {
      lineHeight: "2rem",
    },
    groupsheader: {
      paddingLeft: "8px",
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      backgroundColor: "white",
      marginBottom: "14px",
    },
    joinbtn: {
      borderRadius: "50px",
      borderColor: "#58a5de",
      color: "#0079d3",
      padding: "2px 15px",
      marginLeft: "15px",
      textTransform: "capitalize",
    },
  };
});
