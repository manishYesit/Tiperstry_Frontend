import {
  X_AUTH_TOKEN,
  BOT_MODAL_SETTING_OPEN
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

const BotReducer = (state = initialstate, action) => {
  switch (action.type) {
    case X_AUTH_TOKEN:
      return Object.assign({}, state, {
        token: action.payload,
      });
    case BOT_MODAL_SETTING_OPEN:
      return Object.assign({}, state, {
        setting: !state.setting,
      });
    default:
      return state;
  }
};

export default BotReducer;