import React from "react";
import "./App.css";
import Calendar from "./Calendar";
import Header from "./Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<p>TODO MAIN PAGE</p>}/>
          <Route path="/signin" element={<p>TODO SIGN IN</p>}/>
          <Route path="/signup" element={<p>TODO SIGN UP</p>}/>
          <Route path="/kalendar" element={<Calendar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
    
}

export default App;