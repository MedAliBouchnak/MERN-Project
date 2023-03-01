import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import Profile from "./Pages/Profile";
// import Navbar from "./Components/Navbar";
import Navbar1 from "./Components/Navbar1";
import NotFound from "./Pages/NotFound";
import NoAccess from "./Pages/NoAccess";
import PrivateRouter from "./Components/PrivateRouter";
import AdminRouter from "./Components/AdminRouter";
import ForceRedirect from "./Components/ForceRedirect";
import { Logout, setUser } from "./Redux/Actions/authActions";

import store from "./Redux/store";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { setAuth } from "./util/setAuth";
import Home from "./Pages/Home";
import CreateBlog from "./Pages/CreateBlog";
import UpdateBlog from "./Pages/UpdateBlog";
import BlogContent from "./Pages/BlogContent";
import UserBlogs from "./Pages/UserBlogs";
//keep user connected
if (window.localStorage.jwt) {
  const decode = jwt_decode(localStorage.jwt);
  store.dispatch(setUser(decode));
  setAuth(window.localStorage.jwt);
  //Logout the user after usage time expires
  const currentDate = Date.now / 1000;
  if (decode.exp > currentDate) {
    store.dispatch(Logout());
  }
}
function App() {
  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
    name: auth.user.name,
    id: auth.user.id,
  };
  return (
    <BrowserRouter>
      <div className="bg-light" style={{ height: "100vh" }}>
        {/* <Navbar user={user} /> */}
        <Navbar1 user={user} />
        <Routes>
          <Route
            path="/profile"
            element={
              <PrivateRouter user={user}>
                <Profile />
              </PrivateRouter>
            }
          />
          <Route
            path="/blog"
            element={
              <PrivateRouter user={user}>
                <CreateBlog />
              </PrivateRouter>
            }
          />
          <Route
            path="/UpdateBlog/:id"
            element={
              <PrivateRouter user={user}>
                <UpdateBlog />
              </PrivateRouter>
            }
          />
          <Route
            path="/profileBlogs"
            element={
              <PrivateRouter user={user}>
                <UserBlogs />
              </PrivateRouter>
            }
          />
          <Route path="/blog/:id" element={<BlogContent />} />
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/login"
            element={
              <ForceRedirect user={user}>
                <Login />
              </ForceRedirect>
            }
          />
          <Route
            path="/register"
            element={
              <ForceRedirect user={user}>
                <Register />
              </ForceRedirect>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRouter user={user}>
                <Admin />
              </AdminRouter>
            }
          />

          <Route path="*" element={<NotFound />} />
          <Route path="/noaccess" element={<NoAccess />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
