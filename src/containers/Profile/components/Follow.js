import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ThumbNails from "../../../components/ThumbNails";
import { setProfileFollowers, setUserData } from "../../../store/actions";
import { withTranslation } from "../../../../i18n";
import axios from "axios";
import { config } from "../../../../config";

const Follow = ({ setUserData, profile, user, currentuser, t }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const handleUnfollowUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = user._id;

      const follow = await axios.put(
        config.follow,
        {
          userId,
        },
        {
          headers: { "x-auth-token": token },
        }
      );

      const userDetails = await axios.get(config.me, {
        headers: { "x-auth-token": token },
      });

      setUserData(userDetails.data);
      sessionStorage.setItem("userData", userDetails.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    location.reload();
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.left}>
        <ThumbNails name={user.username} size="xs" />
        <Typography
          component="a"
          color="primary"
          href={user.isDeleted ? "#" : "/p/" + user.username}
          className={classes.username}
        >
          {user.isDeleted ? (
            <>
              {"[Deleted]"}
            </>
          ) : (
            <>
              @{user.username}
            </>
          )}
        </Typography>
      </div>
      {/* <Button size="small" color="primary" variant="outlined" disabled={true}>
        {t(buttonName)}
      </Button> */}
      {currentuser != null &&
        profile &&
        currentuser.username == profile.user.username && (
          <Button
            disabled={loading}
            onClick={handleUnfollowUser}
            size="small"
            color="warning"
            variant="outlined"
          >
            {t("Unfollow")}
          </Button>
        )}
    </Paper>
  );
};

export default withTranslation()(Follow);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  left: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  username: {
    marginLeft: theme.spacing(0.5),
  },
}));