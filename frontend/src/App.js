import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute";
import Redirecting from "./components/Redirecting";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

function App() {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(
    token && token.length > 0
  );

  const [user, setUser] = useState();

  useEffect(() => {
    if (token) setUser(jwt_decode(token));
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

        <Route path="/" component={HomePage} />
        {/* <ProtectedRoute
          path="/"
          exact
          component={Todolist}
          isAuthenticated={isAuthenticated}
        /> */}
        <Route exact path="/logout">
          <Redirect to="/" />
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
