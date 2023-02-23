import axios from "axios";
import { ERRORS, SET_BLOG, SET_BLOGS, UPDATE_BLOGS } from "../types";

export const AddBlog = (form) => (dispatch) => {
  axios
    .post("/api/Blog", form)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};
export const UpdatingBlog =(form,id, setMessage, setShow, navigate) => async (dispatch) => {
    try {
      const res = await axios.patch(`/api/Blog/${id}`, form);
      dispatch({
        type: UPDATE_BLOGS,
        payload:res.data, // Include the user ID in the payload
      });
      setMessage("Blog updated with success");
      setShow(true);
      navigate('/');
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    }
  };

export const getBlog = (id) => (dispatch) => {
  axios
    .get(`/api/Blog/${id}`)
    .then((res) => {
      dispatch({
        type: SET_BLOG,
        payload: res.data
      });
    })
    .catch((err) =>
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      })
    );
};
export const getBlogs = () => (dispatch) => {
  axios
    .get("/api/Blogs")
    .then((res) => {
      dispatch({
        type: SET_BLOGS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      })
    );
};
