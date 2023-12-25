import React, { useEffect, useState } from "react";
import {Navigate,Link} from "react-router-dom"
import NavlinkPage from "./Navbar";
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { setCategory } from "./Action";


const HomeComponent = ()=>{

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(()=>{
  //   // setIsLoggedIn({state})
  //   console.log(props.state)

  // },[props])


const handleCategorySelection = (category) => {
  if(isLoggedIn){
    console.log(isLoggedIn,"state value is ")
    navigate('/quizQuestion')
    dispatch(setCategory(category));
  }
  else{
    alert("pls login first")
  }
};
return(
    <>
     <NavlinkPage />
     <div className="Quiz_Heding">
        <h2 className="Quiz_h2"> Select A Quiz category</h2>
      </div>

    
      <div className="Quiz_cards_flex">
        <div className="QuizCatgory_1 Quizcard">
        <img src="https://wallpaperaccess.com/full/3570860.jpg" alt=""/>
        <div>
        <p>Category:<span >History</span></p>
        <p>Question:<span>15</span></p>
        {/* <button className="Takequiz" onClick={()=>{
            trylast()
        }}>Take Quiz</button> */}
         <button className="Takequiz" onClick={()=>handleCategorySelection('History')}>Take Quiz</button>
        </div>
        </div>
        

        <div className="QuizCatgory_2 Quizcard">
        <img src="https://static.vecteezy.com/system/resources/previews/001/249/465/original/cute-science-lettering-and-laboratory-icons-banner-template-vector.jpg" alt=""/>
        <p>Category:<span>Science</span></p>
        <p>Question:<span>15</span></p>
        <button className="Takequiz" onClick={()=>handleCategorySelection('quizScince')}>Take Quiz</button>
        </div>

        <div className="QuizCatgory_3 Quizcard">
        <img src="https://images6.alphacoders.com/455/thumb-1920-455565.png" alt=""/>
        <p>Category:<span>Maths</span></p>
        <p>Question:<span>15</span></p>
        <button className="Takequiz" onClick={()=>handleCategorySelection('Maths')}>Take Quiz</button>
        </div>

        <div className="QuizCatgory_3 Quizcard">
        <img src="https://th.bing.com/th/id/OIP.bjjP2ttvXSi6vCpTugRXnwHaLH?pid=ImgDet&w=474&h=711&rs=1" alt=""/>
        <p>Category:<span>Ggeneral knowledge</span></p>
        <p>Question:<span>15</span></p>
        <button className="Takequiz" onClick={()=>handleCategorySelection('GK')}>Take Quiz</button>
        </div>
      </div>
  </>
)
}
export default HomeComponent