import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Tooltip from '@material-ui/core/Tooltip';
import Select from "@material-ui/core/Select";

import { connect, useDispatch, useSelector } from "react-redux";
import {
  setUserData,
  openModal,
  setTopics,
  includePromotedPosts,
  setActivePromotedPosts,
  setCurrentPage,
  toggleLoading,
  setSortFilter,
} from "../../store/actions";

import Exit from "@material-ui/icons/ExitToApp"
import IconButton from "@material-ui/core/IconButton";
import { useRouter } from "next/router";
import Notification from "./Notification";
import Create from "@material-ui/icons/Create"
import Language from "./language";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import dynamic from "next/dynamic";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import { withTranslation } from "../../../i18n"
import { config } from "../../../config";
import axios from "axios";

const AddPost = dynamic(() => import("../AddPost"), {
  ssr: false,
});

const AddSignup = dynamic(() => import("../AddSignup"), {
  ssr: false,
});

const mapStateToProps = ({ topics, user }) => ({
  topics,
  user,
});

const mapDispatchToProps = {
  setTopics,
  setCurrentPage,
  toggleLoading,
  setSortFilter,
};

const Header = ({
  setTopicView,
  setTopics,
  toggleLoading,
  setSortFilter,
  setCurrentPage,
  topics: { view, filter, sort },
  t,
  group,
  singleTopic
}) => {
  const router = useRouter()
  const classes = useStyles();
  const [addPost, setAddPost] = useState(false);
  const [addSignupt, setAddSignup] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(({ user: { user } }) => user);
  const [timeFilter, setTimeFilter] = useState(filter);
  const [homeFilter, setHomeFilter] = useState('allTime');

  const [siteData, setSiteData] = useState({
    site: 0,
    discussion: 0,
    isValue: 1,
  });

  const [menu, setMenu] = useState({
    top: 0,
    trending: 0,
    new: 0,
    hot: 0,
    rising: 0,
    home: 0,
  });

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    setMenu({
      top: 0,
      trending: 0,
      new: 0,
      hot: 0,
      rising: 0,
      home: 0,
    });

    const sort = localStorage.getItem("sortOption") ?? "popular";
    const filter = localStorage.getItem("filterOption") ?? "week";

    dispatch(setSortFilter({ sort, filter }));
  }, []);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  let selectedMenu = '';
  if (typeof window !== 'undefined') {
    selectedMenu = localStorage.getItem('menu') ? localStorage.getItem('menu') : '';
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUserData(null);
    router.push("/login");
  };

  const pageUrl = router.pathname;

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    user ? (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <div className={classes.user}>
            <Typography variant="overline" className={classes.username}>
              @
            </Typography>
            <Typography
              variant="overline"
              className={classes.username}
              component="a"
              href={"/p/" + user.username}
            >
              {user.username}
            </Typography>
          </div>
        </MenuItem>
        <MenuItem onClick={() => handleLogOut}>
          {/* <IconButton>
            <Exit />
          </IconButton>
          <p>{t("Log Out")}</p> */}
          <Tooltip title="Log out">
            <Button
              onClick={handleLogOut}
              startIcon={<Exit />}
            >
              {t("Log Out")}
            </Button>
          </Tooltip>
        </MenuItem>
      </Menu>
    ) : (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem component="a" href="/login">
          <Button color="inherit" size="small">
            {t("Login")}
          </Button>
        </MenuItem>
        <MenuItem component="a" href="/register">
          <Button color="inherit" size="small">
            {t("Join Us")}
          </Button>
        </MenuItem>
      </Menu>
    )
  );

  const getSiteData = async (url) => {
    try {
      const data = await axios.get(config.getUrlTotal + "?url=" + url);
      setSiteData({
        site: data.data.topic,
        discussion: data.data.site,
        isValue: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (singleTopic && singleTopic.url && siteData.isValue) {
    getSiteData(singleTopic.url);
  }

  const handleOpen = () => {
    setAddPost(true);
  };

  const handleClose = () => {
    setAddPost(false);
  };

  const handleOpenSignup = () => {
    setAddSignup(true);
  };

  const handleCloseSignup = () => {
    setAddSignup(false);
  };

  const loggedIn = () => {
    return (
      <>
        <Notification />
        <div className={classes.user}>

          <Typography variant="overline" className={classes.username}>
            @
          </Typography>
          <Tooltip title="Profile">
            <Typography
              variant="overline"
              className={classes.username}
              component="a"
              href={"/p/" + user.username}
            >
              {user.username}
            </Typography>
          </Tooltip>
        </div>
        {user.isAdmin && (
          <Button href="/admin" color="inherit" size="small">
            Admin
          </Button>
        )}
        <Tooltip title="Log out">
          <IconButton onClick={handleLogOut}>
            <Exit style={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </>
    );
  };

  const notLoggedIn = () => {
    return (
      <>
        <Button href="/login" color="inherit" size="small">
          {t("Login")}
        </Button>
        <Fab
          variant="extended"
          size="small"
          color="secondary"
          aria-label="add"
          className={classes.margin}
          onClick={handleOpenSignup}
        >
          {t("Sign Up")}
        </Fab>
      </>
    );
  };

  const filterHot = () => {
    handleSort('popular', 'today');
    setMenu({
      top: 0,
      trending: 0,
      new: 0,
      hot: 1,
      rising: 0,
      home: 0,
    });

    localStorage.setItem('menu', 'hot');
  }

  const filterNew = () => {
    handleSort('recent', 'week');
    setMenu({
      top: 0,
      trending: 0,
      new: 1,
      hot: 0,
      rising: 0,
      home: 0,
    });

    localStorage.setItem('menu', 'new');
  }

  const filterRising = () => {
    handleSort('popular', 'now');
    setMenu({
      top: 0,
      trending: 0,
      new: 0,
      hot: 0,
      rising: 1,
      home: 0,
    });

    localStorage.setItem('menu', 'rising');
  }

  const filterTop = () => {
    setTimeFilter('week');
    handleSort('popular', 'week');
    setMenu({
      top: 1,
      trending: 0,
      new: 0,
      hot: 0,
      rising: 0,
      home: 0,
    });

    localStorage.setItem('menu', 'top');
  }

  const filterTrending = () => {
    handleSort('trending', 'today');
    setMenu({
      top: 0,
      trending: 1,
      new: 0,
      hot: 0,
      rising: 0,
      home: 0,
    });

    localStorage.setItem('menu', 'trending');
  }

  const handleFilterTop = (event) => {
    setTimeFilter(event.target.value);
    handleSort('popular', event.target.value);
  }

  const handleFilterHome = (event) => {
    setHomeFilter(event.target.value);
    handleSort('home', event.target.value);
  }

  const filterHome = () => {
    if (pageUrl == '/group/[groupname]' || pageUrl == '/hashtag/[tag]') {
      localStorage.setItem('menu', 'home');
      localStorage.setItem("sortOption", 'home');
      localStorage.setItem("filterOption", 'allTime');

      setSortFilter({ sort: 'home' });
      setSortFilter({ filter: 'allTime' });

      router.push('/');
    } else {
      handleSort('home', 'allTime');
      setHomeFilter('allTime');
      setMenu({
        top: 0,
        trending: 0,
        new: 0,
        hot: 0,
        rising: 0,
        home: 1,
      });

      localStorage.setItem('menu', 'home');
    }
  }

  const handleSort = async (type, filter) => {
    try {
      toggleLoading(true);

      let token = user ? localStorage.getItem("token") : '';

      const headers = token ? { "x-auth-token": token } : {};

      let querystr = '';
      if (pageUrl == "/hashtag/[tag]") {
        querystr = `${config.getTopicByTag}?tag=${router.query.tag}&type=${type}&filter=${filter}`;
      } else if (group) {
        querystr = `${config.topics}?type=${type}&filter=${filter}&groupId=${group._id}`;
      } else {
        querystr = `${config.topics}?type=${type}&filter=${filter}`;
      }

      const topicsData = axios.get(querystr, { headers });

      const promotedPstsData = axios.get(config.promotedPost);

      const response = await Promise.all([topicsData, promotedPstsData]);

      const topics = response[0];
      const activeProm = response[1];

      setTopics(topics.data);
      dispatch(setActivePromotedPosts(activeProm.data.payload));
      dispatch(includePromotedPosts(activeProm.data.payload));

      setCurrentPage(1);

      localStorage.setItem("sortOption", type);
      localStorage.setItem("filterOption", filter);

      setSortFilter({ sort: type });
      setSortFilter({ filter: filter });

      toggleLoading(false);

      loadMore(type, filter, topics.data);
    } catch (error) {
      toggleLoading(false);
      console.log(error);
      console.log(error.response);
    }
  };

  const loadMore = async (type, filter, topics) => {
    try {
      let token = user ? localStorage.getItem("token") : '';

      const headers = token ? { "x-auth-token": token } : {};

      let querystr = '';
      if (pageUrl == "/hashtag/[tag]") {
        querystr = `${config.getTopicByTag}?tag=${router.query.tag}&page=2&type=${type}&filter=${filter}`;
      } else if (group) {
        querystr = `${config.topics}?page=2&type=${type}&filter=${filter}&groupId=${group._id}`;
      } else {
        querystr = `${config.topics}?page=2&type=${type}&filter=${filter}`;
      }

      const topicsData = axios.get(querystr, { headers });

      const promotedPstsData = axios.get(config.promotedPost);

      const response = await Promise.all([topicsData, promotedPstsData]);

      const topicArray = response[0];
      const activeProm = response[1];

      topicArray.data.topics.forEach((element) => {
        topics.topics.push(element);
      });

      setTopics(topics);
      dispatch(setActivePromotedPosts(activeProm.data.payload));
      dispatch(includePromotedPosts(activeProm.data.payload));

      setCurrentPage(2);
    } catch (error) {
      toggleLoading(false);
      console.log(error);
      console.log(error.response);
    }
  };

  return (
    <>
      <AppBar position="fixed" elevation={1} className={classes.root}>
        <Container className={classes.widthHundred}>
          <Toolbar className={classes.widthHundred}>
            <Hidden mdUp>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={() => dispatch(openModal())}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <a href="/">
              <img src="/static/tipcoin.png" className={classes.logo} />
            </a>
            <Hidden only={["sm", "xs"]}>
              {pageUrl == "/topics/[topicId]/[title]" ?
                (group ?
                  <a href={"/group/" + group.name.replaceAll(" ", "-").replaceAll("&", "%26")} className={classes.groupName}>{group.name}</a>
                  : <></>
                )
                : <></>
              }

              {singleTopic ?
                <ul className={classes.ulHeader} style={{ display: 'flex' }}>
                  <li><a href={(singleTopic.url ? "/sites?s=" + singleTopic.url : '')} className={classes.ulHeaderA}>page discussions {'(' + siteData.site + ')'}</a></li>
                  <li><a href={(singleTopic.url ? "/domain?s=" + singleTopic.url : '')} className={classes.ulHeaderA}>site discussions {'(' + siteData.discussion + ')'}</a></li>
                </ul>
                : <></>
              }

              <ul className={classes.ulHeader} style={{ display: (pageUrl == "/" || pageUrl == '/group/[groupname]' || pageUrl == '/hashtag/[tag]') ? 'flex' : 'none' }}>
                <li><a className={menu.top || selectedMenu == 'top' ? classes.activeMenu : classes.ulHeaderA} onClick={filterTop}>top</a></li>
                <li><a className={menu.trending || selectedMenu == 'trending' ? classes.activeMenu : classes.ulHeaderA} onClick={filterTrending}>trending</a></li>
                <li><a className={menu.hot || selectedMenu == 'hot' ? classes.activeMenu : classes.ulHeaderA} onClick={filterHot}>hot</a></li>
                <li><a className={menu.new || selectedMenu == 'new' ? classes.activeMenu : classes.ulHeaderA} onClick={filterNew}>new</a></li>
                <li><a className={menu.rising || selectedMenu == 'rising' ? classes.activeMenu : classes.ulHeaderA} onClick={filterRising}>rising</a></li>
                {user ?
                  <li>< a className={menu.home || selectedMenu == 'home' ? classes.activeMenu : classes.ulHeaderA} onClick={filterHome}>home</a></li>
                  : <li><a className={classes.ulHeaderA} href='/login'>home</a></li>
                }
                <li><a className={classes.ulHeaderA} href='https://tipestry.com/'>classic</a></li>
              </ul>
            </Hidden>
            <div className={classes.title} />
            <div className={classes.sectionDesktop}>
              {/* <Tooltip title="Post">
                <IconButton
                  color="secondary"
                  onClick={handleOpen}
                  size="small"
                >
                  <Create />
                </IconButton>
              </Tooltip> */}
              {user ? loggedIn() : notLoggedIn()}

              {/* <Language /> */}
            </div>
            <div className={classes.sectionMobile}>
              <Tooltip title="Post">
                <IconButton
                  color="secondary"
                  onClick={handleOpen}
                >
                  <Create />
                </IconButton>
              </Tooltip>
              {user && <Notification />}
              {/* <Language /> */}
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container >
        <AddSignup open={addSignupt} group={group} handleClose={handleCloseSignup} />
        <AddPost open={addPost} group={group} handleClose={handleClose} />

        {(pageUrl == "/" || pageUrl == "/group/[groupname]" || pageUrl == '/hashtag/[tag]') ?
          (menu.top || selectedMenu == 'top' ?
            <Container className={classes.headerSignup}>
              <Typography style={{ fontSize: "12px" }}>
                <span>Posts from:</span>
                <Select
                  value={timeFilter}
                  onChange={handleFilterTop}
                  style={{ marginLeft: "5px", fontSize: "12px", position: 'absolute', marginTop: '-2px' }}
                >
                  <MenuItem value="now">{t("Now")}</MenuItem>
                  <MenuItem value="today">{t("Today")}</MenuItem>
                  <MenuItem value="week">{t("This Week")}</MenuItem>
                  <MenuItem value="month">{t("This Month")}</MenuItem>
                  <MenuItem value="allTime">{t("All Time")}</MenuItem>
                </Select>
              </Typography>
            </Container>
            : <></>
          )
          : <></>
        }

        {pageUrl == "/" ?
          (menu.home || selectedMenu == 'home' ?
            <Container className={classes.headerSignup}>
              <Typography style={{ fontSize: "12px" }}>
                <span>Filter Posts:</span>
                <Select
                  value={homeFilter}
                  onChange={handleFilterHome}
                  style={{ marginLeft: "5px", fontSize: "12px", position: 'absolute', marginTop: '-2px' }}
                >
                  <MenuItem value="allTime">{t("Top")}</MenuItem>
                  <MenuItem value="today">{t("Hot")}</MenuItem>
                  <MenuItem value="now">{t("New")}</MenuItem>
                </Select>
              </Typography>
            </Container>
            : <></>
          )
          : <></>
        }
      </AppBar >
      {renderMobileMenu}
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Header));

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  root: {
    display: 'flex',
    position: 'relative',
    alignItems: 'end',
  },
  menuButton: {
    marginRight: spacing(2),
  },
  ulHeader: {
    gap: '5px',
    listStyleType: 'none',
    color: '#fff',
    justifyContent: 'end',
    alignItems: 'end',
    justifyContent: '2px',
    marginBottom: '3px',

  },
  ulHeaderA: {
    textDecoration: 'none',
    color: '#369',
    background: '#eff7ff;',
    padding: '3px 12px',
    letterSpacing: '0.5px',
    cursor: 'pointer',
  },
  widthHundred: {
    maxWidth: '100%',
    background: '#cee3f8',
    padding: '0px',
    alignItems: 'end',
    minHeight: '48px',
    borderBottom: '1px solid #5f99cf',
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: "auto",
    height: 40,
    [breakpoints.down("sm")]: {
      height: 30,
    },
    marginBottom: 5,
  },
  margin: {
    margin: spacing(1),
    width: "90px !important",
  },
  user: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  username: {
    color: "white",
    fontSize: 14,
    textDecoration: "none",
    [breakpoints.down("xs")]: {
      color: "black",
    },
  },
  section: {
    display: "flex",
    flexDirection: "column",
  },
  sectionBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  sectionDesktop: {
    display: "none",
    [breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [breakpoints.up("sm")]: {
      display: "none",
    },
  },
  headerSignup: {
    background: "#fff",
    padding: "5px",
    paddingLeft: "90px",
    maxWidth: "100%",
  },
  activeMenu: {
    border: '2px solid #5f99cf',
    borderBottom: '2.5px solid #eff7ff',
    textDecoration: 'none',
    color: '#369',
    background: '#eff7ff;',
    padding: '3px 12px',
    letterSpacing: '0.5px',
    cursor: 'pointer',
  },
  groupName: {
    color: '#369',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    padding: '5px 20px',
    textTransform: 'uppercase',
    textDecoration: 'none',
  }
}));
