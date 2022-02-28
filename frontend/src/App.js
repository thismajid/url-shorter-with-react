import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { authorize } from "./services/authorize";
import { UserRoute, AdminRoute } from "./components/ProtectedRoute";
import Redirecting from "./components/Redirecting";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Url from "./components/Url/Url";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Profile from "./components/Dashboard/Profile/Profile";
import Avatar from "./components/Dashboard/Profile/Avatar/Avatar";
import AdminUrls from "./components/Dashboard/Admin/AdminUrls/AdminUrls";
import MainPage from "./components/Dashboard/MainPage/MainPage";
import ManageUsers from "./components/Dashboard/Admin/ManageUsers/ManageUsers";

function App() {
  const { logginUser, token } = authorize();

  const [isAuthenticated, setIsAuthenticated] = useState(
    token && token.length > 0
  );
  const [user, setUser] = useState();

  useEffect(() => {
    if (token) {
      setUser(logginUser);
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
        <UserRoute
          path="/dashboard"
          exact
          component={MainPage}
          isAuthenticated={isAuthenticated}
          user={logginUser}
        />

        <UserRoute
          path="/profile/avatar"
          exact
          component={Avatar}
          isAuthenticated={isAuthenticated}
          user={logginUser}
        />

        <UserRoute
          path="/profile"
          exact
          component={Profile}
          isAuthenticated={isAuthenticated}
          user={logginUser}
        />

        <AdminRoute
          path="/admin/urls"
          exact
          component={AdminUrls}
          isAuthenticated={isAuthenticated}
          user={logginUser}
        />

        <AdminRoute
          path="/admin/users"
          exact
          component={ManageUsers}
          isAuthenticated={isAuthenticated}
          user={logginUser}
        />

        <UserRoute exact path="/logout" isAuthenticated={isAuthenticated} />
        <Route path="/" exact component={HomePage} />
        <Route path="/:shortname" component={Url} />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
