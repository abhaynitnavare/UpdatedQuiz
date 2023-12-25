import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Logout, LoginSuccess } from "./Action";
import axios from "axios";
import "../App.css";

const NavlinkPage = () => {
  useEffect(() => {
    // axios
    //   .get("http://localhost:3000/u")
    //   .then((result) => console.log(result));
  }, []);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  const handleLogout = () => {
    dispatch(Logout());
  };
  return (
    <>
    
      <div className="Navbar">
        <div className="Navbar_child">
          <div>
            {/* <span> QuizUp</span> */}
            <Link className="App_Name" to="/Home">
              QuizUp
            </Link>
          </div>
          
          <div className="Navbarinner_flex">
            <span className="navlink nav1">
              <NavLink className="link" to="/">
                TakeQuiz
              </NavLink>{" "}
            </span>

            {!isLoggedIn && (
              <>
              <span className="navlink">
                <NavLink to="/Login"  style={{ textDecoration: "none", color: "black" }}>Login</NavLink>
                </span> <br />
                <span className="navlink">
                <NavLink to="/Signup" style={{ textDecoration: "none", color: "black" }}>Signup</NavLink>
                </span>
              </>
            )}
            
            {isLoggedIn && (
              <>
                <NavLink to="/Home" onClick={handleLogout}  style={{ textDecoration: "none", color: "red" }}>
                 Logout
                </NavLink>
              </>
            )}
             {isLoggedIn && (
              <>
                <NavLink to="/Profile"   style={{ textDecoration: "none", color: "black" }}>
                 Profile
                </NavLink>
              </>
            )}
            
          </div>
        </div>
        {/* <span><NavLink to="/"></NavLink> </span> */}
      </div>
    </>
  );
};
export default NavlinkPage;
