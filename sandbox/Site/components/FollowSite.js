import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { config } from "../../../../config";
import { connect } from "react-redux";
import { setUserData } from "../../../store/actions";

const mapDispatchToProps = {
  setUserData
};

const mapStateToProps = state => ({
  user: state.user
});

const FollowSite = ({ followers, setUserData, user, siteId }) => {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const status = user.user && user.user.siteFollowing.includes(siteId);

  const handleFollowingSite = async () => {
    try {
      setLoading(true);
      const follow = await axios.put(
        config.siteFollow,
        {
          siteId
        },
        {
          headers: { "x-auth-token": user.token }
        }
      );

      console.log("follow", follow);

      const userDetails = await axios.get(config.me, {
        headers: { "x-auth-token": user.token }
      });

      setUserData(userDetails.data);
      sessionStorage.setItem("userData", userDetails.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  return (
    <>
      {user.user && (
        <Button
          disabled={loading}
          onClick={handleFollowingSite}
          variant={status ? "contained" : "outlined"}
          color={"primary"}
          size={"small"}
        >
          {status ? "Following" : "follow"}
        </Button>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowSite);

const useStyles = makeStyles(({ shadows, palette }) => ({
	root: {

	}
}));
