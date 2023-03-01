const express = require("express");
const mongoose = require("mongoose");

const {
  Register,
  Login,
  User,
  Admin,
} = require("../Controllers/usersControllers");
var router = express.Router();
const passport = require("passport");
const { ROLES, inRole } = require("../Security/RoleMiddleware");
const {
  AddProfile,
  FindAllProfiles,
  FindSingleProfile,
  DeleteProfile,
} = require("../Controllers/profileControllers");
const {
  AddBlog,
  FindAllBlogs,
  FindSingleBlog,
  FindAllBlogsByUserId,
  DeleteBlog,
  UpdateBlog,
  LikeBlog,
} = require("../Controllers/blogController");

/*******************************************Users routes*******************************************/
router.post("/register", Register);
router.post("/login", Login);

/****************************************Profile routes********************************************/
//Add profile route
router.post(
  "/Profiles",
  passport.authenticate("jwt", { session: false }),
  AddProfile
);
//Get all profiles
router.get(
  "/Profiles",
  passport.authenticate("jwt", { session: false }),
  inRole(ROLES.ADMIN),
  FindAllProfiles
);
//Get one profile
router.get(
  "/Profile",
  passport.authenticate("jwt", { session: false }),
  FindSingleProfile
);
//Delete Profile
router.delete(
  "/Profiles/:id",
  passport.authenticate("jwt", { session: false }),
  inRole(ROLES.ADMIN),
  DeleteProfile
);

/************************************Posts Routes**********************************************/
// Get all blog
router.get("/Blogs", FindAllBlogs);
// Get all user blog
router.get(
  "/ProfileBlogs",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/login",
  }),
  FindAllBlogsByUserId
);
//Get a single blog
router.get("/Blog/:id", FindSingleBlog);

//Create a Blog
router.post(
  "/Blog",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/login",
  }),
  AddBlog
);
//Update a blog
router.patch(
  "/Blog/:id",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/login",
  }),
  UpdateBlog
);

//Delete a blog
router.delete(
  "/Blogs/:id",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/login",
  }),

  DeleteBlog
);

//Update blog Likes
router.patch(
  "/:id/likePost",
  passport.authenticate("jwt", { session: false }),
  LikeBlog
);
module.exports = router;
