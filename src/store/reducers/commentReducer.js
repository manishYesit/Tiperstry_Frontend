import {
  TOGGLE_COMMENT,
  GET_COMMENTS,
  SET_CURRENT_COMMENT_PAGE,
  DELETE_COMMENT
} from "../types";

const initialstate = {
  currentPage: 1,
  page: 0,
  content: "",
  comments: [],
  openComment: false,
  type: null,
  commentId: null,
  topicId: null
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return Object.assign({}, state, {
        // comments: action.payload.comments,
        // page: action.payload.page,
        // total: action.payload.total
        comments: action.payload
      });
    case TOGGLE_COMMENT:
      return Object.assign({}, state, {
        ...action.payload
      });
      // return Object.assign({}, state, {
      //   openComment: action.payload.openComment,
      //   commentId: action.payload.commentId,
      //   username: action.payload.username,
      //   type: action.payload.type,
      //   topicId: action.payload.topicId
      // });
    case SET_CURRENT_COMMENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.payload
      });
      case DELETE_COMMENT:
        return {
            ...state,
          comments: state.comments.filter((user)=> user._id !== action.payload)
        }
    default:
      return state;
  }
}