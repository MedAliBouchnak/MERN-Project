import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Inputs from "../Components/Inputs";
import Classnames from "classnames";
import { getBlog, UpdatingBlog } from "../Redux/Actions/blogActions";

const UpdateBlog = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const blogs = useSelector((state) => state.blogs);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
     dispatch(UpdatingBlog(form,id, setMessage, setShow, navigate));
  };
  useEffect(() => {
    const fetchBlog = async () => {
      
      await dispatch(getBlog(id));
      console.log(id)
      // console.log(blogs.blog)
      setForm(blogs.blog);
    };
    fetchBlog();
  }, [id]);

  return (
    <div className="container p-4 mt-4">
      <div
        className="alert alert-success"
        role="alert"
        style={{ display: show ? "block" : "none" }}>
        {message}
      </div>
      <div className="row justify-content-evenly mt-4">
        <div className="col-lg-6 col-md-12 mt-4">
          <div className="d-flex">
            <i className="fa-solid fa-blog fs-1 mx-2"></i> <h2>Update Blog</h2>
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
                value={form && form.title ? form.title : ""}
                onChangeHandler={onChangeHandler}
                errors={errors.title}
              />

              <Inputs
                name="img"
                label="Image URL"
                type="text"
                value={form && form.img ? form.img : ""}
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
                    value={form && form.message ? form.message : ""}
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
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


export default UpdateBlog;
