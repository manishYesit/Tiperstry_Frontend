import {
  SET_USER_DATA,
  X_AUTH_TOKEN,
  MODAL_OPEN,
  MODAL_REPORT_OPEN,
  MODAL_SHARE_OPEN,
  MODAL_REPORT_COMMENT_OPEN,
  DELETE_TOPIC_DIALOG,
  GET_USER_SUGGESTIONS,
  GET_ALL_USERS,
  SEARCH_ALL_USERS,
  BAN_AND_UNBANUSER,
  REPORTED_USER,
  BAN_REPORTED_USER,
  DELETE_REPORT,
  GET_REPORTED_USERS,
  SET_USER_DOMAIN_DATA,
  SET_USER_CHANNEL_DATA,
  MODAL_SETTING_OPEN
} from "../types";

const initialstate = {
  user: null,
  token: null,
  open: false,
  report: false,
  reportComment: false,
  reportTopicId: null,
  share: false,
  title: "",
  topicId: null,
  suggestions: null,
  users: [],
  searchusers: [],
  reporteduser: null,
  reportedusers: [],
  setting: false
};

const UserReducer = (state = initialstate, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case X_AUTH_TOKEN:
      return Object.assign({}, state, {
        token: action.payload,
      });
    case GET_USER_SUGGESTIONS:
      return Object.assign({}, state, {
        suggestions: action.payload,
      });
    case MODAL_OPEN:
      return Object.assign({}, state, {
        open: !state.open,
      });
    case MODAL_SHARE_OPEN:
      return Object.assign({}, state, {
        share: !state.share,
        title: !state.share ? action.payload.title : "",
        topicId: !state.share ? action.payload.topicId : "",
      });
    case MODAL_REPORT_OPEN:
      return Object.assign({}, state, {
        report: !state.report,
        reportTopicId: action.payload,
      });
    case MODAL_REPORT_COMMENT_OPEN:
      return Object.assign({}, state, {
        reportComment: !state.reportComment,
        reportTopicId: action.payload,
      });
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case REPORTED_USER:
      return {
        ...state,
        reporteduser: action.payload,
      };
    case SEARCH_ALL_USERS:
      return {
        ...state,
        searchusers: action.payload,
      };
    case GET_REPORTED_USERS:
      return {
        ...state,
        reportedusers: action.payload,
      };
    case BAN_AND_UNBANUSER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id
            ? { ...user, deactivated: action.payload.deactivated }
            : user
        ),
      };
    case BAN_REPORTED_USER:
      return {
        ...state,
        reporteduser:
          state.reporteduser._id === action.payload._id
            ? { ...state.reporteduser, deactivated: action.payload.deactivated }
            : state.reporteduser,
      };
    case DELETE_REPORT:
      return {
        ...state,
        reportedusers: state.reportedusers.filter(
          (user) => user._id !== action.payload
        ),
      };
    case SET_USER_DOMAIN_DATA:
      return {
        ...state,
        user: { ...state.user, website: action.payload },
      };

    case SET_USER_CHANNEL_DATA:
      return {
        ...state,
        user: { ...state.user, youtube: action.payload },
      };
    case MODAL_SETTING_OPEN:
      return Object.assign({}, state, {
        setting: !state.setting,
      });
    default:
      return state;
  }
};

export default UserReducer;
