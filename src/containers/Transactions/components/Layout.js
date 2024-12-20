import React from "react";
import Grid from "@material-ui/core/Grid";
import LadderBoard from "../../../components/LadderBoard";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import Hidden from "@material-ui/core/Hidden";
import History from "./History";

const mapStateToProps = state => {
  return {
    topics: state.topics,
    user: state.user
  };
};

function Layout({ user,username}) {
  return (
    <Container maxWidth="md" style={{ marginTop: 80 }}>
      <History username={username}/>
    </Container>
  );
}

export default connect(mapStateToProps)(Layout);
