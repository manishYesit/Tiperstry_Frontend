import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import LadderBoard from "../../../components/LadderBoard";
import Container from "@material-ui/core/Container";
import ProfileCard from "../../../components/ProfileCard";
import { connect } from "react-redux";
import Hidden from "@material-ui/core/Hidden";
import History from "./History";
import CoinCard from "./CoinCard";
import { config } from "../../../../config";

const mapStateToProps = (state) => {
  return {
    topics: state.topics,
    user: state.user,
  };
};

function Layout({ user }) {
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(config.balance, {
      headers: { "x-auth-token": token },
    });
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: 80 }}>
      <Grid
        container
        spacing={2}
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={12} md={8}>
          {user.user && (
            <CoinCard
              btc={user.user.btc}
              eth={user.user.eth}
              doge={user.user.doge}
              ye={user.user.ye}
              pres={user.user.pres}
              joe={user.user.joe}
              pom={user.user.pom}
              // user={user.user}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Hidden smDown>
            {user.user && <ProfileCard user={user.user} />}
            <LadderBoard item="1" single />
          </Hidden>
        </Grid>
      </Grid>
      <div style={{ marginTop: "1rem" }}>
        <History />
      </div>
    </Container>
  );
}

export default connect(mapStateToProps)(Layout);
