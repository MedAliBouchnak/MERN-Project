import { DELETE_BLOGS, SET_BLOG, SET_BLOGS, UPDATE_BLOGS ,SET_USER_BLOGS} from "../types";

const intitialState = {
  blogs: [],
  blog: {},
};
export default function (state = intitialState, action) {
  switch (action.type) {
    case SET_BLOG:
      return {
        ...state,
        blog: state.blogs.find((p) => p._id === action.payload._id),
      };
      case SET_USER_BLOGS:
        return {
          ...state,
          blogs: state.blogs.find((p) => p.user._id === action.payload.user._id),
        };
    case SET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };

    case UPDATE_BLOGS:
      return {
        ...state,
        blog: state.blogs.find((p) => p._id === action.payload._id),
      };

    case DELETE_BLOGS:
      return {
        ...state,
        blogs: state.blogs.filter((p) => p._id !== action.payload),
      };
      
    default:
      return state;
  }
}
