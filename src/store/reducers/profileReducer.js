import {
  GET_USER_TOPICS,
  GET_USER_COMMENTS,
  GET_USER_PROFILE,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
  SET_USER_CURRENT_PAGE,
  SET_USERNAME
} from "../types";

const initialstate = {
  topicCurrentPage: 1,
  topicPage: 0,
  topics: [],
  topicTotal: 0,
  user: null,
  commentCurrentPage: 1,
  commentPage: 0,
  comments: [],
  commentTotal: 0,
  followers: [],
  following: [],
  username: null
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case GET_USER_TOPICS:
      return Object.assign({}, state, {
        topics: action.payload.topics,
        topicPage: action.payload.topicPage,
        topicTotal: action.payload.topicTotal
      });
    case GET_USER_COMMENTS:
      return Object.assign({}, state, {
        comments: action.payload.comments,
        commentPage: action.payload.commentPage,
        commentTotal: action.payload.commentTotal
      });
    case SET_USER_CURRENT_PAGE:
      return Object.assign({}, state, {
        [action.payload.page]: action.payload.pageNo
      });
    case GET_USER_PROFILE:
      return Object.assign({}, state, {
        user: action.payload
      });
    case GET_USER_FOLLOWERS:
      return Object.assign({}, state, {
        followers: action.payload
      });
    case GET_USER_FOLLOWING:
      return Object.assign({}, state, {
        following: action.payload
      });
    case SET_USERNAME:
      return Object.assign({}, state, {
        username: action.payload
      });
    default:
      return state;
  }
}