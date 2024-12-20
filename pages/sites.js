import React, { Component } from "react";
import SiteContainer from "../src/containers/Site";
import { connect } from "react-redux";
import dynamic from "next/dynamic";

import {
  setTopicForSite,
  setUserData,
  setToken,
  setSite,
  setUrl,
} from "../src/store/actions";
import axios from "axios";
import { config } from "../config";
import Router from "next/router";
import { withTranslation } from "../i18n";

const mapDispatchToProps = {
  setTopicForSite,
  setUserData,
  setToken,
  setSite,
  setUrl,
};

class Site extends Component {
  static async getInitialProps(context) {
    const { req, res, query } = context;
    try {
      if (typeof query.s === "undefined") {
        res.writeHead(404, {
          Location: "/",
        });
        return;
      }

      if (query.s === "") {
        res.writeHead(404, {
          Location: "/",
        });
        return;
      }

      const site = await axios.post(config.site, { url: query.s });

      const topics = await axios.get(config.siteTopics + "?url=" + query.s);

      return {
        site: site.data,
        url: query.s,
        topics: topics.data,
      };
    } catch (error) {
      console.log("error", error);
      if (res) {
        res.writeHead(404, {
          Location: "/",
        });
        res.end();
      } else {
        Router.push("/");
      }
      return {};
    }
  }

  componentDidMount() {
    const { setSite, site, setTopicForSite, topics, setUrl, url } = this.props;

    this.handleGetUser();

    setTopicForSite(topics);
    setSite(site);
    setUrl(url);
  }

  handleGetUser = async () => {
    try {
      const { setToken, setUserData } = this.props;

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

  render() {
    return (
      <>
        <SiteContainer />
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(withTranslation()(Site));
