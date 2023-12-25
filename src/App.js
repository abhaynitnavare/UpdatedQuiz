
import {BrowserRouter as Router,Route,Routes } from "react-router-dom"
import './App.css';
import Profile from "./Components/Profile";
import NavlinkPage from './Components/Navbar';
import FirstSlide from './Components/FirstSlide';
import LoginComponent from "./Components/Login"
import SignupComponent from "./Components/Signup"
import LeadBordComponent from "./Components/Leadbord"
import HomeComponent from './Components/Home';
import QuizApp from'./Components/Quizquestion';
import QuizQuestion from "./Admin/Quizpages";
import EditPage from "./Admin/editpage";
function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={<FirstSlide/>}/>
            <Route path='Navlink' element={<NavlinkPage />}/>
            <Route path='Login' element={<LoginComponent/>}/>
            <Route path='Signup' element={<SignupComponent/>}/>
            <Route path='Leadbord' element={<LeadBordComponent/>}/>
            <Route path='Home' element={<HomeComponent />}/>
            <Route path='Profile' element={<Profile />}/>
            <Route path="/quizQuestion" element={<QuizApp />}/>
            <Route path="/quizQuestion_Admin" element={<QuizQuestion/>}/>
            <Route path="/editpage/:id" element={<EditPage/>}/>
          </Routes>
      </Router>

    </div>
  );
}


export default App;
