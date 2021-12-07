import React from "react";
import logo from "./assets/logo.svg";
import "./Header.css";
import Cookies from 'universal-cookie';

class Header extends React.Component {
    
    constructor(props) {
        super(props);
        this.location = window.location.href;
        this.cookies = new Cookies();
    }

    logInOutButton(){
        if(this.cookies.get("userdata")) {
            return (
                <a href="/">
                    <button className="login_logout" onClick={() => {this.logout()}}>Odhlásiť</button>
                </a>
            );
        } else {
            return (
                <a href="/signin">
                    <button className="login_logout">Prihlásiť</button>
                </a>
            );
        }
    }

    logout() {
        this.cookies = new Cookies();
        this.cookies.remove('userdata', {path: '/'});
    }

    render() {
      return (
        <header>
            <div className="curved">
                <a href="/">
                    <h1>Činkáreň</h1>
                    <img src={logo} alt="cinkaren_logo"  width="150" height="100"/>
                </a>
                {this.logInOutButton()}
                <svg xmlns="http://www.w3.org/2000/svg">
                    <path fill="white" d="M 1600 100 Q 150 150 0 0 L 1600 0 L 1600 600 Q 450 600 300 500 Z"/>
                </svg>
            </div>
            <nav>
                <ul>
                    <li><a className={this.location.endsWith("mycalendar") ? "active" : ""} href="/mycalendar">Môj kalendár </a></li>
                    <li><a className={this.location.endsWith("search") ? "active" : ""} href="/search">Vyhladať gym </a></li>
                    <li><a className={this.location.endsWith("trainers") ? "active" : ""} href="/trainers">Tréneri </a></li>
                    <li><a className={this.location.endsWith("profile") ? "active" : ""} href="/profile">Profil </a></li>
                </ul>
            </nav>
        </header>
        );
    }
}

export default Header;