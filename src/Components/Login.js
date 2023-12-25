import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoginSuccess } from "./Action";
import NavlinkPage from "./Navbar";
import "../Css/login.css"
import { setUser } from "./Action";
import toast from "react-hot-toast";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [userName, setUserName] = useState(""); 
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.email || formData.email.trim() === "") {
      validationErrors.email = "Email is required";
    }
    if (!formData.password || formData.password.trim() === "") {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      
      axios
        .get("http://localhost:3000/users")
        .then((response) => {
          const user = response.data.find(
            (user) => user.email === formData.email
          );

          if (user) {
            if (user.password === formData.password) {
              // alert("Login successful");
              toast.success("Login Successfully!")
              dispatch(LoginSuccess());
              navigate("/Home");
              axios
                .post("http://localhost:3000/Loggedusers", formData)
                .then((result) => {
                  console.log(result, "result of logged user is ");
                  dispatch(setUser(user.firstName))
                })
                
                .catch((err) =>
                  console.log(err, "error while posting logged user")
                );
            } else {
              toast.error("Wrong password");
              
            }
          } else {
            toast.error("user not foud") 
            
          }
        })
        .catch((err) => console.log(err, "error while fetching users"));
    }
  };

  return (
    <>
     {<NavlinkPage />}
      <form className="form-container centered-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label className="label">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit" className="Login">Login</button>

        <p>
          Don't have an account?{" "}
          <span
            className="RegisterNav"
            onClick={() => {
              navigate("/Signup");
            }}
            style={{ color: "blue" }}
          >
            register here
          </span>
        </p>
      </form>
    </>
  );
};

export default LoginComponent;
