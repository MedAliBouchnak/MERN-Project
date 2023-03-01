import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Inputs from "../Components/Inputs";
import Classnames from "classnames";
import { AddBlog } from "../Redux/Actions/blogActions";

const CreateBlog = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const [message, setMessage] = useState("");
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
    dispatch(AddBlog(form, setMessage, setShow, navigate));
  };

  return (
    <div>
    <div className="container p-4 mt-4">
      <div
        className="alert alert-success"
        role="alert"
        style={{ display: show ? "block" : "none" }}
      > {message}
      </div>
      <div className="row justify-content-evenly mt-4">
        <div className="col-lg-6 col-md-12 mt-4">
          <div className="d-flex">
            <i className="fa-solid fa-blog fs-1 mx-2"></i> <h2>New Blog</h2>
          </div>
          <div
            className="p-6 shadow-lg p-3 mb-5 bg-body rounded"
            style={{ backgroundColor: "white" }}
          >
            <form onSubmit={onSubmit}>
              
              <Inputs
                name="title"
                label="Title"
                type="text"
                onChangeHandler={onChangeHandler}
                errors={errors.title}
              />

              <Inputs
                name="img"
                label="Image URL"
                type="text"
               
                onChangeHandler={onChangeHandler}
                errors={errors.img}
              />

              <div className=" mb-3">
                <label className="form-label">Message</label>
                <div className="input-group">
                  <textarea
                    type="text"
                    className={Classnames("form-control", {
                      "is-invalid": errors.message,
                    })}
                    name="message"
                    onChange={onChangeHandler}
                   
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-primary">
                  Publish <i className="fa-sharp fa-solid fa-blog"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    
    </div>
  );
};

export default CreateBlog;
