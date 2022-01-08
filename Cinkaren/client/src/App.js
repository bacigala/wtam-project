import React from "react";
import "./App.css";
import SignIn from "./SignIn";
import Calendar from "./calendar/Calendar";
import CalendarB from "./calendarB/Calendar";
import Header from "./Header";
import MainPage from "./MainPage";
import Footer from "./Footer";
import GymCalendar from "./calendar/GymCalendar"
import GymCalendarB from "./calendarB/GymCalendar"
import SignUp from "./SignUp";
import GymSearch from "./GymSearch";
import Profile from "./Profile";
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
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/mycalendar" element={<Calendar showAll={false} user={true}/>}/>
          <Route path="/mycalendarB" element={<CalendarB showAll={false} user={true}/>}/>
          <Route path="/calendar/:id" element={<GymCalendar/>}/>
          <Route path="/calendarB/:id" element={<GymCalendarB/>}/>
          <Route path="/calendar" element={<Calendar showAll={true} user={false}/>}/>
          <Route path="/calendarB" element={<CalendarB showAll={true} user={false}/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
    
}

export default App;