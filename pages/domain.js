import React, { Component } from 'react';
import SiteContainer from "../src/containers/Site";
import { connect } from "react-redux";
import {
  setTopicForSite,
  setUserData,
  setToken,
  setUrl,
  setSite
} from "../src/store/actions";
import axios from "axios";
import { config } from "../config";
import Router from "next/router";
import Head from "next/head";
import { withTranslation } from "../i18n";

const mapDispatchToProps = {
  setTopicForSite,
  setUserData,
  setToken,
  setSite,
  setUrl
};

class Domain extends Component {
  static async getInitialProps(context) {
    const { req, res, query } = context;
    try {
      if (typeof query.s === "undefined") {
        res.writeHead(404, {
          Location: "/"
        });
        return;
      }

      if (query.s === "") {
        res.writeHead(404, {
          Location: "/"
        });
        return;
      }

      const site = await axios.post(config.site, { url: query.s });

      const topics = await axios.get(config.siteTopics + "?url=" + site.data.url);

      return {
        siteUrl: query.s,
        site: site.data,
        topics: topics.data
      };
    } catch (error) {
      if (res) {
        res.writeHead(404, {
          Location: "/"
        });
        res.end();
      } else {
        Router.push("/");
      }
    }
  }

  componentDidMount() {
    const {
      setSite,
      site,
      setTopicForSite,
      topics,
      setUrl,
      siteUrl,
    } = this.props;

    this.handleGetUser();

    setTopicForSite(topics);
    setSite(site);
    setUrl(siteUrl);

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
      console.log("error", error);
    }
  };

  render() {
    const { site } = this.props;
    return (
      <>
        <Head>
          <title>{`${site.url}-Tipestry`}</title>
          <meta charSet="UTF-8" />
          <meta name="description" content={`${site.url}-Tipestry`} />
        </Head>
        <SiteContainer />
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(withTranslation()(Domain));
