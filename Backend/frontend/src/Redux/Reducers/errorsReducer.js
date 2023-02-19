import { ERRORS } from "../types";

const intialeState = {};
export default function errorsReducer(state = intialeState, action) {
  switch (action.type) {
    case ERRORS:
      return action.payload;

    default:
      return state;
  }
}
