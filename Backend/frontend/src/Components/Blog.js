import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteBlog } from "../Redux/Actions/blogActions";
import { Link } from "react-router-dom";

const Blog = ({ _id, userBlog, title, img, message }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = {
    isConnected: auth.isConnected,
    id: auth.user.id,
    role: auth.user.role,
  };
  function getBlogHanlder(_id) {
    navigate(`/UpdateBlog/${_id}`);
    console.log(_id);
  }
  const DeleteHandler = (id) => {
    dispatch(DeleteBlog(id));
  };
  const isAdmin =
    user.isConnected && (user.id === userBlog._id || user.role === "ADMIN");
  const isOwner = user.isConnected && user.id === userBlog._id;

  return (
    <div>
      <div class="card" style={{ width: "18rem" }}>
        <img src={img} className=" shadow-lg card-img-top" alt={title} />
        <div className="card-body">
        <Link to={`/Blog/${_id}`}>
  <h5 className="card-title">{title}</h5>
</Link>
          
        </div>

        <div class="card-body">
          {isOwner && (
            <i className="fas fa-edit " onClick={() => getBlogHanlder(_id)}></i>
          )}
          {isAdmin && (
            <button
              className="btn btn-outline-danger"
              onClick={() => DeleteHandler(_id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
