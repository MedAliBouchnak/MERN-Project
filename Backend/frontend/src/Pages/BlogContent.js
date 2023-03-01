import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlog } from "../Redux/Actions/blogActions";
import { useNavigate } from "react-router-dom";
import { DeleteBlog } from "../Redux/Actions/blogActions";
import "./pagesStyles/blogContent.css";
// import { Link } from "react-router-dom";
import moment from "moment";
import Sidebar from "../Components/Sidebar";

const BlogContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const blogs = useSelector((state) => state.blogs);
  const user = {
    isConnected: auth.isConnected,
    id: auth.user.id,
    role: auth.user.role,
  };
  // const blog = {
  //   id: blogs.blog._id,
  //   userBlog:blogs.blog.user._id,
  //   title: blogs.blog.title,
  //   img: blogs.blog.img,
  //   message: blogs.blog.message,
  //   createdAt: blogs.blog.createdAt
  // };
  const timeSinceCreation = moment(blogs.blog.createdAt).fromNow();
  function getBlogHanlder(_id) {
    navigate(`/UpdateBlog/${_id}`);
    console.log(_id);
  }
  const DeleteHandler = (id) => {
    dispatch(DeleteBlog(id));
    navigate("/");
  };

  const { id } = useParams();
  // console.log("id of Url",id)
  useEffect(() => {
    const fetchBlog = async () => {
      await dispatch(getBlog(id));
      window.scrollTo(0, 0);
      // console.log(id);
      // console.log(isOwner);
      // console.log(blogs.blog.user._id);

      // console.log(blogs.blog.user.name);
    };
    fetchBlog();
  }, [dispatch, id]);
  const isAdmin =
    user.isConnected &&
    (user.id === blogs.blog.user._id || user.role === "ADMIN");
  const isOwner = user.isConnected && user.id === blogs.blog.user._id;
  console.log(user.id);
  console.log(blogs.blog.user._id);
  console.log("isOwner", isOwner);
  console.log("isAdmin", isAdmin);

  return (
    <div className="single" >
      <div className="singlePost">
        <div className="singlePostWrapper">
          <img
            className="singlePostImg"
            src={blogs.blog.img}
            alt={blogs.blog.title}
          />
          <h1 className="singlePostTitle">
            {blogs.blog.title}
            <div className="singlePostEdit">
              {isOwner && (
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => getBlogHanlder(blogs.blog._id)}
                ></i>
              )}
              {isAdmin && (
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={() => DeleteHandler(blogs.blog._id)}
                ></i>
              )} 
            </div>
          </h1>
          <div className="singlePostInfo">
            <span>
              Author:
              <b className="singlePostAuthor">{blogs.blog.user.name}</b>
            </span>
            <span>{timeSinceCreation}</span>
          </div>
          <p className="singlePostDesc">
            {blogs.blog.message}
            <br />
          </p>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default BlogContent;
