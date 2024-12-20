import React, { Component } from "react";
import Home from "../src/containers/Home";
import { config } from "../config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setTopics,
  setCurrentPage,
  setToken,
  setUserData,
  setTopicView,
  setUserSuggestions,
  setSortFilter,
  setActivePromotedPosts,
  // refreshPromotedPosts,
  setPromotionCharge,
} from "../src/store/actions";
import BottomScrollListerer from "react-bottom-scroll-listener";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { withTranslation } from "../i18n";
import { isMobile } from "react-device-detect";
import { makeStyles } from "@material-ui/core/styles";
import { includePromotedPosts } from "../src/store/actions";

const HomePage = ({ }) => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const topics = useSelector(({ topics }) => topics);
  const broadcast = useSelector(({ broadcast }) => broadcast);
  const user = useSelector(({ user }) => user);
  let token;
  
  React.useEffect(() => {
    token = localStorage.getItem("token");

    handleGetUser();

    handleDefaultSortFilter();

    // handleGetUsersSuggestions();
    getUserCountry();
    setFirstTopics();

    if (isMobile) {
      dispatch(setTopicView("normal"));
    }

    getPromotionCharge();

    handleDefaultView();
    // getActivePromotedPosts();
  }, []);

  const handleDefaultView = () => {
    const view = localStorage.getItem("view");

    if (!view) return;

    dispatch(setTopicView(view));
  };

  const handleDefaultSortFilter = () => {
    let sort = localStorage.getItem("sortOption");
    let filter = localStorage.getItem("filterOption");

    if (!sort && !filter) {
      sort = "trending";
      filter = "today";

      localStorage.setItem('menu', 'trending');
    }

    dispatch(setSortFilter({ sort, filter }));
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
      if (token) {
        const user = await axios.get(config.me, {
          headers: { "x-auth-token": token },
        });

        dispatch(setUserData(user.data));
        sessionStorage.setItem("userData", JSON.stringify(user.data));
      }

      dispatch(setToken(token));
    } catch (error) {
      console.log("error", error);
    }
  };

  const setFirstTopics = async () => {
    const headers = token ? { "x-auth-token": token } : {};

    const sort = localStorage.getItem("sortOption") ?? "trending"; //load trending by default for anon
    const filter = localStorage.getItem("filterOption") ?? "today"; //load today by default for anon

    setSortFilter({ sort, filter });
    
    let query = "";
    if (sort) query = `?type=${sort}&`;
    if (filter) query += `filter=${filter}`;

    const topicsData = axios.get(`${config.topics}${query}`, { headers });
    const topicsDataMore = axios.get(`${config.topics}${query}&page=2`, { headers });
    const promotedPstsData = axios.get(config.promotedPost);

    const response = await Promise.all([topicsData, promotedPstsData, topicsDataMore]);

    const topics = response[0];
    const activeProm = response[1];
    const topicsMore = response[2];

    topics.data.topics = [...topics.data.topics, ...topicsMore.data.topics];
  
    dispatch(setTopics(topics.data));
    dispatch(setActivePromotedPosts(activeProm.data.payload));
    dispatch(includePromotedPosts(activeProm.data.payload));
    dispatch(setCurrentPage(2));
    // await getActivePromotedPosts();
  };

  const getUserCountry = async () => {
    try {
      const userLocation = await axios.get(`${config.location}`);
      localStorage.setItem("country", userLocation.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPromotionCharge = async () => {
    // if (broadcast.promotionCharge == null) {
    try {
      const response = await axios.get(config.promotionCharge, {
        headers: { "x-auth-token": token },
      });

      if (response.data.payload != undefined) {
        dispatch(setPromotionCharge(response.data.payload));
      }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  const handleFetchMore = async () => {
    if (topics.page <= topics.currentPage) return;

    if (loading) return;

    setLoading(true);

    const page = Number(topics.currentPage) + 1;
    try {
      const headers = user.token ? { "x-auth-token": user.token } : {};

      const nextTopics = await axios.get(
        `${config.topics}?page=${page}&filter=${topics.filter}&type=${topics.sort}`,
        { headers }
      );

      nextTopics.data.topics.forEach((element) => {
        topics.topics.push(element);
      });

      topics.page = nextTopics.data.page;
      topics.total = nextTopics.data.total;

      dispatch(setTopics(topics));
      dispatch(setCurrentPage(page));
      // getActivePromotedPosts();

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getActivePromotedPosts = async () => {
    try {
      const response = await axios.get(config.promotedPost);
      console.log(response);

      dispatch(setActivePromotedPosts(response.data.payload));
      dispatch(includePromotedPosts(response.data.payload));
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };

  return (
    <BottomScrollListerer onBottom={handleFetchMore}>
      <Home />
      {loading && (
        <Container maxWidth="xs">
          <CircularProgress />
        </Container>
      )}
    </BottomScrollListerer>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    width: "100vw",
  },
}));

export default withTranslation()(HomePage);
