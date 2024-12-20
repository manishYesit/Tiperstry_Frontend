import React from "react";
import Router from "next/router";
import Promotions from "../../../src/containers/Promotions";
import { useDispatch, useSelector, connect } from "react-redux";

import { setToken, setUserData, getCryptos } from "../../../src/store/actions";
import { config } from "../../../config";

import axios from "axios";
import CryptoRequest from "../../../src/containers/CryptoRequest";

const PromotionsPage = () => {
  const dispatch = useDispatch();
  let token;

  React.useEffect(() => {
    handleGetUser();
    // getCryptoRequests();
    dispatch(getCryptos("pending"));
  }, []);

  const handleGetUser = async () => {
    try {
      token = localStorage.getItem("token");
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

  return (
    <>
      <CryptoRequest />
    </>
  );
};

export default PromotionsPage;
