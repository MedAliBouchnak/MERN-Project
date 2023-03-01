import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Inputs from "../Components/Inputs";
import Classnames from "classnames";
import { AddProfile, getProfile } from "../Redux/Actions/profileActions";

const Profile = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const profiles = useSelector((state) => state.profiles);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(AddProfile(form, setShow, navigate));
  };
  useEffect(() => {
    const fetchProfile = async () => {
      await dispatch(getProfile());
      setForm(profiles.profile);
    };
    fetchProfile();
  }, [dispatch, profiles.profile]);

  return (
    <div className="container p-4 mt-4">
      <div
        className="alert alert-success"
        role="alert"
        style={{ display: show ? "block" : "none" }}
      >
        User added with success
      </div>
      <div className="row justify-content-evenly mt-4">
        <div className="col-lg-6 col-md-12 mt-4">
          <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i> <h2>Profile</h2>
          </div>
          <div
            className="p-6 shadow-lg p-3 mb-5 bg-body rounded"
            style={{ backgroundColor: "white" }}
          >
            <form onSubmit={onSubmit}>
              <Inputs
                name="PhoneNum"
                label="Telephone"
                type="text"
                value={form && form.PhoneNum ? form.PhoneNum : ""}
                onChangeHandler={onChangeHandler}
                errors={errors.PhoneNum}
              />
              <Inputs
                name="City"
                label="City"
                type="text"
                value={form && form.City ? form.City : ""}
                onChangeHandler={onChangeHandler}
                errors={errors.City}
              />
              <Inputs
                name="Country"
                label="Country"
                type="text"
                value={form && form.Country ? form.Country : ""}
                onChangeHandler={onChangeHandler}
                errors={errors.Country}
              />
              <Inputs
                name="Bio"
                label="Bio"
                type="text"
                value={form && form.Bio ? form.Bio : ""}
                onChangeHandler={onChangeHandler}
                errors={errors.Bio}
              />
              <Inputs
                name="postalCode"
                label="Postal code"
                type="text"
                value={form && form.postalCode ? form.postalCode : ""}
                onChangeHandler={onChangeHandler}
                errors={errors.postalCode}
              />
              <Inputs
                name="image"
                label="Profile Image"
                type="text"
                value={form && form.image ? form.image : ""}
                onChangeHandler={onChangeHandler}
                errors={errors.image}
              />

              <div className=" mb-3">
                <label className="form-label">Address</label>
                <div className="input-group">
                  <textarea
                    type="text"
                    className={Classnames("form-control", {
                      "is-invalid": errors.Address,
                    })}
                    name="Address"
                    onChange={onChangeHandler}
                    value={form && form.Address ? form.Address : ""}
                  ></textarea>
                  {errors.Address && (
                    <div className="invalid-feedback">{errors.Address}</div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-primary">
                  Update <i className="fa-solid fa-floppy-disk"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
