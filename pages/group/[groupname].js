import React, { useState, Component } from "react";
import GroupContainer from "../../src/containers/Group";
import { connect } from "react-redux";
import {
  setTopics,
  setCurrentPage,
  setUserData,
  setToken,
  setComment,
  setSortFilter,
  setActivePromotedPosts,
  includePromotedPosts,
} from "../../src/store/actions";
import axios from "axios";
import { config } from "../../config";
import { useRouter, Router } from "next/router";
import Head from "next/head";
import { withTranslation } from "../../i18n";
import { useDispatch, useSelector } from "react-redux";

import BottomScrollListerer from "react-bottom-scroll-listener";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

const mapDispatchToProps = {
  setTopics,
  setCurrentPage,
  setUserData,
  setToken,
  setComment,
  setSortFilter,
  setActivePromotedPosts,
  includePromotedPosts,
};

const Group = ({ setToken, setUserData }) => {
  const topics = useSelector(({ topics }) => topics);
  const [loading, setLoading] = React.useState(false);
  const [group, setGroup] = React.useState();
  const [grouprules, setGroupRules] = React.useState();
  const [sortFilter, setSortFilterLocal] = useState({
    sort: topics.sort ?? "recent",
    filter: topics.sort ?? "allTime",
  });
  const dispatch = useDispatch();

  React.useEffect(() => {
    handleGetGroup();
    handleDefaultSortFilter();
    handleGetUser();
  }, []);

  const router = useRouter();
  const group_name = router.query.groupname;
  const viewstyle = router.query.viewtype ? router.query.viewtype : "normal";

  const handleDefaultSortFilter = () => {
    let sort = localStorage.getItem("sortOption");
    let filter = localStorage.getItem("filterOption");

    if (sort && sort == 'home') {
      sort = 'popular';
      localStorage.setItem('menu', 'top');
      localStorage.setItem("sortOption", "popular");
    }

    if (!sort && !filter) {
      sort = "recent";
      filter = "allTime";
    }

    setSortFilterLocal({ sort: sort, filter: filter });
    dispatch(setSortFilter({ sort, filter }));
  };

  const setFirstTopics = async (_group) => {
    let group = _group;
    let sort = localStorage.getItem("sortOption") ?? "popular"; //load popular by default for anon
    let filter = localStorage.getItem("filterOption") ?? "allTime"; //load allTime by default for anon

    if (sort && sort == 'home') {
      sort = 'popular';
      localStorage.setItem('menu', 'top');
      localStorage.setItem("sortOption", "popular");
    }

    setSortFilter({ sort, filter });
    let query = "";
    if (sort) query = `?type=${sort}&`;
    if (filter) query += `filter=${filter}`;
    if (group && group._id) query += `&groupId=${group._id}`;

    const topicsData = axios.get(`${config.topics}${query}`);
    const promotedPstsData = axios.get(config.promotedPost);

    const response = await Promise.all([topicsData, promotedPstsData]);

    const topics = response[0];
    const activeProm = response[1];

    dispatch(setTopics(topics.data));
    dispatch(setActivePromotedPosts(activeProm.data.payload));
    dispatch(includePromotedPosts(activeProm.data.payload));
    // await getActivePromotedPosts();
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

    // console.log
    setLoading(true);

    const page = Number(topics.currentPage) + 1;

    try {
      const nextTopics = await axios.get(
        `${config.topics}?page=${page}&filter=${topics.filter}&type=${topics.sort}&groupId=${group._id}`
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

  const handleGetGroup = async () => {
    try {
      const token = localStorage.getItem("token");

      let group = await axios.get(
        config.listgroups + "?name=" + group_name.replace("&", "%26")
      );

      let groupdata = group.data.group;
      // check if group is banned
      if (groupdata.banned) {
        alert("Group is banned!");
        window.location.href = "/";
        return;
      }
      groupdata.icon = config.getImage + groupdata.icon;
      groupdata.grouprules = group.data.grouprules;
      setGroup(groupdata);
      setFirstTopics(groupdata);
      setToken(token);
    } catch (error) {
      // console.log("error", error);
    }
  };

  return (
    <>
      {group && (
        <>
          <Head>
            <title>{`${group.name}-Tipestry`}</title>
            <meta charSet="UTF-8" />
            <meta name="description" content={`${group.name}-Tipestry`} />
          </Head>
          <BottomScrollListerer onBottom={handleFetchMore}>
            <GroupContainer group={group} viewstyle={viewstyle} />
            {loading && (
              <Container maxWidth="xs">
                <CircularProgress />
              </Container>
            )}
          </BottomScrollListerer>
        </>
      )}
    </>
  );
};

export default connect(null, mapDispatchToProps)(withTranslation()(Group));
