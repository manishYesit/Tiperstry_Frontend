import React, { Component } from "react";
import SearchContainer from "../src/containers/Search";
import { connect } from "react-redux";
import { setUserData, setToken, setSearch } from "../src/store/actions";
import axios from "axios";
import { config } from "../config";
import Router from "next/router";
import { withTranslation } from "../i18n";

const mapDispatchToProps = {
  setUserData,
  setToken,
  setSearch,
};

class Search extends Component {
  static async getInitialProps(context) {
    const { res, query } = context;
    try {
      if (!query.q) {
        res.writeHead(404, { Location: "/" });
        return;
      }

      const search = await axios.get(`${config.search}?q=${query.q}`);

      return {
        search: search.data,
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

        return {
          search: { data: { result: { users: [], topics: [], total: 0 } } },
        };
      }
    }
  }

  componentDidMount() {
    const { search, setSearch } = this.props;
    setSearch(search);
    this.handleGetUser();
  }

  handleGetUser = async () => {
    try {
      const { setToken, setUserData } = this.props;

      const token = localStorage.getItem("token");
      if (token) {
        const user = await axios.get(config.me, {
          headers: { "x-auth-token": token },
        });

        if (user.data) {
          setUserData(user.data);
          sessionStorage.setItem("userData", user.data);
        }
      }

      setToken(token);
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    return <SearchContainer />;
  }
}

export default connect(null, mapDispatchToProps)(withTranslation()(Search));
