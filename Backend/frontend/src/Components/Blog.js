import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getBlog, UpdatingBlog } from "../Redux/Actions/blogActions";
const Blog = ({ _id, userBlog, title, img, message }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const user = {
    isConnected: auth.isConnected,
    id: auth.user.id,
    role: auth.user.role,
  };
  function getBlogHanlder(_id) {
    navigate(`/UpdateBlog/${_id}`);
    console.log(_id);
  }
  const isAdmin =
    user.isConnected &&( user.id === userBlog._id || user.role === "ADMIN");
  const isOwner = user.isConnected && user.id === userBlog._id;

  return (
    <div>
      <h2>{title}</h2>
      <img src={img} alt={title} />
      <p>{message}</p>
      {isOwner && (
        <i className="fas fa-edit" onClick={() => getBlogHanlder(_id)}></i>
      )}
      {isAdmin && <button className="btn btn-outline-danger">Delete</button>}
    </div>
  );
};

export default Blog;
