import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute";
import Redirecting from "./components/Redirecting";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Url from "./components/Url/Url";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Profile from "./components/Dashboard/Profile/Profile";
import Avatar from "./components/Dashboard/Profile/Avatar/Avatar";
import AdminUrls from "./components/Dashboard/AdminUrls/AdminUrls";
import MainPage from "./components/Dashboard/MainPage/MainPage";

function App() {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(
    token && token.length > 0
  );

  const [user, setUser] = useState();
  const [admin, setAdmin] = useState();

  useEffect(() => {
    if (token) {
      const logginUser = jwt_decode(token);
      setUser(logginUser);
      if (logginUser.role === "admin") {
        setAdmin(logginUser);
      }
    }
  }, [!isAuthenticated]);

  const onClickLogout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  };

  return (
    <div className="App">
      <Navbar
        onClickLogout={onClickLogout}
        auth={isAuthenticated}
        user={user}
      ></Navbar>
      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <>
              {isAuthenticated ? (
                <Redirecting to="/" />
              ) : (
                <Login
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                  setUserInfo={setUser}
                />
              )}
            </>
          )}
        />
        <Route
          path="/register"
          render={(props) => (
            <>
              {isAuthenticated ? (
                <Redirecting to="/" />
              ) : (
                <Register {...props} />
              )}
            </>
          )}
        />
        <ProtectedRoute
          path="/dashboard"
          exact
          component={MainPage}
          isAuthenticated={isAuthenticated}
          user={user}
        />

        <ProtectedRoute
          path="/profile/avatar"
          exact
          component={Avatar}
          isAuthenticated={isAuthenticated}
          user={user}
        />

        <ProtectedRoute
          path="/profile"
          exact
          component={Profile}
          isAuthenticated={isAuthenticated}
          user={user}
        />

        <ProtectedRoute
          path="/admin/urls"
          exact
          component={AdminUrls}
          isAuthenticated={isAuthenticated && admin}
          user={user}
        />

        <ProtectedRoute
          exact
          path="/logout"
          isAuthenticated={isAuthenticated}
        />
        <Route path="/" exact component={HomePage} />
        <Route path="/:shortname" component={Url} />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
