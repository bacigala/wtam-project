import React from "react";
import logo from "./assets/logo.svg";

class Header extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <header>
            <h1>Činkáreň</h1>
            <img src={logo} className="App-logo" alt="cinkaren_logo"  width="500" height="600"/>
        
        </header>
        );
    }
}

export default Header;