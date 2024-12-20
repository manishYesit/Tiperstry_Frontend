import React from "react";
import ReportData from "../../../src/containers/MetaReports";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserData } from "../../../src/store/actions";
import { config } from "../../../config";
import axios from "axios";
import Router from "next/router";

const Reports = () => {
  const dispatch = useDispatch();
  let token;

  React.useEffect(() => {
    token = localStorage.getItem("token");
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      if (token) {
        const user = await axios.get(config.me, {
          headers: { "x-auth-token": token },
        });

        if (!user.data.isAdmin) Router.push("/");
        dispatch(setUserData(user.data));
        sessionStorage.setItem("userData", JSON.stringify(user.data));
      } else {
        Router.push("/");
      }
      dispatch(setToken(token));
    } catch (error) {
      console.log("error", error);
      Router.push("/");
    }
  };

  return <ReportData />;
};

export default Reports;
