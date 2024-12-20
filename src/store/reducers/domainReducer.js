import {
  MODAL_VERIFY_DOMAIN_OPEN,
  MODAL_ADD_DOMAIN_OPEN
} from "../types";

const initialstate = {
  openAddDomain:false,
  openVerifyDomain:false
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case MODAL_VERIFY_DOMAIN_OPEN:
      return Object.assign({}, state, {
        openVerifyDomain: !state.openVerifyDomain,
      });
    case MODAL_ADD_DOMAIN_OPEN:
      return Object.assign({}, state, {
        openAddDomain: !state.openAddDomain,
      });
    default:
      return state;
  }
};
