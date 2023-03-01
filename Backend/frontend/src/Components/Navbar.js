import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../Redux/Actions/authActions";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const LogoutHanlder = () => {
    dispatch(Logout());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MEMORIES
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user.role === "ADMIN" ? (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin"
                >
                  Admin
                </Link>
              </li>
            ) : (
              ""
            )}

            {user.role === "ADMIN" || user.role === "USER" ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/blog"
                  >
                    Blog
                  </Link>
                </li>
                {/* <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/profileBlogs">
                  Profile blogs
                </Link>
              </li> */}
              </>
            ) : (
              ""
            )}
          </ul>
          <div className="d-flex">
            <div className="mx-4">
              {!user.isConnected ? (
                <>
                  <Link className="btn btn-outline-primary" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-outline-primary" to="/register">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-black-50">{user.name} </span>
                  <Link
                    className="btn btn-outline-primary"
                    to="#"
                    onClick={LogoutHanlder}
                  >
                    Logout
                  </Link>{" "}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
