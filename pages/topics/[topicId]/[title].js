import React, { Component } from "react";
import TopicContainer from "../../../src/containers/Topic";
import { connect, useDispatch } from "react-redux";
import {
  setSingleTopic,
  setCurrentPage,
  setUserData,
  setToken,
  setComment,
  setPromotionCharge,
} from "../../../src/store/actions";
import axios from "axios";
import { config } from "../../../config";
import Router from "next/router";
import Head from "next/head";
import { withTranslation } from "../../../i18n";

const mapDispatchToProps = {
  setSingleTopic,
  setCurrentPage,
  setUserData,
  setToken,
  setComment,
};

const Topic = ({
  setSingleTopic,
  topic,
  setComment,
  comments,
  setToken,
  setUserData,
}) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    handleGetUser();

    setSingleTopic(topic);
    getPromotionCharge();
    setComment(comments);
  }, []);

  const getPromotionCharge = async () => {
    try {
      const response = await axios.get(config.promotionCharge);

      if (response.data.payload != undefined) {
        dispatch(setPromotionCharge(response.data.payload));
      }
    } catch (error) {
      console.log(error.response.data);
    }
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
    }
  };

  return (
    <>
      <Head>
        <title>{`${topic.title}-Tipestry`}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={`${topic.title}-Tipestry`} />
      </Head>
      <TopicContainer />
    </>
  );
};

Topic.getInitialProps = async ({ req, res, query }) => {
  try {
    let topics = await axios.get(config.topics + "/" + query.topicId);

    // get group data for topic
    let topicdata = topics.data;

    if (topicdata.groupId) {
      const group = await axios.get(config.listgroups + "?groupId=" + topicdata.groupId);
      topicdata.group = group.data.group;
    }

    const comments = await axios.get(config.comment + "/" + query.topicId);

    return {
      topic: topicdata,
      comments: comments.data,
    };
  } catch (error) {
    if (res) {
      res.writeHead(404, {
        Location: "/",
      });
      res.end();
    } else {
      Router.push("/");
    }
  }
};

export default connect(null, mapDispatchToProps)(withTranslation()(Topic));
