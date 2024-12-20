import { combineReducers } from "redux";
import topicReducer from "./topicReducer";
import userReducer from "./userReducer";
import giftReducer from "./giftReducer";
import commentReducer from "./commentReducer";
import profileReducer from "./profileReducer";
import groupReducer from "./groupReducer";
import siteReducer from "./siteReducer";
import notificationReducer from "./notificationReducer";
import broadcastReducer from "./broadcastReducer";
import searchReducer from "./searchReducer";
import domainReducer from "./domainReducer";
import youtubeChannelReducer from "./youtubeChannelReducer";
import cryptosReducer from "./cryptosReducer";

const appReducer = combineReducers({
  user: userReducer,
  topics: topicReducer,
  site: siteReducer,
  gift: giftReducer,
  comment: commentReducer,
  profile: profileReducer,
  notification: notificationReducer,
  search: searchReducer,
  domain: domainReducer,
  youtube: youtubeChannelReducer,
  broadcast: broadcastReducer,
  group: groupReducer,
  cryptos: cryptosReducer,
});

export default appReducer;
