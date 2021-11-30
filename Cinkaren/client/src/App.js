import React from "react";
import "./App.css";
import Calendar from "./Calendar";
import Header from "./Header";

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
      <Calendar/>
    </div>
  );
    
}

export default App;