// import React from 'react'

// const BlogContent = () => {
//   return (
//     <div>BlogContent</div>
//   )
// }

// export default BlogContent
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlog } from "../Redux/Actions/blogActions";

const BlogContent = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const { id } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      await dispatch(getBlog(id));
      //   console.log(id);
      console.log(blogs.blog);
    };
    fetchBlog();
  }, [id]);

  return (
    <div className="container p-4 mt-4">
      <h1>{blogs.blog.title}</h1>
      <img
        src={blogs.blog.img}
        className=" shadow-lg card-img-top"
        style={{ width: "200px" }}
        alt={blogs.blog.title}
      />
      <h1>{blogs.blog.message}</h1>
    </div>
  );
};

export default BlogContent;
