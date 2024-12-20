import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { config } from "../../../config";
import { connect } from "react-redux";
import { reportedUser, banReportedUser } from "../../store/actions";
import { withTranslation } from "../../../i18n";

const mapDispatchToProps = {
  banReportedUser,
};

const mapStateToProps = (state) => ({
  user: state.user
});

const BanUser = ({
  userId,
  user,
  t,
  profile,
  banReportedUser,
}) => {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);

  const status = user.user && user.user.following.includes(userId);

  const handleBanUser = async () => {
    try {
      banReportedUser(profile._id);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <>
      {user.user && (
        <Button
          classes={styles}
          disabled={loading}
          onClick={handleBanUser}
          variant={status ? "contained" : "outlined"}
          color={"primary"}
          // size={"small"}
        >
          {profile.deactivated === false ? "Ban User" : "Allow User"}
        </Button>
      )}
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(BanUser));

const useStyles = makeStyles(({ shadows, palette }) => ({
  root: {
    borderRadius: 40,
    minHeight: 30,
    padding: "0 1em",
  },
  label: {
    textTransform: "none",
    fontSize: 12,
    fontWeight: 500,
  },
  outlined: {
    padding: "0 1em",
  },
  outlinedPrimary: {
    borderColor: palette.secondary.main,
    color: "rgb(29, 161, 242)",
    "&:hover": {
      borderColor: "transparent",
      color: "white",
      backgroundColor: palette.primary.light,
    },
  },
  contained: {
    minHeight: 30,
    boxShadow: shadows[0],
    "&:active": {
      boxShadow: shadows[0],
    },
  },
  containedPrimary: {
    backgroundColor: "rgb(29, 161, 242)",
    color: palette.common.white,
    "&:hover": {
      backgroundColor: "rgb(29, 145, 218)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "rgb(29, 145, 218)",
      },
    },
  },
  sizeLarge: {
    padding: "0 1em",
    minHeight: 39,
  },
}));
