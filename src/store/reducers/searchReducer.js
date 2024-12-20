import { GET_SEARCH } from "../types";

const initialstate = {
  data: {}
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case GET_SEARCH:
      return Object.assign({}, state, {
        data: action.payload
      });
    default:
      return state;
  }
}