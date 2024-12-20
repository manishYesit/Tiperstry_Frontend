import React from "react";
import Header from "../../components/Header";
import Container from "@material-ui/core/Container";
import { Tabs, Tab, Badge, AppBar } from "@material-ui/core";

import Card from "./components/card";

import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  cryptorequest: {
    margin: "0 auto",
  },
});

const mapStateToProps = (state) => ({
  cryptorequests: state.cryptos.cryptos,
});
const CryptoRequest = ({ cryptorequests }) => {
  const classes = useStyles();
  const tabsStyles = TabsStyles();
  const tabItemStyles = TabItemStyles();
  const [tabIndex, setTabIndex] = React.useState(0);

  const activeRequests = cryptorequests.filter(
    (request) => request.status == "approved"
  );
  const inactiveRequests = cryptorequests.filter(
    (request) => request.status == "inactive"
  );
  const pendingRequests = cryptorequests.filter(
    (request) => request.status == "pending"
  );
  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        style={{
          marginTop: 100,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <h2>Crypto Currency Requests</h2>

        <div className={classes.root}>
          {" "}
          <AppBar position={"static"}>
            <Tabs
              classes={tabsStyles}
              value={tabIndex}
              onChange={(e, index) => setTabIndex(index)}
            >
              <Tab
                classes={tabItemStyles}
                label={
                  <Badge badgeContent={pendingRequests.length} color="error">
                    <span className={tabsStyles.white}>PENDING</span>
                  </Badge>
                }
              >
                {" "}
              </Tab>
              <Tab
                classes={tabItemStyles}
                label={
                  <Badge badgeContent={activeRequests.length} color="error">
                    <span>ACTIVE</span>
                  </Badge>
                }
              />
              <Tab
                classes={tabItemStyles}
                label={
                  <Badge badgeContent={inactiveRequests.length} color="error">
                    <span>INACTIVE</span>
                  </Badge>
                }
              />
            </Tabs>
          </AppBar>
          {/* main content */}
          {tabIndex == 0 &&
            (pendingRequests.length > 0 ? (
              pendingRequests.map((data) => (
                <Card key={data._id} cryptorequest={data} />
              ))
            ) : (
              <div> No current pending request</div>
            ))}
          {tabIndex == 1 &&
            (activeRequests.length > 0 ? (
              activeRequests.map((data) => (
                <Card key={data._id} cryptorequest={data} />
              ))
            ) : (
              <div> No current pending request</div>
            ))}
          {tabIndex == 2 &&
            (inactiveRequests.length > 0 ? (
              inactiveRequests.map((data) => (
                <Card key={data._id} cryptorequest={data} />
              ))
            ) : (
              <div> No current pending request</div>
            ))}
        </div>
      </Container>
    </>
  );
};

const TabsStyles = makeStyles(({ spacing, palette }) => ({
  white: { color: "white" },
  root: {
    marginLeft: spacing(0.6),
    maxWidth: "100%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  indicator: {
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: palette.common.white,
  },
}));
const TabItemStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    textTransform: "initial",
    margin: spacing(0, 2),
    minWidth: 0,
    [breakpoints.up("md")]: {
      minWidth: 0,
    },
  },
  wrapper: {
    fontWeight: "normal",
    letterSpacing: 0.5,
  },
}));

export default connect(mapStateToProps)(CryptoRequest);
