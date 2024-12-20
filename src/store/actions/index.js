import axios from "axios";
import { config } from "../../../config";
import {
  GET_TOPICS,
  SET_CURRENT_PAGE,
  SET_USER_DATA,
  X_AUTH_TOKEN,
  OPEN_GIFT,
  SET_ELEMENT_ID,
  SET_GIFT_TYPE,
  SET_SINGLE_TOPIC,
  TOGGLE_COMMENT,
  GET_COMMENTS,
  SET_CURRENT_COMMENT_PAGE,
  GET_SITE,
  GET_TOPIC_FOR_SITE,
  GET_USER_TOPICS,
  SET_USER_CURRENT_PAGE,
  SET_USERNAME,
  GET_USER_COMMENTS,
  GET_USER_PROFILE,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
  GET_USER_SUGGESTIONS,
  GET_URL,
  MODAL_OPEN,
  MODAL_REPORT_OPEN,
  MODAL_REPORT_COMMENT_OPEN,
  MODAL_SHARE_OPEN,
  TOPIC_VIEW_TYPE,
  SET_NOTIFICATION,
  TOGGLE_NOTIFICATION,
  TOPIC_SORT_FILTER,
  TOGGLE_LOADING,
  EDIT_TOPIC,
  SET_LANGUAGE,
  GET_SEARCH,
  GET_ALL_USERS,
  SEARCH_ALL_USERS,
  BAN_AND_UNBANUSER,
  BAN_REPORTED_USER,
  DELETE_REPORT,
  GET_REPORTED_USERS,
  DELETE_COMMENT,
  UPDATE_COMMENT_COUNT,
  MODAL_ADD_DOMAIN_OPEN,
  MODAL_VERIFY_DOMAIN_OPEN,
  SET_USER_DOMAIN_DATA,
  SET_USER_CHANNEL_DATA,
  MODAL_VERIFY_YOUTUBE_OPEN,
  OPEN_BROADCAST,
  SET_BROADCAST_ELEMENT_ID,
  SET_PROMOTION_CHARGE,
  OPEN_PROMOTION_PRICE,
  SET_ALL_PROMOTED_POSTS,
  SET_ACTIVE_PROMOTED_POSTS,
  REFRESH_PROMOTED_POSTS,
  INCLUDE_PROMOTED_POST,
  OPEN_ADD_MODERATOR,
  GET_CRYPTOS,
  MODAL_SETTING_OPEN
} from "../types";

let token;

// site language
export const setLanguage = (payload) => {
  localStorage.setItem("lang", payload);
  return {
    type: SET_LANGUAGE,
    payload,
  };
};

// topic reducers
export const setTopics = (payload) => {
  return {
    type: GET_TOPICS,
    payload,
  };
};

export const openSetting = (payload) => {
  return {
    type: MODAL_SETTING_OPEN,
    payload,
  };
};

export const updateCount = (payload) => {
  return {
    type: UPDATE_COMMENT_COUNT,
    payload,
  };
};
export const setCurrentPage = (payload) => {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
};
export const setSingleTopic = (payload) => {
  return {
    type: SET_SINGLE_TOPIC,
    payload,
  };
};
export const setTopicView = (payload) => ({
  type: TOPIC_VIEW_TYPE,
  payload,
});
export const setSortFilter = (payload) => {
  return {
    type: TOPIC_SORT_FILTER,
    payload,
  };
};
export const toggleLoading = (payload) => ({
  type: TOGGLE_LOADING,
  payload,
});
export const setEditTopic = (payload) => ({
  type: EDIT_TOPIC,
  payload,
});

//search
export const setSearch = (payload) => {
  return {
    type: GET_SEARCH,
    payload,
  };
};

// site reducers
export const setSite = (payload) => {
  return {
    type: GET_SITE,
    payload,
  };
};

export const setTopicForSite = (payload) => {
  return {
    type: GET_TOPIC_FOR_SITE,
    payload,
  };
};
export const setUrl = (payload) => ({
  type: GET_URL,
  payload,
});

// user reducers
export const setUserData = (payload) => {
  return {
    type: SET_USER_DATA,
    payload,
  };
};
export const setUserDomainData = (payload) => {
  return {
    type: SET_USER_DOMAIN_DATA,
    payload,
  };
};

export const setUserYoutubeInfo = (payload) => {
  return {
    type: SET_USER_CHANNEL_DATA,
    payload,
  };
};

export const setToken = (payload) => {
  return {
    type: X_AUTH_TOKEN,
    payload,
  };
};
export const openModal = () => ({
  type: MODAL_OPEN,
});

export const openReport = (payload) => ({
  type: MODAL_REPORT_OPEN,
  payload,
});
export const openReportComment = (payload) => ({
  type: MODAL_REPORT_COMMENT_OPEN,
  payload,
});

export const shareToggle = (payload) => ({
  type: MODAL_SHARE_OPEN,
  payload,
});

export const toggleAddDomainModal = (payload) => ({
  type: MODAL_ADD_DOMAIN_OPEN,
  payload,
});

export const toggleVerifyDomainModal = (payload) => ({
  type: MODAL_VERIFY_DOMAIN_OPEN,
  payload,
});

