import isEmpty from "../../util/isEmpty";
import { SET_USER } from "../types";

const intialeState = {
  isConnected: false,
  user: {},
};
export default function authReducer(state = intialeState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isConnected: !isEmpty(action.payload),
        user: action.payload,
      };

    default:
      return state;
  }
}
