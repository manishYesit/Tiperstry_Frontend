import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Add from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import {
  getAllUsers,
  searchUsers,
  toggleUserStatus,
  reportedUsers,
} from "../../store/actions";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "./components/card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "../../components/Header";
import StatisticCard from "./components/stats-card";
import StickyHeadTable from "./components/usertable";
import TempUser from "./components/tempuser";
import SearchUser from "./components/search";
import LinearProgress from "@material-ui/core/LinearProgress";

import axios from "axios";
import { config } from "../../../config";

const Giveaway = dynamic(() => import("./modals/giveaway"), {
  ssr: false,
});
const GroupGiveAway = dynamic(() => import("./modals/group_giveaway"), {
  ssr: false,
});

const AdminComponent = ({
  user,
  getAllUsers,
  searchUsers,
  search,
  status,
  toggleUserStatus,
  reportedUsers,
}) => {
  const tabsStyles = TabsStyles();
  const tabItemStyles = TabItemStyles();

  const [withdraw, setWith] = React.useState([]);
  const [startDate, setStartDate] = React.useState("2018-01-01");
  const [giveawayModal, setGiveawayModal] = React.useState(false);
  const [groupGiveawayModal, setGroupGiveawayModal] = React.useState(false);
  const [giveawayModalTitle, setGiveawayModalTitle] = React.useState(
    "Add Doge coin giveaway"
  );
  const [groupGiveawayModalTitle, setGroupGiveawayModalTitle] =
    React.useState("Group Giveaway");
  const [endDate, setEndDate] = React.useState(
    new Date().toJSON().split("T")[0]
  );
  const [statistics, setStatistics] = React.useState({});
  const [giveaway, setGiveway] = React.useState({});
  const [groupGiveaway, setGroupGiveway] = React.useState({});
  const [progress, setProgress] = React.useState(0);
  const [searchField, setSearchField] = React.useState("");
  const [loader, setLoader] = React.useState(true);
  const [currentId, setCurrentId] = React.useState("");
  const [currentIp, setCurrentIp] = React.useState("");
  const [tabIndex, setTabIndex] = React.useState(0);

  const dogeTrans = withdraw.filter((trans) => trans.walletType == "dogecoin");
  const dogecashTrans = withdraw.filter(
    (trans) => trans.walletType == "dogecoincash"
  );

  const pomTrans = withdraw.filter((trans) => trans.walletType == "superdog");
  const tipTrans = withdraw.filter((trans) => trans.walletType == "ethtipcoin");
  const otherTrans = withdraw.filter(
    (trans) =>
      !(trans.walletType == "ethtipcoin") &&
      !(trans.walletType == "superdog") &&
      !(trans.walletType == "dogecoincash") &&
      !(trans.walletType == "dogecoin")
  );

  let token;
  React.useEffect(() => {
    token = localStorage.getItem("token");
    handleWithDrawalRequest();
    getStats(startDate, endDate);
    getGiveaway();
    getGroupGiveaway();
    getAllUsers();
    reportedUsers();

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const classes = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    button: {
      // margin: theme.spacing(1),
    },
    buttonGroup: { margin: theme.spacing(1) },
  }))();

  const handleOpen = () => {
    setGiveawayModal(true);
  };

  const handleOpenGroupGiveawayModal = () => {
    setGroupGiveawayModal(true);
  };

  const handleClose = () => {
    setGiveawayModal(false);
    getGiveaway();
  };

  const handleCloseGroupGiveawayModal = () => {
    setGroupGiveawayModal(false);
    getGroupGiveaway();
  };

  const addDodgeCoinGiveAway = async () => {
    setGiveawayModalTitle("Update Dogecoin giveaway");
    handleOpen();
  };

  const handleWithDrawalRequest = async () => {
    try {
      const request = await axios.get(config.withdrawal, {
        headers: { "x-auth-token": token },
      });
      setWith(request.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getStats = async (startDate, endDate) => {
    const request = await axios.post(
      config.statistics,
      { startDate, endDate },
      { headers: { "x-auth-token": token } }
    );
    setStatistics(request.data);
  };

  const getGiveaway = async () => {
    const token = localStorage.getItem("token");
    const dogecoinGiveawayDb = (
      await axios.get(config.giveaway + "/dogecoin", {
        headers: { "x-auth-token": token },
      })
    ).data.data;

    const dogecoinCashGiveawayDb = (
      await axios.get(config.giveaway + "/dogecoincash", {
        headers: { "x-auth-token": token },
      })
    ).data.data;

    const data = [dogecoinGiveawayDb, dogecoinCashGiveawayDb];

    if (data.length > 0) {
      setGiveway({
        startDate: dogecoinGiveawayDb
          ? new Date(dogecoinGiveawayDb.startDate).toJSON().split("T")[0]
          : new Date().toJSON().split("T")[0],
        disabled: data.disabled,

        //fresh
        commentPoolAmountDogecoin: returnZeroIfUndefined(
          dogecoinGiveawayDb,
          "cpAmount"
        ),
        postPoolAmountDogecoin: returnZeroIfUndefined(
          dogecoinGiveawayDb,
          "ppAmount"
        ),
        commentPoolAmountDogecoinCash: returnZeroIfUndefined(
          dogecoinCashGiveawayDb,
          "cpAmount"
        ),
        postPoolAmountDogecoinCash: returnZeroIfUndefined(
          dogecoinCashGiveawayDb,
          "ppAmount"
        ),
      });
    }
  };

  const getGroupGiveaway = async () => {
    const token = localStorage.getItem("token");
    console.log("getGroupGiveaway token", token);
    const dogecoinGiveawayDb = (
      await axios.get(config.groupgiveaway + "/dogecoin", {
        headers: { "x-auth-token": token },
      })
    ).data.data;

    const dogecoinCashGiveawayDb = (
      await axios.get(config.groupgiveaway + "/dogecoincash", {
        headers: { "x-auth-token": token },
      })
    ).data.data;

    const data = [dogecoinGiveawayDb, dogecoinCashGiveawayDb];
    if (data.length > 0) {
      setGroupGiveway({
        startDate: dogecoinGiveawayDb
          ? new Date(dogecoinGiveawayDb.startDate).toJSON().split("T")[0]
          : new Date().toJSON().split("T")[0],
        disabled: data.disabled,

        //fresh
        commentPoolAmountDogecoin: returnZeroIfUndefined(
          dogecoinGiveawayDb,
          "cpAmount"
        ),
        postPoolAmountDogecoin: returnZeroIfUndefined(
          dogecoinGiveawayDb,
          "ppAmount"
        ),
        commentPoolAmountDogecoinCash: returnZeroIfUndefined(
          dogecoinCashGiveawayDb,
          "cpAmount"
        ),
        postPoolAmountDogecoinCash: returnZeroIfUndefined(
          dogecoinCashGiveawayDb,
          "ppAmount"
        ),
      });
    }
  };

  const handleSearch = async () => {
    searchUsers(searchField);
  };

  const handleBanUser = async (id) => {
    try {
      toggleUserStatus(currentId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBanUserIp = async () => {
    try {
      toggleUserStatus(currentId);

      token = localStorage.getItem("token");
      if (token) {
        const user = await axios.post(
          `${config.banuserip}`,
          { ip: currentIp },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <Grid container direction="column">
          <Grid item>
            <h2> Dashboard</h2>
          </Grid>
          <Grid
            item
            container
            justify="space-between"
            alignItems="flex-start"
            direction="row"
          >
            <Grid item>
              <TextField
                id="date"
                label="Filter From"
                type="date"
                defaultValue="2020-01-01"
                className={classes.textField}
                onChange={(event) => {
                  setStartDate(event.target.value);
                  getStats(event.target.value, endDate);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="date"
                label="Filter To"
                type="date"
                defaultValue="2020-12-31"
                className={classes.textField}
                onChange={(event) => {
                  setEndDate(event.target.value);
                  getStats(startDate, event.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="text primary button group"
                className={classes.buttonGroup}
              >
                {Object.keys(giveaway).length == 0 ? (
                  <CircularProgress size={25} color="primary" />
                ) : (
                  <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<Add />}
                    onClickCapture={addDodgeCoinGiveAway}
                  >
                    Update Giveaway Pool
                  </Button>
                )}
                {Object.keys(giveaway).length == 0 ? (
                  <CircularProgress size={25} color="primary" />
                ) : (
                  <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<Add />}
                    onClickCapture={handleOpenGroupGiveawayModal}
                  >
                    Group Giveaway Pool
                  </Button>
                )}

                <Button
                  style={{
                    color: "white",
                  }}
                  href="/admin/groups"
                >
                  Show groups
                </Button>
                <Button
                  style={{
                    color: "white",
                  }}
                  href="/admin/users/reported"
                >
                  Show reported users
                </Button>
                <Button
                  style={{
                    color: "white",
                  }}
                  href="/admin/promotions"
                >
                  Promotions
                </Button>
                <Button
                  style={{
                    color: "white",
                  }}
                  href="/admin/crypto-request"
                >
                  Crypto Request
                </Button>
                <Button
                  style={{
                    color: "white",
                  }}
                  href="/send-email"
                >
                  Send Newsletter
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>

          <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            direction="row"
          >
            <Grid item xs={12} sm={12} md={4}>
              <StatisticCard
                title="Total User"
                total={statistics.totalActiveUsers}
                subtotal={statistics.totalInActiveUsers}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <StatisticCard title="Total Post" total={statistics.totalPosts} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <StatisticCard
                title="Total Comment"
                total={statistics.totalComments}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <StatisticCard
                title="Total Groups"
                total={statistics.totalGroups}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <StatisticCard
                title="Active Subscription"
                total={statistics.totalSubscriptions}
              />
            </Grid>
          </Grid>

          <Grid item>
            <br />
            <AppBar position={"static"}>
              <Tabs
                classes={tabsStyles}
                value={tabIndex}
                onChange={(e, index) => setTabIndex(index)}
              >
                <Tab
                  classes={tabItemStyles}
                  label={
                    <Badge badgeContent={dogeTrans.length} color="error">
                      <span className={tabsStyles.white}>DOGE</span>
                    </Badge>
                  }
                />
                <Tab
                  classes={tabItemStyles}
                  label={
                    <Badge badgeContent={dogecashTrans.length} color="error">
                      <span>DOG</span>
                    </Badge>
                  }
                />
                <Tab
                  classes={tabItemStyles}
                  label={
                    <Badge badgeContent={pomTrans.length} color="error">
                      <span>POM</span>
                    </Badge>
                  }
                />
                <Tab
                  classes={tabItemStyles}
                  label={
                    <Badge badgeContent={tipTrans.length} color="error">
                      <span>TIP</span>
                    </Badge>
                  }
                />
                <Tab
                  classes={tabItemStyles}
                  label={
                    <Badge badgeContent={otherTrans.length} color="error">
                      <span>OTHERS</span>
                    </Badge>
                  }
                />
                <Tab
                  classes={tabItemStyles}
                  label={<span>Temp Users</span>}
                />
              </Tabs>
            </AppBar>
          </Grid>
          <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            direction="row"
          >
            {tabIndex == 0 && dogeTrans.map((data) => <Card key={data._id} withdraw={data} />)}

            {tabIndex == 1 && dogecashTrans.map((data) => (
              <Card key={data._id} withdraw={data} />
            ))}

            {tabIndex == 2 && pomTrans.map((data) => <Card key={data._id} withdraw={data} />)}

            {tabIndex == 3 && tipTrans.map((data) => <Card key={data._id} withdraw={data} />)}

            {tabIndex == 4 && otherTrans.map((data) => <Card key={data._id} withdraw={data} />)}

            {tabIndex == 5 && <TempUser />}
          </Grid>
        </Grid>
        {Object.keys(giveaway).length > 0 ? (
          <Giveaway
            open={giveawayModal}
            handleClose={handleClose}
            title={giveawayModalTitle}
            data={giveaway}
          />
        ) : null}
        {Object.keys(groupGiveaway).length > 0 ? (
          <GroupGiveAway
            open={groupGiveawayModal}
            handleClose={handleCloseGroupGiveawayModal}
            title={groupGiveawayModalTitle}
            data={groupGiveaway}
          />
        ) : null}
        <Box className={classes.root}>
          <h2>Users search</h2>
          <SearchUser
            searchField={searchField}
            setSearchField={setSearchField}
            handleSearch={handleSearch}
            user={user}
            loader={loader}
            setLoader={setLoader}
            search={search}
          />
          {user.length > 0 ? (
            <StickyHeadTable
              user={user}
              search={search}
              currentId={currentId}
              setCurrentId={setCurrentId}
              setCurrentIp={setCurrentIp}
              handleBanUser={handleBanUser}
              handleBanUserIp={handleBanUserIp}
            />
          ) : (
            <LinearProgress variant="determinate" value={progress} />
          )}
        </Box>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.users,
  search: state.user.searchusers,
  status: state.user.deactivated,
});

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

const mapDispatchToProps = {
  getAllUsers,
  searchUsers,
  toggleUserStatus,
  reportedUsers,
};

const returnZeroIfUndefined = (value, key) => value && value[key] != undefined ? value[key] : 0;

export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);
