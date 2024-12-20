import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Button from "@material-ui/core/Button";
import axios from 'axios';
import { config } from "../../../config";
import { connect } from "react-redux";
import { setUserData } from "../../store/actions";
import { withTranslation } from "../../../i18n";


const mapDispatchToProps = {
  setUserData,
};

const mapStateToProps = state => ({
  user: state.user
});

const FollowButton = ({ userId, setUserData, user, t }) => {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const status = user.user && user.user.following.includes(userId);


  const handleFollowUser = async () => {
    try {
      setLoading(true);
      const follow = await axios.put(config.follow, 
        {
          userId
        },
        {
          headers: { "x-auth-token": user.token }
        }
      );

      // console.log("follow", follow);
      

      const userDetails = await axios.get(config.me, {
        headers: { "x-auth-token": user.token }
      });

      setUserData(userDetails.data);
      sessionStorage.setItem("userData", userDetails.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // console.log("error", error);
    }
  };

  return (
    <>
      {user.user && (
        <Button
          classes={styles}
          disabled={loading}
          onClick={handleFollowUser}
          variant={status ? "contained" : "outlined"}
          color={"primary"}
          // size={"small"}
        >
          {status ? t("Unfollow") : t("Follow")}
        </Button>
      )}
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(FollowButton));


const useStyles = makeStyles(({ shadows, palette }) => ({
  root: {
    borderRadius: 40,
    minHeight: 30,
    padding: "0 1em"
  },
  label: {
    textTransform: "none",
    fontSize: 12,
    fontWeight: 500
  },
  outlined: {
    padding: "0 1em"
  },
  outlinedPrimary: {
    borderColor: palette.secondary.main,
    color: "rgb(29, 161, 242)",
    "&:hover": {
      borderColor: "transparent",
      color: "white",
      backgroundColor: palette.primary.light
    }
  },
  contained: {
    minHeight: 30,
    boxShadow: shadows[0],
    "&:active": {
      boxShadow: shadows[0]
    }
  },
  containedPrimary: {
    backgroundColor: "rgb(29, 161, 242)",
    color: palette.common.white,
    "&:hover": {
      backgroundColor: "rgb(29, 145, 218)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "rgb(29, 145, 218)"
      }
    }
  },
  sizeLarge: {
    padding: "0 1em",
    minHeight: 39
  }
}));