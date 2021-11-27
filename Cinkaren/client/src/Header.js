import React from "react";
import logo from "./assets/logo.svg";

class Header extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
      return (
        <header>
            <div class="curved">
                <div>
                    <h1>Činkáreň</h1>
                    <img src={logo} alt="cinkaren_logo"  width="150" height="100"/>
                </div>
                <button class="login_logout" type="button">Prihlásiť</button>
                <svg xmlns="http://www.w3.org/2000/svg">
                    <path fill="white" d="M 1600 200 Q 150 150 0 0 L 1600 0 L 1600 600 Q 450 600 300 500 Z"/>
                </svg>
            </div>
            <nav>
                <ul>
                    <li><a href="">Môj kalendár </a></li>
                    <li><a class="active" href="">Vyhladať gym </a></li>
                    <li><a href="">Tréneri </a></li>
                    <li><a href="">Profil </a></li>
                </ul>
            </nav>
        </header>
        );
    }
}

export default Header;