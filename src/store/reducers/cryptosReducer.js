import { GET_CRYPTOS, OPEN_CRYPTO_PRICE, UPDATE_CRYPTO_PRICE } from "../types";

import { config } from "../../../config";

const initialstate = {
  open: false,
  cryptos: [],
  cryptoPrice: {
    creationFee: 1000,
    coinType: "dogecoincash",
    membersWithdrawalFee: 10,
  },
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case OPEN_CRYPTO_PRICE:
      return Object.assign({}, state, {
        open: !state.open,
      });

    case GET_CRYPTOS:
      return Object.assign({}, state, {
        cryptos: action.payload,
      });

    case UPDATE_CRYPTO_PRICE:
      return Object.assign({}, state, {
        cryptoPrice: action.paylad,
      });

    default:
      return state;
  }
};
