import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import User from "./components/User";
import Moderator from "./components/Moderator";
import Admin from "./components/Admin";


const App = () => {
  const [showCliente, setShowCliente] = useState(false);
  const [showAldeia, setShowAldeia] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModerator(user.roles.includes("ROLE_MODERATOR"));
      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          LOGO
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {showModerator && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Página do moderador
              </Link>
            </li>
          )}
          {showAdmin && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Página do administrador
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                Página de usuários
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Olá, {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Sair
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Registrar
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />}  />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/mod" element={<Moderator/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </div>
    </div>
  );
};
export default App;