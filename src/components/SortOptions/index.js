import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ShowChart from "@material-ui/icons/ShowChartOutlined";
import ViewAgenda from "@material-ui/icons/ViewAgenda";
import Reorder from "@material-ui/icons/Reorder";
import NewReleases from "@material-ui/icons/NewReleasesOutlined";
import Star from "@material-ui/icons/Star";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import {
  setTopicView,
  setTopics,
  setActivePromotedPosts,
  includePromotedPosts,
  setCurrentPage,
  toggleLoading,
  setSortFilter,
} from "../../store/actions";
import { withTranslation } from "../../../i18n";
import axios from "axios";
import { config } from "../../../config";
import Tooltip from "@material-ui/core/Tooltip";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import Link from "next/link";

const mapStateToProps = ({ topics, user }) => ({
  topics,
  user,
});

const mapDispatchToProps = {
  setTopicView,
  setTopics,
  setCurrentPage,
  toggleLoading,
  setSortFilter,
  toggleLoading,
};

const SortOptions = ({
  setTopicView,
  setTopics,
  toggleLoading,
  setSortFilter,
  setCurrentPage,
  group = false,
  topics: { view, filter, sort },
  user,
  t,
}) => {
  useEffect(() => {
    // if (router.pathname === "/group/[groupname]") {
    //   handleFilterNormal("allTime");
    // } else if (router.pathname === "/hashtag/[tag]") {
    //   handleFilterInTag("week");
    // } else {
    //   handleFilterNormal("week");
    // }
  }, []);

  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  let isHashTagPage = false;

  if (router.pathname === "/hashtag/[tag]") {
    // set default sort type for tag page
    sort = sort == "home" || sort == undefined ? "popular" : sort;
    isHashTagPage = true;
  }

  if (router.pathname === "/group/[groupname]") {
    sort = sort == "home" || sort == undefined ? "recent" : sort; //set default as recent for group pages

    // console.log("sort is",sort);
  }

  const handleChange = (event) => {
    if (router.pathname === "/hashtag/[tag]") {
      handleHashTag(event.target.value);
    } else {
      handleSortNormal(event.target.value);
    }
  };

  const getActivePromotedPosts = async () => {
    try {
      const response = await axios.get(config.promotedPost);

      dispatch(setActivePromotedPosts(response.data.payload));
      dispatch(includePromotedPosts(response.data.payload));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortNormal = async (val) => {
    try {
      toggleLoading(true);
      const headers = user.token ? { "x-auth-token": user.token } : {};

      let querystr = group
        ? `${config.topics}?type=${val}&filter=${filter}&groupId=${group._id}`
        : `${config.topics}?type=${val}&filter=${filter}`;

      const topicsData = await axios.get(querystr, { headers });
      const promotedPstsData = axios.get(config.promotedPost);

      const response = await Promise.all([topicsData, promotedPstsData]);

      const topics = response[0];
      const activeProm = response[1];

      setTopics(topics.data);
      dispatch(setActivePromotedPosts(activeProm.data.payload));
      dispatch(includePromotedPosts(activeProm.data.payload));

      setCurrentPage(1);

      localStorage.setItem("sortOption", val);
    	localStorage.setItem("filterOption", filter);

      setSortFilter({ sort: val });
      setSortFilter({ filter: filter });

      toggleLoading(false);
    } catch (error) {
      console.log(error);
      toggleLoading(false);
      console.log(error.response);
    }
  };

  const handleHashTag = async (val) => {
    try {
      toggleLoading(true);

      const topics = await axios.get(
        `${config.getTopicByTag}?tag=${router.query.tag}&type=${val}&filter=${filter}`
      );

      setTopics(topics.data);

      setCurrentPage(1);

      setSortFilter({ sort: val });

      toggleLoading(false);
    } catch (error) {
      console.log(error);
      toggleLoading(false);
      console.log(error.response);
    }
  };

  const handleFilter = async (event) => {
    if (router.pathname === "/hashtag/[tag]") {
      handleFilterInTag(event.target.value);
    } else {
      handleFilterNormal(event.target.value);
    }
  };

  const handleFilterNormal = async (val) => {
    try {
      toggleLoading(true);

      let querystr = group
        ? `${config.topics}?type=${sort}&filter=${val}&groupId=${group._id}`
        : `${config.topics}?type=${sort}&filter=${val}`;

      const topicsData = await axios.get(querystr);

      //  const topicsData = await axios.get(querystr, { headers });
      const promotedPstsData = axios.get(config.promotedPost);

      const response = await Promise.all([topicsData, promotedPstsData]);

      const topics = response[0];
      const activeProm = response[1];

      setTopics(topics.data);
      dispatch(setActivePromotedPosts(activeProm.data.payload));
      dispatch(includePromotedPosts(activeProm.data.payload));

      setCurrentPage(1);

      // setFilter(val);
      setSortFilter({ filter: val });

      toggleLoading(false);
    } catch (error) {
      console.log(error);
      toggleLoading(false);
      console.log(error.response);
    }
  };

  const handleFilterInTag = async (val) => {
    try {
      toggleLoading(true);
      const topics = await axios.get(
        `${config.getTopicByTag}?tag=${router.query.tag}&type=${sort}&filter=${val}`
      );

      console.log("topics", topics);

      setTopics(topics.data);
      // getActivePromotedPosts();

      setCurrentPage(1);

      setSortFilter({ filter: val });
      toggleLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      toggleLoading(false);
    }
  };

  const handleChangeView = (newView) => () => {
    if (view === newView) return;

    setTopicView(newView);
    localStorage.setItem("view", newView);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.side}>
        {/* <Typography variant="overline">{t("View")}</Typography> */}
        <Tooltip title="Classic View">
          <IconButton
            color={view === "compact" ? "primary" : "default"}
            onClick={handleChangeView("compact")}
            // onClick={() => setTopicView("compact")}
            // disabled={view === "compact"}
          >
            <Reorder />
          </IconButton>
        </Tooltip>

        <Tooltip title="Card View">
          <IconButton
            color={view === "normal" ? "primary" : "default"}
            onClick={handleChangeView("normal")}
            // onClick={() => setTopicView("normal")}
            // disabled={view === "normal"}
          >
            <ViewAgenda />
          </IconButton>
        </Tooltip>

        {/* <Tooltip title="New">
          <Link href={"http://localhost:7001"}>
            <IconButton
              color={view === "normal" ? "primary" : "default"}
            >
              <FiberNewIcon />
            </IconButton>
          </Link>
        </Tooltip> */}
      </div>

      <div style={{ borderLeft: "1px solid #80808069", height: 35 }} />
      <div className={classes.side}>
        {/* <Typography variant="overline">{t("Sort")}</Typography> */}
        <Select
          value={sort == "home" ? "popular" : sort}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="popular">
            <Box display="flex" alignItems="center">
              <ShowChart />
              {t("Popular")}
            </Box>
          </MenuItem>
          <MenuItem value="recent">
            <Box display="flex" alignItems="center">
              <NewReleases />
              {t("Recent")}
            </Box>
          </MenuItem>
        </Select>
      </div>

      <div style={{ borderLeft: "1px solid #80808069", height: 35 }} />

      <Select
        id="filer-select"
        value={filter}
        onChange={handleFilter}
        input={<BootstrapInput />}
      >
        <MenuItem value="now">{t("Now")}</MenuItem>
        <MenuItem value="today">{t("Today")}</MenuItem>
        <MenuItem value="week" selected>
          {t("This Week")}
        </MenuItem>
        <MenuItem value="month">{t("This Month")}</MenuItem>
        <MenuItem value="allTime">{t("All Time")}</MenuItem>
      </Select>
    </Paper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SortOptions));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
    // backgroundColor: theme.palette.background.paper,
    // border: "1px solid #ced4da",
    fontSize: 15,
    padding: "6px 26px 6px 12px",
    marginBottom: 2,
    marginLeft: 5,
    // transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: theme.palette.primary.main,
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    // maxWidth: 300,
    // marginTop: 50,
    // width: 420,
    // [breakpoints.down("xs")]: {
    //   width: "100%",
    // },
    // width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    padding: spacing(0.5, 3),
  },
  button: {
    borderRadius: 0,
  },
  side: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  className: { display: "flex", alignItems: "center" },
}));

