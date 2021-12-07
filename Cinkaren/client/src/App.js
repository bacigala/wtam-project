import React from "react";
import "./App.css";
import SignIn from "./SignIn";
import Calendar from "./Calendar";
import Header from "./Header";
import MainPage from "./MainPage";
import Footer from "./Footer";
import GymCalendar from "./GymCalendar"
import SignUp from "./SignUp";
import GymSearch from "./GymSearch";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<MainPage/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/search" element={<GymSearch/>}/>
          <Route path="/trainers" element={<p>NOT IN THE SCOPE OF TESTING</p>}/>
          <Route path="/profile" element={<p>NOT IN THE SCOPE OF TESTING</p>}/>
          <Route path="/mycalendar" element={<Calendar user="true"/>}/>
          <Route path="/calendar/:id" element={<GymCalendar/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
    
}

export default App;