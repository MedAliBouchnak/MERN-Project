import axios from "axios";
import { ERRORS, SET_PROFILE, DELETE_PROFILE, SET_PROFILES } from "../types";
export const AddProfile =
  (form, setShow, navigate) => (dispatch) => {
    axios
      .post("/api/profiles", form)
      .then((res) => {
        //this part of code doesn't work for some reason until now
        setShow(true);

        dispatch({
          type: ERRORS,
          payload: {},
        });
        setTimeout(() => {
          setShow(false);
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        dispatch({
          type: ERRORS,
          payload: err.response.data,
        });
      });
  };
export const getProfile = () => (dispatch) => {
  //need to
  axios
    .get("/api/profile")
    .then((res) => {
      dispatch({
        type: SET_PROFILE,
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
export const getProfiles = () => (dispatch) => {
  axios
    .get("/api/profiles")
    .then((res) => {
      dispatch({
        type: SET_PROFILES,
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

export const DeleteProfile = (id) => (dispatch) => {
  if (window.confirm("Are you sure to delete this user?")) {
    axios
      .delete(`/api/profiles/${id}`)
      .then((res) => {
        dispatch({
          type: DELETE_PROFILE,
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
