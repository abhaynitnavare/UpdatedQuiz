import React from "react";
import {Navigate,Link} from "react-router-dom"
// import './App.css';

const FirstSlide = ()=>{
return(
    <>
    <div className="Background_Img"></div>
    <div className="Title-Div"></div>
      <h1 className="Title-Name">
        <Link className="Navlink_Class" to="/Home">QuizUp</Link>
      </h1>
    
  </>
)
}
export default FirstSlide