import {
  GET_TOPICS,
  SET_CURRENT_PAGE,
  SET_SINGLE_TOPIC,
  TOPIC_VIEW_TYPE,
  TOPIC_SORT_FILTER,
  TOGGLE_LOADING,
  EDIT_TOPIC,
  DELETE_COMMENT,
  INCLUDE_PROMOTED_POST,
  UPDATE_COMMENT_COUNT,
} from "../types";

const initialstate = {
  currentPage: 1,
  page: 0,
  topics: [],
  total: 0,
  singleTopic: null,
  view: "compact",
  sort: "home",
  filter: "week",
  loading: false,
  // edit: false,
  // editValue: null,
};

const getRandomValue = (list) => {
  const value = list[Math.floor(Math.random() * list.length)];
  value.post.promoted = true;
  return value.post;
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case GET_TOPICS:
      return Object.assign({}, state, {
        topics: action.payload.topics,
        page: action.payload.page,
        total: action.payload.total,
      });
    case SET_CURRENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.payload,
      });
    case SET_SINGLE_TOPIC:
      return Object.assign({}, state, {
        singleTopic: action.payload,
      });
    case TOPIC_VIEW_TYPE:
      return Object.assign({}, state, {
        view: action.payload,
      });
    case TOPIC_SORT_FILTER:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case TOGGLE_LOADING:
      return Object.assign({}, state, {
        loading: action.payload,
      });
    case UPDATE_COMMENT_COUNT:
      return Object.assign({}, state, {
        singleTopic: {
          ...state.singleTopic,
          commentsCount: state.singleTopic.commentsCount - action.payload,
        },
      });

    case INCLUDE_PROMOTED_POST:
      if (action.payload.length <= 0) {
        return state;
      }

      //take two
      let newTopics = [...state.topics];

      if (state.topics.length > 2) {
        const start = 1;
        if (newTopics[start].promoted != true) {
          newTopics.splice(start, 0, getRandomValue(action.payload));
        }
      }

      if (state.topics.length >= 10) {
        const start = 9;
        if (newTopics[start].promoted != true) {
          newTopics.splice(start, 0, getRandomValue(action.payload));
        }
      }

      //take one
      // const newTopics = state.topics.map((topic, index) => {
      //   if (index == 1 || index == 9) {
      //     const value = getRandomValue(action.payload);
      //     return value;
      //   }
      //   return topic;
      // });

      return Object.assign({}, state, {
        topics: newTopics,
      });
      break;
    // case EDIT_TOPIC:
    //   return Object.assign({}, state, {
    //     ...action.payload
    //   });
    default:
      return state;
  }
};