export const toggleVerifyChannelModal = (payload) => ({
  type: MODAL_VERIFY_YOUTUBE_OPEN,
  payload,
});

export const getAllUsers = () => async (dispatch) => {
  try {
    token = localStorage.getItem("token");
    if (token) {
      const user = await axios.get(config.all, {
        headers: { "x-auth-token": token },
      });
      dispatch({
        type: GET_ALL_USERS,
        payload: user.data.result,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const searchUsers = (searchField) => async (dispatch) => {
  try {
    token = localStorage.getItem("token");
    if (token) {
      const user = await axios.get(
        `${config.searchusers}?username=${searchField}&ipaddress=${searchField}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      dispatch({
        type: SEARCH_ALL_USERS,
        payload: user.data.users,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const toggleUserStatus = (id) => async (dispatch) => {
  try {
    token = localStorage.getItem("token");
    if (token) {
      const user = await axios.post(
        `${config.banuser}/${id}`,
        {},
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      dispatch({
        type: BAN_AND_UNBANUSER,
        payload: user.data.user,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const reportedUsers = (pages) => async (dispatch) => {
  try {
    const request = await axios.get(`${config.report}?page=${pages}&limit=10`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    });

    dispatch({
      type: GET_REPORTED_USERS,
      payload: request.data.result,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const banReportedUser = (id) => async (dispatch) => {
  try {
    token = localStorage.getItem("token");

    if (token) {
      const user = await axios.post(
        `${config.banuser}/${id}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const profile = await axios.get(
        config.profile + "/" + user.data.user.username
      );

      dispatch({
        type: GET_USER_PROFILE,
        payload: profile.data,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};
////delete reported user////
export const deleteReport = (id) => async (dispatch) => {
  try {
    token = localStorage.getItem("token");

    if (token) {
      const user = await axios.delete(`${config.report}/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });

      dispatch({
        type: DELETE_REPORT,
        payload: id,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};
// gift reducers
export const toggleGift = () => {
  return {
    type: OPEN_GIFT,
  };
};

export const setElementId = (payload) => {
  return {
    type: SET_ELEMENT_ID,
    payload,
  };
};
export const setGiftType = (payload) => {
  return {
    type: SET_GIFT_TYPE,
    payload,
  };
};

// comment
export const setComment = (payload) => {
  return {
    type: GET_COMMENTS,
    payload,
  };
};
export const deleteComment = (payload) => {
  return {
    type: DELETE_COMMENT,
    payload,
  };
};

export const setCurrenPageComment = (payload) => {
  return {
    type: SET_CURRENT_COMMENT_PAGE,
    payload,
  };
};
export const setToggleComment = (payload) => {
  return {
    type: TOGGLE_COMMENT,
    payload,
  };
};

// profile reducers
export const setUserSuggestions = (payload) => {
  return {
    type: GET_USER_SUGGESTIONS,
    payload,
  };
};

export const setProfileInfo = (payload) => {
  return {
    type: GET_USER_PROFILE,
    payload,
  };
};
export const setProfileFollowers = (payload) => {
  return {
    type: GET_USER_FOLLOWERS,
    payload,
  };
};

export const setProfileFollowing = (payload) => {
  return {
    type: GET_USER_FOLLOWING,
    payload,
  };
};
export const setTopicsForProfile = (payload) => {
  return {
    type: GET_USER_TOPICS,
    payload,
  };
};
export const setCommentsForProfile = (payload) => {
  return {
    type: GET_USER_COMMENTS,
    payload,
  };
};
export const setCurrentPageProfile = (payload) => {
  return {
    type: SET_USER_CURRENT_PAGE,
    payload,
  };
};

export const setProfileUsername = (payload) => {
  return {
    type: SET_USERNAME,
    payload,
  };
};

// notification
export const setNotificationData = (payload) => ({
  type: SET_NOTIFICATION,
  payload,
});

export const toggleNotification = () => ({
  type: TOGGLE_NOTIFICATION,
});

// broadcast reducers
export const toggleBroadcast = () => {
  return {
    type: OPEN_BROADCAST,
  };
};
export const togglePromotionPriceModal = () => {
  return {
    type: OPEN_PROMOTION_PRICE,
  };
};

export const setBroadcastTopicId = (payload) => {
  return { type: SET_BROADCAST_ELEMENT_ID, payload };
};

export const setPromotionCharge = (payload) => {
  return { type: SET_PROMOTION_CHARGE, payload: payload };
};

export const setAllPromotedPosts = (payload) => {
  return { type: SET_ALL_PROMOTED_POSTS, payload };
};

export const setActivePromotedPosts = (payload) => {
  return { type: SET_ACTIVE_PROMOTED_POSTS, payload };
};

export const refreshPromotedPosts = () => {
  return { type: REFRESH_PROMOTED_POSTS };
};

export const includePromotedPosts = (payload) => {
  return { type: INCLUDE_PROMOTED_POST, payload };
};

//groups
export const openModeratorModal = () => {
  return { type: OPEN_ADD_MODERATOR };
};

export const getCryptos = (status) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const cryptos = await axios.get(`${config.crypto}?status=${status}`, {
        headers: {
          "x-auth-token": token,
        },
      });

      dispatch({
        type: GET_CRYPTOS,
        payload: cryptos.data.data,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};
