import React, { Component } from "react";
import Profile from "../src/containers/Profile";
import { config } from "../config";
import axios from "axios";
import { connect } from "react-redux";
import {
  setTopics,
  setCurrentPage,
  setToken,
  setUserData,
  setProfileUsername,
  setProfileInfo
} from "../src/store/actions";
import Head from "next/head";
import { withTranslation } from "../i18n";



const mapDispatchToProps = {
  setTopics,
  setCurrentPage,
  setUserData,
  setToken,
  setProfileUsername,
  setProfileInfo
};

const mapStateToProps = state => {
  return {
    user: state.user,
    topics: state.topics
  };
};

class ProfilePage extends Component {
  static async getInitialProps(context) {
    const { req, res, query } = context;
    
    try {

      if (query.username === "") {
        res.writeHead(404, {
          Location: "/error"
        });
        return;
      }

      const profile = await axios.get(config.profile + "/" + query.username);

      return {
        profile: profile.data,
        username: query.username
      };
    } catch (error) {
      // console.log("error", error);
    }
  }

  componentDidMount() {
    const {
      setProfileUsername,
      username,
      profile,
      setProfileInfo
    } = this.props;

    this.handleGetUser();
    setProfileInfo(profile);
    setProfileUsername(username);
  }

  handleGetUser = async () => {
    try {
      const { setToken, setUserData } = this.props;

      const token = localStorage.getItem("token");
      if (token) {
        const user = await axios.get(config.me, {
          headers: { "x-auth-token": token }
        });

        setUserData(user.data);
        sessionStorage.setItem("userData", user.data);
      }

      setToken(token);
    } catch (error) {
      // console.log("error", error);
      // console.log("error", error.response);
    }
  };

  render() {
    const { username } = this.props;
    return (
      <>
        <Head>
          <title>{`${username}-Tipestry`}</title>
          <meta charSet="UTF-8" />
          <meta name="description" content={`${username}-Tipestry`} />
        </Head>
        <Profile />
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ProfilePage));
