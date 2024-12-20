import {
  OPEN_ADD_MODERATOR,
  ADD_MODERATOR_DETAILS,
  SET_ELEMENT_ID,
  SET_GIFT_TYPE,
} from "../types";

const initialstate = {
  openModerator: false,
  addModeratorDetails: { moderatorId: "", groupId: "", percentage: 0 },
  type: null,
};

const groupReducer = (state = initialstate, action) => {
  switch (action.type) {
    case OPEN_ADD_MODERATOR:
      return Object.assign({}, state, {
        openModerator: !state.openModerator,
      });
    case ADD_MODERATOR_DETAILS:
      return Object.assign({}, state, {
        addModerator: { ...action.payload },
      });
    case SET_GIFT_TYPE:
      return Object.assign({}, state, {
        type: action.payload,
      });
    default:
      return state;
  }
};

export default groupReducer;
