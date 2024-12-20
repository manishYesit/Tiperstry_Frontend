import { GET_SITE, GET_TOPIC_FOR_SITE, GET_URL,GET_LANGUAGE, TOPIC_VIEW_TYPE, } from "../types";

const initialstate = {
  language: "en",
  site: null,
  page: 0,
  topics: [],
  total: 0,
  url: "",
  view: "compact"
  
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case GET_SITE:
      return Object.assign({}, state, {
        site: action.payload
      });
    case GET_LANGUAGE:
      return Object.assign({}, state, {
        language: action.payload
      });
    case GET_URL:
      return Object.assign({}, state, {
        url: action.payload
      });
    case GET_TOPIC_FOR_SITE:
      return Object.assign({}, state, {
        topics: action.payload.topics,
        page: action.payload.page,
        total: action.payload.total
      });
      case TOPIC_VIEW_TYPE:
      return Object.assign({}, state, {
        view: action.payload,
      });

    default:
      return state;
  }
}