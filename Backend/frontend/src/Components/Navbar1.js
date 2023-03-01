import { Link } from "react-router-dom";
import "./StyleComp/Navbar.css";
import { Logout } from "../Redux/Actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Redux/Actions/profileActions";
import { useEffect } from "react";

export default function Navbar1({ user }) {
  const profiles = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  const LogoutHanlder = () => {
    dispatch(Logout());
  };
  useEffect(() => {
    const fetchProfile = async () => {
      await dispatch(getProfile());
    };
    fetchProfile();
  }, [dispatch]);
  return (
    <div className="top">
      <div className="topLeft">
        <Link className="navbar-brand link" to="/">
          MEMORIES
        </Link>
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fa-brands fa-linkedin"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          {user.role === "ADMIN" || user.role === "USER" ? (
            <>
              <li className="topListItem">
                <Link className="link" to="/">
                  HOME
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/blog">
                  WRITE
                </Link>
              </li>
              {user.role === "ADMIN" ? (
                <li className="topListItem">
                  <Link className="link" to="/admin">
                    ADMIN
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li className="topListItem">
                <Link className="link" to="#" onClick={LogoutHanlder}>
                  LOGOUT
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="topRight">
        {user.role === "ADMIN" || user.role === "USER" ? (
          <Link className="link" to="/Profile">
            <span className="text-black-50">{user.name} </span>
            <img
              className="topImg"
              src={profiles.profile.image? profiles.profile.image : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}
                 
                
          
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
