import { SET_BLOG, SET_BLOGS, UPDATE_BLOGS } from "../types";

const intitialState = {
  blogs: [],
  blog: {},
};
export default function (state = intitialState, action) {
  switch (action.type) {
    case SET_BLOG:
      return {
        ...state,
        blog: state.blogs.find(p =>p._id === action.payload._id ),
      }; 
    case SET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case UPDATE_BLOGS:
      return {
        ...state,
        blog: state.blogs.find(p =>p._id === action.payload._id ),
      }
    default:
      return state;
  }
}
