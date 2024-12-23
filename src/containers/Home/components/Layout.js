import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import Card from "../../../components/Card";
import SuggestionCard from "../../../components/SuggestionCard";
import HotSectionCard from "../../../components/HotSectionCard";
import { connect } from "react-redux";
import Hidden from "@material-ui/core/Hidden";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import { config } from "../../../../config";

import countries_list from "../../../components/HotSectionCard/countrieslist";
import Router from "next/router";
import axios from "axios";

import PostCreate from "./CreatePost";
import GroupCreate from "./CreateGroup";
import CryptocurrencyCreate from "./CreateCryptocurrency";
import AICreate from "./CreateAI";

import { setSortFilter } from "../../../store/actions";

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

const TopHashtag = dynamic(() => import("./TopHashtag"), {
  ssr: false,
});

const mapStateToProps = ({ topics, user }) => {
  return {
    topics,
    user,
  };
};

function Layout({ topics: { topics, loading }, user: { user } }) {
  topics = topics.filter(function (el) {
    return el != null;
  });

  const classes = useStyles();

  const getUserCountry2 = async () => {
    if (Router.router.route.includes("hashtag") && Router.query.c) {
      localStorage.setItem("country", Router.query.c);
      setCountry(Router.query.c);
      return;
    }

    try {
      let userLocation = "";
      if (localStorage.getItem("country") != "") {
        userLocation = localStorage.getItem("country");
      } else {
        userLocation = await axios.get(`${config.location}`);
        userLocation = userLocation.data;
      }

      localStorage.setItem("country", userLocation);
      setCountry(userLocation.data);
    } catch (error) {
      console.log(error);
    }
  };

  var [country, setCountry] = useState("US"); //default to USA
  useEffect(() => {
    getUserCountry2();
  });

  return (
    <Container className={classes.root} style={{ marginTop: 5, maxWidth: "100%" }}>
      <Hidden only={["sm", "xs"]}>
        <Grid container spacing={3} className={classes.resetWidth} >
          {/* <Grid item xs={12} sm={12} md={3}>
            {user ? <SuggestionCard max={3} /> : <> </>}
            <TopHashtag countries_list={countries_list} />
            <HotSectionCard max={6} countries_list={countries_list} country={country} />
          </Grid> */}
          <Grid item xs={12} sm={12} md={8} justify="center" align="center" >
            {/* <SearchInput /> */}
            {/* {user ? <AuthSortOptions /> : <SortOptions />} */}
            {loading ?
              (<Box width="100%" mt={3} display="flex" alignItems="center" justifyContent="center" >
                <CircularProgress size={40} color="primary" />
              </Box>) :
              (<Card topics={topics} />)
            }
          </Grid>
          <Grid item xs={12} sm={12} md={3} >
            <div className={classes.sideRoot}>
              <div className={classes.side}>
                {/* {user && <ProfileCard user={user} />} */}
                <SearchInput />
                <PostCreate user={user} />
                <GroupCreate user={user} />
                <CryptocurrencyCreate user={user} />
                <AICreate user={user} />
                {/* <LadderBoard item="1" single /> */}
                <SiteInfo />
              </div>
            </div>
          </Grid>
        </Grid>
      </Hidden>

      <Hidden only={["md", "lg", "xl"]} >
        <SearchInput />
        {user ?
          <AuthSortOptions /> :
          <SortOptions />
        }

        {/* {user ? <SuggestionCard max={3} /> : <> </>} */}
        {/* <HotSectionCard max={6} countries_list={countries_list} country={country} /> */}
        <Card topics={topics} />
      </Hidden>
      {/* <LadderBoardModal /> */}
    </Container>
  );
}

export default connect(mapStateToProps)(Layout);

const useStyles = makeStyles((theme) => {
  const breakpoints = theme.breakpoints;
  return {
    root: {
      marginTop: 80,
      [breakpoints.down("xs")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
      maxWidth: "100%",
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
    },
    sideRoot: {
      position: "absolute",
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
    side: {
      position: "fixed",
      maxWidth: 400,
    },
  };
});
