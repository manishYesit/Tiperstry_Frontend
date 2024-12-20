import {
  SET_NOTIFICATION,
  TOGGLE_NOTIFICATION
} from "../types";

const initialstate = {
  data: [],
  open: false,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case TOGGLE_NOTIFICATION:
      return Object.assign({}, state, {
        open: !state.open,
      });
    case SET_NOTIFICATION:
      return Object.assign({}, state, {
        data: action.payload,
      });
    default:
      return state;
  }
};
