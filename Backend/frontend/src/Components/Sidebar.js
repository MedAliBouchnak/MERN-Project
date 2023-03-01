import React from "react";
import { Link } from "react-router-dom";
import "./StyleComp/sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">OUR SPONSOR</span>
        <img
          src="data:image/png;base64,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"
          alt=""
        />
        <p>
          GoMyCode is an educational platform that trains talents on the newest
          technologies and connects them with tech opportunities around the
          world. GoMyCode has started a new concept; a blended experience that
          allows people to learn the newest technologies in the best ways
          possible.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">TRAININGS</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Life">
              Web
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Music">
              Design
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Sport">
              Marketing
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Style">
              Game
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Tech">
              Systeme
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Cinema">
              Data
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <Link to="https://www.facebook.com/gomycode/">
            <i className="sidebarIcon fab fa-facebook-square"></i>
          </Link>
          <Link to="https://www.linkedin.com/school/go-my-code/">
            <i class="sidebarIcon fa-brands fa-linkedin"></i>
          </Link>
          <Link to="https://www.youtube.com/c/GoMyCode/videos">
            <i class="sidebarIcon fa-brands fa-youtube"></i>
          </Link>
          <Link to="https://www.instagram.com/gomycode/">
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </Link>
          <Link to="https://twitter.com/gomycode?lang=en">
            <i className="sidebarIcon fab fa-twitter-square"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
