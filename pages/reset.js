import React from 'react'
import ResetPassword from "../src/containers/ResetPassword";
import { config } from "../config";
import axios from "axios";
import Router from "next/router";



class Reset extends React.Component {
  static async getInitialProps(context) {
    const { req, res, asPath, query } = context;
    try {
      await axios.get(config.resetAccount + "/" + query.t);

      return {};
    } catch (error) {
      console.log("error", error);
      // if (res) {
      //   res.writeHead(302, {
      //     Location: "/login"
      //   });
      //   res.end();
      // } else {
      //   Router.push("/login");
      // }
    }
  }

  render() {
    return <ResetPassword />;
  }
}

export default Reset;