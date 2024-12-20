import { OPEN_GIFT, SET_ELEMENT_ID, SET_GIFT_TYPE } from "../types";

const initialstate = {
  open: false,
  elementId: null,
  type: null
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case OPEN_GIFT:
      return Object.assign({}, state, {
        open: !state.open
      });
    case SET_ELEMENT_ID:
      return Object.assign({}, state, {
        elementId: action.payload
      });
    case SET_GIFT_TYPE:
      return Object.assign({}, state, {
        type: action.payload
      });
    default:
      return state;
  }
}