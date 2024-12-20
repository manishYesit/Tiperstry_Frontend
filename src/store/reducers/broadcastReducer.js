import {
  OPEN_BROADCAST,
  SET_BROADCAST_ELEMENT_ID,
  SET_PROMOTION_CHARGE,
  OPEN_PROMOTION_PRICE,
  SET_ALL_PROMOTED_POSTS,
  SET_ACTIVE_PROMOTED_POSTS,
  REFRESH_PROMOTED_POSTS,
} from "../types";

import { config } from "../../../config";

const initialstate = {
  open: false,
  topicId: null,
  type: null,
  promotionCharge: { price: 50, currency: "dogecoincash" },
  openPromotionPrice: false,
  activePromotedPosts: [],
  allPromotedPosts: [],
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case OPEN_BROADCAST:
      return Object.assign({}, state, {
        open: !state.open,
      });
    case OPEN_PROMOTION_PRICE:
      return Object.assign({}, state, {
        openPromotionPrice: !state.openPromotionPrice,
      });
    case SET_BROADCAST_ELEMENT_ID:
      return Object.assign({}, state, {
        topicId: action.payload,
      });

    case SET_PROMOTION_CHARGE:
      return Object.assign({}, state, {
        promotionCharge: action.payload,
      });
    case SET_ALL_PROMOTED_POSTS:
      return Object.assign({}, state, {
        allPromotedPosts: action.payload,
      });

    case SET_ACTIVE_PROMOTED_POSTS:
      return Object.assign({}, state, {
        activePromotedPosts: action.payload,
      });

    case REFRESH_PROMOTED_POSTS:
      const allPosts = getAllPromotedPosts();
      const activePosts = getActivePromotedPosts();
      return Object.assign({}, state, {
        activePromotedPosts: activePosts,
        allPromotedPosts: allPosts,
      });

    default:
      return state;
  }
};

async function getAllPromotedPosts() {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(config.allPromotedPost, {
      headers: { "x-auth-token": token },
    });
    // dispatch(setAllPromotedPosts(response.data.payload));
    return response.data.payload;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getActivePromotedPosts() {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(config.promotedPost, {
      headers: { "x-auth-token": token },
    });
    // dispatch(setAllPromotedPosts(response.data.payload));
    return response.data.payload;
  } catch (error) {
    console.log(error);
    return [];
  }
}
