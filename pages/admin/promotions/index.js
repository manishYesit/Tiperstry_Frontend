import React from "react";
import Router from "next/router";
import Promotions from "../../../src/containers/Promotions";
import { useDispatch, useSelector, connect } from "react-redux";

import {
  setToken,
  setUserData,
  setAllPromotedPosts,
} from "../../../src/store/actions";
import { config } from "../../../config";

import axios from "axios";

const PromotionsPage = () => {
  const dispatch = useDispatch();
  let token;
  React.useEffect(() => {
    token = localStorage.getItem("token");
    handleGetUser();
    getAllPromotedPosts();
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

  const getAllPromotedPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(config.allPromotedPost, {
        headers: { "x-auth-token": token },
      });
      dispatch(setAllPromotedPosts(response.data.payload));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Promotions />
    </>
  );
};

// PromotionsPage.getInitialProps = async (context) => {
//   const { req, res, query } = context;
//   const token = localStorage.getItem("token");
//   try {
//     const response = await axios.get(config.addPromotedPost, {
//       headers: { "x-auth-token": token },
//     });

//     return {
//       promotedPosts: response.data.payload,
//     };
//   } catch (error) {
//     console.log(error);
//     return { promotedPosts: [] };
//   }
// };

export default PromotionsPage;
