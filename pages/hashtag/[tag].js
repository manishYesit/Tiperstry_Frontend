import React from "react";
import Home from "../../src/containers/Home";
import { config } from "../../config";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import {
  setTopics,
  setCurrentPage,
  setToken,
  setUserData,
  setTopicView,
  setUserSuggestions,
} from "../../src/store/actions";
import BottomScrollListerer from "react-bottom-scroll-listener";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { withTranslation } from "../../i18n";
import { isMobile } from "react-device-detect";
import Head from "next/head";

import { useRouter } from "next/router";

const mapDispatchToProps = {
  setTopics,
  setCurrentPage,
  setUserData,
  setTopicView,
  setToken,
};

const mapStateToProps = ({ user, topics }) => {
  return {
    user,
    topics,
  };
};

const HashTag = ({
  setTopics,
  setTopicView,
  firstTopics,
  topics,
  setCurrentPage,
  setUserData,
  setToken,
  tag,
}) => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    handleGetUser();
    setTopics(firstTopics);
    // getActivePromotedPosts();

    // handleGetUsersSuggestions();

    let menu = localStorage.getItem('menu');

    if (menu && menu == 'home') {
      localStorage.setItem('menu', 'top');
      localStorage.setItem("sortOption", "popular");
    }

    if (isMobile) {
      setTopicView("normal");
    }

    handleDefaultView();
  }, []);

  const getActivePromotedPosts = async () => {
    try {
      const response = await axios.get(config.promotedPost);

      dispatch(setActivePromotedPosts(response.data.payload));
      dispatch(includePromotedPosts(response.data.payload));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDefaultView = () => {
    const view = localStorage.getItem("view");

    if (!view) return;

    setTopicView(view);
  };

  const handleGetUsersSuggestions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { data: suggestions } = await axios.get(config.suggestions, {
          headers: { "x-auth-token": token },
        });
        dispatch(setUserSuggestions(suggestions));
      }
    } catch (error) {
      console.log("error", error);
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
      console.log("error", error);
    }
  };

  const handleFetchMore = async () => {
    if (topics.page <= topics.currentPage) return;

    if (loading) return;

    setLoading(true);

    const page = Number(topics.currentPage) + 1;

    try {
      const nextTopics = await axios.get(
        `${config.getTopicByTag}?tag=${tag}&page=${page}&filter=${topics.filter}&type=${topics.sort}`
      );

      nextTopics.data.topics.forEach((element) => {
        topics.topics.push(element);
      });
      
      topics.page = nextTopics.data.page;
      topics.total = nextTopics.data.total;

      setTopics(topics);
      setCurrentPage(page);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{`${tag}-Tipestry`}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={`${tag}-Tipestry`} />
      </Head>
      <BottomScrollListerer onBottom={handleFetchMore}>
        <Home />
        {loading && (
          <Container maxWidth="xs">
            <CircularProgress />
          </Container>
        )}
      </BottomScrollListerer>
    </>
  );
};

HashTag.getInitialProps = async ({ req, res, query: { tag } }) => {
  try {
    const topics = await axios.get(
      config.getTopicByTag + "?tag=" + encodeURIComponent(tag)
    );

    return {
      firstTopics: topics.data,
      tag,
    };
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HashTag));
