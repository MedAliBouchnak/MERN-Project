import axios from "axios";
import {
  DELETE_BLOGS,
  ERRORS,
  SET_BLOG,
  SET_BLOGS,SET_USER_BLOGS,
  UPDATE_BLOGS,
} from "../types";

export const AddBlog = (form, setMessage, setShow, navigate) => (dispatch) => {
  axios
    .post("/api/Blog", form)
    .then((res) => {
      console.log(res.data);
      setShow(true);
      setMessage("Blog added with success");
      dispatch({
        type: ERRORS,
        payload: {},
      });
      setTimeout(() => {
        setShow(false);
        navigate("/");
      }, 2000);
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};
export const UpdatingBlog =
  (form, id, setMessage, setShow, navigate) => async (dispatch) => {
    try {
      const res = await axios.patch(`/api/Blog/${id}`, form);
      dispatch({
        type: UPDATE_BLOGS,
        payload: res.data, // Include the user ID in the payload
      });
      dispatch({
        type: ERRORS,
        payload: {},
      });
      setMessage("Blog updated with success");
      setShow(true);
      setTimeout(() => {
        setShow(false);
        navigate("/");
      }, 3000);
      //
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
export const getUserBlogs = () => (dispatch) => {
  axios
    .get("/api/ProfileBlogs")
    .then((res) => {
      dispatch({
        type: SET_USER_BLOGS,
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
export const DeleteBlog = (id) => (dispatch) => {
  if (window.confirm("Are you sure to delete this blog?")) {
    axios
      .delete(`/api/Blogs/${id}`)
      .then((res) => {
        dispatch({
          type: DELETE_BLOGS,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: ERRORS,
          payload: err.response.data,
        });
      });
  }
};
