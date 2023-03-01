import React from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import moment from "moment";
import "./StyleComp/blog.css";
const Blog = ({ _id, userBlog, title, img, message, createdAt }) => {
  const timeSinceCreation = moment(createdAt).fromNow();
  return (
    <div>
     
      <div className="post">
        <Link to={`/Blog/${_id}`}>
          <img className="postImg" src={img} alt={title} />
        </Link>
        <div className="postInfo">
          <div className="postCats">
            <span className="postCat">Auther:</span>
            <span className="postCat">{userBlog.name}</span>
            
          </div>
          <span className="postTitle">
            <Link to={`/Blog/${_id}`} className="link">
              {title}
            </Link>
          </span>
          <hr />
          <span className="postDate">{timeSinceCreation}</span>
        </div>
        <p className="postDesc">{message}</p>
      </div>
    </div>
  );
};

export default Blog;
