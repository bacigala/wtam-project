import React from "react";
import "./App.css";
import Calendar from "./Calendar";
import Header from "./Header";
import GymCalendar from "./GymCalendar"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<p>TODO MAIN PAGE</p>}/>
          <Route path="/signin" element={<p>TODO SIGN IN</p>}/>
          <Route path="/signout" element={<p>TODO SIGN OUT</p>}/>
          <Route path="/signup" element={<p>TODO SIGN UP</p>}/>
          <Route path="/search" element={<p>TODO SEARCH</p>}/>
          <Route path="/trainers" element={<p>NOT IN THE SCOPE OF ROUND 2</p>}/>
          <Route path="/profile" element={<p>NOT IN THE SCOPE OF ROUND 2</p>}/>
          <Route path="/mycalendar" element={<Calendar users="true"/>}/>
          <Route path="/calendar/:id" element={<GymCalendar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
    
}

export default App;