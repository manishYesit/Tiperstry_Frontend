import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import axios from "axios";
import { config } from "../../../config";
import Box from "@material-ui/core/Box";
import ThumbNails from "../ThumbNails";
import CircularProgress from "@material-ui/core/CircularProgress";
import { setNotificationData, toggleNotification } from "../../store/actions";

import { withTranslation } from "../../../i18n";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const mapStateToProps = (state) => ({
  notification: state.notification,
  user: state.user,
});

const mapDispatchToProps = {
  setNotificationData,
  toggleNotification,
};

const coinName = {
  dogecoin: "Dogecoin",
  superdog: "Superdog",
  ethtipc: "Tipcoin",
  ethxrtcoin: "Silk Route Coin",
  bitcoin: "Bitcoin",
  ethcoin: "Ethcoin",
  ye: "Ye",
  pres: "Pres",
  joe: "Joe",
  dogecoincash: "Dogecoin Cash",
};

const NotificationDrawal = ({
  notification: { open, data },
  toggleNotification,
  setNotificationData,
  i18n,
  t,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    handleNotifications();
  }, []);

  const handleNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const notify = await axios.get(config.notification, {
        headers: { "x-auth-token": token },
      });

      setNotificationData(notify.data);
      setLoading(false);
    } catch (error) {

      setLoading(false);
    }
  };

  const handleMarkReadNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.get(config.notificationRead, {
        headers: { "x-auth-token": token },
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const momentSince = (date) => (
    <Typography color="primary" component="p" style={{ fontSize: 10 }}>
      {moment(date)
        .locale(typeof i18n.language !== "undefined" ? i18n.language : "en")
        .fromNow()}
    </Typography>
  );

  const displayReferalBonusNotification = (data) => {
    if (data.transactionId == null) return;
    return (
      <Box
        key={data._id}
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="row"
        mt={0.5}
        mb={0.5}
        style={{ textDecoration: "none" }}
        component="a"
        href={
          data.topicId
            ? `/topics/${data.topicId._id}/${data.topicId.title}`
            : ""
        }
      >
        <ThumbNails
          name={data.initiatorId ? data.initiatorId.username : "Anonymous"}
          size="xs"
          url={data.initiatorId ? data.initiatorId.img : null}
        />
        <Typography variant="overline" className={classes.msg}>
          <Box>
            {t("You just got a referal bonus of ")}{" "}
            {Math.round(data.transactionId.amount * 100) / 100}{" "}
            {coinName[data.transactionId.walletType]}
          </Box>
          {momentSince(data.createdAt)}
        </Typography>
      </Box>
    );
  };

  const displayGiftNotification = (data) => {
    return (
      <Box
        key={data._id}
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="row"
        mt={0.5}
        mb={0.5}
        style={{ textDecoration: "none" }}
        component="a"
        href={
          data.topicId
            ? `/topics/${data.topicId._id}/${data.topicId.title}`
            : ""
        }
      >
        <ThumbNails
          // name={data.initiatorId.username}
          // size="xs"
          // url={data.initiatorId.img}
          name={data.initiatorId ? data.initiatorId.username : "Anonymous"}
          size="xs"
          url={data.initiatorId ? data.initiatorId.img : null}
        />
        <Typography variant="overline" className={classes.msg}>
          <Box>
            {t("You have been gifted")}&nbsp;{" "}
            {Math.round(data.transactionId.amount * 100) / 100}{" "}
            {data.transactionId.walletType == "others"
              ? data.transactionId.groupWalletType.tokenName
              : coinName[data.transactionId.walletType]}{" "}
            {t("by")} &nbsp;
            <Typography
              color="primary"
              component="a"
              style={{ fontSize: 12, textDecoration: "none" }}
              href={(data.initiatorId && data.initiatorId.isDeleted) ? "#" : ("/p/" + (data.initiatorId ? data.initiatorId.username : "Anonymous"))}
            >
              {data.initiatorId && data.initiatorId.isDeleted ? (
                <>
                  {"[Deleted]"}
                </>
              ) : (
                <>
                  &nbsp;@
                  {data.initiatorId ? data.initiatorId.username : "Anonymous"}
                </>
              )}
            </Typography>
          </Box>
          {momentSince(data.createdAt)}
        </Typography>
      </Box>
    );
  };

  const displayFollowersNotification = (data) => {
    return (
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="wrap"
        flexDirection="row"
        mt={0.5}
        mb={0.5}
      >
        <ThumbNails
          name={data.initiatorId ? data.initiatorId.username : "Anonymous"}
          size="xs"
          url={data.initiatorId ? data.initiatorId.img : ""}
        />
        <Typography
          variant="overline"
          className={classes.msg}
          style={{ display: "inline-block" }}
        >
          <Box>
            <Typography
              color="primary"
              component="a"
              style={{ fontSize: 12, textDecoration: "none" }}
              href={(data.initiatorId && data.initiatorId.isDeleted) ? "#" : ("/p/" + (data.initiatorId ? data.initiatorId.username : "Anonymous"))}
            >
              {data.initiatorId && data.initiatorId.isDeleted ? (
                <>
                  {"[Deleted]"}
                </>
              ) : (
                <>
                  {"  "}@
                  {data.initiatorId ? data.initiatorId.username : "Anonymous"}
                </>
              )}
            </Typography>
            &nbsp;{t("has started following you")}.
          </Box>
          {momentSince(data.createdAt)}
        </Typography>
      </Box>
    );
  };

  const displayCommentNotification = (data) => {
    return (
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="nowrap"
        flexDirection="row"
        mt={0.5}
        mb={0.5}
        component="a"
        style={{ textDecoration: "none" }}
        href={"/topics/" + data.topicId._id + "/" + data.topicId.title}
      >
        <ThumbNails
          name={data.initiatorId ? data.initiatorId.username : "Anonymous"}
          size="xs"
          url={data.initiatorId ? data.initiatorId.img : null}
        />
        <Typography variant="overline" className={classes.msg}>
          <Box>
            {data.initiatorId ? (
              <Typography
                color="primary"
                component="a"
                style={{ fontSize: 12, textDecoration: "none" }}
                href={data.initiatorId.isDeleted ? "#" : ("/p/" + data.initiatorId.username)}
              >
                {data.initiatorId.isDeleted ? (
                  <>
                    {"[Deleted]"}
                  </>
                ) : (
                  <>
                    {"  "}@{data.initiatorId.username}
                  </>
                )}
              </Typography>
            ) : (
              t("Someone")
            )}
            &nbsp;
            {data.type === "comment"
              ? t("commented on your post")
              : t("replied to your comment")}
          </Box>
          {momentSince(data.createdAt)}
        </Typography>
      </Box>
    );
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => toggleNotification()}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={classes.paper}>
          {data.length === 0 ? (
            <Typography>
              {t("You currently don't have any notification")}
            </Typography>
          ) : (
            <>
              <Typography variant="overline" className={classes.header}>
                {t("Notifications")}
                <Button onClick={toggleNotification}>
                  <CloseIcon></CloseIcon>
                </Button>
              </Typography>

              <Paper square>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  aria-label="notifications"
                >
                  <Tab label="Un-read" />
                  <Tab label="Read" />
                </Tabs>
              </Paper>

              {value == 0
                ? data.map((noty) => (
                  <React.Fragment key={noty._id}>
                    {noty.status == "unread" &&
                      noty.type === "gift" &&
                      displayGiftNotification(noty)}
                    {noty.status == "unread" &&
                      noty.type === "follower" &&
                      displayFollowersNotification(noty)}
                    {noty.status == "unread" &&
                      noty.type === "comment" &&
                      displayCommentNotification(noty)}
                    {noty.status == "unread" &&
                      noty.type === "reply" &&
                      displayCommentNotification(noty)}
                    {noty.status == "unread" &&
                      noty.type === "referal_bonus" &&
                      displayReferalBonusNotification(noty)}
                  </React.Fragment>
                ))
                : data.map((noty) => (
                  <React.Fragment key={noty._id}>
                    {noty.status == "read" &&
                      noty.type === "gift" &&
                      displayGiftNotification(noty)}
                    {noty.status == "read" &&
                      noty.type === "follower" &&
                      displayFollowersNotification(noty)}
                    {noty.status == "read" &&
                      noty.type === "comment" &&
                      displayCommentNotification(noty)}
                    {noty.status == "read" &&
                      noty.type === "reply" &&
                      displayCommentNotification(noty)}
                    {noty.status == "read" &&
                      noty.type === "referal_bonus" &&
                      displayReferalBonusNotification(noty)}
                  </React.Fragment>
                ))}
            </>
          )}
        </div>
      )}
    </Drawer>
  );
};
export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(NotificationDrawal)
);

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    // margin: theme.spacing(1, 0),
    // height: 200,
    minWidth: 250,
    maxWidth: 450,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  msg: {
    // display: "flex",
    alignItems: "center",
    fontSize: 11,
    textTransform: "initial",
    marginLeft: "6px",
  },
  header: {
    margin: theme.spacing(1, 0),
    textAlign: "center",
    fontSize: 20,
  },
  drawerPaper: {
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
  },
}));