// import React, { useState } from 'react';
// import Paper from "@material-ui/core/Paper";
// import makeStyles from "@material-ui/core/styles/makeStyles";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import ShowChart from "@material-ui/icons/ShowChartOutlined";
// import NewReleases from "@material-ui/icons/NewReleasesOutlined";

// const SortOptions = (props) => {
// 	const classes = useStyles();
//   const { disabled } = props;

// 	return (
//     // <Paper className={classes.root}>
//       <div>
//         <Typography variant="overline">Sort Post by</Typography>
//         <div>
//           <Button
//             variant={disabled === "Popular" ? "contained" : "outlined"}
//             color="primary"
//             // disabled={disabled === "Popular"}
//             href={disabled === "Popular" ? null : "/"}
//             size="small"
//             className={classes.button}
//             startIcon={<ShowChart />}
//           >
//             Popular
//           </Button>
//           <Button
//             variant={disabled === "Recent" ? "contained" : "outlined"}
//             color="primary"
//             // disabled={disabled === "Recent"}
//             size="small"
//             href={disabled === "Recent" ? null : "/recent"}
//             className={classes.button}
//             startIcon={<NewReleases />}
//           >
//             Recent
//           </Button>
//         </div>
//       </div>

//     // </Paper>
//   );
// }

// const useStyles = makeStyles(theme => ({
//   root: {
//     maxWidth: 500,
//     marginTop: 50,
//     width: "100%",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: theme.spacing(1, 0.5)
//   },
//   button: {
// 		borderRadius: 0
// 	}
// }));

// export default SortOptions
