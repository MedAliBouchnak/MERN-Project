import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import NotFound from "./Pages/NotFound";
import NoAccess from "./Pages/NoAccess";
import PrivateRouter from "./Components/PrivateRouter";
import AdminRouter from "./Components/AdminRouter";
import ForceRedirect from "./Components/ForceRedirect";
function App() {
  const user = {
    isConnected: false,
    role: "USER",
  };
  return (
    <BrowserRouter>
      <div className="bg-light" style={{ height: "100vh" }}>
        <Navbar user={user} />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRouter user={user}>
                <Profile />
              </PrivateRouter>
            }
          />

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
