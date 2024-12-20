import { MODAL_VERIFY_YOUTUBE_OPEN } from "../types";

const initialstate = {
  openVerifyChannel: false,
};

const youtubeReducer = (state = initialstate, action) => {
  switch (action.type) {
    case MODAL_VERIFY_YOUTUBE_OPEN:
      return Object.assign({}, state, {
        openVerifyChannel: !state.openVerifyChannel,
      });

    default:
      return state;
  }
};

export default youtubeReducer;
