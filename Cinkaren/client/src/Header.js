import React from "react";
import logo from "./assets/logo.svg";
import login from "./assets/login_icon.svg";
import logout from "./assets/logout_icon.svg";
import registration from "./assets/registration_icon.svg";
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
                <a href="/" onClick={() => {this.logout()}}>
                    <button className="login_logout">Odhlásiť</button>
                    <img className="login_icon" src={logout} alt="login_icon"  width="30" height="30"/>
                </a>
            );
        } else {
            return (
                <a href="/signin">
                    <button className="login_logout">Prihlásiť</button>
                    <img className="logout_icon" src={login} alt="logout_icon"  width="30" height="30"/>
                </a>
            );
        }
    }

    registrationButton(){
        if(!this.cookies.get("userdata")) {
            return (
                <a href="/signup">
                    <button className="registration_button">Registrácia</button>
                    <img className="registration_icon" src={registration} alt="registration_icon"  width="30" height="30"/>
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
                    <img className="logo" src={logo} alt="cinkaren_logo"  width="150" height="100"/>
                    <h1>Činkáreň</h1>
                </a>
                <svg xmlns="http://www.w3.org/2000/svg">
                    <path fill="white" d="M 1600 100 Q 150 150 0 0 L 1600 0 L 1600 600 Q 450 600 300 500 Z"/>
                </svg>
                {this.logInOutButton()}
                {this.registrationButton()}
            </div>
            <nav>
                <a className={this.location.endsWith("/mycalendar") ? "active" : ""} href="/mycalendar"><span>Môj kalendár </span></a>
                <a className={this.location.endsWith("/calendar") ? "active" : ""} href="/calendar"><span>Vyhladať tréning </span></a>
                <a className={this.location.endsWith("/search") ? "active" : ""} href="/search"><span>Vyhladať gym </span></a>
                <a className={this.location.endsWith("/profile") ? "active" : ""} href="/profile"><span>Profil </span></a>
            </nav>
        </header>
        );
    }
}

export default Header;