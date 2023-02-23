import Blog from "../Components/Blog";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBlogs } from "../Redux/Actions/blogActions";

const Home = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBlogs = async () => {
      await dispatch(getBlogs());
      console.log(blogs.blogs);
      console.log(user);
    };
    fetchBlogs();
  }, []);
  return (
    <div className="container p-4 mt-4">
      <div className="row justify-content-evenly mt-4">
        <div className="col-lg-12 col-md-12 mt-4">
          <div className="d-flex">
            <i className="fa-solid fa-blog fs-1 mx-2"></i> <h2>Blogs list</h2>
          </div>
          <div
            className="shadow-lg p-3 mb-5 bg-body rounded"
            style={{ backgroundColor: "white" }}
          >
            <table className="table table-hover">
              
              <tbody>
                {blogs.blogs.map(({ _id, user, title, img, message }) => (
                  <Blog
                    _id={_id}
                    userBlog={user}
                    title={title}
                    img={img}
                    message={message}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
