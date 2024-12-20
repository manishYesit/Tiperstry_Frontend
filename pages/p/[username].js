import React, { Component } from "react";
import Profile from "../../src/containers/Profile";
import { config } from "../../config";
import axios from "axios";
import { connect, useDispatch } from "react-redux";

import dynamic from "next/dynamic";

import {
  setTopics,
  setCurrentPage,
  setToken,
  setUserData,
  setProfileUsername,
  setProfileInfo,
  setTopicView,
  toggleUserStatus,
  setPromotionCharge,
} from "../../src/store/actions";
import Head from "next/head";
import { withTranslation } from "../../i18n";
import { isMobile } from "react-device-detect";

const mapDispatchToProps = {
  setTopics,
  setCurrentPage,
  setUserData,
  setToken,
  setProfileUsername,
  setProfileInfo,
  setTopicView,
  toggleUserStatus,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    topics: state.topics,
  };
};

const ProfilePage = ({
  setTopics,
  setCurrentPage,
  setUserData,
  setToken,
  setProfileUsername,
  setProfileInfo,
  username,
  profile,
  setTopicView,
  user: { user },
}) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    handleGetUser();

    setProfileInfo(profile);
    setProfileUsername(username);

    if (isMobile) {
      setTopicView("normal");
    }

    handleDefaultView();
    getPromotionCharge();
  }, []);

  const handleDefaultView = () => {
    const view = localStorage.getItem("view");

    if (!view) return;

    setTopicView(view);
  };

  const getPromotionCharge = async () => {
    // if (broadcast.promotionCharge == null) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(config.promotionCharge, {
        headers: { "x-auth-token": token },
      });
      
      if (response.data.payload != undefined) {
        dispatch(setPromotionCharge(response.data.payload));
      }
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
    }
    // }
  };

  const handleGetUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await axios.get(config.me, {
          headers: { "x-auth-token": token },
        });

        setUserData(user.data);
        sessionStorage.setItem("userData", user.data);
      }

      setToken(token);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Head>
        <title>{`${username}-Tipestry`}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={`${username}-Tipestry`} />
      </Head>
      <Profile />
      {/* modals */}
    </>
  );
};

ProfilePage.getInitialProps = async (context) => {
  const { req, res, query } = context;

  try {
    if (query.username === "") {
      res.writeHead(404, {
        Location: "/error",
      });
      return;
    }

    try {
      const profile = await axios.get(config.profile + "/" + query.username);

      return {
        profile: profile.data,
        username: query.username,
      };
    } catch (error) {
      console.log("dreaded error 2", error);
      return {};
    }
  } catch (error) {
    console.log("dreaded error", error);
    return {};
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ProfilePage));
